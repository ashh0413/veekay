# Design System & Styling — Vee Kay Enterprises

Static industrial showcase site. Two CSS layers: `css/style.css` (industrial base: dark bg, orange accent) and `css/apple-design-system.css` (the dominant "Apple hardware showcase" skin — all pages use the `apple-*` class set). A third sheet, `css/showroom-3d.css`, is products-only.

## 1. CSS file inventory and load order

| File | Lines | Purpose | Loaded on |
|---|---|---|---|
| `css/style.css?v=apple1` | 1,431 | Base layout, legacy industrial tokens (`--bg-dark`, `--orange`), `.grid`/`.card`/`.md-grid` utilities | all 6 pages |
| `css/showroom-3d.css?v=apple1` | 820 | 3D showroom stage styles (`apple-machine-*`, controls, search) | `products.html` only |
| `css/apple-design-system.css?v=apple1` | 2,245 | Frosted nav, hero, pill buttons, cards, footer, grids, light-theme overrides | all 6 pages |
| Google Fonts | — | Inter 400–800 + Space Mono 400/700 (`<link>` in every page head) | all 6 pages |

Standard per-page order: `style.css` → (`showroom-3d.css` on products.html) → `apple-design-system.css`. The `apple-*` sheet loads last so it wins on conflicts.

JS (end of body): `js/data.js?v=2` → `js/app.js?v=2` → `js/vendor/three.min.js` + `js/vendor/OrbitControls.js` + `js/showroom-3d.js?v=1` (products.html only) → `js/apple-nav.js?v=1` → `js/theme-toggle.js`. `js/motion.js` exists in the repo but is not referenced by any HTML page (unverified: possibly unused legacy).

## 2. Design tokens: key CSS custom properties

Tokens live in two `:root` blocks:

| Variable | Value | Where |
|---|---|---|
| `--apple-black` | `#000000` | apple-design-system.css:8 |
| `--apple-dark-surface` | `#121214` | apple-design-system.css:11 |
| `--apple-dark-elevated` | `#1d1d1f` | apple-design-system.css:12 |
| `--apple-light-bg` | `#f5f5f7` | apple-design-system.css:13 |
| `--apple-nav-bg` | `rgba(22,22,23,0.82)` | apple-design-system.css:17 |
| `--apple-nav-height` | `44px` | apple-design-system.css:36 |
| `--apple-ribbon-height` | `52px` | apple-design-system.css:37 |
| `--apple-radius-pill` | `999px` | apple-design-system.css:38 |
| `--apple-radius-card` | `28px` | apple-design-system.css:39 |
| `--apple-radius-modal` | `20px` | apple-design-system.css:40 |
| `--apple-blue` / `-hover` / `-active` | `#0071e3` / `#0077ed` / `#006edb` | apple-design-system.css:27–29 |
| `--apple-link` | `#2997ff` | apple-design-system.css:30 |
| `--apple-orange` | `#ff453a` | apple-design-system.css:31 |
| `--apple-font` | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue", sans-serif` | apple-design-system.css:33 |
| `--apple-mono` | `"SF Mono", "Space Mono", Menlo, ui-monospace, monospace` | apple-design-system.css:34 |
| `--bg-dark` | `#0a0b0e` | style.css:16 |
| `--orange` / `--orange-bright` / `--orange-dark` | `#f44825` / `#ff5b3d` / `#d63717` | style.css:26–28 |
| `--accent` | `#ff3b19` | style.css:48 |
| `--text-primary` / `--text-dim` / `--text-muted` | `#f3f4f6` / `#9ca3af` / `#6b7280` | style.css:40–42 |
| `--t-hero` | `clamp(38px, 4.6vw, 68px)` | style.css:59 |
| `--t-h2` | `clamp(28px, 3.4vw, 48px)` | style.css:60 |
| `--nav-height` | `72px` | style.css:1244 |
| `--glass-bg` | `rgba(10,11,14,0.78)` | style.css:1246 |
| `--card-glass` / `--card-border` | `rgba(255,255,255,0.024)` / `rgba(255,255,255,0.07)` | style.css:1248–1249 |

Two distinct accent oranges coexist: legacy `--orange: #f44825` (style.css) and `--apple-orange: #ff453a` (apple sheet). Both are in use; treat `#ff453a` as the current showcase accent.

## 3. Dark/light theming

- **Default is dark.** A hydration one-liner in every page head sets `data-theme` on `<html>` before first paint:
  `(function(){var t=localStorage.getItem("veekay-theme")||"dark";document.documentElement.setAttribute("data-theme",t);})();`
- **`js/theme-toggle.js`** owns the rest: reads/writes `localStorage["veekay-theme"]` ("dark"/"light"), applies `data-theme` on load and re-applies on `DOMContentLoaded`, and wires every `.apple-theme-toggle` button (sun/moon SVG swap + aria-label).
- **Light theme** is implemented as a token override block `[data-theme="light"]` at apple-design-system.css:2000 (flips `--apple-black` to `#ffffff`, `--apple-text-white` to `#1d1d1f`, nav to white glass, etc.) plus component-level `[data-theme="light"] .apple-*` rules throughout the file. `style.css` contains no `data-theme` rules — the legacy layer stays dark in light mode (unverified: whether all legacy sections are covered).
- `body` carries class `apple-theme` on all pages.

## 4. Breakpoints and responsive behavior

All max-width queries found in the three sheets:

