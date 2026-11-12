# Import verification — 2026-11-11

The Impossible Folds package was imported without altering its 29 supplied files: 26 HTML files, manifest, binder, and original README. All imported bytes were compared against the supplied desktop package. The previous v1.07 HTML was moved into the legacy archive with its SHA-256 unchanged.

## Automated checks

- `npm ci` and `npm run verify` pass locally.
- Parent identity, both complete HTML sets, byte budgets, SHA-256 values, work order, recipes, palette/date correspondence, inline JavaScript syntax, and legacy integrity verified.
- Six tests pass, including successful binding, invalid/missing IDs, parent/template tampering, and refusal to overwrite a release directory.
- Synthetic binding IDs were used only inside temporary test directories, which were removed. No production `inscription-ready/` release was generated.

## Browser checks

Chrome 157 on macOS, using a local HTTP preview:

- Root launcher opens the V2 parent; cover, selected collection, and studio navigation work.
- All twelve individual local HTML files render and open their numbered backcards with the recorded location.
- Collection screenshot and representative backcards were visually inspected.
- Work 01's studio 2K PNG was exported and imported under a generic filename; the complete recipe was restored unchanged, with the successful import message visible. This exercises embedded metadata rather than relying on the seed filename.
- No script errors were reported in the twelve-child check. The local server reported only a missing optional favicon during the initial parent load.

## Still required before inscription

Owner visual sign-off, target inscription viewer checks, other browsers/mobile review as needed, and confirmation that the exact parent bytes are available at the eventual inscription ID. Bound children cannot be validated against a real parent until that ID exists. No transaction, fee payment, parent–child provenance, or on-chain confirmation was performed by this import.
