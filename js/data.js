/* VEE KAY product data — names + specs from veekayent.com / veekaydigital.in.
   Images: only where the source site actually has a photo for that model
   (370×190 product shots + 100×100 menu thumbs). No cross-model reuse. */
const PRODUCTS=[
  // flagship — full spec sheet on own site
  {name:"VK JET 3500",cat:"Solvent",flagship:true,blurb:"Workhorse wide-format solvent line. Banner, mesh, one-way vision, fabric.",
   img:"assets/img/products-items/VK-JET-3500.png",
   spec:{Heads:"Konica 512 (42PL) · 4 or 8",Ink:"Solvent CMYK",Width:"3.2 m",Resolution:"180–720 dpi",Speed:"up to 1,300 sq ft/hr (8-head, 1-pass)",Media:"PVC · vinyl · mesh · fabric · one-way vision",RIP:"Photo Print + Ultra Print",Power:"AC 220V · 500–1800W",Footprint:"5000×750×1120 mm · 700 kg"}},

  {name:"Q Jet Plus 1024",cat:"Solvent",blurb:"Entry-level solvent inkjet.",img:"assets/img/products-items/Q-Jet-Plus-1024.png"},
  {name:"E Jet V0",cat:"Solvent",blurb:"Compact solvent series.",img:"assets/img/products-items/E-Jet-V0.png"},
  {name:"FLEX Printer",cat:"Solvent",blurb:"Flex / banner production line."},
  {name:"Konica 512i 8-Head FLEX",cat:"Solvent",blurb:"Imported Konica 8-head flex printer."},

  {name:"Vega 3180S",cat:"Textile",flagship:true,blurb:"High-speed digital textile printing — fashion and home textile.",img:"assets/img/menu/2-9.png",
   spec:{Type:"Digital textile printer",Media:"Fabric rolls",Use:"Fashion · home textile"}},
  {name:"Vega 3180DL",cat:"Textile",blurb:"Dual-line textile platform.",img:"assets/img/menu/2-10.png"},
  {name:"E Jet V2",cat:"Textile",blurb:"Entry textile inkjet.",img:"assets/img/menu/2.png"},
  {name:"E Jet V25",cat:"Textile",blurb:"Upgraded textile line.",img:"assets/img/menu/2-5.png"},
  {name:"Ts Jet V2",cat:"Textile",blurb:"Textile series, second generation.",img:"assets/img/menu/2-3.png"},
  {name:"T Jet",cat:"Textile",blurb:"Textile inkjet.",img:"assets/img/menu/2-6.png"},
  {name:"P Jet",cat:"Textile",blurb:"Press-grade textile line.",img:"assets/img/menu/2-4.png"},
  {name:"E Press",cat:"Textile",blurb:"Digital press option.",img:"assets/img/menu/2-1.png"},
  {name:"P Press",cat:"Textile",blurb:"Digital press option.",img:"assets/img/menu/2-2.png"},
  {name:"V Press",cat:"Textile",blurb:"Digital press option.",img:"assets/img/menu/2-7.png"},
  {name:"Iris 2200",cat:"Textile",blurb:"Textile series.",img:"assets/img/menu/2-8.png"},
  {name:"Carpet / Bed-Sheet Digital",cat:"Textile",blurb:"High-speed carpet and bed-sheet printing."},

  {name:"M Jet",cat:"UV",flagship:true,blurb:"In-house UV flatbed — signage, décor, rigid media.",img:"assets/img/menu/4-1.png",
   spec:{Type:"UV flatbed",Media:"Rigid · signage · décor",Range:"Entry to high-end UV"}},
  {name:"DOCAN H1000M UV Flatbed",cat:"UV",blurb:"8×4 format, Ricoh Gen2, 2 heads."},
  {name:"DOCAN H1600M",cat:"UV",blurb:"High-speed UV flatbed."},
  {name:"DOCAN H3000M",cat:"UV",blurb:"Fast-speed large-format UV inkjet."},
  {name:"6090 UV",cat:"UV",blurb:"Desktop-class UV flatbed."},
  {name:"A4 UV Flatbed",cat:"UV",blurb:"Benchtop UV printing."},
  {name:"3×5 ft UV",cat:"UV",blurb:"Medium-format UV flatbed."},
  {name:"UV Roll-to-Roll",cat:"UV",blurb:"Roll media UV line."},
  {name:"UV DTF",cat:"UV",blurb:"Direct-to-film UV."},
  {name:"Glass / Door Printer",cat:"UV",blurb:"Almirah, door, glass print capability."},

  {name:"VK-JET 180K-S",cat:"Sublimation",flagship:true,blurb:"Sublimation line with flag printing option.",img:"assets/img/menu/5-1.png",
   spec:{Type:"Sublimation printer",Use:"Flags · transfer"}},
  {name:"8-Head i3200 Sublimation",cat:"Sublimation",blurb:"i3200 print-head sublimation line."},

  {name:"CNC Wood Router 1325 (3 kW)",cat:"CNC / Laser",blurb:"High-speed wood cutting and engraving router."},
  {name:"Thermocol CNC Router",cat:"CNC / Laser",blurb:"Thermocol cutting routers."},
  {name:"Fiber Laser Cutting",cat:"CNC / Laser",blurb:"Metal cutting fiber laser."},
  {name:"Metal & Non-Metal Laser",cat:"CNC / Laser",blurb:"General-purpose laser cutting."},
  {name:"UV Coating Line",cat:"Finishing",blurb:"Coating and finishing line."},
  {name:"Inks & Print Heads",cat:"Consumables",blurb:"Solvent/eco CMYK inks · Xaar, Ricoh Gen2 heads · spares."},
];

/* client logos shown on home — their own site's brand crops */
const CLIENTS=["assets/img/products/1.png","assets/img/products/2.png","assets/img/products/3.png","assets/img/products/4.png","assets/img/products/5.png","assets/img/products/6.png","assets/img/products/7.png","assets/img/products/8.png"];
