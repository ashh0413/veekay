# Product Data & Catalog

All product content on the Vee Kay site is driven by one plain-JavaScript data
file loaded on every page. There is no backend, CMS, or build step — edit the
data file and the catalog, spec sheets, and enquiry form update automatically.

## Data file location and top-level variables

The single source of truth is `js/data.js` (240 lines). It is loaded via
`<script src="js/data.js?v=2"></script>` in `index.html`, `products.html`,
`machine.html`, `about.html`, `contact.html`, and `enquiry.html`.

Top-level variables defined in `js/data.js` (all `const`):

| Variable | Type | Meaning |
|----------|------|---------|
| `O`  | string | Path prefix `"assets/img/original/"` — original product photos |
| `P`  | string | Path prefix `"assets/img/products/"` — small/misc product shots |
| `PI` | string | Path prefix `"assets/img/products-items/"` — item-specific renders |
| `C`  | string | Path prefix `"assets/img/curated/"` — curated/edited imagery |
| `PRODUCTS` | array | The full product catalog (29 records). Consumed by `js/app.js` and `machine.html`. |
| `CLIENTS` | array | 8 client-logo image paths (`assets/img/products/1.png` … `8.png`). Rendered into the client marquee by the inline script in `index.html` (`#clients`), which clones the set for a seamless loop. |

Note: there is no `BRANDS` variable — the client marquee is fed by `CLIENTS`.
The 3D showroom uses its own separate, hand-maintained catalog
(`SHOWROOM_PRODUCTS` in `js/showroom-3d.js`, 3 procedural machines), which is
independent of `PRODUCTS` and not documented here.

## Product record schema: every field and its meaning

Each entry in `PRODUCTS` is a flat object. Fields:

| Field | Required | Meaning |
|-------|----------|---------|
| `name` | yes | Display name of the machine/product. Also the deep-link key for `machine.html?m=` and the showroom `?m=`/`?machine=` lookup (URL-encoded). |
| `cat` | yes | Category string. Must match one of the keys in `CATEGORIES` (`js/app.js`): `Solvent`, `UV`, `Textile`, `Sublimation`, `CNC / Laser`, `Consumables`. Drives the filter pills and the deep-link hash map. |
| `flagship` | no | Boolean. When present/true the card shows a "Flagship Model" pill, gets the `is-flagship` class, and "featured" sort floats it to the top. 6 of 29 records set it. |
| `blurb` | yes | One-line description shown on the card and searched by the catalog filter box. |
| `img` | yes | Image path, built from the `O`/`P`/`PI`/`C` prefixes. If falsy the card shows an "IMAGE PENDING" placeholder. |
| `spec` | optional | Object of key/value spec rows. Keys vary by product (e.g. `Head`, `Ink`, `Width`, `Speed`, `Bed`, `Power`, `Type`, `Drum`). The card shows the first 3 as chips; `machine.html` renders all of them. A record may omit `spec` entirely. |
| `detail` | optional | Longer prose shown in `machine.html` (`#md-detail`); hidden when absent. No current record in `js/data.js` defines `detail`, but the page code reads it. |

The "reference number" shown on cards (`REF · VKE-NNN`) is **not stored** in
the data — it is computed in `js/app.js` as `PRODUCTS.indexOf(p) + 1`,
zero-padded to 3 digits. So it is order-dependent: inserting a record renumbers
every later item's REF. `machine.html` computes the same REF for the detail view.

## Full product table

Counts verified against `js/data.js` (240 lines): **29 products total, 6
flagships.** Category breakdown: Solvent 7, Textile 8, UV 6, Sublimation 2,
CNC / Laser 4, Consumables 2. Every `img` path below was confirmed to exist on
disk.

