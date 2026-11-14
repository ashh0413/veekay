# Client Behavior & Scripts

Vee Kay Enterprises site (static, no build step, no backend). This doc covers every script
the pages execute and what each one does.

## JS file inventory

| File | Lines | What it does | Loaded on |
|------|-------|--------------|-----------|
| `js/data.js` | 240 | Defines global `PRODUCTS` (29 items), `CLIENTS` (8 logo paths), and image-path consts `O`, `P`, `PI`, `C`. No DOM logic. | All 6 pages |
| `js/app.js` | 242 | Catalog grid (filter/search/sort), category pills, hash deep-links, enquiry form (dropdown + submit), scroll-reveal IntersectionObserver, burger toggle, tactile press animation. | All 6 pages |
| `js/apple-nav.js` | 146 | Nav flyout controller: hover mega-menus, close-timer debounces, dimmer, Escape, mobile drawer. | All 6 pages |
| `js/theme-toggle.js` | 40 | Dark/light theme: localStorage key `veekay-theme`, default `dark`, sets `data-theme` on `<html>`, swaps sun/moon SVG on `.apple-theme-toggle` buttons. | All 6 pages |
| `js/showroom-3d.js` | 1034 | 3D showroom engine: procedural Three.js machines, OrbitControls, camera presets, exploded view, screen-projected hotspots, datasheet modal, WebGL fallback. | `products.html` only |
| `js/vendor/three.min.js` | 6 | Vendored Three.js r1xx minified build (single file, local — no CDN). | `products.html` only |
| `js/vendor/OrbitControls.js` | 1045 | Three.js `THREE.OrbitControls` (drag/zoom/pan) vendored locally. | `products.html` only |
| `js/motion.js` | 91 | Lenis inertia scroll + GSAP reveals + View-Transitions page fades. **Not referenced by any HTML page** — dead/unused as of this doc. | None (unverified if intended for future pages) |

Per-page inline scripts:

| Page | Inline script |
|------|---------------|
| all 6 pages | head snippet: applies `veekay-theme` from localStorage before paint to avoid theme flash |
| `index.html` | renders `CLIENTS` logo marquee into `#clients` (duplicated track + `aria-hidden` clone) |
| `machine.html` | reads `?m=` param, looks up product in `PRODUCTS` (fallback to `PRODUCTS[0]`), fills `#md-*` spec fields, sets title, builds `enquiry.html?machine=` and `products.html?m=...#showroom-3d-stage` links |

Scripts load at end of `<body>` in order: `data.js` → `app.js` → (`showroom-3d.js` on products) → `apple-nav.js` → `theme-toggle.js`. Cache-bust query strings: `?v=2` on data/app, `?v=1` on apple-nav/showroom-3d, none on theme-toggle or vendors.

## Navigation controller (`js/apple-nav.js`)

State: `activeFlyout`, `activeNavItem`, `closeTimer`.

| Event | Behavior |
|-------|----------|
| `mouseenter` on `.apple-nav-item[data-flyout]` | Opens its flyout instantly via `switchFlyout`; other open flyouts close immediately (no timer between two flyouts) |
| `click` on flyout nav item | Toggles (for touch devices). If already active, default link navigation proceeds; otherwise `preventDefault` + open |
| `mouseenter` on non-flyout nav items (logo, actions, plain items) | `queueClose(150)` — 150 ms grace before closing |
| `mouseenter` inside open flyout overlay | Cancels the close timer |
| `mouseleave` from flyout overlay | `queueClose(250)` |
| `mouseleave` from `.apple-global-nav` | `queueClose(250)` unless `relatedTarget` is inside `.apple-flyout-overlay` (moving down into the panel keeps it open) |
| click on `#apple-nav-dimmer` | Closes immediately |
| `Escape` | Closes all flyouts |

**Debounce values: 250 ms** (default `queueClose` delay, overlay leave, nav leave) and **150 ms** (moving onto a non-flyout item).

Mobile drawer (`#apple-mobile-burger` → `#apple-mobile-drawer`):
- Toggle adds `.open` to drawer + burger; sets `document.body.style.overflow = 'hidden'` while open, `''` when closed.
- Clicking any `.apple-mob-link` or `.apple-btn-pill-primary` inside the drawer closes it and restores scroll.
- Drawer markup is `role="dialog" aria-modal="true" aria-label="Mobile Navigation"`.
- No focus trap and no auto-focus of the first link (unverified as a limitation — see §6).

