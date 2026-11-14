# Local Dev, Deployment & Open Items

Vee Kay Enterprises static site. No build step, no package manager — pure HTML/CSS/JS with Three.js and OrbitControls vendored locally under `js/vendor/`.

## Running locally

| What | Command / location |
|---|---|
| Serve the site | `python -m http.server 8471 -d "D:/Development/WORK/new websites/site/veekay"` |
| Or via app config | `.claude/launch.json` at `D:/Development/WORK/new websites/.claude/launch.json` has a `veekay` entry (same python http.server, port **8471**). The `infinity` sibling site uses 8472. |
| Entry page | `http://localhost:8471/index.html` — 6 pages: `index`, `products`, `machine`, `about`, `contact`, `enquiry` |
| Theme | Defaults to dark; toggle persisted in `localStorage` key `veekay-theme` (`js/theme-toggle.js`). Clear it to reset. |

Serve over HTTP rather than `file://` — the `products.html` 3D showroom loads `js/vendor/three.min.js` and `js/vendor/OrbitControls.js`.

## Publishing: git workflow and what triggers the production deploy

Verified:

- Repo: branch `main` (26 commits), remote `origin` = `https://github.com/ashh0413/veekay.git`.
- Conventional-commit style throughout (`feat:`, `fix:`, `style:` …). Plain `git push origin main`; no PR gates or CI in the repo.
- `index.html` sits at the repo root, so a GitHub Pages site for this repo would serve it at `/`.

Unverified (nothing in the repo proves a live deployment exists):

- There is **no** `.github/workflows/`, `vercel.json`, `netlify.toml`, `package.json`, or Pages config in the repo. If a production URL is live, it is configured on the hosting side, not in the code. No in-repo artifact triggers a deploy.

Cache-busting convention: pages pin asset versions in URLs — CSS at `?v=apple1`, `js/data.js` / `js/app.js` at `?v=2`, `js/apple-nav.js` / `js/showroom-3d.js` at `?v=1` (script/link tags at the bottom of each HTML file). After editing any JS/CSS, bump the matching `v` param on **all 6 pages** or visitors keep the stale copy.

## Known open items and their exact locations in code

| # | Item | Exact location |
|---|---|---|
| 1 | Enquiry form has no real endpoint. `FORM_ID` is the literal `"YOUR_FORMSPREE_ID"`; until replaced, submission falls back to `mailto:sales@veekayent.com`. Paste an id from formspree.com/f/… into the constant. | `js/app.js:204` (handler `js/app.js:193-225`) |
| 2 | Flyout machine names don't match `data.js`, so 5 of the 6 flyout links on `machine.html` silently render the **first** catalog product (`P[0]` fallback): `Colorjet Irisjet 3200` (data.js has `Colorjet Irisjet Pro`), `Q-Jet Plus 1024` (data.js: `Q Jet Plus 1024`), `Vega 3180S` (data.js: `Vega 3180S Direct`), `DOCAN H1600M` (data.js: `DOCAN H1600M UV Flatbed`), `DOCAN UV Flatbed 2513` (data.js: `DOCAN UV Flatbed 2513 Ultra`). Only `VK JET 3500` matches. The identical 15-card flyout block is duplicated in all 6 HTML pages (90 flyout links site-wide, 6 of the 15 cards per page target `machine.html?m=`), so a fix edits 6 files. | links: `machine.html:94-168`; fallback logic: `machine.html:414-416` |
| 3 | Showroom deep-link only knows 3 keys (`VK JET 3500`, `Vega 3180S`, `DOCAN H1600M`); any other `?m=` value silently loads the default `VK JET 3500`. Note two of those keys themselves don't match `data.js` names (`Vega 3180S Direct`, `DOCAN H1600M UV Flatbed`), so of the 29 `products.html?m=<name>#showroom-3d-stage` links machine.html builds per product (`machine.html:445`), only `VK JET 3500` matches a showroom key — the other 28 always fall back to the default `VK JET 3500` model. | `js/showroom-3d.js:994-999`; keys at `js/showroom-3d.js:29,92,146` |
| 4 | Conflicting GST/IEC numbers: 5 footer lines print `GST 07AABCV1234F1Z5 · IEC 0590012345`, but the products.html legal line prints `GST: 07AAAPW5866E1ZF · IEC: 0502039418`. At least one pair is a placeholder — confirm the real numbers and unify. | `index.html:595`, `about.html:430`, `contact.html` footer, `enquiry.html:423`, `machine.html:403` vs `products.html:562` and `products.html:645` |
| 5 | Stale tooling cache: `.impeccable/hook.cache.json` references files that no longer exist (`css/industrial-theme.css`, `js/finder.js`, `scripts/*.js`) — safe to delete; nothing on the site loads it. | `.impeccable/hook.cache.json` |
| 6 | `IMAGE PENDING` placeholder card is dead code today — all 29 products in `data.js` have an `img` field, and every referenced path was verified to exist on disk. Keep as a guard when adding products without images. | `js/app.js:75` |
| 7 | `assets/img/original/` holds 48 files; roughly the 29 catalog-referenced ones are in use — the rest can be pruned to cut repo weight. | `assets/img/original/` |