| # | name | category | flagship | image file (repo-relative) |
|---|------|----------|:--:|------------------------------|
| 1 | Colorjet Irisjet Pro | Solvent | * | `assets/img/original/mimaki-swj-320ea.png` |
| 2 | VK JET 3500 | Solvent | * | `assets/img/products-items/VK-JET-3500.png` |
| 3 | Q Jet Plus 1024 | Solvent | | `assets/img/products-items/Q-Jet-Plus-1024.png` |
| 4 | E Jet V0 | Solvent | | `assets/img/products-items/E-Jet-V0.png` |
| 5 | FLEX Industrial 3200 | Solvent | | `assets/img/curated/solvent_machine_roll.jpg` |
| 6 | Konica 512i 8-Head Pro | Solvent | | `assets/img/original/mimaki-sij-320uv.png` |
| 7 | Mimaki Roll Flex Pro | Solvent | | `assets/img/original/mimaki-ujv100-160plus.png` |
| 8 | Vega 3180S Direct | Textile | * | `assets/img/original/VKE-3208 TX.webp` |
| 9 | Vega 3180DL Dual-Line | Textile | | `assets/img/original/VKE-2008A TX.webp` |
| 10 | E Jet V2 Textile | Textile | | `assets/img/original/V1804E.png` |
| 11 | E Jet V25 Industrial | Textile | | `assets/img/original/V1808E.png` |
| 12 | Ts Jet V2 Apparel | Textile | | `assets/img/original/mimaki-ts100-160.png` |
| 13 | T Jet Fabric Pro | Textile | | `assets/img/original/YSR-3224.png` |
| 14 | E Press Machine | Textile | | `assets/img/products-items/E-Press-machine.png` |
| 15 | Carpet & Bed-Sheet Digital | Textile | | `assets/img/original/ysr-sdf-carpet.png` |
| 16 | DOCAN H1600M UV Flatbed | UV | * | `assets/img/original/mimaki-jfx200-2513ex.png` |
| 17 | DOCAN UV Flatbed 2513 Ultra | UV | | `assets/img/original/mimaki-jfx200-2531.png` |
| 18 | DOCAN H3000M Heavy Hybrid | UV | | `assets/img/original/mimaki-uj330h-160.png` |
| 19 | M Jet Industrial UV | UV | | `assets/img/original/flatbed-gen6.png` |
| 20 | 6090 UV Desktop Flatbed | UV | | `assets/img/products/uv-small.jpg` |
| 21 | UV DTF Transfer System | UV | | `assets/img/curated/uv_signage.jpg` |
| 22 | VK-JET 180K-S Sublimation | Sublimation | * | `assets/img/original/mimaki-ts100-160.png` |
| 23 | 8-Head i3200 Subli-Master | Sublimation | | `assets/img/original/V1808E.png` |
| 24 | CNC Router 1325 Heavy Bed | CNC / Laser | * | `assets/img/curated/cnc_router_hd.jpg` |
| 25 | Fiber Laser Metal Cutter 3015 | CNC / Laser | | `assets/img/curated/laser_metal.jpg` |
| 26 | CO2 Laser Cutter 1390 | CNC / Laser | | `assets/img/curated/laser_cutting.jpg` |
| 27 | Automatic Channel Letter Bender | CNC / Laser | | `assets/img/curated/cnc_router.jpg` |
| 28 | Certified Industrial Print Heads | Consumables | | `assets/img/curated/print_head.jpg` |
| 29 | Original High-Density OEM Inks | Consumables | | `assets/img/original/Sublimation_Ink_by_Veekay_Enteprises_c375aef0.png` |

Legend: `*` = flagship. All 29 records define a `spec` object. `spec` keys
differ by product and are not standardized (e.g. `Heads`/`Type`/`Spindle`/
`Power`, `Width` vs `Bed` vs `Drum`).

## Deep-linking: URL params and hashes the pages understand

Verified in `js/app.js`, `machine.html`, and `js/showroom-3d.js`.

| Param / hash | Page | Effect |
|--------------|------|--------|
| `?m=<ProductName>` | `machine.html` | Inline script in `machine.html` looks up `PRODUCTS` by exact `name` (whitespace-tolerant), renders that machine's spec sheet. Falls back to `PRODUCTS[0]` if not found. The name is URL-encoded (spaces → `%20`). |
| `?machine=<ProductName>` | `enquiry.html` | `js/app.js` pre-selects the `#machine` dropdown to the matching product name (exact match against option text). |
| `#solvent`, `#uv`, `#textile`, `#sublimation`, `#cnc`, `#consumables` | `products.html` | `js/app.js` maps the lowercased hash to a `CATEGORIES` key and activates that filter pill on load. The nav flyouts link to these (e.g. `products.html#uv`). |
| `#showroom-3d-stage` | `products.html` | Anchor to the 3D showroom section (in-page scroll target `id="showroom-3d-stage"`). |
| `?m=<key>` / `?machine=<key>` | `products.html` (showroom) | `js/showroom-3d.js` reads `?m` then `?machine` and loads the matching 3D model from `SHOWROOM_PRODUCTS` (keys: `VK JET 3500`, `Vega 3180S`, `DOCAN H1600M`); defaults to `VK JET 3500`. |

