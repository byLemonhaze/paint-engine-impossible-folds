import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
test('maintenance files and V2 entry point are present', () => {
  for (const name of ['LICENSE', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md', 'AGENTS.md', 'docs/INSCRIPTION.md', 'docs/ARCHITECTURE.md', 'docs/WORKS.md']) {
    assert.ok(existsSync(new URL(name, root)), name);
  }
  assert.match(readFileSync(new URL('index.html', root), 'utf8'), /url=local\/Paint-Engine-V2.html/);
});
