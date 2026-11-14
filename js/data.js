/* VEE KAY product data — names + specs from veekayent.com / veekaydigital.in.
   Mapped with authentic original product photography across all platforms. */
const O = "assets/img/original/";
const P = "assets/img/products/";
const PI = "assets/img/products-items/";
const C = "assets/img/curated/";

const PRODUCTS = [
  /* ---- Roll-to-Roll Solvent ---- */
  {
    name: "Colorjet Irisjet Pro",
    cat: "Solvent",
    flagship: true,
    blurb: "Flagship textile & banner production. 16 Kyocera heads, 360 m²/hr continuous output.",
    img: O + "mimaki-swj-320ea.png",
    spec: { Heads: "16 Kyocera KJ4B", Ink: "Solvent / Disperse CMYK", Width: "3.2 m", Resolution: "600×1800 dpi", Speed: "360 m²/hr (1-pass)" }
  },
  {
    name: "VK JET 3500",
    cat: "Solvent",
    flagship: true,
    blurb: "Workhorse industrial wide-format solvent line. High-speed flex, vinyl, and mesh.",
    img: PI + "VK-JET-3500.png",
    spec: { Heads: "Konica 512i / 1024i", Ink: "Solvent CMYK", Width: "3.2 m", Resolution: "180–720 dpi", Speed: "1,300 sq ft/hr (8-head)" }
  },
  {
    name: "Q Jet Plus 1024",
    cat: "Solvent",
    blurb: "Heavy-duty steel bed solvent inkjet for high-volume outdoor flex and banner production.",
    img: PI + "Q-Jet-Plus-1024.png",
    spec: { Heads: "Konica 1024i (13pL)", Ink: "High-density Solvent", Width: "3.2 m", Speed: "950 sq ft/hr" }
  },
  {
    name: "E Jet V0",
    cat: "Solvent",
    blurb: "Compact footprint roll-to-roll solvent series for sign shops, vehicle wraps, and vinyl.",
    img: PI + "E-Jet-V0.png",
    spec: { Heads: "Epson i3200-E1", Ink: "Eco-Solvent", Width: "1.8 m", Speed: "450 sq ft/hr" }
  },
  {
    name: "FLEX Industrial 3200",
    cat: "Solvent",
    blurb: "Continuous outdoor flex and billboard line with dual infrared drying tunnels.",
    img: C + "solvent_machine_roll.jpg",
    spec: { Heads: "Konica 512i (30pL)", Ink: "Solvent CMYK", Width: "3.2 m", Speed: "1,100 sq ft/hr" }
  },
  {
    name: "Konica 512i 8-Head Pro",
    cat: "Solvent",
    blurb: "High-speed 8-head staggered gantry flex printer with Panasonic AC servo drives.",
    img: O + "mimaki-sij-320uv.png",
    spec: { Heads: "8× Konica Minolta 512i", Ink: "Solvent CMYK", Width: "3.2 m", Speed: "1,450 sq ft/hr" }
  },
  {
    name: "Mimaki Roll Flex Pro",
    cat: "Solvent",
    blurb: "Precision eco-solvent platform for indoor photographic vinyl and backlit film.",
    img: O + "mimaki-ujv100-160plus.png",
    spec: { Heads: "Piezo Dual Array", Ink: "Eco-Solvent CMYK", Width: "1.9 m", Resolution: "1440 dpi" }
  },

  /* ---- Digital Textile ---- */
  {
    name: "Vega 3180S Direct",
    cat: "Textile",
    flagship: true,
    blurb: "High-speed direct-to-fabric platform for natural silks, chiffon, cotton, and viscose.",
    img: O + "VKE-3208 TX.webp",
    spec: { Heads: "16 Kyocera KJ4B", Ink: "Reactive / Acid / Disperse", Width: "1.8 m", Speed: "320 m²/hr (2-pass)" }
  },
  {
    name: "Vega 3180DL Dual-Line",
    cat: "Textile",
    blurb: "Dual-line digital textile platform with continuous belt feed and automatic blanket washer.",
    img: O + "VKE-2008A TX.webp",
    spec: { Heads: "8× Kyocera Array", Ink: "Reactive / Disperse", Width: "1.8 m", Speed: "240 m²/hr" }
  },
  {
    name: "E Jet V2 Textile",
    cat: "Textile",
    blurb: "Entry-level digital textile inkjet for designer apparel collections and garment sampling.",
    img: O + "V1804E.png",
    spec: { Heads: "Epson i3200-A1", Ink: "Pigment / Reactive", Width: "1.8 m", Speed: "85 m²/hr" }
  },
  {
    name: "E Jet V25 Industrial",
    cat: "Textile",
    blurb: "Upgraded textile line with high-tension feed system for stretch fabrics and lycra.",
    img: O + "V1808E.png",
    spec: { Heads: "4× Epson i3200", Ink: "Disperse / Reactive", Width: "1.8 m", Speed: "160 m²/hr" }
  },
  {
    name: "Ts Jet V2 Apparel",
    cat: "Textile",
    blurb: "Second-generation high-speed direct garment and T-shirt roll platform.",
    img: O + "mimaki-ts100-160.png",
    spec: { Heads: "Ricoh Gen5", Ink: "Water-based Textile Pigment", Width: "1.6 m", Speed: "120 m²/hr" }
  },
  {
    name: "T Jet Fabric Pro",
    cat: "Textile",
    blurb: "Continuous textile inkjet with temperature-controlled heating bed and inline fixation.",
    img: O + "YSR-3224.png",
    spec: { Heads: "Kyocera KJ4B", Ink: "Reactive Dyes", Width: "2.2 m", Speed: "190 m²/hr" }
  },
  {
    name: "E Press Machine",
    cat: "Textile",
    blurb: "Industrial rotary heat transfer calendar press for roll-to-roll sublimation finishing.",
    img: PI + "E-Press-machine.png",
    spec: { Type: "Rotary Heat Press", Drum: "420 mm Oil Heated", Width: "1.8 m", Speed: "2.5 m/min" }
  },
  {
    name: "Carpet & Bed-Sheet Digital",
    cat: "Textile",
    blurb: "Extra-wide industrial platform engineered for heavy carpets, rugs, and bed-sheet widths.",
    img: O + "ysr-sdf-carpet.png",
    spec: { Heads: "32 Industrial Jetting Heads", Ink: "Acid / Reactive Dyes", Width: "3.4 m", Speed: "480 m²/hr" }
  },

  /* ---- Flatbed UV & Hybrid ---- */
  {
    name: "DOCAN H1600M UV Flatbed",
    cat: "UV",
    flagship: true,
    blurb: "High-speed UV hybrid platform. Direct printing on rigid acrylic, architectural glass, wood slabs.",
    img: O + "mimaki-jfx200-2513ex.png",
    spec: { Heads: "Ricoh Gen6 (5-15pL)", Ink: "LED UV Curable (CMYK+W+V)", Bed: "1.6m × 1.0m", Speed: "48 m²/hr" }
  },
  {
    name: "DOCAN UV Flatbed 2513 Ultra",
    cat: "UV",
    blurb: "Heavy 8×4 rigid bed UV printer for architectural glass, ACP, MDF, and stone tiles.",
    img: O + "mimaki-jfx200-2531.png",
    spec: { Heads: "Kyocera KJ4A / Ricoh Gen6", Ink: "LED UV (CMYK+White+Varnish)", Bed: "2.5m × 1.3m", Speed: "65 m²/hr" }
  },
  {
    name: "DOCAN H3000M Heavy Hybrid",
    cat: "UV",
    blurb: "Large-format hybrid platform with front/rear extension tables for rigid sheets and flexible rolls.",
    img: O + "mimaki-uj330h-160.png",
    spec: { Heads: "Ricoh Gen6 Array", Ink: "Flexible / Rigid UV", Width: "3.2 m", Speed: "85 m²/hr" }
  },
  {
    name: "M Jet Industrial UV",
    cat: "UV",
    blurb: "In-house industrial UV flatbed for commercial signage, luxury packaging, and backlit displays.",
    img: O + "flatbed-gen6.png",
    spec: { Heads: "Ricoh Gen5", Ink: "UV Curable CMYK+W", Bed: "2.5m × 1.3m", Speed: "42 m²/hr" }
  },
  {
    name: "6090 UV Desktop Flatbed",
    cat: "UV",
    blurb: "Precision desktop UV flatbed for personalized phone cases, acrylic trophies, and leather items.",
    img: P + "uv-small.jpg",
    spec: { Heads: "3× Epson i3200-U1", Ink: "LED UV (CMYK+W+V)", Bed: "600×900 mm", Height: "Up to 150 mm" }
  },
  {
    name: "UV DTF Transfer System",
    cat: "UV",
    blurb: "Direct-to-film crystal sticker system with automatic inline lamination for irregular curved surfaces.",
    img: C + "uv_signage.jpg",
    spec: { Heads: "3× Epson i3200", Ink: "UV DTF + Gloss Varnish", Width: "600 mm", Speed: "8 m²/hr" }
  },

  /* ---- Sublimation ---- */
  {
    name: "VK-JET 180K-S Sublimation",
    cat: "Sublimation",
    flagship: true,
    blurb: "High-speed industrial dye-sublimation line for sportswear, flags, and home furnishings.",
    img: O + "mimaki-ts100-160.png",
    spec: { Heads: "4× Epson i3200-A1", Ink: "Dye-Sublimation CMYK", Width: "1.9 m", Speed: "180 m²/hr (1-pass)" }
  },
  {
    name: "8-Head i3200 Subli-Master",
    cat: "Sublimation",
    blurb: "High-volume 8-head staggered transfer line for 30–45 gsm lightweight transfer paper.",
    img: O + "V1808E.png",
    spec: { Heads: "8× Epson i3200-A1", Ink: "High-yield Sublimation", Width: "1.9 m", Speed: "360 m²/hr" }
  },

  /* ---- CNC & Laser ---- */
  {
    name: "CNC Router 1325 Heavy Bed",
    cat: "CNC / Laser",
    flagship: true,
    blurb: "Heavy-duty monolithic steel gantry with 9kW air-cooled spindle and 6-zone vacuum platen.",
    img: C + "cnc_router_hd.jpg",
    spec: { Spindle: "9.0 kW HSD Air Cooled", Bed: "1300×2500 mm", Drive: "Yaskawa AC Servo", Speed: "25 m/min" }
  },
  {
    name: "Fiber Laser Metal Cutter 3015",
    cat: "CNC / Laser",
    blurb: "Raycus 3kW/6kW fiber laser cutting platform for stainless steel, mild steel, and aluminum sheets.",
    img: C + "laser_metal.jpg",
    spec: { Power: "Raycus 3000W / 6000W", Bed: "3000×1500 mm", Cutting: "Up to 22mm Carbon Steel" }
  },
  {
    name: "CO2 Laser Cutter 1390",
    cat: "CNC / Laser",
    blurb: "High-precision 150W CO2 laser for cast acrylic, wood engravings, leather, and promotional signage.",
    img: C + "laser_cutting.jpg",
    spec: { Tube: "150W RECI CO2", Bed: "1300×900 mm", Speed: "Up to 600 mm/s" }
  },
  {
    name: "Automatic Channel Letter Bender",
    cat: "CNC / Laser",
    blurb: "CNC computerized bending system for aluminum, stainless steel, and iron 3D channel letters.",
    img: C + "cnc_router.jpg",
    spec: { Material: "Aluminum / Stainless Steel", Height: "20–160 mm", Thickness: "0.4–1.2 mm" }
  },

  /* ---- Consumables & Spares ---- */
  {
    name: "Certified Industrial Print Heads",
    cat: "Consumables",
    blurb: "Genuine factory-tested Kyocera KJ4A/B, Ricoh Gen5/6, Konica Minolta 512i/1024i, and Xaar 1201.",
    img: C + "print_head.jpg",
    spec: { Compatibility: "All Major Industrial Brands", Testing: "100% Jetting Verified in Delhi" }
  },
  {
    name: "Original High-Density OEM Inks",
    cat: "Consumables",
    blurb: "High-density solvent, eco-solvent, LED UV curable, and reactive dye inks with zero nozzle clogging.",
    img: O + "Sublimation_Ink_by_Veekay_Enteprises_c375aef0.png",
    spec: { Types: "Solvent / UV / Reactive / Subli", Standard: "ISO 9001 Certified Dispersion" }
  }
];

const CLIENTS = [
  "assets/img/products/1.png",
  "assets/img/products/2.png",
  "assets/img/products/3.png",
  "assets/img/products/4.png",
  "assets/img/products/5.png",
  "assets/img/products/6.png",
  "assets/img/products/7.png",
  "assets/img/products/8.png"
];