Notes:
- `machine.html?m=` and `enquiry.html?machine=` use the **PRODUCTS `name`**
  field; `products.html` 3D links use the **SHOWROOM key** field. These are two
  different naming sets — a mismatch means the 3D view falls back to
  `VK JET 3500`.
- The `#cnc` hash maps to the category string `CNC / Laser` (the `cat` value,
  which contains a slash and spaces), handled inside the `map` object in
  `js/app.js`.

## How to add, edit, or remove a product

**Add a product**

1. **Image asset:** drop the photo into `assets/img/original/` (most
   machine shots live here), or `assets/img/products-items/`,
   `assets/img/curated/`, or `assets/img/products/`. Filenames may contain
   spaces (e.g. `VKE-3208 TX.webp` is existing).
2. Open `js/data.js`. Insert a new object inside the `PRODUCTS` array, grouped
   under the matching section comment (`/* ---- Roll-to-Roll Solvent ---- */`,
   `/* ---- Digital Textile ---- */`, etc.).
3. Fill the fields: `name` (unique — it's the deep-link key), `cat` (one of the
   6 valid values), `blurb`, `img` (use the `O + "..."` / `PI + "..."` /
   `C + "..."` / `P + "..."` prefix form), and a `spec` object with 3+ rows so
   the card shows spec chips. Optionally `flagship: true` and `detail: "..."`.
4. Bump the cache-buster: the script is referenced as `js/data.js?v=2` in all
   6 pages. Increase `?v=` (e.g. `?v=3`) in each page, or the browser may serve
   the stale data.
5. Nothing else to update: filter pills, search, the `machine.html` spec sheet,
   and the `enquiry.html` dropdown all read from `PRODUCTS` at runtime.

**Edit a product**

- Change `name`, `cat`, `blurb`, `img`, or `spec` directly in the record in
  `js/data.js`. Bump the `?v=` cache-buster in all 6 pages.
- Renaming `name` breaks any `machine.html?m=<old>` / `enquiry.html?machine=<old>`
  deep links and, if the product is a showroom model, the 3D link. Update those
  links (they appear in `products.html` flyouts and the card CTA, which is
  generated from `name` automatically).
- Renumbering: because REF is computed from array position, an edit that
  inserts/removes before an item shifts every later REF. If stable REF numbers
  matter, keep the target record's position or accept the shift.

**Remove a product**

1. Delete the record from the `PRODUCTS` array in `js/data.js`.
2. If the image file is referenced nowhere else, you may delete the asset in
   `assets/img/` (grep the repo for the filename first).
3. Bump the `?v=` cache-buster in all 6 pages.
4. Any `products.html` flyout or external link pointing to `machine.html?m=`
   the removed name will silently fall back to `PRODUCTS[0]` — update or remove
   those links.

---

Last updated: 2026-11-15

## Sources

- `js/data.js` — `O`/`P`/`PI`/`C` prefixes, `PRODUCTS` (29), `CLIENTS` (8)
- `js/app.js` — `CATEGORIES` keys, filter/search/sort logic, REF computation, hash deep-link map, enquiry `?machine=` preselect, catalog CTA link generation
- `machine.html` — inline spec-sheet script (`?m=` lookup, `#md-*` DOM fields, `detail` handling, "View in 3D" button)
- `js/showroom-3d.js` — `SHOWROOM_PRODUCTS` (3) and `?m=`/`?machine=` showroom lookup
- `index.html` — client marquee inline script (`#clients`, `CLIENTS`)
- `products.html` — nav/flyout hash links (`#solvent`, `#uv`, …) and `?m=` deep links
- `assets/img/**` — image existence verified for all 29 records
