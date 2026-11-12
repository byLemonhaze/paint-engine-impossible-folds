# Instructions for future coding agents

Read README.md, docs/ARCHITECTURE.md, docs/INSCRIPTION.md, and CONTRIBUTING.md before edits.

- Active project: Paint Engine V2 / Impossible Folds. Repository slug still says v1.07 for continuity.
- Preserve privacy until the owner explicitly asks to make the repository public. Do not deploy or publish automatically.
- Frozen supplied payloads: local/*.html, on-chain-templates/*.html, and manifest.json. Preserve exact bytes, recipes, numbering, curated timestamps/location, and artist attribution. Engine improvements need a new versioned candidate, not silent changes to these files.
- Never change legacy/v1.07's inscribed HTML. Do not equate its inscription ID with V2.
- No actual V2 inscription ID is known until entered and verified in docs/inscription-record.json. Never invent IDs or treat test IDs as real.
- Binding uses the existing bind-parent.mjs and generates ignored inscription-ready/. Never overwrite a previous output folder or globally replace the placeholder guard.
- npm ci and npm run verify are required before proposing a merge. Browser checks are required for runtime/rendering changes; automated byte checks do not prove visual equivalence.
- Update docs and CHANGELOG alongside behavior changes. Keep PRs focused and disclose unverified release steps.
- Do not add runtime dependencies, change the license, send transactions, or change repository visibility without an explicit request.
