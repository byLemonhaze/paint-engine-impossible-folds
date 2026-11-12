# Working on Paint Engine

V2 / Impossible Folds is the active release candidate. The repository is private pending inscription. Do not add automatic deployments, publish releases publicly, or change visibility without Lemonhaze's explicit instruction.

## GitHub workflow

1. Create a focused branch from `main`, such as `docs/inscription-notes` or `fix/edition-export`.
2. Describe the problem and expected behavior in an issue or pull request. Specify whether it affects documentation, tooling, a future engine candidate, or release records.
3. Keep frozen HTML and the supplied manifest unchanged unless an intentional new candidate is being created. Preserve the inscribed legacy source permanently.
4. Run `npm ci` and `npm run verify` with Node.js 22+. There are no runtime or npm dependencies.
5. For runtime changes, review the cover, all curated works, individual children, backcards, exports/import, and mobile layout in a browser. Record browser/version and any rendering differences. For binding changes, cover invalid IDs, changed sources, and existing-output refusal.
6. Update documentation and CHANGELOG with the final behavior. Open a PR using the template; review the diff and passing GitHub Actions before merging.

## Standards

- Preserve attribution, artist text, full recipes, original curated dates/location, work order, and embedded assets.
- Keep rendering self-contained and avoid adding network dependencies to inscription payloads.
- Keep the two parent copies byte-identical for each candidate, with an independently reviewed manifest.
- Never update hashes solely to silence a failing integrity check.
- Treat browser storage as temporary; export and retain portable recipes.
- Do not commit wallet material, credentials, `.env` files, generated test releases, caches, or downloaded private data.
- New work numbers begin at 13; never reuse a released number without an explicit edition policy.
- Keep the existing license; propose licensing changes separately for owner review.

The [inscription guide](docs/INSCRIPTION.md) governs release preparation. Actual transaction submission and final public visibility remain owner decisions.
