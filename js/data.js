/* VEE KAY product data — names + specs from veekayent.com / veekaydigital.in.
   Images: only where the source site actually has a photo for that model
   (370×190 product shots + 100×100 menu thumbs). No cross-model reuse. */
const C = "assets/img/curated/";
const P = "assets/img/products-items/";

const PRODUCTS=[
  // flagship — full spec sheet on own site
  {name:"VK JET 3500",cat:"Solvent",flagship:true,blurb:"Workhorse wide-format solvent line. Banner, mesh, one-way vision, fabric.",
   img:P + "VK-JET-3500.png",
   spec:{Heads:"Konica 512 (42PL) · 4 or 8",Ink:"Solvent CMYK",Width:"3.2 m",Resolution:"180–720 dpi",Speed:"up to 1,300 sq ft/hr (8-head, 1-pass)",Media:"PVC · vinyl · mesh · fabric · one-way vision",RIP:"Photo Print + Ultra Print",Power:"AC 220V · 500–1800W",Footprint:"5000×750×1120 mm · 700 kg"}},

  {name:"Q Jet Plus 1024",cat:"Solvent",blurb:"Entry-level solvent inkjet.",img:P + "Q-Jet-Plus-1024.png"},
  {name:"E Jet V0",cat:"Solvent",blurb:"Compact solvent series.",img:P + "E-Jet-V0.png"},
  {name:"FLEX Printer",cat:"Solvent",blurb:"Flex / banner production line.",img:C + "solvent_roll.jpg"},
  {name:"Konica 512i 8-Head FLEX",cat:"Solvent",blurb:"Imported Konica 8-head flex printer.",img:C + "solvent_main.jpg"},

  {name:"Vega 3180S",cat:"Textile",flagship:true,blurb:"High-speed digital textile printing — fashion and home textile.",img:C + "textile_roll.jpg",
   spec:{Type:"Digital textile printer",Media:"Fabric rolls",Use:"Fashion · home textile"}},
  {name:"Vega 3180DL",cat:"Textile",blurb:"Dual-line textile platform.",img:C + "textile_fashion.jpg",
   detail:"Dual-line digital textile platform built for fashion and home-textile volume: two print stations on one media path, sized for garment factories and print shops that run fabric rolls through the line continuously."},
  {name:"E Jet V2",cat:"Textile",blurb:"Entry textile inkjet.",img:C + "textile_main.jpg",
   detail:"Entry-level digital textile inkjet for samples and short runs — the natural first step into fabric printing for T-shirt and soft-furnishing shops. Roll media, CMYK class output."},
  {name:"E Jet V25",cat:"Textile",blurb:"Upgraded textile line.",img:C + "textile_roll.jpg",
   detail:"The upgraded member of the E Jet textile series: higher throughput and a longer media path than the base model, aimed at shops moving from samples into small production runs."},
  {name:"Ts Jet V2",cat:"Textile",blurb:"Textile series, second generation.",img:C + "textile_fashion.jpg",
   detail:"Second-generation textile inkjet aimed at T-shirt and apparel output — sublimation and direct-fabric printing in one line, with quick media changes for short garment runs."},
  {name:"T Jet",cat:"Textile",blurb:"Textile inkjet.",img:C + "textile_main.jpg",
   detail:"General-purpose digital textile inkjet for fabric print shops: fashion, home textile and short-run apparel media, with the standard Vee Kay installation and spares support."},
  {name:"P Jet",cat:"Textile",blurb:"Press-grade textile line.",img:C + "textile_roll.jpg",
   detail:"Press-grade textile line for higher-quality fabric output — a step above the entry E Jet range, built for shops where finish and colour consistency matter on every run."},
  {name:"E Press",cat:"Textile",blurb:"Digital press option.",img:P + "E-Press-machine.png",
   detail:"Digital press option for garment and home-textile work — entry configuration of the Vee Kay press range, matched to smaller floors and starter volumes."},
  {name:"P Press",cat:"Textile",blurb:"Digital press option.",img:C + "textile_fashion.jpg",
   detail:"Press-grade configuration of the digital press range — press-grade fabric handling and output quality for established print shops."},
  {name:"V Press",cat:"Textile",blurb:"Digital press option.",img:C + "textile_roll.jpg",
   detail:"High-capacity digital press configuration of the Vee Kay press range — the top of the line for factories running sustained textile volumes."},
  {name:"Iris 2200",cat:"Textile",blurb:"Textile series.",img:C + "textile_main.jpg",
   detail:"Textile series for fashion and soft-furnishing printing: a compact footprint that fits smaller floors while keeping the full textile media set."},
  {name:"Carpet / Bed-Sheet Digital",cat:"Textile",blurb:"High-speed carpet and bed-sheet printing.",img:C + "textile_roll.jpg",
   detail:"High-speed digital line for carpet, rugs and bed-sheet printing — extra-wide media paths for full bed and rug widths, built for continuous wide-fabric runs."},

  {name:"M Jet",cat:"UV",flagship:true,blurb:"In-house UV flatbed — signage, décor, rigid media.",img:C + "uv_flatbed.jpg",
   spec:{Type:"UV flatbed",Media:"Rigid · signage · décor",Range:"Entry to high-end UV"}},
  {name:"DOCAN H1000M UV Flatbed",cat:"UV",blurb:"8×4 format, Ricoh Gen2, 2 heads.",img:C + "uv_signage.jpg"},
  {name:"DOCAN H1600M",cat:"UV",blurb:"High-speed UV flatbed.",img:C + "uv_flatbed.jpg"},
  {name:"DOCAN H3000M",cat:"UV",blurb:"Fast-speed large-format UV inkjet.",img:C + "uv_acrylic.jpg"},
  {name:"6090 UV",cat:"UV",blurb:"Desktop-class UV flatbed.",img:C + "uv_signage.jpg"},
  {name:"A4 UV Flatbed",cat:"UV",blurb:"Benchtop UV printing.",img:C + "uv_flatbed.jpg"},
  {name:"3×5 ft UV",cat:"UV",blurb:"Medium-format UV flatbed.",img:C + "uv_acrylic.jpg"},
  {name:"UV Roll-to-Roll",cat:"UV",blurb:"Roll media UV line.",img:C + "uv_signage.jpg"},
  {name:"UV DTF",cat:"UV",blurb:"Direct-to-film UV.",img:C + "uv_acrylic.jpg"},
  {name:"Glass / Door Printer",cat:"UV",blurb:"Almirah, door, glass print capability.",img:C + "uv_flatbed.jpg"},

  {name:"VK-JET 180K-S",cat:"Sublimation",flagship:true,blurb:"Sublimation line with flag printing option.",img:C + "sublimation_main.jpg",
   spec:{Type:"Sublimation printer",Use:"Flags · transfer"}},
  {name:"8-Head i3200 Sublimation",cat:"Sublimation",blurb:"i3200 print-head sublimation line.",img:C + "sublimation_print.jpg"},

  {name:"CNC Wood Router 1325 (3 kW)",cat:"CNC / Laser",blurb:"High-speed wood cutting and engraving router.",img:C + "cnc_router.jpg"},
  {name:"Thermocol CNC Router",cat:"CNC / Laser",blurb:"Thermocol cutting routers.",img:C + "cnc_router.jpg"},
  {name:"Fiber Laser Cutting",cat:"CNC / Laser",blurb:"Metal cutting fiber laser.",img:C + "laser_metal.jpg"},
  {name:"Metal & Non-Metal Laser",cat:"CNC / Laser",blurb:"General-purpose laser cutting.",img:C + "laser_cutting.jpg"},
  {name:"UV Coating Line",cat:"Finishing",blurb:"Coating and finishing line.",img:C + "facility_clean.jpg"},
  {name:"Inks & Print Heads",cat:"Consumables",blurb:"Solvent/eco CMYK inks · Xaar, Ricoh Gen2 heads · spares.",img:C + "inks_cmyk.jpg"}
];

/* client logos shown on home — their own site's brand crops */
const CLIENTS=["assets/img/products/1.png","assets/img/products/2.png","assets/img/products/3.png","assets/img/products/4.png","assets/img/products/5.png","assets/img/products/6.png","assets/img/products/7.png","assets/img/products/8.png"];
