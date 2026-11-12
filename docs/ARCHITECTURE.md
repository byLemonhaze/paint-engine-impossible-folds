# Architecture and release boundaries

## Runtime

`local/Paint-Engine-V2.html` is the complete, bundled application: inline styles, embedded Syne Mono font, palette/recipe data, artist text, and JavaScript Canvas rendering. `on-chain-templates/Paint-Engine-V2.html` is an identical copy. No modular source tree or original build pipeline was supplied; these HTML files are the authoritative supplied snapshot. `npm run build` validates it and does not regenerate it.

The engine has an opening cover (00), a twelve-work curated collection, and an interactive studio. The embedded `curated-series` JSON is compared against `manifest.json` during verification. The rendered recipe is carried in the URL fragment of each individual work. Curated works are checked against the parent's selected recipes; future edition export starts at 13.

Each child is a small HTML iframe wrapper:

- Local: `Paint-Engine-V2.html#work=NN&recipe=...`.
- Template: `/content/__PARENT_INSCRIPTION_ID__#work=NN&recipe=...`.
- Bound: `/content/<real-ID>#work=NN&recipe=...`.

The fragment supplies artwork configuration to the engine. The child does not duplicate the renderer. The template guard displays an explanation until the parent reference has been bound.

## Data and persistence

Full LH4 recipes encode the reproduction settings; the manifest also records the selected palette and original display date. Original PNG exports embed recipe metadata, and edition JSON provides another portable record. The studio uses browser localStorage and IndexedDB for working state/curation. Export copies before clearing browser data or changing origin. An optional location action requests browser geolocation; recorded curated locations are already supplied. No location request is required to render the curated works.

## Integrity boundaries

`manifest.json` is the supplied release manifest, unchanged on import. The verifier compares byte sizes and SHA-256 values for every supplied HTML, checks the matching parent copies and curated data, and pins the legacy file. `bind-parent.mjs` verifies source hashes and only replaces the recursive URL placeholder. It writes a new directory exclusively, preserving the complete recipes.

Checksums identify file bytes, not browser pixel equivalence, inscription existence, ownership, or on-chain provenance. Browser review and confirmed-content verification remain release steps.

## Editing policy

Keep the current snapshot frozen during inscription preparation. Edit documentation/tooling normally through branches and pull requests. A deliberate engine revision needs a separate candidate directory/version, its own manifest, visual review, and a new inscription plan. Preserve the original candidate and all inscribed snapshots. If modular sources are recovered or extracted later, document a reproducible build and compare its output before calling it equivalent.

`index.html` is only a launcher. The legacy v1.07 HTML and its README are historical evidence. The original repository URL and Git history remain intact.
