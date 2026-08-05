/**
 * 800 RETAIL (AL AMEEN GROUP)
 * Fact-Based Database & State Manager (assets/js/data-scraper.js)
 */

export const globalStats = {
  facilitySize: "300,000+",
  establishedYear: 2004,
  divisionsCount: 15,
  completedProjects: "2,500+",
  countriesServed: "25+",
  headquarters: "Umm Al Quwain, United Arab Emirates",
  parentCompany: "Al Ameen Industries LLC",
  regions: [
    { code: "UAE", name: "United Arab Emirates", details: "300,000 sq. ft. Central Manufacturing Plant, Umm Al Quwain" },
    { code: "KSA", name: "Kingdom of Saudi Arabia", details: "Regional Operations & Assembly Hubs in Riyadh & Jeddah" },
    { code: "CHN", name: "China (Foshan)", details: "Global Sourcing, Quality Control & Procurement Center" }
  ]
};

export const divisions = [
  {
    id: "joinery",
    name: "Joinery & Wood Fabrication",
    icon: "fa-hammer",
    description: "High-end bespoke joinery, solid timber processing, wood veneers, lamination, and shop fittings executed with high-precision multi-axis CNC routers and Homag edge-banding machinery.",
    capacity: "Certified joinery workspace executing high-volume commercial counters and wall frames.",
    materials: ["MDF", "Plywood", "Veneer", "Solid Oak", "Corian Solid Surface"]
  },
  {
    id: "metalwork",
    name: "Metal Fabrication & Steel structures",
    icon: "fa-industry",
    description: "Manual and robotic metal works including cutting, fiber laser profiling, CNC bending, and structural welding for commercial gondolas, display racks, and architectural claddings.",
    capacity: "Conveyorized electrostatic powder coating line and fiber laser cutters.",
    materials: ["Stainless Steel 304/316", "Mild Steel", "Aluminium", "Brass"]
  },
  {
    id: "led",
    name: "Digital Signage & LED Displays",
    icon: "fa-tv",
    description: "Integrated LED screens, high-contrast transparent window displays, digital headers, and video walls assembled in cleanroom conditions with comprehensive thermal aging tests.",
    capacity: "LED diagnostic lab with spectrometer color calibration arrays.",
    materials: ["SMD LED Panels", "Transparent Film LED", "COB Display Modules"]
  },
  {
    id: "acrylic",
    name: "Acrylic Fabrication & Thermoforming",
    icon: "fa-gem",
    description: "Laser cutting, diamond edge polishing, vacuum thermoforming, and assembly of retail display boxes, cosmetic counters, and visual merchandising elements.",
    capacity: "Convection ovens, heavy-duty routers, and diamond polishers.",
    materials: ["Perspex Acrylic", "Polycarbonate", "PETG Sheets"]
  },
  {
    id: "fitout",
    name: "Turnkey Interior Fitout",
    icon: "fa-compass-drafting",
    description: "Full commercial fitout contracting including partition installations, glass glazing, ceiling works, civil upgrades, and on-site project management coordinates.",
    capacity: "In-house technical site engineers and licensed project managers.",
    materials: ["Glazed Glass Partitioning", "Drywall Systems", "Acoustic Plaster"]
  },
  {
    id: "mep",
    name: "MEP Engineering Services",
    icon: "fa-bolt",
    description: "Electrical infrastructure, HVAC design, duct fabrication, fire fighting lines, and plumbing coordinates compliant with local civil defense codes.",
    capacity: "Licensed MEP estimating and site engineering teams.",
    materials: ["Galvanized HVAC Ducts", "Fire Sprinkler Lines", "Busbars"]
  },
  {
    id: "glass",
    name: "Glass Glazing & UV Bonding",
    icon: "fa-window-maximize",
    description: "Tempered glass storefronts, safety laminated window panes, acoustic glass partitions, and high-strength UV glass bonding for luxury showcases.",
    capacity: "UV light bonding stations and glass cutting lines.",
    materials: ["Low-Iron Tempered Glass", "Laminated Glass", "Acoustic Glass"]
  },
  {
    id: "printing",
    name: "Digital Printing & Signage",
    icon: "fa-print",
    description: "Large format UV printing, banner lamination, vinyl graphic overlays, and direct-to-substrate flatbed printing for store graphics and architectural lightboxes.",
    capacity: "Flatbed UV printers and automated roll-to-roll laminators.",
    materials: ["UV Inks", "PVC Film", "Tension Fabric graphics", "Translucent Vinyl"]
  },
  {
    id: "lighting",
    name: "Architectural Lighting Integration",
    icon: "fa-lightbulb",
    description: "Custom lighting integration into store shelves, architectural backlit fabric boxes, spot tracking layouts, and smart LED controller nodes.",
    capacity: "Concealed 24V/12V LED wiring integration channels.",
    materials: ["CRI 90+ LED strips", "Diffuser PMMA sheets", "Smart LED Drivers"]
  },
  {
    id: "signage",
    name: "Commercial Brand Signage",
    icon: "fa-signature",
    description: "Fabrication of 3D illuminated letters, neon flex overlays, pylon outdoor signs, and custom logo plates for high-visibility storefronts.",
    capacity: "Laser channel letter bending machines and structural back-frames.",
    materials: ["Stainless Steel casings", "Liquid Acrylic", "LED neon tubes"]
  },
  {
    id: "design",
    name: "Concept Design & technical detailing",
    icon: "fa-drafting-table",
    description: "Engineering drafting, 3D photorealistic rendering, shop drawing detailing, and prototype scaling for B2B client approval loops.",
    capacity: "Design office equipped with SolidWorks and AutoCAD.",
    materials: ["CAD Blueprints", "3D Renders", "Material Sample Boards"]
  },
  {
    id: "logistics",
    name: "Logistics & Sourcing Slabs",
    icon: "fa-truck-loading",
    description: "Custom export packaging, wooden crating, sea freight shipping, and border customs clearance across GCC, MENA, and global retail hubs.",
    capacity: "Spacious packaging workshop and shipping yards.",
    materials: ["ISPM 15 Heat-Treated Crating", "Bubble wrap padding"]
  },
  {
    id: "upholstery",
    name: "Custom Upholstery & Lounges",
    icon: "fa-couch",
    description: "Bespoke fabric wraps, wall upholstery panels, changing room seats, and custom store couches made with fire-retardant foam.",
    capacity: "Industrial leather sewing lines and foam carving tools.",
    materials: ["Luxury Leather", "Velvet", "Fire-retardant fabric", "Foam Blocks"]
  },
  {
    id: "solid-surface",
    name: "Solid Surface Processing",
    icon: "fa-layer-group",
    description: "Certified processing, thermal bending, and seamless joining of DuPont Corian solid surfaces for cash counters and vanity tops.",
    capacity: "Corian Certified thermoforming ovens.",
    materials: ["Corian", "Krion", "Acrylic Resins"]
  },
  {
    id: "maintenance",
    name: "Operational Store Maintenance",
    icon: "fa-tools",
    description: "Preventative and reactive maintenance SLA contracts covering cosmetic touch-ups, locks, joinery alignment, and lighting diagnostics.",
    capacity: "Rapid dispatch vehicles across major cities.",
    materials: ["Hardware parts", "Touch-up paints", "LED drivers"]
  }
];

