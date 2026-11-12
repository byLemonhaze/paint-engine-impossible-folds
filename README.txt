IMPOSSIBLE FOLDS — by Lemonhaze

local/
Open Paint-Engine-V2.html for the full engine: opening artwork, twelve selected works, then studio.
Open any numbered HTML for that individual artwork. Click the artwork for its backcard and PNG download. Click outside the backcard or press Escape to return to the artwork.
Keep the thirteen HTML files together. They work offline; the twelve small files reuse the one parent beside them. No installation or server is required.

on-chain-templates/
The parent is complete and identical to the local parent. The twelve children are templates, NOT ready to inscribe until the parent ID is bound.
1. Review the local set and inscribe Paint-Engine-V2.html first.
2. Obtain its actual inscription ID.
3. From this folder, run: node bind-parent.mjs ACTUAL_PARENT_INSCRIPTION_ID
4. The new inscription-ready/ folder contains the identical parent and twelve bound children, plus checksums. Inscribe those numbered children, not the templates.
The binding tool never overwrites a previous inscription-ready folder. It verifies the original parent and child template hashes before producing the release.

Recursion uses /content/<parent inscription ID>. Children contain their complete fixed artwork recipe; the rendering code, texture generation and backcard live in the parent. The first twelve recipes are checked against the parent's selected editions before rendering.
Official endpoint reference: https://docs.ordinals.com/inscriptions/recursion.html
An HTML reference does not itself establish Ordinals parent-child provenance. If desired, establish that relationship separately through your inscription tool's parent workflow.

The original curated timestamps and Griffintown, Montreal, Quebec, Canada location are preserved in artwork exports and backcards. Exporting a curated work does not replace its original date with today's date.
PNG downloads include the complete reproduction recipe in their metadata; long recipes use a short filename. Import the original PNG into the engine to restore it. Image services that strip metadata or screenshots cannot preserve that recipe.

manifest.json records the full twelve recipes, order, original dates and checksums. The opening artwork is 00: the landscape Compound Symbiosis from LH-PNG-HE6J05, in My Love · Carbon, with its original timestamp and location. Works 11 and 12 retain the requested swapped order.
The parent includes the full artist text and the header comments. Every child includes its title, by Lemonhaze and -FNST header comments.

Budget: parent below 369,000 bytes. No external libraries, fonts, images, or animated artwork. Child files load only the parent.

FUTURE EDITIONS
In the parent studio, choose Export → Inscription edition. Choose a number from 13 onward, then download a local artwork HTML or supply the exact parent inscription ID and download the inscription HTML. The new child carries the complete recipe, including custom colours and recorded imprint; it uses the existing parent without modifying it. Preview with the same parent before inscribing. Keep the parent file unchanged after inscription: later code changes cannot alter an immutable parent.

Parent cover PNG: on 01 / Parent, press S to export 00 as a 4000 × 2250 PNG. This shortcut does not run while typing or when a dialog is open.