Nav items with flyouts: `data-flyout="flyout-solvent"`, `flyout-uv`, `flyout-textile`, `flyout-cnc`, `flyout-tech` (5 mega-menus); the 3D Showroom link and logo/actions have no flyout.

## Catalog engine (`js/app.js` + `js/data.js`)

Only active when `#product-grid` exists (i.e., `products.html`).

State variables (module-scoped):

```js
var activeCat = "all";      // category key
var activeQuery = "";       // raw search input
var activeSort = "featured"; // "featured" | "name-asc" | "cat"
```

**Categories** (`CATEGORIES`, 6 + "All Platforms"):

| key | label | products |
|-----|-------|----------|
| `all` | All Platforms | 29 |
| `Solvent` | Roll-to-Roll | 7 |
| `Textile` | Digital Textile | 8 |
| `UV` | Flatbed UV | 6 |
| `Sublimation` | Sublimation | 2 |
| `CNC / Laser` | CNC & Laser | 4 |
| `Consumables` | Heads & Inks | 2 |

Counts are computed from `PRODUCTS` at render time; flagship products: 6 total.

**Filter logic** (`renderCatalog`): case-insensitive substring match of the query against `name`, `cat`, `blurb`, and `JSON.stringify(spec)`; ANDed with the active category.

**Sort**: `featured` = flagship items first (stable within group); `name-asc` = `localeCompare` on name; `cat` = `localeCompare` on category.

**UI**:
- `#cat-pills` re-renders as buttons with live counts and `.active` state.
- `#catalog-status` text: "Showing N of 29 industrial platforms".
- Empty result renders "No matching industrial platforms found" + a `#reset-catalog-btn` that clears `activeCat`/`activeQuery` and re-renders.
- Card CTA links: `machine.html?m=<name>` (specs) and `enquiry.html?machine=<name>` (quote), both URL-encoded.
- Reference codes are positional: `REF · VKE-001…029` (`PRODUCTS.indexOf(p) + 1`, zero-padded to 3).

**Deep links**: `products.html#uv` / `#solvent` / `#textile` / `#sublimation` / `#cnc` / `#consumables` pre-select the matching pill (lowercase `location.hash` mapped to category keys).

## Enquiry / form handling (`js/app.js` + `enquiry.html`)

Form `#enquiry-form`, fields: `name*`, `company`, `phone*` (tel), `email*`, `city`, `machine` (select), `msg`, plus `#form-status` output. `*` = required.

- **Machine dropdown**: populated from `PRODUCTS`; first option "No machine in mind — advise". If `?machine=` matches an option text, it is preselected.
- **Submit path 1 — default (current state):** `FORM_ID` is still the placeholder `"YOUR_FORMSPREE_ID"`, so submit is intercepted, the fields are formatted into a mail body, and the browser opens `mailto:sales@veekayent.com?subject=Enquiry — <machine|Vee Kay>&body=<field dump>`. Status text: "Opening your email app to send this to sales@veekayent.com…".
- **Submit path 2 — when a Formspree ID is pasted in:** `fetch POST` to `https://formspree.io/f/<ID>` with the `FormData`, `Accept: application/json`. Status messages: success ("Enquiry sent — we'll reply within one working day."), failure ("Send failed, try again or call 1800-2000-964.") and network error ("Network error, call 1800-2000-964.").

Note: no server-side handling; the static site relies on the Formspree placeholder being filled in or the mailto fallback.

## WebGL / 3D showroom engine (`js/showroom-3d.js`)

