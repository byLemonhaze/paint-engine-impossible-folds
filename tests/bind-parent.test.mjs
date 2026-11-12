import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, copyFile, readFile, writeFile, rm, access, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const id = 'a'.repeat(64) + 'i0'; // Synthetic; never a production release ID.
const sha = data => createHash('sha256').update(data).digest('hex');
async function fixture(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'impossible-folds-test-'));
  t.after(() => rm(dir, {recursive: true, force: true}));
  for (const file of ['bind-parent.mjs', 'manifest.json']) await copyFile(new URL(file, root), path.join(dir, file));
  await cp(new URL('on-chain-templates/', root), path.join(dir, 'on-chain-templates'), {recursive: true});
  return dir;
}
const bind = (dir, value) => execFileSync(process.execPath, [path.join(dir, 'bind-parent.mjs'), ...(value === undefined ? [] : [value])], {encoding: 'utf8', stdio: 'pipe'});
async function absent(dir) { await assert.rejects(access(path.join(dir, 'inscription-ready'))); }
test('binding preserves the parent and recipes, changes only each recursive target, and reports exact hashes', async t => {
  const dir = await fixture(t);
  bind(dir, id);
  const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json')));
  const report = JSON.parse(await readFile(path.join(dir, 'inscription-ready/checksums.json')));
  assert.equal(report.parentInscriptionId, id);
  assert.deepEqual(report.parent, manifest.parent);
  assert.equal(report.children.length, 12);
  const parent = await readFile(path.join(dir, 'inscription-ready', manifest.parent.file));
  assert.equal(sha(parent), manifest.parent.sha256);
  for (const [index, work] of manifest.works.entries()) {
    const template = await readFile(path.join(dir, 'on-chain-templates', work.file), 'utf8');
    const child = await readFile(path.join(dir, 'inscription-ready', work.file));
    assert.equal(child.toString(), template.replace('/content/__PARENT_INSCRIPTION_ID__', '/content/' + id));
    assert.ok(child.toString().includes(`data-src="/content/${id}#work=${work.number}&recipe=${work.seed}"`));
    assert.deepEqual(report.children[index], {file: work.file, bytes: child.length, sha256: sha(child)});
  }
  const before = await readFile(path.join(dir, 'inscription-ready/checksums.json'));
  assert.throws(() => bind(dir, 'b'.repeat(64) + 'i1'), /EEXIST/);
  assert.deepEqual(await readFile(path.join(dir, 'inscription-ready/checksums.json')), before);
});
test('missing and malformed IDs produce no release', async t => {
  const dir = await fixture(t);
  for (const value of [undefined, '', 'not-an-id', 'a'.repeat(64), 'A'.repeat(64) + 'i0', id + '/extra']) {
    assert.throws(() => bind(dir, value), /actual parent inscription ID/);
    await absent(dir);
  }
});
for (const [name, message] of [['Paint-Engine-V2.html', /parent has changed/], ['12-Impossible-Folds.html', /Child template changed/]]) {
  test(`tampering with ${name} is rejected before any release is created`, async t => {
    const dir = await fixture(t);
    const filename = path.join(dir, 'on-chain-templates', name);
    await writeFile(filename, Buffer.concat([await readFile(filename), Buffer.from('\n')]));
    assert.throws(() => bind(dir, id), message);
    await absent(dir);
  });
}
test('an existing output directory is never overwritten', async t => {
  const dir = await fixture(t);
  await mkdir(path.join(dir, 'inscription-ready'));
  await writeFile(path.join(dir, 'inscription-ready/keep.txt'), 'previous release');
  assert.throws(() => bind(dir, id), /EEXIST/);
  assert.equal(await readFile(path.join(dir, 'inscription-ready/keep.txt'), 'utf8'), 'previous release');
});
