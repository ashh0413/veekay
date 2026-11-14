# Vee Kay Enterprises — Site Documentation

## Overview

Vee Kay Enterprises is a static six-page site (no build step) presenting an industrial printing-systems business: home, product catalogue with a WebGL 3D showroom, machine spec pages, about/quality, contact, and quote enquiry.
The catalogue is driven by a single data file (`js/data.js`) holding 29 products across 6 categories (Solvent, Textile, UV, Sublimation, CNC/Laser, Consumables), with 6 flagged as flagships; all 29 product images exist on disk.
Three CSS files style the pages (a dark-default Apple-esque layer plus a legacy `style.css` layer and the 3D showroom stylesheet), and shared behavior lives in six JS modules under `js/` with Three.js and OrbitControls vendored in `js/vendor/`.

## Quick start

Open the site locally:

```
python -m http.server 8471 -d "D:/Development/WORK/new websites/site/veekay"
```

then browse to `http://localhost:8471/index.html` (the 3D showroom on `products.html` needs HTTP, not `file://`). Alternatively use the `veekay` entry in `D:/Development/WORK/new websites/.claude/launch.json` (port 8471; the sibling Infinity site uses 8472).

Where to make common edits:

| Want to change… | Edit |
|---|---|
| Products, logos, client strip | `js/data.js` (catalogue), `js/showroom-3d.js` `SHOWROOM_PRODUCTS` (3D models — hand-maintained, separate list) |
| Any copy in a page | the page's own HTML file; footer legal lines (GST/IEC) are repeated across 6 files |
| Colors, theming, tokens | `css/apple-design-system.css` (primary) and `css/style.css` (legacy layer) |
| 3D showroom look | `css/showroom-3d.css` + `js/showroom-3d.js` |
| Enquiry form endpoint | `FORM_ID` at `js/app.js:204` (currently the placeholder `YOUR_FORMSPREE_ID`, so submissions fall back to `mailto:sales@veekayent.com`) |

After changing any JS/CSS, bump the matching cache-buster (`?v=…` params) in all 6 HTML pages or visitors keep the stale copy.

## Documentation

| File | Title | Summary |
|---|---|---|
| [01-architecture.md](01-architecture.md) | Architecture & Page Map | Static HTML/CSS/JS stack, page/route table, directory layout, and repository notes (deploy target unverified — no CI or host config in-repo). |
| [02-design-system.md](02-design-system.md) | Design System & Styling | CSS file inventory and load order, design tokens, dark/light theming, breakpoints, shared components, and typography/color palette. |
| [03-data-catalog.md](03-data-catalog.md) | Product Data & Catalog | `js/data.js` record schema, the full 29-product table, deep-link rules, and how to add/edit/remove a product (REF tags are index-derived — reordering changes them). |
| [04-behavior-scripts.md](04-behavior-scripts.md) | Client Behavior & Scripts | JS inventory, navigation controller, catalogue engine, form handling (Formspree + mailto fallback), the WebGL showroom, and touch/accessibility gaps. |
| [05-operations.md](05-operations.md) | Local Dev, Deployment & Open Items | Running locally, the git publish workflow, the open-items register with exact code locations, and blast radius of common edits. |

## Known open items

Full register with exact file/line locations: [05-operations.md](05-operations.md). The three most actionable:

1. **Enquiry form has no real endpoint** — `FORM_ID` in `js/app.js:204` is still the literal `"YOUR_FORMSPREE_ID"`; until a real Formspree id is pasted in, submissions fall back to `mailto:sales@veekayent.com`.
2. **Conflicting GST/IEC numbers** — five footers print `GST 07AABCV1234F1Z5 · IEC 0590012345` while `products.html` prints a different pair; at least one is a placeholder — confirm the real numbers and unify across all 6 pages.
3. **Machine deep-links silently fall back** — 5 of 6 flyout links on `machine.html` (the flyout block is duplicated in all 6 pages) and 28 of the 29 `?m=` deep-links `machine.html` builds don't match `data.js` / `SHOWROOM_PRODUCTS` (`Vega 3180S` is `Vega 3180S Direct` in `data.js`), so the viewer quietly loads the default `VK JET 3500` model instead.