- **Vendors (all local):** `js/vendor/three.min.js` (Three.js), `js/vendor/OrbitControls.js` (`THREE.OrbitControls`). GSAP is *optionally* used if `window.gsap` exists, but no page loads GSAP — every GSAP call has a synchronous fallback (`camera.position.set`, direct `position.set`).
- **Init (`initShowroom` on DOMContentLoaded):** guarded by `#showroom-3d-stage` presence → `hasWebGL()` probe (`getContext("webgl") || "experimental-webgl"`) → static fallback card ("3D WebGL Acceleration Unavailable" + enquiry link) if unavailable.
- **Scene:** background/fog `0x090e13`, `FogExp2` 0.05, perspective camera 40°, `WebGLRenderer({ antialias: true, powerPreference: "high-performance" })`, pixel ratio capped at 2, ACES tone mapping (exposure 1.15), PCF soft shadows, cyan industrial grid (24×48) + metallic floor + ring marking.
- **Models:** three procedural machine builders — `buildVKJet3500`, `buildVega3180S`, `buildDocanH1600M` — each returning `{ root, parts }` where `parts` carry `expOffset` vectors used by the exploded view. Unknown product keys default to the VK JET 3500 model.
- **Data:** `SHOWROOM_PRODUCTS` (3 machines: VK JET 3500, Vega 3180S, DOCAN H1600M) holds specs + hotspot definitions (`pos`, `kicker`, `desc`, `spec`). Hotspots are DOM pins repositioned per-frame via `Vector3.project(camera)` (hidden when `z > 1`, i.e., behind camera).
- **Controls:** OrbitControls damping 0.06, min/max distance 3.5/15, polar clamp just above the floor. View presets: `iso`, `front`, `side`, `rear`, `top` (animated over 1.1 s when GSAP is present, instant otherwise).
- **Features:** exploded-view toggle (parts move to their `expOffset`, 1.2 s), hotspot toggle, fullscreen card (`.sr-viewer-card.fullscreen` + `sr-fullscreen-active` on body), spec HUD panel (`#sr-spec-panel`), datasheet modal (`#sr-datasheet-modal`) with print-oriented content, quote button rewriting to `enquiry.html?machine=<name>`.
- **URL param:** `?m=` or `?machine=` preselects a machine at load (values must match `SHOWROOM_PRODUCTS` keys, e.g. `machine.html` links with `products.html?m=VK JET 3500#showroom-3d-stage`; `machine.html` builds one such link per product (`machine.html:445`, `products.html?m=<name>#showroom-3d-stage`); of the 29 `data.js` names, only `VK JET 3500` matches a showroom key, so the other 28 fall back to the default VK JET 3500 model).
- **Render loop:** `requestAnimationFrame` + `THREE.Clock`; auto-rotate flag exists (`autoRotate`, 0.15 rad/s) but is never set true by any UI control (unverified — no toggle found in HTML).

## Touch / accessibility safeguards

| Area | What is in place |
|------|------------------|
| Reduced motion | `css/style.css` lines 10–12: `prefers-reduced-motion: reduce` kills all transitions, animations, and smooth scrolling. `js/motion.js` also gates on this (plus a `?motion=1` opt-in), but motion.js is not currently loaded (see inventory). |
| Focus | `:focus-visible` gets a 2 px `--orange` outline (`css/style.css` line 5); links/buttons inherit a brighter variant. |
| Touch targets | `.apple-mobile-burger` 44×44 px min; `.apple-mob-link` 48 px min-height; `.apple-search-box` 44 px min-height; pill buttons ≥ 40 px min-height (40 px at one spot — below the 44 px guideline, `css/apple-design-system.css` line 1507). |
| Semantics | Nav uses `role="menubar"`/`menuitem`; mobile drawer is `role="dialog" aria-modal="true"`; nav items carry `aria-label`s (burger, logo link). Marquee clone is `aria-hidden`. |
| Images | Product card images use `loading="lazy"`; alt text = product name. |
| Reveal safety | IntersectionObserver reveals add `.in` on intersect (threshold 0.12) with a 2.5 s timeout that force-shows everything so content can never stay hidden. |
| Form UX | `autocomplete` attrs (name/organization/tel/email), `required` on name/phone/email, status messages exposed via `#form-status`. |

Known gaps: no skip-to-content link, no focus trap / focus restore inside the mobile drawer dialog, `aria-expanded` not toggled on the burger button (unverified against spec, but the attributes aren't present in the markup).

Last updated: 2026-11-15

## Sources

- `js/app.js`, `js/apple-nav.js`, `js/data.js`, `js/theme-toggle.js`, `js/showroom-3d.js`, `js/motion.js`
- `index.html`, `about.html`, `contact.html`, `enquiry.html`, `machine.html`, `products.html` (script tags, inline scripts, nav/drawer markup, form fields)
- `css/style.css` (lines 1–60, reduced-motion + focus rules), `css/apple-design-system.css` (touch-target sizes)