export const productCatalog = [
  {
    id: "fixture-01",
    name: "Modular Retail Gondola",
    category: "Retail Fixtures",
    material: "Metal & Oak Veneer",
    application: "Apparel Stores",
    description: "Double-sided modular display gondola with adjustable powder-coated steel shelving and premium oak veneer side panels.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    specs: {
      height: "1500 mm",
      width: "1200 mm",
      depth: "600 mm",
      loadCapacity: "80 kg per shelf"
    }
  },
  {
    id: "led-01",
    name: "P2.5 Ultra-Slim Video Wall",
    category: "LED Screens",
    material: "Die-cast Aluminium",
    application: "Window Displays / Branding",
    description: "High-contrast commercial LED display with front-access maintenance and HDR optimization for bright retail glass fronts.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    specs: {
      pixelPitch: "2.5 mm",
      brightness: "1500 nits",
      refreshRate: "3840 Hz",
      cabinetWeight: "6.5 kg"
    }
  },
  {
    id: "lightbox-01",
    name: "Architectural Frameless Lightbox",
    category: "Architectural Lightboxes",
    material: "Aluminium & Tension Fabric",
    application: "Wall Features / Advertising",
    description: "Super-slim 50mm profile lightbox with high-efficiency edge-lit LEDs ensuring hotspot-free illumination.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800",
    specs: {
      profileDepth: "50 mm",
      ledType: "High-power Epistar OS",
      colorTemp: "6500K / 4000K",
      mounting: "Wall-mount / Suspended"
    }
  },
  {
    id: "shelving-01",
    name: "Floating Stainless Wall Shelves",
    category: "Custom Shelving",
    material: "Brushed Brass & Steel",
    application: "Luxury Boutiques",
    description: "Wall-mounted display shelves featuring a brushed brass gold finish and integrated concealed LED strip lighting.",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800",
    specs: {
      finish: "PVD Brushed Brass Gold",
      ledVolt: "24V DC",
      maxLength: "3000 mm single span",
      brackets: "Concealed heavy-duty anchors"
    }
  },
  {
    id: "fixture-02",
    name: "Luxury Jewelry Counter",
    category: "Retail Fixtures",
    material: "Acrylic, Glass & Velvet",
    application: "Jewelry / Watch Boutiques",
    description: "Premium showcase counter with extra-clear tempered glass top, silent electronic lock, and custom suede upholstery base.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    specs: {
      glass: "10mm Low-Iron Tempered",
      locking: "RFID Electronic Keyless",
      lighting: "Concealed 95+ CRI Spotlights",
      dimensions: "1000H x 1200W x 550D mm"
    }
  },
  {
    id: "led-02",
    name: "Transparent LED Window Screen",
    category: "LED Screens",
    material: "Lightweight Acrylic Compound",
    application: "Store Fronts / Malls",
    description: "Semi-transparent LED panel maintaining outward visibility while projecting high-impact marketing videos.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    specs: {
      transparency: "75%",
      pixelPitch: "3.9 - 7.8 mm",
      brightness: "5500 nits",
      lifespan: "100,000 hours"
    }
  },
  {
    id: "lightbox-02",
    name: "Double-Sided Hanging Lightbox",
    category: "Architectural Lightboxes",
    material: "Anodized Aluminium",
    application: "Store Signage / Wayfinding",
    description: "Heavy-duty double-sided suspended lightbox designed for shopping mall concourses and primary walkways.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    specs: {
      profileDepth: "120 mm",
      graphics: "Easy-change silicon edge fabric (SEG)",
      suspension: "Stainless steel cables",
      dimming: "0-10V / DALI options"
    }
  },
  {
    id: "shelving-02",
    name: "Industrial Heavy Duty Rack",
    category: "Custom Shelving",
    material: "Reinforced Steel",
    application: "Supermarkets / Hypermarkets",
    description: "High-grade structural steel racks designed for cash & carry stores, hypermarket perimeter layouts, and stockrooms.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    specs: {
      uprightThickness: "2.5 mm",
      finish: "Textured Epoxy Powder",
      bayWidth: "1800 / 2400 mm",
      bayDepth: "800 / 1000 mm"
    }
  }
];

