/**
 * VEE KAY ENTERPRISES — 3D INDUSTRIAL MACHINERY SHOWROOM ENGINE
 * Technologies: Three.js, OrbitControls, GSAP
 * Features:
 *   - Procedural 3D Machinery (VK JET 3500, Vega 3180S, DOCAN H1600M)
 *   - 360 Drag, Scroll Zoom, View Presets (Front, Side, Rear, Top, Iso)
 *   - Interactive Exploded View Animation
 *   - Screen-Projected 3D Technical Hotspots with Engineering Data
 *   - Glassmorphic Specifications HUD
 *   - Printable Datasheet / Brochure Generator
 *   - Fallback for non-WebGL devices
 */

(function () {
  "use strict";

  // Check WebGL availability
  function hasWebGL() {
    try {
      var canvas = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  // Authentic Product Catalog Data & Specifications
  var SHOWROOM_PRODUCTS = {
    "VK JET 3500": {
      id: "vk3500",
      name: "VK JET 3500",
      category: "Solvent / Flex",
      badge: "Flagship Solvent · 3.2M",
      ref: "REF · VKE-001",
      blurb: "Workhorse 3.2m industrial wide-format solvent production line. Engineered for continuous high-speed billboard, mesh, one-way vision, and heavy PVC vinyl banner manufacturing.",
      specs: {
        "Print Heads": "Konica Minolta 512 (42pL) · 4 or 8 Heads",
        "Max Print Width": "3,200 mm (10.5 ft) Wide-Format",
        "Ink System": "Industrial Solvent CMYK · Auto-Degassing",
        "Resolution": "180 / 240 / 360 / 720 dpi Industrial Precision",
        "Max Speed": "Up to 1,300 sq ft/hr (8-head, 1-pass mode)",
        "Media Types": "PVC Banner, Vinyl, Mesh, One-Way Vision, Paper",
        "Platen System": "Triple Heating (Pre/Print/Post) + Vacuum",
        "RIP Software": "PhotoPrint DX / UltraPrint Industrial RIP",
        "Dimensions & Weight": "5000 × 750 × 1120 mm · 700 kg Solid Steel",
        "Power Supply": "AC 220V ±10% · 50/60 Hz · 500–1800W"
      },
      hotspots: [
        {
          id: "vk-heads",
          title: "Konica 512i Printhead Gantry",
          pos: [0, 1.25, 0.45],
          kicker: "CORE JETTING ASSEMBLY",
          desc: "Dual-staggered array of 4 or 8 genuine Konica 512 piezo printheads with 42pL drop size, offering robust drop velocity and superior outdoor ink durability.",
          spec: "Drop Size: 42 pL · Firing: 12.8 kHz"
        },
        {
          id: "vk-platen",
          title: "Triple-Zone Vacuum Platen",
          pos: [0, 0.82, 0.25],
          kicker: "MEDIA STABILITY & DRYING",
          desc: "Multi-stage digital temperature-controlled pre-heater, print platen, and post-heater bed with high-flow suction holding thick vinyl flat against print head strikes.",
          spec: "Heaters: Digital PID · Vacuum: High-Torque Blower"
        },
        {
          id: "vk-gantry",
          title: "Rigid Linear Guide Gantry",
          pos: [0, 1.6, -0.05],
          kicker: "HIGH-PRECISION MOTION",
          desc: "Heavy-gauge reinforced aluminum crossbeam equipped with dual Japanese THK linear guide rails and a high-torque AC servo belt drive for vibration-free travel.",
          spec: "Guide Rails: Dual THK · Servo: 400W AC Brushless"
        },
        {
          id: "vk-takeup",
          title: "Automated Tension Take-Up",
          pos: [0, 0.35, 0.65],
          kicker: "CONTINUOUS ROLL CONVEYANCE",
          desc: "Dual-motor synchronized automatic roll take-up system engineered for continuous unattended winding of heavy 100m PVC banner rolls up to 700 kg.",
          spec: "Max Roll Diameter: 350 mm · Torque: Dual Magnetic"
        },
        {
          id: "vk-control",
          title: "Industrial Operator Station",
          pos: [-2.6, 1.45, 0.25],
          kicker: "SYSTEM MANAGEMENT",
          desc: "Sealed operator console with emergency cut-off, automated negative pressure ink purge controls, and motorized printhead height adjustment station.",
          spec: "Purge: Auto Positive/Negative · Safety: E-Stop + Sensors"
        }
      ]
    },

    "Vega 3180S": {
      id: "vega3180",
      name: "Vega 3180S",
      category: "Digital Textile",
      badge: "Flagship Textile · Continuous",
      ref: "REF · VKE-006",
      blurb: "High-speed continuous digital direct-to-fabric platform engineered for sustained industrial garment, fashion apparel, home furnishing, and continuous roll fabric production.",
      specs: {
        "Machine Architecture": "Continuous Blanket Conveyor Digital Textile Printer",
        "Printheads": "High-Speed Industrial Piezo Array (Multi-Channel)",
        "Media Compatibility": "Cotton, Silk, Polyester, Linen, Rayon, Blends",
        "Fabric Feeding": "Automated Dancer Roller Tensioning & Edge Guider",
        "Blanket System": "Continuous Belt Conveyor + Auto-Washing & Drying",
        "Ink Chemistry": "Reactive / Disperse / Acid / Pigment Textile Inks",
        "Drying Unit": "Integrated Radiant Infrared & Hot-Air Fixation",
        "Software": "Textile Specialized Color Separation RIP",
        "Throughput": "Industrial Continuous Multi-Shift Production"
      },
      hotspots: [
        {
          id: "vega-blanket",
          title: "Conveyor Belt Transport System",
          pos: [0, 0.78, 0],
          kicker: "PRECISION FABRIC FEED",
          desc: "High-adhesion continuous conveyor blanket with bottom-mounted automated washing, scraping, and hot-air drying system ensuring clean, tension-free fabric feeding.",
          spec: "Belt: Anti-Static Seamless · Cleaning: Auto-Wash Brush"
        },
        {
          id: "vega-carriage",
          title: "Textile Multi-Head Carriage",
          pos: [0, 1.35, 0.25],
          kicker: "DROP-ON-DEMAND TEXTILE JETTING",
          desc: "High-clearance carriage with bidirectional anti-crash laser obstacle sensors, designed to prevent fabric edge curling from damaging sensitive printheads.",
          spec: "Protection: Optical Dual Sensors · Height: 1.5–30 mm"
        },
        {
          id: "vega-dryer",
          title: "Infrared Fixation Tunnel",
          pos: [0, 0.95, 1.3],
          kicker: "IN-LINE FABRIC DRYING",
          desc: "High-efficiency infrared heating element array paired with uniform airflow fans to instantly dry textile inks before fabric enters the take-up roll.",
          spec: "Heating: Infrared Quartz · Control: Thermostatic PID"
        },
        {
          id: "vega-dancer",
          title: "Dancer Roll Tension Control",
          pos: [0, 0.9, -1.35],
          kicker: "FABRIC FEED ACCURACY",
          desc: "Pneumatic dancer bar assembly that balances fabric roll tension smoothly, eliminating elasticity distortion across knitted and woven fabrics.",
          spec: "Tension: Pneumatic Sensitive · Sensor: Optical Edge"
        }
      ]
    },

    "DOCAN H1600M": {
      id: "docan1600",
      name: "DOCAN H1600M",
      category: "UV Flatbed",
      badge: "Flagship UV · Rigid & Hybrid",
      ref: "REF · VKE-020",
      blurb: "High-speed heavy industrial UV flatbed printing system. Direct photographic printing on rigid acrylic, glass, wood, composite metal sheets, ceramic tile, and architectural media.",
      specs: {
        "Platform Type": "Industrial Rigid UV Flatbed Printing Table",
        "Bed Dimensions": "1,600 mm × 1,000 mm (Extendable Table)",
        "Printheads": "Kyocera / Ricoh Gen5 Industrial Grayscale Heads",
        "UV Curing System": "Dual Water-Cooled High-Intensity UV LED Lamps",
        "Color Channels": "CMYK + White + Clear Varnish (Gloss / Matte)",
        "Max Media Thickness": "Up to 100 mm (Heavy-Duty Z-Axis Lift)",
        "Vacuum Zones": "Independent Multi-Zone High-Vacuum Suction Table",
        "Registration": "Pneumatic Retractable Material Alignment Pins",
        "Resolution": "Up to 1,200 × 1,200 dpi Micro-Piezo Droplets"
      },
      hotspots: [
        {
          id: "docan-bed",
          title: "Milled Honeycomb Vacuum Table",
          pos: [0, 0.88, 0],
          kicker: "SUBSTRATE IMMOBILIZATION",
          desc: "Precision-milled aluminum honeycomb vacuum bed partitioned into independent suction zones, guaranteeing zero sheet warpage on heavy acrylic, glass, or steel.",
          spec: "Flatness: ±0.03 mm · Zones: 4 Independent Valves"
        },
        {
          id: "docan-uvlamps",
          title: "Dual Water-Cooled UV LED Arrays",
          pos: [-0.9, 1.45, 0.35],
          kicker: "INSTANT COLD-CURING",
          desc: "Dual high-intensity UV LED curing modules with continuous closed-loop water chilling, enabling instant polymer curing on heat-sensitive materials without heat deformation.",
          spec: "Cooling: Industrial Chiller · Life: 20,000+ Operating Hours"
        },
        {
          id: "docan-kyocera",
          title: "Kyocera Industrial Print Engine",
          pos: [0, 1.48, 0.35],
          kicker: "GRAYSCALE PIEZO JETTING",
          desc: "Genuine Kyocera printhead cluster delivering variable 3.5–14pL micro-droplet jetting for smooth gradients, vibrant CMYK density, and textured tactile varnish layers.",
          spec: "Droplet: 3.5 pL Grayscale · Ink: UV Curable Pigment"
        },
        {
          id: "docan-pins",
          title: "Pneumatic Alignment Pins",
          pos: [1.2, 0.92, -0.6],
          kicker: "PERFECT REGISTRATION",
          desc: "Retractable pneumatic register pins aligned along the X and Y axes allowing exact sheet repeat positioning for double-sided prints and multi-layer printing.",
          spec: "Actuation: Pneumatic Cylinder · Repeat: ±0.02 mm"
        }
      ]
    }
  };

  // Main Showroom Application
  function initShowroom() {
    var stageEl = document.getElementById("showroom-3d-stage");
    if (!stageEl) return;

    if (!hasWebGL() || typeof THREE === "undefined") {
      renderStaticFallback(stageEl);
      return;
    }

    var currentProductKey = "VK JET 3500";
    var isExploded = false;
    var showHotspots = true;
    var autoRotate = false;
    var currentPreset = "iso";

    // Scene, Camera, Renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090e13);
    scene.fog = new THREE.FogExp2(0x090e13, 0.05);

    var width = stageEl.clientWidth || 800;
    var height = stageEl.clientHeight || 560;

    var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(5.5, 3.8, 6.8);

    var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    var canvasWrap = stageEl.querySelector(".sr-canvas-wrap");
    canvasWrap.appendChild(renderer.domElement);

    // Orbit Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 + 0.04; // Don't go below floor
    controls.target.set(0, 0.9, 0);

    // Studio Lighting
    var ambientLight = new THREE.AmbientLight(0x0f1a26, 1.6);
    scene.add(ambientLight);

    // Main Key Light (Cool white industrial spot)
    var keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(8, 14, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cyan Fill Light
    var cyanFill = new THREE.DirectionalLight(0x00b9ef, 1.4);
    cyanFill.position.set(-9, 6, -6);
    scene.add(cyanFill);

    // Cyan Rim / Back Light
    var rimLight = new THREE.DirectionalLight(0x38d6ff, 1.2);
    rimLight.position.set(0, 3, -10);
    scene.add(rimLight);

    // Floor Level Uplight
    var floorLight = new THREE.PointLight(0x00b9ef, 0.8, 12);
    floorLight.position.set(0, 0.2, 0);
    scene.add(floorLight);

    // Ground Plane with Cyan Industrial Grid
    var gridHelper = new THREE.GridHelper(24, 48, 0x00b9ef, 0x162230);
    gridHelper.position.y = 0.005;
    scene.add(gridHelper);

    // Floor Reflection Plane
    var floorGeo = new THREE.PlaneGeometry(36, 36);
    var floorMat = new THREE.MeshStandardMaterial({
      color: 0x070b0f,
      roughness: 0.25,
      metalness: 0.85
    });
    var floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Concentric Ring Markings
    var ringGeo = new THREE.RingGeometry(4.2, 4.25, 64);
    var ringMat = new THREE.MeshBasicMaterial({ color: 0x00b9ef, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    var ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    scene.add(ringMesh);

    // Shared Metallic Materials
    var matSteel = new THREE.MeshStandardMaterial({ color: 0x8a99a8, metalness: 0.88, roughness: 0.26 });
    var matDarkChassis = new THREE.MeshStandardMaterial({ color: 0x141a24, metalness: 0.72, roughness: 0.42 });
    var matElectricCyan = new THREE.MeshStandardMaterial({
      color: 0x00b9ef,
      emissive: 0x005577,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.15
    });
    var matChrome = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.98, roughness: 0.12 });
    var matRubber = new THREE.MeshStandardMaterial({ color: 0x1a1e24, metalness: 0.1, roughness: 0.85 });
    var matPlaten = new THREE.MeshStandardMaterial({ color: 0x3d4956, metalness: 0.85, roughness: 0.3 });

    // Dynamic Printed Banner Texture
    function createPrintTexture() {
      var cv = document.createElement("canvas");
      cv.width = 1024;
      cv.height = 512;
      var ctx = cv.getContext("2d");
      var grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, "#00b9ef");
      grad.addColorStop(0.3, "#f44825");
      grad.addColorStop(0.6, "#ffaa00");
      grad.addColorStop(1, "#9900ee");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Technical markings
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px monospace";
      ctx.fillText("VEE KAY ENTERPRISES · HIGH PRECISION PRINT VERIFIED", 40, 80);
      ctx.font = "20px monospace";
      ctx.fillText("PASS 1/1 · 720 DPI INDUSTRIAL RIGID OUTPUT", 40, 120);

      // Color bars
      var colors = ["#00ffff", "#ff00ff", "#ffff00", "#000000", "#00b9ef"];
      for (var i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(40 + i * 180, 160, 160, 40);
      }
      return new THREE.CanvasTexture(cv);
    }
    var printTex = createPrintTexture();
    var matPrintMedia = new THREE.MeshStandardMaterial({ map: printTex, roughness: 0.4, metalness: 0.2 });

    // Procedural Model Generators
    var currentModelGroup = new THREE.Group();
    scene.add(currentModelGroup);
    var activeHotspots = [];
    var partsList = [];

    // Helper: Add mesh with shadow
    function makeMesh(geo, mat, cast, recv) {
      var m = new THREE.Mesh(geo, mat);
      m.castShadow = cast !== false;
      m.receiveShadow = recv !== false;
      return m;
    }

    // 1. VK JET 3500 Generator
    function buildVKJet3500() {
      var root = new THREE.Group();
      var parts = [];

      // Base Structure (Heavy floor pedestals and chassis)
      var basePart = new THREE.Group();
      var footL = makeMesh(new THREE.BoxGeometry(0.7, 0.15, 1.4), matDarkChassis);
      footL.position.set(-2.6, 0.075, 0);
      var footR = makeMesh(new THREE.BoxGeometry(0.7, 0.15, 1.4), matDarkChassis);
      footR.position.set(2.6, 0.075, 0);
      var lowerBeam = makeMesh(new THREE.BoxGeometry(5.2, 0.25, 0.4), matDarkChassis);
      lowerBeam.position.set(0, 0.35, -0.3);
      basePart.add(footL, footR, lowerBeam);
      root.add(basePart);
      parts.push({ obj: basePart, expOffset: [0, -0.4, 0] });

      // Left Tower (Electronics & Operator Console)
      var leftTower = new THREE.Group();
      var towerLMesh = makeMesh(new THREE.BoxGeometry(0.75, 1.6, 1.1), matDarkChassis);
      towerLMesh.position.set(-2.6, 0.95, 0);
      var panelL = makeMesh(new THREE.BoxGeometry(0.04, 0.8, 0.4), matElectricCyan);
      panelL.position.set(-2.2, 1.1, 0.35);
      // Operator Screen
      var screenFrame = makeMesh(new THREE.BoxGeometry(0.06, 0.4, 0.5), matSteel);
      screenFrame.position.set(-2.6, 1.85, 0.25);
      screenFrame.rotation.y = 0.2;
      var screenGlass = makeMesh(new THREE.PlaneGeometry(0.44, 0.34), new THREE.MeshBasicMaterial({ color: 0x00b9ef }));
      screenGlass.position.set(-2.56, 1.85, 0.25);
      screenGlass.rotation.y = Math.PI / 2 + 0.2;
      // Status Beacon Tower
      var beaconPole = makeMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), matChrome);
      beaconPole.position.set(-2.8, 1.95, -0.3);
      var beaconLight = makeMesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1), new THREE.MeshBasicMaterial({ color: 0x00ff88 }));
      beaconLight.position.set(-2.8, 2.15, -0.3);
      leftTower.add(towerLMesh, panelL, screenFrame, screenGlass, beaconPole, beaconLight);
      root.add(leftTower);
      parts.push({ obj: leftTower, expOffset: [-1.4, 0, 0] });

      // Right Tower (Motors & Ink Delivery Window)
      var rightTower = new THREE.Group();
      var towerRMesh = makeMesh(new THREE.BoxGeometry(0.75, 1.6, 1.1), matDarkChassis);
      towerRMesh.position.set(2.6, 0.95, 0);
      var inkWindow = makeMesh(new THREE.BoxGeometry(0.04, 0.6, 0.5), new THREE.MeshStandardMaterial({ color: 0x112233, roughness: 0.1, metalness: 0.9 }));
      inkWindow.position.set(2.2, 1.0, 0.1);
      // Sub-tank bottles
      for (var b = 0; b < 4; b++) {
        var bottle = makeMesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3), new THREE.MeshStandardMaterial({ color: [0x00b9ef, 0xff00bb, 0xffcc00, 0x111111][b] }));
        bottle.position.set(2.35, 1.0, -0.15 + b * 0.12);
        rightTower.add(bottle);
      }
      rightTower.add(towerRMesh, inkWindow);
      root.add(rightTower);
      parts.push({ obj: rightTower, expOffset: [1.4, 0, 0] });

      // Heavy Cross Gantry Beam
      var gantry = new THREE.Group();
      var beam = makeMesh(new THREE.BoxGeometry(4.8, 0.45, 0.55), matSteel);
      beam.position.set(0, 1.45, 0);
      var cyanStrip = makeMesh(new THREE.BoxGeometry(4.82, 0.04, 0.02), matElectricCyan);
      cyanStrip.position.set(0, 1.6, 0.28);
      var railTop = makeMesh(new THREE.CylinderGeometry(0.02, 0.02, 4.8), matChrome);
      railTop.rotation.z = Math.PI / 2;
      railTop.position.set(0, 1.55, 0.28);
      var railBottom = makeMesh(new THREE.CylinderGeometry(0.02, 0.02, 4.8), matChrome);
      railBottom.rotation.z = Math.PI / 2;
      railBottom.position.set(0, 1.35, 0.28);
      gantry.add(beam, cyanStrip, railTop, railBottom);
      root.add(gantry);
      parts.push({ obj: gantry, expOffset: [0, 1.2, 0] });

      // Print Carriage Unit
      var carriage = new THREE.Group();
      var carriageBox = makeMesh(new THREE.BoxGeometry(0.85, 0.55, 0.65), matDarkChassis);
      carriageBox.position.set(0.2, 1.45, 0.35);
      var carriagePlate = makeMesh(new THREE.BoxGeometry(0.7, 0.08, 0.4), matChrome);
      carriagePlate.position.set(0.2, 1.15, 0.35);
      var logoCyan = makeMesh(new THREE.BoxGeometry(0.4, 0.12, 0.02), matElectricCyan);
      logoCyan.position.set(0.2, 1.5, 0.68);
      carriage.add(carriageBox, carriagePlate, logoCyan);
      root.add(carriage);
      parts.push({ obj: carriage, expOffset: [0, 0.8, 1.6] });

      // Vacuum Print Bed & Heaters
      var bedPart = new THREE.Group();
      var bed = makeMesh(new THREE.BoxGeometry(4.8, 0.12, 0.8), matPlaten);
      bed.position.set(0, 1.05, 0.2);
      var frontHeater = makeMesh(new THREE.BoxGeometry(4.8, 0.08, 0.35), matSteel);
      frontHeater.position.set(0, 0.98, 0.65);
      frontHeater.rotation.x = 0.3;
      bedPart.add(bed, frontHeater);
      root.add(bedPart);
      parts.push({ obj: bedPart, expOffset: [0, -0.6, 0.5] });

      // Roll Media Handling (Unwind & Take-up with Printed Banner)
      var mediaPart = new THREE.Group();
      var rollRear = makeMesh(new THREE.CylinderGeometry(0.14, 0.14, 4.2, 24), matRubber);
      rollRear.rotation.z = Math.PI / 2;
      rollRear.position.set(0, 0.8, -0.45);
      var rollFront = makeMesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 24), matRubber);
      rollFront.rotation.z = Math.PI / 2;
      rollFront.position.set(0, 0.35, 0.65);
      var printedSheet = makeMesh(new THREE.PlaneGeometry(4.2, 0.9), matPrintMedia);
      printedSheet.position.set(0, 0.72, 0.7);
      printedSheet.rotation.x = 0.4;
      mediaPart.add(rollRear, rollFront, printedSheet);
      root.add(mediaPart);
      parts.push({ obj: mediaPart, expOffset: [0, 0, 1.8] });

      return { root: root, parts: parts };
    }

    // 2. Vega 3180S Generator (High-Speed Digital Textile)
    function buildVega3180S() {
      var root = new THREE.Group();
      var parts = [];

      // Base & Conveyor Belt Washing System
      var basePart = new THREE.Group();
      var bedBase = makeMesh(new THREE.BoxGeometry(4.2, 0.65, 2.8), matDarkChassis);
      bedBase.position.set(0, 0.35, 0);
      var drainPan = makeMesh(new THREE.BoxGeometry(3.8, 0.15, 2.2), matSteel);
      drainPan.position.set(0, 0.72, 0);
      basePart.add(bedBase, drainPan);
      root.add(basePart);
      parts.push({ obj: basePart, expOffset: [0, -0.5, 0] });

      // Continuous Textile Conveyor Blanket
      var blanketPart = new THREE.Group();
      var blanket = makeMesh(new THREE.BoxGeometry(3.6, 0.08, 2.6), matRubber);
      blanket.position.set(0, 0.82, 0);
      // Fabric being printed
      var fabric = makeMesh(new THREE.PlaneGeometry(3.2, 2.2), matPrintMedia);
      fabric.rotation.x = -Math.PI / 2;
      fabric.position.set(0, 0.87, 0);
      blanketPart.add(blanket, fabric);
      root.add(blanketPart);
      parts.push({ obj: blanketPart, expOffset: [0, 0.2, 0.8] });

      // Dual Gantry Arches
      var gantry = new THREE.Group();
      var colL = makeMesh(new THREE.BoxGeometry(0.45, 1.4, 0.7), matDarkChassis);
      colL.position.set(-2.0, 1.1, 0);
      var colR = makeMesh(new THREE.BoxGeometry(0.45, 1.4, 0.7), matDarkChassis);
      colR.position.set(2.0, 1.1, 0);
      var bridge = makeMesh(new THREE.BoxGeometry(4.3, 0.45, 0.55), matSteel);
      bridge.position.set(0, 1.65, 0);
      var cyanBar = makeMesh(new THREE.BoxGeometry(4.32, 0.04, 0.04), matElectricCyan);
      cyanBar.position.set(0, 1.8, 0.28);
      gantry.add(colL, colR, bridge, cyanBar);
      root.add(gantry);
      parts.push({ obj: gantry, expOffset: [0, 1.3, 0] });

      // Textile Multi-Head Carriage
      var carriage = new THREE.Group();
      var cBox = makeMesh(new THREE.BoxGeometry(0.95, 0.55, 0.7), matDarkChassis);
      cBox.position.set(-0.3, 1.6, 0.25);
      var cSensors = makeMesh(new THREE.BoxGeometry(1.05, 0.1, 0.1), matElectricCyan);
      cSensors.position.set(-0.3, 1.38, 0.55);
      carriage.add(cBox, cSensors);
      root.add(carriage);
      parts.push({ obj: carriage, expOffset: [0, 0.9, 1.8] });

      // Front Infrared Radiant Dryer Tunnel
      var dryerPart = new THREE.Group();
      var dryerHood = makeMesh(new THREE.BoxGeometry(3.6, 0.45, 0.65), matSteel);
      dryerHood.position.set(0, 1.1, 1.45);
      var dryerVents = makeMesh(new THREE.BoxGeometry(3.2, 0.05, 0.4), matElectricCyan);
      dryerVents.position.set(0, 1.35, 1.45);
      dryerPart.add(dryerHood, dryerVents);
      root.add(dryerPart);
      parts.push({ obj: dryerPart, expOffset: [0, 0.6, 1.4] });

      // Rear Fabric Feeding & Dancer Tension Rollers
      var feederPart = new THREE.Group();
      for (var r = 0; r < 3; r++) {
        var roll = makeMesh(new THREE.CylinderGeometry(0.08, 0.08, 3.4), matChrome);
        roll.rotation.z = Math.PI / 2;
        roll.position.set(0, 0.5 + r * 0.35, -1.45);
        feederPart.add(roll);
      }
      root.add(feederPart);
      parts.push({ obj: feederPart, expOffset: [0, 0, -1.2] });

      return { root: root, parts: parts };
    }

    // 3. DOCAN H1600M Generator (High-Speed UV Flatbed)
    function buildDocanH1600M() {
      var root = new THREE.Group();
      var parts = [];

      // Heavy Honeycomb Vacuum Flatbed Table
      var tablePart = new THREE.Group();
      var tableFrame = makeMesh(new THREE.BoxGeometry(3.6, 0.7, 3.2), matDarkChassis);
      tableFrame.position.set(0, 0.4, 0);
      var honeyBed = makeMesh(new THREE.BoxGeometry(3.2, 0.14, 2.6), matPlaten);
      honeyBed.position.set(0, 0.8, 0);
      // Vacuum Grid partition lines
      var gridLine = makeMesh(new THREE.BoxGeometry(3.1, 0.01, 0.03), matElectricCyan);
      gridLine.position.set(0, 0.88, 0);
      var acrylicSample = makeMesh(new THREE.BoxGeometry(2.4, 0.04, 1.6), new THREE.MeshStandardMaterial({
        color: 0x00b9ef,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        metalness: 0.9
      }));
      acrylicSample.position.set(0, 0.9, 0.2);
      tablePart.add(tableFrame, honeyBed, gridLine, acrylicSample);
      root.add(tablePart);
      parts.push({ obj: tablePart, expOffset: [0, -0.4, 0] });

      // Moving Gantry Crossbeam (Travels along Y-axis on heavy linear screws)
      var gantry = new THREE.Group();
      var railL = makeMesh(new THREE.BoxGeometry(0.35, 0.3, 3.2), matSteel);
      railL.position.set(-1.7, 0.85, 0);
      var railR = makeMesh(new THREE.BoxGeometry(0.35, 0.3, 3.2), matSteel);
      railR.position.set(1.7, 0.85, 0);
      var crossArch = makeMesh(new THREE.BoxGeometry(3.9, 0.55, 0.55), matSteel);
      crossArch.position.set(0, 1.5, 0.2);
      var cyanBorder = makeMesh(new THREE.BoxGeometry(3.92, 0.04, 0.04), matElectricCyan);
      cyanBorder.position.set(0, 1.7, 0.45);
      gantry.add(railL, railR, crossArch, cyanBorder);
      root.add(gantry);
      parts.push({ obj: gantry, expOffset: [0, 1.2, 0] });

      // UV Printhead Carriage with Dual UV LED Curing Lamps
      var carriage = new THREE.Group();
      var headBox = makeMesh(new THREE.BoxGeometry(0.85, 0.5, 0.6), matDarkChassis);
      headBox.position.set(0.1, 1.45, 0.45);
      // Dual Water-Cooled UV LED Lamps on flanks
      var lampL = makeMesh(new THREE.BoxGeometry(0.2, 0.3, 0.4), matElectricCyan);
      lampL.position.set(-0.45, 1.35, 0.45);
      var lampR = makeMesh(new THREE.BoxGeometry(0.2, 0.3, 0.4), matElectricCyan);
      lampR.position.set(0.65, 1.35, 0.45);
      carriage.add(headBox, lampL, lampR);
      root.add(carriage);
      parts.push({ obj: carriage, expOffset: [0, 0.8, 1.6] });

      // Swivel Operator Touchscreen Console
      var consolePart = new THREE.Group();
      var arm = makeMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9), matChrome);
      arm.position.set(1.85, 1.3, -0.6);
      var mon = makeMesh(new THREE.BoxGeometry(0.5, 0.35, 0.06), matDarkChassis);
      mon.position.set(1.85, 1.75, -0.6);
      mon.rotation.y = -0.4;
      var screen = makeMesh(new THREE.PlaneGeometry(0.44, 0.28), new THREE.MeshBasicMaterial({ color: 0x00b9ef }));
      screen.position.set(1.83, 1.75, -0.56);
      screen.rotation.y = -0.4;
      consolePart.add(arm, mon, screen);
      root.add(consolePart);
      parts.push({ obj: consolePart, expOffset: [1.2, 0.4, -0.5] });

      return { root: root, parts: parts };
    }

    // Load / Switch Active 3D Model
    function loadProductModel(key) {
      currentProductKey = key;
      isExploded = false;

      // Update UI Exploded button state
      var expBtn = document.getElementById("sr-btn-explode");
      if (expBtn) {
        expBtn.classList.remove("active");
        expBtn.innerHTML = '<span>💥</span> Exploded View';
      }

      // Clear existing model
      while (currentModelGroup.children.length > 0) {
        var obj = currentModelGroup.children[0];
        currentModelGroup.remove(obj);
      }
      partsList = [];
      clearHotspots();

      // Show subtle loading state
      var loader = stageEl.querySelector(".sr-loading-overlay");
      if (loader) {
        loader.classList.remove("fade-out");
        loader.style.opacity = "1";
      }

      setTimeout(function () {
        var built;
        if (key === "VK JET 3500") {
          built = buildVKJet3500();
        } else if (key === "Vega 3180S") {
          built = buildVega3180S();
        } else if (key === "DOCAN H1600M") {
          built = buildDocanH1600M();
        } else {
          // Default to solvent model for other lines
          built = buildVKJet3500();
        }

        currentModelGroup.add(built.root);
        partsList = built.parts;

        // Animate entrance scale
        currentModelGroup.scale.set(0.7, 0.7, 0.7);
        if (window.gsap) {
          gsap.to(currentModelGroup.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: "power3.out" });
        } else {
          currentModelGroup.scale.set(1, 1, 1);
        }

        // Render hotspots
        createHotspots(SHOWROOM_PRODUCTS[key]);

        // Update technical specifications panel
        updateSpecPanel(SHOWROOM_PRODUCTS[key]);

        // Update selector bar active state
        updateSelectorUI(key);

        if (loader) {
          loader.classList.add("fade-out");
        }
      }, 180);
    }

    // Hotspots System
    function clearHotspots() {
      var pins = stageEl.querySelectorAll(".sr-hotspot-pin");
      pins.forEach(function (p) { p.remove(); });
      activeHotspots = [];
      var modal = stageEl.querySelector(".sr-hotspot-modal");
      if (modal) modal.classList.remove("open");
    }

    function createHotspots(prodData) {
      clearHotspots();
      if (!prodData || !prodData.hotspots || !showHotspots) return;

      prodData.hotspots.forEach(function (hs) {
        var pin = document.createElement("div");
        pin.className = "sr-hotspot-pin";
        pin.setAttribute("title", hs.title);
        pin.innerHTML = '<div class="sr-hotspot-inner"></div>';
        stageEl.appendChild(pin);

        pin.addEventListener("click", function (e) {
          e.stopPropagation();
          showHotspotDetail(hs);
          focusCameraOnPoint(hs.pos);
        });

        activeHotspots.push({
          elem: pin,
          worldPos: new THREE.Vector3(hs.pos[0], hs.pos[1], hs.pos[2]),
          data: hs
        });
      });
    }

    function updateHotspotsScreenPos() {
      if (!activeHotspots.length || !showHotspots) return;
      var halfW = width / 2;
      var halfH = height / 2;

      activeHotspots.forEach(function (item) {
        var tempV = item.worldPos.clone();
        tempV.project(camera);

        // Check if behind camera
        if (tempV.z > 1) {
          item.elem.style.display = "none";
          return;
        }

        var x = (tempV.x * halfW) + halfW;
        var y = -(tempV.y * halfH) + halfH;
        item.elem.style.display = "block";
        item.elem.style.left = x + "px";
        item.elem.style.top = y + "px";
      });
    }

    function showHotspotDetail(hs) {
      var modal = stageEl.querySelector(".sr-hotspot-modal");
      if (!modal) return;
      modal.querySelector(".sr-hotspot-kicker").textContent = hs.kicker;
      modal.querySelector(".sr-hotspot-title").textContent = hs.title;
      modal.querySelector(".sr-hotspot-desc").textContent = hs.desc;
      modal.querySelector(".sr-hotspot-spec-pill").textContent = hs.spec;
      modal.classList.add("open");
    }

    function focusCameraOnPoint(pos) {
      if (window.gsap) {
        gsap.to(controls.target, {
          x: pos[0],
          y: pos[1],
          z: pos[2],
          duration: 0.9,
          ease: "power2.out"
        });
        gsap.to(camera.position, {
          x: pos[0] + 1.8,
          y: pos[1] + 1.2,
          z: pos[2] + 2.5,
          duration: 0.9,
          ease: "power2.out"
        });
      } else {
        controls.target.set(pos[0], pos[1], pos[2]);
      }
    }

    // Camera View Presets
    var PRESETS = {
      iso: { pos: [5.5, 3.8, 6.8], target: [0, 0.9, 0] },
      front: { pos: [0, 1.4, 7.2], target: [0, 1.0, 0] },
      side: { pos: [7.8, 1.6, 0.1], target: [0, 1.0, 0] },
      rear: { pos: [0, 2.0, -7.2], target: [0, 1.0, 0] },
      top: { pos: [0.1, 9.2, 0.1], target: [0, 0.2, 0] }
    };

    function setViewPreset(name) {
      currentPreset = name;
      var p = PRESETS[name] || PRESETS.iso;

      stageEl.querySelectorAll(".sr-preset-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-preset") === name);
      });

      if (window.gsap) {
        gsap.to(camera.position, {
          x: p.pos[0],
          y: p.pos[1],
          z: p.pos[2],
          duration: 1.1,
          ease: "power3.inOut"
        });
        gsap.to(controls.target, {
          x: p.target[0],
          y: p.target[1],
          z: p.target[2],
          duration: 1.1,
          ease: "power3.inOut"
        });
      } else {
        camera.position.set(p.pos[0], p.pos[1], p.pos[2]);
        controls.target.set(p.target[0], p.target[1], p.target[2]);
      }
    }

    // Exploded View Animation
    function toggleExplodedView() {
      isExploded = !isExploded;
      var expBtn = document.getElementById("sr-btn-explode");
      if (expBtn) {
        expBtn.classList.toggle("active", isExploded);
        expBtn.innerHTML = isExploded ? '<span>🧩</span> Assembled View' : '<span>💥</span> Exploded View';
      }

      partsList.forEach(function (item) {
        var targetX = isExploded ? item.expOffset[0] : 0;
        var targetY = isExploded ? item.expOffset[1] : 0;
        var targetZ = isExploded ? item.expOffset[2] : 0;

        if (window.gsap) {
          gsap.to(item.obj.position, {
            x: targetX,
            y: targetY,
            z: targetZ,
            duration: 1.2,
            ease: "power3.inOut"
          });
        } else {
          item.obj.position.set(targetX, targetY, targetZ);
        }
      });
    }

    // Update Specification Panel
    function updateSpecPanel(prod) {
      if (!prod) return;
      var panel = document.getElementById("sr-spec-panel");
      if (!panel) return;

      panel.querySelector(".sr-cat-pill").textContent = prod.badge;
      panel.querySelector(".sr-ref-code").textContent = prod.ref;
      panel.querySelector(".sr-product-name").textContent = prod.name;
      panel.querySelector(".sr-product-blurb").textContent = prod.blurb;

      var tbody = panel.querySelector(".sr-specs-table");
      if (tbody) {
        tbody.innerHTML = Object.keys(prod.specs).map(function (k) {
          return '<div class="sr-spec-row">' +
            '<span class="sr-spec-key">' + k + '</span>' +
            '<span class="sr-spec-val">' + prod.specs[k] + '</span>' +
          '</div>';
        }).join("");
      }

      var quoteBtn = panel.querySelector(".sr-btn-quote");
      if (quoteBtn) {
        quoteBtn.href = "enquiry.html?machine=" + encodeURIComponent(prod.name);
      }
    }

    function updateSelectorUI(activeKey) {
      document.querySelectorAll(".sr-select-btn").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-key") === activeKey);
      });
      document.querySelectorAll(".sr-dock-card").forEach(function (c) {
        c.classList.toggle("active", c.getAttribute("data-key") === activeKey);
      });
    }

    // Datasheet Generator
    function openDatasheetModal() {
      var prod = SHOWROOM_PRODUCTS[currentProductKey];
      if (!prod) return;
      var modal = document.getElementById("sr-datasheet-modal");
      if (!modal) return;

      document.getElementById("ds-machine-name").textContent = prod.name;
      document.getElementById("ds-machine-cat").textContent = prod.category + " · " + prod.badge;
      document.getElementById("ds-machine-ref").textContent = prod.ref;
      document.getElementById("ds-machine-blurb").textContent = prod.blurb;

      var specBox = document.getElementById("ds-specs-body");
      if (specBox) {
        specBox.innerHTML = Object.keys(prod.specs).map(function (k) {
          return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);">' +
            '<strong style="color:var(--sr-silver-muted);font-size:11px;font-family:var(--mono);text-transform:uppercase;">' + k + '</strong>' +
            '<span style="color:#ffffff;font-size:13px;font-weight:600;text-align:right;">' + prod.specs[k] + '</span>' +
          '</div>';
        }).join("");
      }
      modal.classList.add("open");
    }

    // Event Wire-up
    // 1. Selector bar buttons
    document.querySelectorAll(".sr-select-btn, .sr-dock-card").forEach(function (el) {
      el.addEventListener("click", function () {
        var key = el.getAttribute("data-key");
        if (key && SHOWROOM_PRODUCTS[key] && key !== currentProductKey) {
          loadProductModel(key);
        }
      });
    });

    // 2. Camera preset buttons
    stageEl.querySelectorAll(".sr-preset-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var preset = btn.getAttribute("data-preset");
        if (preset) setViewPreset(preset);
      });
    });

    // 3. Exploded view button
    var expBtn = document.getElementById("sr-btn-explode");
    if (expBtn) expBtn.addEventListener("click", toggleExplodedView);

    // 4. Hotspot toggle button
    var hsBtn = document.getElementById("sr-btn-hotspots");
    if (hsBtn) {
      hsBtn.addEventListener("click", function () {
        showHotspots = !showHotspots;
        hsBtn.classList.toggle("active", showHotspots);
        if (showHotspots) {
          createHotspots(SHOWROOM_PRODUCTS[currentProductKey]);
        } else {
          clearHotspots();
        }
      });
    }

    // 5. Fullscreen button
    var fsBtn = document.getElementById("sr-btn-fullscreen");
    if (fsBtn) {
      fsBtn.addEventListener("click", function () {
        var card = stageEl.querySelector(".sr-viewer-card");
        var isFs = card.classList.toggle("fullscreen");
        document.body.classList.toggle("sr-fullscreen-active", isFs);
        fsBtn.innerHTML = isFs ? '<span>✕</span> Exit Fullscreen' : '<span>⛶</span> Fullscreen';
        onResize();
      });
    }

    // 6. Reset view button
    var resetBtn = document.getElementById("sr-btn-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        setViewPreset("iso");
      });
    }

    // 7. Hotspot modal close
    var hsClose = stageEl.querySelector(".sr-hotspot-modal-close");
    if (hsClose) {
      hsClose.addEventListener("click", function () {
        stageEl.querySelector(".sr-hotspot-modal").classList.remove("open");
      });
    }

    // 8. Brochure download button & 3D view button
    var dsBtn = document.getElementById("sr-btn-datasheet");
    if (dsBtn) dsBtn.addEventListener("click", openDatasheetModal);

    var view3dBtn = document.getElementById("sr-btn-view3d");
    if (view3dBtn) {
      view3dBtn.addEventListener("click", function () {
        var stage = document.getElementById("showroom-3d-stage");
        if (stage) stage.scrollIntoView({ behavior: "smooth", block: "start" });
        setCameraPreset("iso");
      });
    }

    var dsClose = document.getElementById("ds-modal-close");
    if (dsClose) {
      dsClose.addEventListener("click", function () {
        document.getElementById("sr-datasheet-modal").classList.remove("open");
      });
    }

    // Window Resize Handling
    function onResize() {
      width = canvasWrap.clientWidth;
      height = canvasWrap.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);

    // Initial load
    var urlParam = new URLSearchParams(location.search).get("m") || new URLSearchParams(location.search).get("machine");
    if (urlParam && SHOWROOM_PRODUCTS[urlParam]) {
      loadProductModel(urlParam);
    } else {
      loadProductModel("VK JET 3500");
    }

    // Animation Render Loop
    var clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      var delta = clock.getDelta();

      // Gentle auto-rotation if activated
      if (autoRotate && !controls.state == -1) {
        currentModelGroup.rotation.y += delta * 0.15;
      }

      controls.update();
      updateHotspotsScreenPos();
      renderer.render(scene, camera);
    }
    animate();
  }

  // Fallback for devices without WebGL
  function renderStaticFallback(container) {
    container.innerHTML = '<div style="padding:48px;text-align:center;color:#ffffff;background:#090e13;border-radius:16px;border:1px solid rgba(0,185,239,0.3);">' +
      '<h3 style="color:#00b9ef;font-size:20px;margin-bottom:12px;">3D WebGL Acceleration Unavailable</h3>' +
      '<p style="color:#9ca3af;max-width:50ch;margin:0 auto 24px;">Your browser or graphics hardware does not have WebGL enabled. All product specifications, engineering brochures, and quotation requests remain fully accessible.</p>' +
      '<a href="enquiry.html" class="sr-btn-primary" style="display:inline-flex;">Request Factory Quotation &rarr;</a>' +
    '</div>';
  }

  // Boot on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShowroom);
  } else {
    initShowroom();
  }
})();