## Common edits and their blast radius

| Change | Affects |
|---|---|
| Add/reorder a product in `js/data.js` | Catalog grid re-render, enquiry machine dropdown, machine.html detail page. REF codes are **positional** (`REF · VKE-00N` = index+1, `js/app.js:41`) — reordering renumbers every REF shown in cards and the detail page. |
| Rename a product name | Flyout links hardcoding `machine.html?m=…` — 15 flyout cards **duplicated in all 6 HTML pages**; `enquiry.html?machine=` preselect matching (`js/app.js:199`); the 3 showroom keys in `js/showroom-3d.js`. |
| Nav / mega-flyout copy or links | The whole flyout block (`.apple-mega-flyout`, 15 `.flyout-model-card`s) is copy-pasted into all 6 pages — 6 file edits per change. `js/apple-nav.js` only wires hover/drawer behavior; it contains no content. |
| Footer copy (address, phone, GST) | Footer block duplicated in all 6 pages. `tel:18002000964` also appears in the header of each page, and `sales@veekayent.com` is hardcoded a second time in `js/app.js:215` — independent of the `contact.html:295` mailto. |
| Design tokens (color, type, spacing) | `css/apple-design-system.css` (~2,245 lines, tokens as CSS vars on `:root` / `[data-theme]`); layout specifics in `css/style.css`. Bump `?v=apple1` on all 6 pages afterwards. |
| 3D showroom | Only `products.html` loads it: `js/showroom-3d.js` + `css/showroom-3d.css` + `js/vendor/` — changes never leak to other pages. GSAP is used only behind a `window.gsap` guard (`js/showroom-3d.js:663`); no GSAP script ships in the repo, so those branches are no-ops. Unverified whether a GSAP include was intended. |
| Mobile drawer breakpoint | `css/style.css:1162` — `@media (max-width: 960px)`. Commit 8842ef7 raised the drawer to 960px to prevent header overflow; don't lower it without re-testing 961–1200px header widths. |

## Content ownership: what is real company data vs sample data

The `js/data.js:1` header comment states product names/specs were sourced from `veekayent.com` / `veekaydigital.in` — machine specs are vendor claims, not Vee Kay's own measurements.

| Claim | Where | Status |
|---|---|---|
| Phone `1800 2000 964`, email `sales@veekayent.com` | `tel:18002000964` in all 6 headers/footers; `mailto:` at `contact.html:295`; hardcoded in `js/app.js:215` | Presumed real — confirm with the company before launch |
| Address `5/7, Kirti Nagar Industrial Area, New Delhi – 110015` | 6 footers, `contact.html:287`; the map iframe encodes it in its URL query string (`contact.html:311`) | Presumed real; the iframe embeds the address publicly |
| `GST 07AABCV1234F1Z5 · IEC 0590012345` vs `GST 07AAAPW5866E1ZF · IEC 0502039418` | open item #4 above | **Unresolved — at least one pair is sample data** |
| "Since 1990" | `index.html:6` title, `about.html:7` meta, footer link `about.html:413` (+ 4 other pages) | Unverified corporate claim |
| "ISO 9001 Certified Factory" | `about.html:261,288,415` | Unverified certification claim |
| `assets/img/original/` (Mimaki, YSR, V-series shots) | catalog + flyout images | Authentic OEM photos — commit 9357a15 replaced placeholders with "verified authentic machine photos" |
| `assets/img/curated/` | catalog fallbacks, about/showroom backdrops | Stock/curated imagery, not company photography |
| "Skyline Media Graphics" | `enquiry.html:287` (input placeholder only) | Sample text, no action needed |
| Speed figures ("360 m²/hr", "1,300 sq ft/hr" etc.) | `js/data.js` spec fields + `js/showroom-3d.js` spec panels | Vendor-published figures; `about.html:357` carries the "measured under controlled factory conditions" disclaimer |

Last updated: 2026-11-15

Sources:
- `index.html`, `about.html`, `contact.html`, `enquiry.html`, `machine.html`, `products.html` (nav, footers, form, map)
- `js/app.js` (catalog render, REF codes, enquiry form), `js/data.js` (29 products, image paths), `js/theme-toggle.js`, `js/showroom-3d.js`, `js/apple-nav.js`
- `css/style.css` (960px breakpoint), `css/apple-design-system.css` (token file, header check)
- `git log` / `git remote` (26 commits, origin = github.com/ashh0413/veekay)
- `D:/Development/WORK/new websites/.claude/launch.json` (port 8471)