export const projectsPortfolio = [
  {
    id: "proj-01",
    title: "Adidas Flagship Store",
    category: "Fashion & Sports",
    mediaType: "Built Projects",
    location: "Dubai Mall, UAE",
    tags: ["Joinery", "LED Screens", "Metalwork", "Fitout"],
    description: "Complete turnkey interior fitout and fixture manufacturing for the Adidas flagship environment. Highlighted by large structural metal column wraps, customized footwear display walls, and integrated interactive digital LED columns.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    scope: "Joinery fabrication, custom metal hanger railings, P2.5 digital column casings, acrylic visual dividers, and full MEP compliance installation."
  },
  {
    id: "proj-02",
    title: "Skechers Performance concept",
    category: "Footwear",
    mediaType: "Built Projects",
    location: "Riyadh Park Mall, KSA",
    tags: ["Metalwork", "Custom Shelving", "Lighting"],
    description: "Fabrication and rollout of modern display layouts for Skechers. Custom floating wall shelves with edge illumination, metal perimeter rails, and graphic lighting panels designed to reflect high performance.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1200",
    scope: "Double-sided gondolas, powder-coated wall display grids, custom cash counter with integrated branding, and storefront lighting modules."
  },
  {
    id: "proj-03",
    title: "Landmark Group Offices",
    category: "Corporate Interiors",
    mediaType: "Render Concepts",
    location: "JAFZA, Dubai",
    tags: ["Glass Partitioning", "MEP", "Joinery"],
    description: "3D render engineering design and subsequent fitout contract for Landmark Group's administrative wing. Incorporates smart acoustic glass partitioning and timber ceiling rafters.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    scope: "Bespoke conference tables, timber acoustic wood panels, HVAC re-ducting, decorative light rings, and microcement flooring."
  },
  {
    id: "proj-04",
    title: "Nesto Hypermarket Interior",
    category: "Supermarket & Hypermarket",
    mediaType: "Built Projects",
    location: "Sharjah, UAE",
    tags: ["Custom Shelving", "Signage", "MEP"],
    description: "Full retail layout execution spanning 75,000 sq. ft. Heavy duty powder-coated hypermarket racks, illuminated directional signs, and main billing counter corridors.",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200",
    scope: "Billing counters with conveyor belts, overhead aisle markers, perimeter wall racks, ceiling lighting grids, and custom bakery joinery counters."
  },
  {
    id: "proj-05",
    title: "OFF PRICE Multi-Brand Outlet",
    category: "Fashion & Sports",
    mediaType: "Video Walkthroughs",
    location: "City Centre Mirdif, Dubai",
    tags: ["Fitout", "Metalwork", "Joinery"],
    description: "Video portfolio showcasing the fast-track fitout of OFF PRICE outlet. Focuses on modular grid shelving, wire cages, and overhead industrial duct aesthetics.",
    image: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=1200",
    scope: "Turnkey fitout within 21 nights, suspended metal grids, structural ceiling painting, cash counter carpentry, and testing commissioning."
  },
  {
    id: "proj-06",
    title: "OC Home Experience Center",
    category: "Home & Furniture",
    mediaType: "Render Concepts",
    location: "Al Khobar, KSA",
    tags: ["Joinery", "Lighting", "Glass Partitioning"],
    description: "Concept visualization and architectural planning for a multi-story home experience center, featuring lifestyle room settings and bespoke partition frames.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
    scope: "Pre-construction 3D visual planning, material mockups, color-matching, structural load calculations for hanging partitions."
  },
  {
    id: "proj-07",
    title: "Asics Concept Space",
    category: "Fashion & Sports",
    mediaType: "Built Projects",
    location: "Yas Mall, Abu Dhabi",
    tags: ["Joinery", "Acrylic", "LED Screens"],
    description: "Bespoke sports experience zone for Asics. Incorporates colored acrylic panels, back-lit running platforms, and technical footwear shelving.",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1200",
    scope: "Acrylic CNC lettering, dynamic under-lighting platforms, oak footwear pedestals, and ceiling stretch fabric installations."
  }
];

