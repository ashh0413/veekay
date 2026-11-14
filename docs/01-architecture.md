# Architecture & Page Map — Vee Kay Enterprises

## Purpose & audience of the site

Vee Kay Enterprises (est. 1990, Delhi) manufactures and supplies industrial printing
and finishing machinery. This is the company's marketing + catalogue website: it
presents a catalog of wide-format printers, UV flatbeds, textile platforms, sublimation
lines, CNC/laser equipment, and consumables (print heads, inks), and drives B2B
enquiries (quote requests).

- **Audience:** print shops, signage/billboard producers, textile mills, and
  industrial buyers evaluating machine platforms.
- **Goal per page:** index sells the brand; products page is the interactive catalog
  (client-side rendered) + 3D showroom; machine pages are spec sheets; enquiry page
  captures leads via a form (currently falls back to mailto — see Tech stack).
- Contact constants in code: helpline `tel:18002000964` ("24/7 Helpline:
  1800-2000-964", `index.html` lines 80/565), email `sales@veekayent.com`
  (`js/app.js`).

## Tech stack (static HTML/CSS/JS, no build step)

- **No framework, no bundler, no package manager.** Every page is plain HTML with
  CSS/JS included via `<script>`/`<link>` tags. Edit a file, refresh the page —
  that is the entire dev loop. There is no `package.json`, build script, or CI.
- **External dependencies:** Google Fonts only (Inter + Space Mono, `index.html`
  lines 8–10). All JS libraries are vendored locally in `js/vendor/` — no other
  CDNs are loaded by any page.
- **Local libraries:**

  | File | Role |
  |---|---|
  | `js/vendor/three.min.js` | Three.js (MIT, 2010–2021 era per license header) — WebGL engine for the 3D showroom |
  | `js/vendor/OrbitControls.js` | OrbitControls for drag/zoom in the showroom |

- **Shared JS modules (plain script tags, IIFE style, no modules system):**

  | File | Lines | Role |
  |---|---|---|
  | `js/data.js` | 240 | `PRODUCTS` array (29 machines: 7 Solvent, 8 Textile, 6 UV, 2 Sublimation, 4 "CNC / Laser", 2 Consumables; 6 flagged `flagship: true`) + `CLIENTS` array (8 client logo paths). Consumed by `app.js` and the inline script in `machine.html` |
  | `js/app.js` | 242 | Renders the product grid (`#product-grid`) from `PRODUCTS`, category filter pills, live search + sort, hash deep-links (`#solvent`, `#uv`, …), enquiry form machine dropdown + submit, scroll reveals, tactile click effect |
  | `js/apple-nav.js` | 146 | Debounced hover mega-menu/flyout controller + mobile drawer |
  | `js/theme-toggle.js` | 40 | Dark/light toggle; persists to `localStorage` key `veekay-theme`, sets `<html data-theme>`; default is **dark**. Each page also has an inline head script that applies the saved theme before first paint (FOUC guard) |
  | `js/showroom-3d.js` | 1034 | Three.js showroom: 3 procedurally-built models ("VK JET 3500", "Vega 3180S", "DOCAN H1600M"), view presets, exploded view, screen-projected hotspots, WebGL fallback; reads `?m=` / `?machine=` to preselect a model |
  | `js/motion.js` | 91 | **Legacy — not referenced by any page.** It expects GSAP/Lenis/SplitText globals that no page loads (SplitText was removed in commit `ede0d6a`); `showroom-3d.js` guards GSAP calls with `if (window.gsap)`, so without a GSAP script those are no-ops |

- **CSS (3 stylesheets; design tokens as custom properties on `:root` — `css/style.css`
  has two `:root` blocks, lines 14 and 1243):**

  | File | Lines | Used by |
  |---|---|---|
  | `css/style.css` | 1431 | All 6 pages |
  | `css/apple-design-system.css` | 2245 | All 6 pages |
  | `css/showroom-3d.css` | 820 | `products.html` only |

- **Caching:** assets are cache-busted with query strings (`?v=apple1`, `?v=2`, etc.).
- **Enquiry form (`js/app.js` lines 204–226):** posts to a Formspree endpoint, but
  `FORM_ID` is still the placeholder `"YOUR_FORMSPREE_ID"`; while unset, submitting
  builds a `mailto:sales@veekayent.com` link instead. **Unverified:** whether a
  Formspree account has been configured elsewhere — the checked-out code says no.
- What "no build step" means in practice: product data, copy, and images live in
  editable source files (JS arrays, HTML, `assets/`); changing a machine's specs
  means editing `js/data.js` directly. There is no regeneration, no minification
  pipeline, and no test suite.

## Page/route table

Six HTML pages at the repo root; routes are plain file names plus anchors/query params.

| Page | Role | Key entry links / params |
|---|---|---|
| `index.html` (618 lines) | Landing: hero, category flyout teasers, featured product cards | Nav flyouts link to `products.html#solvent`, `#uv`, `#textile`, `#cnc`; machine cards link to `machine.html?m=<name>`; quote CTA → `enquiry.html` |
| `products.html` (663 lines) | Interactive catalog (grid rendered client-side from `js/data.js`) + Three.js showroom section `#showroom-3d-stage` | Deep-link filters via `#solvent` / `#uv` / `#textile` / `#sublimation` / `#cnc` / `#consumables`; `?m=<name>#showroom-3d-stage` preselects a 3D model (emitted by machine.html's "View in 3D" button) |
| `machine.html` (452 lines) | Single-machine spec sheet; inline script reads `?m=` from `location.search` and matches against `PRODUCTS` | Entered from catalog card "View Specifications" links (`machine.html?m=<encoded name>`, built in `js/app.js`); links out to `enquiry.html?machine=<name>` and `products.html?m=<name>#showroom-3d-stage` |
| `about.html` (440 lines) | "Technology & SLA" (nav label): company background, SLAs, facility imagery | Nav item "Technology & SLA" |
| `contact.html` (450 lines) | Contact details + factory/showroom tour CTA | Mobile nav "Contact & Factory Tour"; footer links |
| `enquiry.html` (433 lines) | Quote request form (`#enquiry-form`, machine preselected via `?machine=<name>`) | Nav pill "Request Factory Quote"; catalog card "Get Factory Quote" links |

Notes on routing mechanics:
- Catalog ref codes (`REF · VKE-001` …) are generated at render time from a
  machine's index in `PRODUCTS` (`refOf()` in `js/app.js`, same logic inline in
  `machine.html`), not stored in the data.
- Hash deep-linking (`products.html#uv`) maps to the `CATEGORIES` filter in
  `js/app.js`; `apple-nav.js` drives the hover flyouts (ids: `flyout-solvent`,
  `flyout-uv`, `flyout-textile`, `flyout-cnc`, `flyout-tech`) and the mobile
  drawer, whose breakpoint was raised to 960px in commit `8842ef7`.

## Directory layout

```
veekay/
├── index.html  products.html  machine.html
├── about.html  contact.html  enquiry.html   # 6 static pages, repo root
├── css/
│   ├── style.css                  # 1431 lines, all pages
│   ├── apple-design-system.css    # 2245 lines, all pages
│   └── showroom-3d.css           # 820 lines, products.html only
├── js/
│   ├── data.js                   # PRODUCTS + CLIENTS (single source of machine data)
│   ├── app.js                    # catalog rendering, filters, enquiry form
│   ├── apple-nav.js              # mega-menu + mobile drawer
│   ├── theme-toggle.js           # dark/light, localStorage
│   ├── showroom-3d.js           # Three.js showroom engine
│   ├── motion.js                 # legacy, unreferenced by any page
│   └── vendor/
│       ├── three.min.js          # vendored Three.js
│       └── OrbitControls.js      # vendored OrbitControls
├── assets/img/
│   ├── (root)                    # hero gears, logo.png, footer_pedestal.png,
│   │                             # cap_*.png, cta_star.png, hero_axis_backdrop.jpg
│   ├── curated/                  # 24 processed JPGs used by catalog + about
│   ├── original/                 # 48 authentic machine photos (PNG/WebP,
│   │                             # largest ~1.4 MB); source for most card images
│   ├── products/                 # 11 images: client logos 1–8.png + 3 UV photos
│   ├── products-items/           # 5 product PNGs (VK-JET-3500, E-Jet, Q-Jet, …)
│   ├── menu/                     # 17 PNGs (menu thumbnails)
│   └── slides/                   # 3 JPGs
│   (assets/ totals ~24 MB)
├── scripts/                      # empty directory
├── .impeccable/hook.cache.json   # design-audit tooling cache; not site content
└── docs/                         # this documentation
```

Where things live, by concern:
- **Machine data/specs** → `js/data.js` (edit there; the grid, the machine page, and
  the 3D showroom model selection all key off it).
- **Copy/marketing text** → inline in the HTML files; flyout teasers in `index.html`.
- **Machine photos** → `assets/img/original/` (authentic, per commit `9357a15`);
  editorial shots → `assets/img/curated/`.
- **Colors/typography tokens** → `:root` custom properties in `css/style.css`.

## Repository

| Item | Value |
|---|---|
| Remote | `origin` → `https://github.com/ashh0413/veekay.git` (fetch + push) |
| Branch | `main` (only local branch; tracks `origin/main`) |
| Last commit | `8842ef7` — "fix(layout): raise nav drawer breakpoint to 960px…"; local HEAD matches `origin/main`; 26 commits total, from "first commit" |
| CI / release tooling | None in the repo (no `.github/`, no workflow files, no README, no `.gitignore`) |
| How it deploys | **Unverified from the repo** — no deploy configuration exists in-repo. The site is fully static, so any static host (GitHub Pages, a plain web server) can serve it; the likely flow is edit → commit → push to `main` → host the files. Confirm with the owner which host serves production. No ports, servers, or deploy scripts are defined in the repo. |

Practical editing rules given this setup:
- Pushes go to a single `main` branch; there is no PR/CI gate to satisfy.
- Because nothing is minified or bundled, any file edit deploys as-is; bump the
  existing `?v=` cache-buster query strings when you change CSS/JS.
- Image-heavy: `assets/` is ~24 MB; keep new photos compressed (WebP is already
  used for several originals).

Last updated: 2026-11-15

**Sources:** `index.html`, `products.html`, `machine.html`, `about.html`,
`contact.html`, `enquiry.html` (structure, nav links, script tags, anchors),
`js/data.js` (full), `js/app.js` (full), `js/theme-toggle.js` (full),
`js/apple-nav.js`, `js/motion.js`, `js/showroom-3d.js` (partial),
`js/vendor/three.min.js` (license header), `css/style.css`,
`css/apple-design-system.css`, `css/showroom-3d.css` (line counts, `:root`),
`git remote -v`, `git log` (26 commits), directory listing of `assets/img/`,
`.impeccable/hook.cache.json` (header only).
