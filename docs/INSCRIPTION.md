# Inscription instructions — Impossible Folds

## Current state

V2 is prepared locally; no actual parent or child inscription IDs have been supplied. The repository remains private. These instructions prepare files only: they do not submit transactions or pay fees.

There are **13 intended HTML inscriptions** in the initial set: one main engine and twelve individual works. Artwork 00 is the engine's opening artwork, not a separate supplied child file. ZIP archives, the launcher, manifests, checksums, scripts, and documentation are supporting material, not these 13 payloads.

## 1. Review and freeze the main engine

1. Work from a clean checkout and run `npm ci` then `npm run verify`.
2. Open `local/Paint-Engine-V2.html`. Review the opening 00, selected works 01–12, studio, backcards, PNG exports, and recipe import. Review each numbered local HTML too.
3. Preserve original work order, timestamps, location, artist text, and attribution. Works 11 and 12 already have the intended swapped order; do not sort them by their seeds or filenames from another package.
4. Record the exact Git commit being inscribed in `docs/inscription-record.json`. A future ledger-only commit will naturally have a different commit ID.
5. Inscribe **`on-chain-templates/Paint-Engine-V2.html`**, using an HTML content type (`text/html;charset=utf-8`). The local parent is identical, but this path is the canonical payload.

Expected parent identity:

```text
bytes: 365014
sha256: 93df0a6ff929766f917ed50fcaae21c59bbee3c906cd31e54845306abc60badb
```

The project target is below 369,000 bytes; this is a project budget, not a statement about transaction fees or a network limit. Do not minify, re-save, inject hosting scripts, or otherwise transform the reviewed file.

## 2. Bind the actual inscription ID

Wait for the parent inscription to be available, and confirm the served content matches the parent hash. Copy its **inscription ID**, not only a transaction ID or inscription number: 64 lowercase hexadecimal characters, `i`, then its index.

From the repository root:

```sh
node bind-parent.mjs ACTUAL_PARENT_INSCRIPTION_ID
```

Replace the argument with the real ID. The binder validates the ID format and source hashes. It cannot prove that the supplied ID exists or contains the right engine; the content/hash check above is still required.

The command creates `inscription-ready/` with:

- An unchanged copy of `Paint-Engine-V2.html` for reference; **do not inscribe the parent twice**.
- Twelve numbered child HTML files with `/content/<actual-parent-ID>#work=NN&recipe=...` references.
- `checksums.json`, recording the parent ID and each child size and SHA-256.

It refuses to overwrite an existing `inscription-ready/` directory. If rebinding is necessary, preserve and inspect that previous directory before moving it outside the checkout and rerunning. Never silently replace a release already used for inscription.

The bound HTML intentionally retains `__PARENT_INSCRIPTION_ID__` in its JavaScript guard. That is normal. The iframe's **data-src URL** must contain the actual ID; a blanket search-and-replace or a rule rejecting every occurrence of the guard would be incorrect.

## 3. Review and inscribe the twelve works

1. Preview each bound child on an Ordinals-compatible origin that serves `/content/<ID>`. Double-clicking bound children on disk is not an on-chain preview; use the local siblings for offline review.
2. Check work number, palette, backcard, original timestamp/location, PNG export, and the exact recursive target. Compare with the local set.
3. Inscribe **only the twelve numbered HTML files from `inscription-ready/`**, in the manifest's 01–12 order. Each file is its own inscription payload. Do not use unbound templates or local preview children.
4. Record the parent ID, all child IDs, hashes, and verification notes in `docs/inscription-record.json`. Preserve the generated checksums with the release records; `inscription-ready/` is ignored to prevent accidental commits of generated attempts. Copy a reviewed checksum report into `docs/releases/` when recording a real release.
5. Verify the confirmed children render using the confirmed parent, then mark the record confirmed and create an annotated Git tag for the exact release record. Include reviewed payloads/checksums in a private GitHub release if desired.
6. Keep GitHub private until Lemonhaze explicitly authorizes changing visibility after inscription. There is no automated publishing or visibility change.

## Recursion and provenance are separate

The child HTML loads the engine via the supported [`/content/<INSCRIPTION_ID>` recursive endpoint](https://docs.ordinals.com/inscriptions/recursion.html). The complete fixed recipe stays in each child; rendering and backcard behavior live in the engine.

That HTML reference does **not** establish Ordinals parent–child provenance. If the collection should have that on-chain relationship, use the inscription tool's parent workflow and verify the resulting relationship separately. See the official [provenance specification](https://docs.ordinals.com/inscriptions/provenance.html). Record whether provenance was established rather than assuming it from a working iframe.

## Future editions and engine development

For works **13 onward**, use the original engine's studio: **Export → Inscription edition**. Choose a fresh number, save the local artwork HTML for review, and supply the exact existing parent ID to export the inscription HTML. The child carries its recipe, including custom colours and recorded imprint. Keep its source, recipe, checksum, and final inscription ID in a versioned release record.

A later engine change cannot update an immutable inscription. Start a separate version, review and inscribe that engine, and bind new works to its new ID. Never repoint existing edition records to a different engine, or change the frozen files merely to make tests pass.

On **01 / Parent**, press **S** to export the opening 00 as a 4000 × 2250 PNG. The shortcut is inactive while typing or while a dialog is open.