export const clientsList = [
  { name: "Adidas", logo: "fa-running", segment: "Sportswear & Footwear" },
  { name: "Skechers", logo: "fa-shoe-prints", segment: "Footwear & Retail" },
  { name: "Asics", logo: "fa-bolt", segment: "Performance Footwear" },
  { name: "Landmark Group", logo: "fa-building", segment: "Conglomerate & Lifestyle" },
  { name: "Nesto", logo: "fa-shopping-cart", segment: "Hypermarkets & FMCG" },
  { name: "OFF PRICE", logo: "fa-tags", segment: "Discount Apparel Outlet" },
  { name: "OC Home", logo: "fa-home", segment: "Furniture & Decor" },
  { name: "Max Fashions", logo: "fa-tshirt", segment: "Value Fashion Retail" },
  { name: "Lulu Group", logo: "fa-store", segment: "Supermarkets & Retail" },
  { name: "Centrepoint", logo: "fa-shopping-bag", segment: "Department Stores" }
];

export const newsList = [
  {
    id: "news-01",
    title: "Al Ameen Group Expands Joinery Capacity by 30%",
    category: "Factory Expansion",
    date: "July 12, 2026",
    summary: "Introducing two new state-of-the-art multi-axis CNC machines at the Umm Al Quwain factory to double premium joinery output.",
    content: "To support the growing demand for turnkey luxury fitout projects across Dubai and Riyadh, Al Ameen Group has finalized the installation of two new wood CNC machines. This upgrade boosts output speeds by 30% and refines precision routing capabilities for custom veneer furniture, enhancing our B2B lead times.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "news-02",
    title: "New Retail Tech: Seamless Transparent LED Assemblies Launches",
    category: "R&D Innovations",
    date: "June 25, 2026",
    summary: "Our digital media division introduces a new 75% transparent window LED solution for retail window facades.",
    content: "800 Retail continues to lead in retail technology integration. The newly launched transparent LED screen modules achieve up to 75% visual transparency, allowing natural light to flow through store fronts while displaying bright, dynamic promotional content. Already slated for rollout across three regional luxury boutiques in Q3.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "news-03",
    title: "Skechers Yas Mall Concept Project Successfully Handed Over",
    category: "Project Launches",
    date: "May 10, 2026",
    summary: "Our project execution team has completed the fitout and customized fixture assembly for Skechers Yas Mall within the planned timeline.",
    content: "Deploying a structured 5S Lean manufacturing plan, our in-house site team completed the installation of custom metal fixtures, floating wall shelving, ceiling lightboxes, and central display islands for the Skechers Yas Mall location. The project was completed on-time and verified compliant with local civil defense standards.",
    image: "https://images.unsplash.com/photo-1473187983305-f61502b8afaf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "news-04",
    title: "Adopting the 5S Lean System: Operational Excellence Milestone",
    category: "Corporate Standards",
    date: "March 18, 2026",
    summary: "800 Retail establishes unified 5S Lean principles across metal fabrication and joinery sectors.",
    content: "As part of our commitment to quality and safety, our production facilities have fully adopted the 5S Lean system (Sort, Set in order, Shine, Standardize, Sustain). By organizing workshop layouts and automating supply paths, raw material waste has decreased by 15%, while increasing workforce productivity and safety metrics.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  }
];
