# Paint Engine V2 — Impossible Folds

A self-contained generative painting engine and a curated collection by **Lemonhaze**. The main engine is `Paint-Engine-V2.html`. Twelve separate HTML artworks reuse that engine and carry their own fixed reproduction recipes.

**Status: private, pre-inscription preparation.** No V2 inscription ID has been recorded in this repository. Keep the repository private until Lemonhaze confirms inscription is complete and explicitly authorizes making it public. The repository URL retains its historical v1.07 name; V2 is now the active version.

## Open the work

Download or clone the repository and open [index.html](index.html), or open [local/Paint-Engine-V2.html](local/Paint-Engine-V2.html) directly in a modern browser. No installation, build, or server is required to view the artwork. Keep the thirteen files in `local/` together.

The engine opens on artwork **00**, a landscape Compound Symbiosis in **My Love · Carbon**, followed by the twelve selected works and the studio. Open a numbered file in `local/` to view one work; click its artwork for the backcard and PNG download, and press Escape or click outside the card to return.

## What the engine contains

- Seed-based Canvas rendering with composition/anatomy, palette, material, surface, frame, format, and imprint controls.
- A palette browser and editor, variations, batch exploration, shortlist tools, and saved editions.
- PNG and edition-recipe export/import, plus individual HTML edition export.
- An embedded font and procedural rendering; artwork rendering needs no external library, font download, or image asset.
- Original curated timestamps and the recorded Griffintown, Montreal, Quebec, Canada location. These are preserved when exporting curated works.

The artwork is static after rendering. Original PNG downloads carry recipe metadata; screenshots and image services that remove metadata cannot preserve the full recipe. Browser storage is a convenience, not a backup. Export recipes or original PNGs to keep your work. Rendering can vary across browser/graphics environments; verify the intended browser before inscription.

## Files and inscription order

| Path | Purpose | Inscribe? |
| --- | --- | --- |
| `on-chain-templates/Paint-Engine-V2.html` | Complete main engine; 365,014 bytes | **First**, after final review |
| `on-chain-templates/01…12-Impossible-Folds.html` | Unbound artwork templates | **No**; bind the real parent ID first |
| `inscription-ready/01…12-Impossible-Folds.html` | Generated artwork files referencing the inscribed engine | **Yes**, after binding and verification |
| `local/` | Engine and twelve sibling-file previews | Preview only; use the paths above for inscription |
| `manifest.json` | Full recipes, order, original dates, sizes, and hashes | Supporting record |
| `bind-parent.mjs` | Produces the twelve bound files and checksums | Tooling only |
| `docs/inscription-record.json` | Pending/confirmed inscription ledger | Supporting record |
| `legacy/v1.07/` | Previous Passe-Partout engine and its original README | Historical archive |
| `index.html` | Convenience launcher for V2 | **No** |

Read **[the inscription instructions](docs/INSCRIPTION.md)** before preparing files. The numbered artwork inventory is in [WORKS.md](docs/WORKS.md). The original supplied instructions remain in [README.txt](README.txt).

## Maintain this from GitHub

Node.js 22 or later is required for verification and binding, not for viewing. No npm dependencies are needed.

```sh
npm ci
npm run verify
# Only after the exact parent has been inscribed:
node bind-parent.mjs ACTUAL_PARENT_INSCRIPTION_ID
```

The verifier checks the frozen parent, both preview/template sets, recipe consistency, and legacy preservation. Tests exercise binding, invalid inputs, tampering, and refusal to overwrite an existing release. GitHub Actions runs these checks on pushes and pull requests.

Use a branch and pull request for subsequent changes. Follow [CONTRIBUTING.md](CONTRIBUTING.md), [the architecture notes](docs/ARCHITECTURE.md), and [AGENTS.md](AGENTS.md). Do not reformat or rebuild inscription HTML casually: bytes are part of the release identity. Future engine improvements belong in a separately versioned candidate; existing children must keep referencing the engine that created them.

## Lineage and license

The previous **Paint Engine v1.07 [Passe-Partout]** source is preserved in [legacy/v1.07](legacy/v1.07/README.md), with its recorded inscription link. V2 is a new candidate and must not inherit v1.07's inscription status. The repository's existing [MIT license](LICENSE) is retained.

Artist and catalogue: [lemonhaze.com](https://lemonhaze.com).
