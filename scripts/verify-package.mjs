import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await read('manifest.json'));
assert.equal(manifest.parent.sha256, '93df0a6ff929766f917ed50fcaae21c59bbee3c906cd31e54845306abc60badb', 'Frozen V2 identity changed');
assert.equal(manifest.works.length, 12);
assert.deepEqual(manifest.works.map(w => w.number), Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0')));
const parent = await read(`local/${manifest.parent.file}`);
assert.equal(parent.length, manifest.parent.bytes);
assert.ok(parent.length < 369000, 'Parent exceeds the project byte budget');
assert.equal(sha(parent), manifest.parent.sha256);
assert.deepEqual(parent, await read(`on-chain-templates/${manifest.parent.file}`));
const text = parent.toString('utf8');
const series = JSON.parse(text.match(/<script id="curated-series" type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert.equal(series.length, 12);
for (const [index, work] of manifest.works.entries()) {
  assert.equal(work.file, `${work.number}-Impossible-Folds.html`);
  const curated = series[index];
  assert.equal(curated.number, Number(work.number));
  for (const key of ['seed', 'palette', 'date']) assert.equal(curated[key], work[key], `${work.file}: ${key}`);
  for (const [folder, prefix, target] of [
    ['local', 'local', './' + manifest.parent.file],
    ['on-chain-templates', 'template', '/content/__PARENT_INSCRIPTION_ID__'],
  ]) {
    const bytes = await read(`${folder}/${work.file}`);
    assert.equal(bytes.length, work[`${prefix}Bytes`], work.file);
    assert.equal(sha(bytes), work[`${prefix}Sha256`], work.file);
    const html = bytes.toString('utf8');
    const src = html.match(/data-src="([^"]+)"/)[1];
    assert.equal(src, `${target}#work=${work.number}&recipe=${work.seed}`);
  }
}
// Syntax-check inline executable scripts without evaluating the artwork.
for (const folder of ['local', 'on-chain-templates']) {
  const names = (await readdir(new URL(folder + '/', root))).filter(n => n.endsWith('.html')).sort();
  assert.deepEqual(names, [...manifest.works.map(w => w.file), manifest.parent.file].sort());
  for (const name of names) {
    const html = (await read(`${folder}/${name}`)).toString('utf8');
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/type="application\/json"/.test(match[1])) continue;
      const type = /type="module"/.test(match[1]) ? 'module' : 'commonjs';
      const check = spawnSync(process.execPath, [`--input-type=${type}`, '--check'], {input: match[2], encoding: 'utf8'});
      assert.equal(check.status, 0, `${folder}/${name}: ${check.stderr || check.error || 'syntax check failed'}`);
    }
  }
}
const legacy = await read('legacy/v1.07/PaintEngine-v1.07 [Passe-Partout] - INSCRIBED.html');
assert.equal(sha(legacy), '88833478ca9729ca7a566b2b3ff4353c17d27454136bb30fac06984d0c8b5028');
const ledger = JSON.parse(await read('docs/inscription-record.json'));
assert.equal(ledger.parent.sha256, manifest.parent.sha256);
assert.equal(ledger.parent.bytes, manifest.parent.bytes);
assert.deepEqual(ledger.children.map(w => w.number), manifest.works.map(w => w.number));
for (const entry of [ledger.parent, ...ledger.children]) {
  assert.ok(entry.inscriptionId === null || /^[a-f0-9]{64}i\d+$/.test(entry.inscriptionId));
}
console.log('Verified frozen parent, 24 children, curated recipes, inline JavaScript syntax, legacy source, and inscription ledger.');