| Query | File(s) | Effect (main ones) |
|---|---|---|
| `@media (prefers-reduced-motion: reduce)` | style.css:10 | disables all transitions/animations |
| `max-width: 1080px` | showroom-3d.css:790 | 3D stage layout adjustments |
| `max-width: 1024px` | apple sheet:970, 1769, 1790 | bento grid → 1 col; footer nav → 3 cols; product grid → 2 cols; facility grid → 1 col; SLA grid → 2 cols |
| `max-width: 960px` | style.css:1162; apple sheet:989 | all `.grid`/`.md-grid`/`.cap-grid` collapse to 1 col; metric blocks stack; nav links hidden, burger shown |
| `max-width: 900px` | style.css:1338 | `.md-grid` forced 1 col, `.md-specs` un-sticks |
| `max-width: 820px` | apple sheet:1802 | contact grid, form rows, machine grid → 1 col |
| `max-width: 768px` | apple sheet:998, 1940 | burger nav, footer 2 cols, specs strip stacks; ribbon scroll, 16px form inputs (prevents iOS zoom), compact hero/cards/buttons |
| `max-width: 640px` | apple sheet:1774; showroom:799 | product grid 1 col; controls stack; search box full width |
| `max-width: 480px` | apple sheet:1017 | footer 1 col; CTA cluster stacks, pill buttons full width |

## 5. Shared visual components

| Component | Class(es) | Defined | Used on |
|---|---|---|---|
| Frosted global nav (44px) | `.apple-global-nav`, `.apple-nav-links`, `.apple-icon-btn`, `.apple-mobile-burger`, `.apple-flyout-overlay` | apple sheet:54–345 | all 6 pages (once each) |
| Category ribbon bar (52px) | `.apple-ribbon-bar`, `.apple-ribbon-item` | apple sheet:348–411 | index/products |
| Hero | `.apple-hero-flagship`, `.apple-hero-title`, `.apple-cta-cluster` | apple sheet:413–467 | index |
| Pill buttons | `.apple-btn-pill-primary` / `-secondary` | apple sheet:468–515 | all pages (9× index, 6× products, 5× about/machine, 3× contact, 2× enquiry) |
| Specs strip | `.apple-specs-strip` | apple sheet:588 | index |
| Bento card grid | `.apple-bento-grid` (2-col), `.apple-bento-card` (+ `.card-studio-light` / `.card-obsidian-dark` variants) | apple sheet:629–700 | index |
| App cards | `.apple-app-cards-grid` (4-col) | apple sheet:755 | index |
| Product cards | `.apple-product-grid` (3-col) + `.apple-product-card` (bg `#161617`, 22px radius) | apple sheet:1559+ | products.html |
| Generic surface card | `.apple-surface-card` | apple sheet:1102 | about, contact, machine |
| Global footer | `.apple-footer-global`, `.apple-footer-nav-grid` | apple sheet:888–945 | all 6 pages |
| Legacy industrial cards | `.grid` (3-col), `.card`, `.card.flagship`, `.md-grid` | style.css:645–760, 1078 | definitions exist but no page currently uses `class="grid"`/`class="card"` (0 hits); superseded by apple-* components |
| 3D showroom | `.apple-machine-*`, `.apple-controls-top`, `.apple-search-box` | showroom-3d.css + apple sheet:1450 | products.html |

## 6. Typography and color palette summary

**Typefaces** (loaded from Google Fonts): Inter (400/500/600/700/800) + Space Mono (400/700). `--apple-font` prefers system SF Pro before Inter, so on Apple devices SF Pro renders; elsewhere Inter. Monospace accents use `--apple-mono`.

**Type scale in use:**

| Role | Size / weight |
|---|---|
| Hero title `.apple-hero-title` | `clamp(40px, 5.6vw, 74px)`, 700, `letter-spacing: -0.028em`, line-height 1.05 |
| Hero subhead | `clamp(18px, 2.1vw, 26px)`, 400, `#a1a1a6` |
| Nav link | 12px, `-0.01em` tracking |
| Eyebrow / kicker | 11–11.5px, `0.08em` tracking, uppercase |
| Legacy hero `.hero-axis h1` | `--t-hero: clamp(38px, 4.6vw, 68px)` |
| Card title | 18px, 700 |
| Body | `--t-body: 14.5px` (legacy) / 13.5px card copy |

**Palette:**

| Token / value | Role |
|---|---|
| `#000000` (`--apple-black`) | dark page background (true black, hardware-showcase look) |
| `#121214` / `#1d1d1f` | dark surface / elevated |
| `#161617` | product card background |
| `#f5f5f7` / `#ffffff` | light-theme background / cards |
| `#f5f5f7` / `#1d1d1f` | dark-mode text / light-mode text |
| `#a1a1a6` / `#6e6e73` | dim text (dark / light) |
| `#0071e3` (+ `#0077ed` hover, `#2997ff` links) | Apple blue — primary pill buttons |
| `#ff453a` (`--apple-orange`) | showcase accent |
| `#f44825` / `#ff3b19` (`--orange`, `--accent`) | legacy industrial orange accents, focus outlines |

Rounding language: pills `999px`, cards `28px`, modals `20px`, product cards `22px`.

Last updated: 2026-11-15

Sources: `css/style.css`, `css/apple-design-system.css`, `css/showroom-3d.css`, `js/theme-toggle.js`, `js/app.js` (load order), `index.html`, `products.html`, `about.html`, `contact.html`, `enquiry.html`, `machine.html`.
