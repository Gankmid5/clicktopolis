// ============================================================================
// CLICKTOPOLIS — BUILD HISTORY ONE CLICK AT A TIME
// ============================================================================

const RANDOM_CITY_NAMES = [
  "New Jericho", "Ur-Kesh", "Aethelgard", "Heliopolis", "Oakhaven",
  "Solaria", "Arcadia", "Nova Avalon", "Byzantium", "Valkyria",
  "Eridu", "Silverkeep", "Aurelia", "Cinderfall", "Starfall",
  "Zirconia", "Mythras", "Alexandria"
];

const ERA_CITY_PREFIXES = [
  "Tribe of",
  "Settlement of",
  "City-State of",
  "Realm of",
  "Republic of",
  "Commonwealth of",
  "Metropolis of",
  "Technopole of",
  "Megacity"
];

const ERAS = [
  {
    id: 0,
    name: "Stone Age",
    short: "Stone",
    threshold: 0,
    icon: "🛖",
    action: "Build Settlement",
    skyColors: ["#3b2316", "#7c4a2d", "#c27d48"],
    hillColors: ["#2d3a24", "#3f5232"],
    revealDesc: "Thatched huts and riverbank farms take root along the fertile valley.",
    news: [
      "Families in {CITY} raise a new row of thatched huts along the riverbank.",
      "First mud-brick granary completed in {CITY}; winter grain reserves doubled.",
      "Village elders in {CITY} lay out foot-paths connecting the huts to the river farms.",
      "Settlers clear driftwood and reeds to expand {CITY}'s southern homesteads."
    ]
  },
  {
    id: 1,
    name: "Bronze Age",
    short: "Bronze",
    threshold: 5000,
    icon: "🧱",
    action: "Lay Mud-Brick",
    skyColors: ["#2c1d12", "#6e4220", "#c87d32"],
    hillColors: ["#4a3b22", "#634e2b"],
    revealDesc: "Stone-lined irrigation canals and bustling walled bazaars transform your village into a city-state!",
    news: [
      "New irrigation canals bring fresh river water to every orchard in {CITY}.",
      "Caravans from three river valleys gather at {CITY}'s Walled Bazaar.",
      "Municipal brickmakers pave {CITY}'s main processional avenue.",
      "Harbor barges unload cedar timber and grain at {CITY}'s canal wharves."
    ]
  },
  {
    id: 2,
    name: "Classical Age",
    short: "Classical",
    threshold: 250000,
    icon: "🏛️",
    action: "Pave Marble Forum",
    skyColors: ["#173152", "#2e5c8a", "#6fa3d2"],
    hillColors: ["#2e472d", "#3d5e3a"],
    revealDesc: "Towering stone aqueducts, public bathhouses, and marble civic forums grace your metropolis!",
    news: [
      "New stone aqueduct delivers fresh mountain water directly to {CITY}'s public fountains.",
      "All paved roads lead to {CITY}, causing historic chariot traffic around the Marble Forum.",
      "Citizens gather beneath the colonnades of {CITY}'s Agora to vote on new waterworks.",
      "{CITY} Amphitheater sells out for tonight's grand civic festival."
    ]
  },
  {
    id: 3,
    name: "Medieval Age",
    short: "Medieval",
    threshold: 15000000,
    icon: "🏰",
    action: "Raise Town Walls",
    skyColors: ["#1a2038", "#353e66", "#646f9e"],
    hillColors: ["#243829", "#314d38"],
    revealDesc: "Timber river watermills, cobblestone guild quarters, and turreted town walls fortify the city!",
    news: [
      "Row of new watermills along {CITY}'s riverfront doubles daily flour and textile output.",
      "Merchant guilds in {CITY} receive a royal town charter and pave the Old Town square.",
      "Masons complete the northern gatehouse and watchtowers of {CITY}'s city walls.",
      "Bell chimes from {CITY}'s new Guildhall clocktower keep market hours across every ward."
    ]
  },
  {
    id: 4,
    name: "Renaissance",
    short: "Renaiss.",
    threshold: 1000000000,
    icon: "🌉",
    action: "Span Grand Canal",
    skyColors: ["#2c193d", "#5e3370", "#9e5b9b"],
    hillColors: ["#2d422c", "#3e593c"],
    revealDesc: "Arched stone canal bridges, merchant exchanges, and domed civic universities flourish!",
    news: [
      "Architects unveil a three-arch stone bridge spanning {CITY}'s Grand Canal.",
      "The Merchant Exchange in {CITY} finances trade fleets departing for four continents.",
      "Students from across the realm enroll at {CITY}'s newly chartered Civic University.",
      "Public piazzas in {CITY} are adorned with marble fountains and gas-lit promenades."
    ]
  },
  {
    id: 5,
    name: "Industrial Age",
    short: "Industrial",
    threshold: 75000000000,
    icon: "🚂",
    action: "Rivet Steel Girder",
    skyColors: ["#262428", "#4d4340", "#8c725c"],
    hillColors: ["#2b3026", "#3b4235"],
    revealDesc: "Municipal power stations, electric streetlamps, and grand central rail terminals electrify the city!",
    news: [
      "Grand Central Station opens in {CITY} with twelve glass-vaulted passenger platforms.",
      "Municipal Power Station switches on, illuminating 10,000 electric streetlamps across {CITY}.",
      "Electric streetcars and commuter trains cut cross-town travel in {CITY} to minutes.",
      "Steel suspension bridges link {CITY}'s industrial harbor to the downtown borough."
    ]
  },
  {
    id: 6,
    name: "Atomic Age",
    short: "Atomic",
    threshold: 6000000000000,
    icon: "🚇",
    action: "Expand Metro Grid",
    skyColors: ["#0f2342", "#1e497a", "#3d82b8"],
    hillColors: ["#1f362c", "#2d4d3e"],
    revealDesc: "Clean nuclear power grids and international jet airports turn your city into a global hub!",
    news: [
      "{CITY} International Airport opens Terminal 4 for non-stop transoceanic jetliners.",
      "Clean fission power plant supplies 100% of {CITY}'s metropolitan electricity grid.",
      "Automated underground metro trains carry two million daily commuters beneath {CITY}.",
      "Mid-century glass high-rises and expressways reshape {CITY}'s expanding skyline."
    ]
  },
  {
    id: 7,
    name: "Information Age",
    short: "Info Age",
    threshold: 500000000000000,
    icon: "🏢",
    action: "Raise Smart Tower",
    skyColors: ["#091d36", "#13426e", "#2274a5"],
    hillColors: ["#172e36", "#21424d"],
    revealDesc: "Supertall glass skyscrapers and 500 km/h Maglev transit corridors create a smart metropolis!",
    news: [
      "New 120-story Glass Skyscraper becomes the tallest tower in {CITY}'s Financial Core.",
      "High-speed Maglev express links {CITY} downtown to the airport in 4 minutes flat.",
      "Smart-grid traffic sensors reduce {CITY} rush-hour congestion by 65%.",
      "Rooftop solar gardens and sky-parks crown every new high-rise in {CITY}."
    ]
  },
  {
    id: 8,
    name: "Cyberpunk Age",
    short: "Cyberpunk",
    threshold: 50000000000000000,
    icon: "🏙️",
    action: "Erect Neon Spire",
    skyColors: ["#0c051c", "#290c4a", "#59126e"],
    hillColors: ["#160d29", "#241442"],
    revealDesc: "Mile-high neon arcology spires and sub-orbital spaceports crown the planetary megacity!",
    news: [
      "Neon Arcology Spire #7 opens its 400th residential sky-deck above {CITY}.",
      "Sub-orbital passenger shuttles depart {CITY} Spaceport every 15 minutes.",
      "Holographic sky-bridges link {CITY}'s upper arcology tiers above the rain clouds.",
      "Autonomous aerocabs weave smoothly between the glowing megatowers of {CITY}."
    ]
  }
];

const BUILDINGS = [
  // Era 0: Stone Age (Settlement Foundations)
  {
    id: "forager",
    name: "Thatched Hut",
    districtName: "Settler Homesteads",
    zoneTag: "Residential",
    era: 0,
    icon: "🛖",
    baseCost: 15,
    baseCps: 0.2,
    pop: 4,
    desc: "Cozy timber-and-reed dwellings sheltering your village's first permanent families."
  },
  {
    id: "megalith",
    name: "Riverbank Farm",
    districtName: "Floodplain Farmlands",
    zoneTag: "Agriculture",
    era: 0,
    icon: "🌾",
    baseCost: 120,
    baseCps: 1.5,
    pop: 12,
    desc: "Fertile riverside crop plots and mud-brick granaries feeding the growing settlement."
  },
  // Era 1: Bronze Age (Early Urban Infrastructure)
  {
    id: "foundry",
    name: "Irrigation Canal",
    districtName: "Canal & Levee Waterworks",
    zoneTag: "Waterworks",
    era: 1,
    icon: "🛶",
    baseCost: 1800,
    baseCps: 14,
    pop: 40,
    desc: "Stone-lined water channels and shaduf lifts irrigating orchards and city gardens."
  },
  {
    id: "ziggurat",
    name: "Walled Bazaar",
    districtName: "Caravan Market Quarter",
    zoneTag: "Commerce",
    era: 1,
    icon: "🏺",
    baseCost: 24000,
    baseCps: 110,
    pop: 160,
    desc: "Bustling mud-brick market squares where river barges and merchant caravans trade goods."
  },
  // Era 2: Classical Age (Civic Engineering)
  {
    id: "aqueduct",
    name: "Stone Aqueduct",
    districtName: "Aqueduct & Public Baths",
    zoneTag: "Waterworks",
    era: 2,
    icon: "🌉",
    baseCost: 320000,
    baseCps: 950,
    pop: 650,
    desc: "Gravity-fed masonry arches delivering fresh mountain water to fountains and bathhouses."
  },
  {
    id: "academy",
    name: "Marble Forum",
    districtName: "Civic Forum & Agora",
    zoneTag: "Civic",
    era: 2,
    icon: "🏛️",
    baseCost: 4500000,
    baseCps: 8200,
    pop: 2400,
    desc: "Colonnaded municipal plazas housing courts, senate chambers, and public markets."
  },
  // Era 3: Medieval Age (River Industry & Chartered Towns)
  {
    id: "watermill",
    name: "River Watermill",
    districtName: "Millers' Riverfront",
    zoneTag: "Industry",
    era: 3,
    icon: "⚙️",
    baseCost: 65000000,
    baseCps: 75000,
    pop: 9000,
    desc: "Timber waterwheels along the city river grinding grain and powering artisan workshops."
  },
  {
    id: "citadel",
    name: "Charter Guildhall",
    districtName: "Old Town & Guild Ward",
    zoneTag: "Commerce",
    era: 3,
    icon: "🏰",
    baseCost: 950000000,
    baseCps: 680000,
    pop: 38000,
    desc: "Cobblestone market streets, half-timbered guildhalls, and fortified stone town walls."
  },
  // Era 4: Renaissance (Mercantile Bridges & Civic Campuses)
  {
    id: "press",
    name: "Merchant Exchange",
    districtName: "Grand Canal Piazza",
    zoneTag: "Finance",
    era: 4,
    icon: "🏦",
    baseCost: 14000000000,
    baseCps: 6200000,
    pop: 130000,
    desc: "Arched stone canal bridges, maritime wharves, and banking houses financing city trade."
  },
  {
    id: "observatory",
    name: "Civic University",
    districtName: "University & Library Quarter",
    zoneTag: "Education",
    era: 4,
    icon: "🎓",
    baseCost: 210000000000,
    baseCps: 58000000,
    pop: 480000,
    desc: "Domed lecture halls, municipal libraries, and botanical gardens educating the citizenry."
  },
  // Era 5: Industrial Age (Utilities & Rail Transit)
  {
    id: "steamworks",
    name: "Coal Power Station",
    districtName: "Municipal Power Grid",
    zoneTag: "Utilities",
    era: 5,
    icon: "🏭",
    baseCost: 3200000000000,
    baseCps: 540000000,
    pop: 1900000,
    desc: "Red-brick turbine halls and dynamos electrifying streetlamps, tramways, and factories."
  },
  {
    id: "railhub",
    name: "Grand Central Station",
    districtName: "Central Railway Terminus",
    zoneTag: "Transit",
    era: 5,
    icon: "🚂",
    baseCost: 48000000000000,
    baseCps: 5000000000,
    pop: 6800000,
    desc: "Vaulted iron-and-glass passenger terminals and steel rail lines linking every borough."
  },
  // Era 6: Atomic Age (Metropolitan Energy & Aviation)
  {
    id: "fission",
    name: "Nuclear Power Plant",
    districtName: "Clean Fission Energy Park",
    zoneTag: "Utilities",
    era: 6,
    icon: "⚛️",
    baseCost: 750000000000000,
    baseCps: 48000000000,
    pop: 25000000,
    desc: "Twin cooling towers and reactor domes supplying gigawatts of clean city electricity."
  },
  {
    id: "cosmodrome",
    name: "International Airport",
    districtName: "International Skyport",
    zoneTag: "Aviation",
    era: 6,
    icon: "✈️",
    baseCost: 12000000000000000,
    baseCps: 460000000000,
    pop: 90000000,
    desc: "Multi-runway jet terminals and air-traffic control towers welcoming global travelers."
  },
  // Era 7: Information Age (High-Rise Skyline & High-Speed Transit)
  {
    id: "fab",
    name: "Glass Skyscraper",
    districtName: "Downtown Financial Core",
    zoneTag: "High-Rise",
    era: 7,
    icon: "🏢",
    baseCost: 190000000000000000,
    baseCps: 4500000000000,
    pop: 320000000,
    desc: "Sleek curtain-wall office towers and fiber-optic exchanges anchoring the downtown skyline."
  },
  {
    id: "quantum",
    name: "Maglev Transit Hub",
    districtName: "High-Speed Maglev Corridor",
    zoneTag: "Transit",
    era: 7,
    icon: "🚄",
    baseCost: 3100000000000000000,
    baseCps: 44000000000000,
    pop: 1150000000,
    desc: "Elevated magnetic-levitation rail lines and AI traffic centers moving millions at 500 km/h."
  },
  // Era 8: Cyberpunk Age (Vertical Megacities & Spaceports)
  {
    id: "arcology",
    name: "Neon Arcology Spire",
    districtName: "Cybernetic Arcology Sector",
    zoneTag: "Megastructure",
    era: 8,
    icon: "🏙️",
    baseCost: 52000000000000000000,
    baseCps: 450000000000000,
    pop: 4600000000,
    desc: "Mile-high self-sustaining vertical city with sky-parks and holographic transit decks."
  },
  {
    id: "dyson",
    name: "Orbital Spaceport",
    districtName: "Sub-Orbital Launch Plaza",
    zoneTag: "Spaceport",
    era: 8,
    icon: "🚀",
    baseCost: 900000000000000000000,
    baseCps: 4800000000000000,
    pop: 18500000000,
    desc: "Electromagnetic launch loops and passenger shuttle docks linking the megacity to orbit."
  }
];

// ============================================================================
// 9 MONUMENTAL CIVIC LANDMARKS & WORLD WONDERS
// ============================================================================
const WONDERS = [
  {
    id: "w_stonehenge",
    era: 0,
    name: "Solstice Sanctuary Ring",
    icon: "🗿",
    cost: 2200,
    effectText: "+25% Click Power & +3% Critical Strike Chance",
    lore: "Colossal standing stones at the heart of the settlement aligned with the solstice sunrise."
  },
  {
    id: "w_gardens",
    era: 1,
    name: "Hanging Gardens Terrace",
    icon: "🌴",
    cost: 110000,
    effectText: "+15% Global CP/s & +50% City Population",
    lore: "Lush ascending stone terraces irrigated by municipal canal screws."
  },
  {
    id: "w_colossus",
    era: 2,
    name: "Grand Civic Colosseum",
    icon: "🏟️",
    cost: 6500000,
    effectText: "+25% Click Power & +15% Global CP/s",
    lore: "A monumental marble amphitheater uniting 80,000 citizens in celebration."
  },
  {
    id: "w_cathedral",
    era: 3,
    name: "Astronomical Clock Spire",
    icon: "⛪",
    cost: 420000000,
    effectText: "All city infrastructure costs 8% less CP to construct",
    lore: "A soaring stone spire housing the city's master mechanical clock and bells."
  },
  {
    id: "w_workshop",
    era: 4,
    name: "Grand Palazzo & Dome",
    icon: "🏛️",
    cost: 28000000000,
    effectText: "+20% Global CP/s & +4% Critical Strike Chance",
    lore: "An octagonal brick-and-marble civic dome crowning the Renaissance skyline."
  },
  {
    id: "w_crystal_palace",
    era: 5,
    name: "Crystal Exhibition Hall",
    icon: "🏢",
    cost: 2200000000000,
    effectText: "+25% Global CP/s",
    lore: "Cast-iron and plate-glass palace hosting the World's Fair of urban engineering."
  },
  {
    id: "w_apollo",
    era: 6,
    name: "World Trade Broadcast Tower",
    icon: "🗼",
    cost: 180000000000000,
    effectText: "Golden Civic Booms give +50% larger rewards & last longer",
    lore: "A 600-meter steel observation and broadcast needle overlooking the metropolis."
  },
  {
    id: "w_cern",
    era: 7,
    name: "Central Smart-Grid Spire",
    icon: "🌐",
    cost: 16000000000000000,
    effectText: "Clicks gain an additional +1% of your total CP/s",
    lore: "An AI-assisted municipal nerve center synchronizing every train, tower, and power line."
  },
  {
    id: "w_orbital_elevator",
    era: 8,
    name: "Bifrost Sky-Elevator",
    icon: "🌌",
    cost: 1800000000000000000,
    effectText: "+50% Global CP/s & crowns your skyline with an orbital tether",
    lore: "A braided carbon-nanotube tether anchoring the Megacity directly to geostationary orbit."
  }
];

// ============================================================================
// CIVIC ORDINANCES & INFRASTRUCTURE UPGRADES
// ============================================================================
const UPGRADES = [];

function registerUpgrades() {
  const tierNames = [
    ["Woven Reed Roofs", "Clay Hearth Chimneys", "Dry-Stone Footings", "Paved Village Lanes"],
    ["Silt Flood Ditches", "Ox-Drawn Plowshares", "Mud-Brick Granaries", "Terraced River Orchards"],
    ["Counterweight Shadufs", "Baked-Brick Sluice Gates", "Masonry Lock Chambers", "Royal Waterworks Board"],
    ["Shaded Linen Awnings", "Standardized Bronze Weights", "Caravanserai Courtyards", "Harbor Wharf Warehouses"],
    ["Pozzolana Hydraulic Mortar", "Double-Tiered Stone Arches", "Settling Cisterns", "Municipal Thermae Baths"],
    ["Paved Via Sacra", "Columned Civic Basilica", "Citizen Rostra Plaza", "Senatorial Municipal Mint"],
    ["Overshot Timber Millwheels", "Stone-Lined Millraces", "Fulling & Bakery Guilds", "Twin-Weir River Dam"],
    ["Cobblestone Thoroughfares", "Guildhall Bell Tower", "Free Market Town Charter", "Star-Bastion City Walls"],
    ["Rialto Stone Arch Bridge", "Double-Entry Clearinghouse", "Maritime Harbor Insurance", "Grand Piazza Arcade"],
    ["Public Reading Rotunda", "Botanical Teaching Gardens", "Astronomical Clock Cupola", "School of Civil Architecture"],
    ["High-Pressure Steam Boilers", "Rotary Dynamo Generators", "Electric Streetlamp Network", "High-Voltage Substations"],
    ["Bessemer Steel Rails", "Pneumatic Track Switches", "Vaulted Glass Train Shed", "Underground Subway Links"],
    ["Pressurized Reactor Domes", "Hyperbolic Cooling Towers", "Automated Grid Dispatch", "Superconducting City Ring"],
    ["Instrument Landing Radar", "Parallel Jet Runways", "Automated People-Movers", "International Concourse Hub"],
    ["Tuned Mass Wind Dampers", "Double-Deck Express Lifts", "Solar Curtain-Wall Glass", "Sky-Lobby Transit Bridges"],
    ["Superconducting Guideways", "Aerodynamic Nose Cones", "AI Headway Control", "Vacuum-Tube Express Loops"],
    ["Hydroponic Sky-Atriums", "Holographic Transit Decks", "Atmospheric Rain Catchers", "Autonomous Drone Skyways"],
    ["Electromagnetic Launch Track", "Cryogenic Fuel Plazas", "Orbital Commuter Lounges", "Planetary Gateway Ring"]
  ];

  const tierThresholds = [1, 10, 25, 50];
  const tierCostMults = [12, 160, 2200, 35000];

  BUILDINGS.forEach((b, bIdx) => {
    tierThresholds.forEach((reqCount, tIdx) => {
      UPGRADES.push({
        id: `b_${b.id}_t${tIdx}`,
        name: tierNames[bIdx][tIdx],
        icon: b.icon,
        era: b.era,
        cost: Math.round(b.baseCost * tierCostMults[tIdx]),
        desc: `${b.name} (${b.districtName}) output is DOUBLED (2x).`,
        type: "building_mult",
        target: b.id,
        mult: 2,
        req: (s) => (s.buildings[b.id] || 0) >= reqCount
      });
    });
  });

  const clickUpgrades = [
    { id: "c_flint", era: 0, name: "Timber Framing Mallets", icon: "🔨", cost: 100, desc: "Base click +1 CP and +0.25% of your CP/s per click.", flat: 1, cpsPct: 0.0025, reqCp: 35 },
    { id: "c_lever", era: 1, name: "Mud-Brick Molds & Plumb Lines", icon: "🧱", cost: 8000, desc: "Click power x1.25 and +0.25% of your CP/s per click.", mult: 1.25, cpsPct: 0.0025, reqCp: 2500 },
    { id: "c_crane", era: 2, name: "Roman Treadwheel Crane", icon: "🏗️", cost: 500000, desc: "Click power x1.25 and +0.25% of your CP/s per click.", mult: 1.25, cpsPct: 0.0025, reqCp: 150000 },
    { id: "c_guild", era: 3, name: "Master Mason Guild Square", icon: "📐", cost: 35000000, desc: "Click power x1.35 and +0.35% of your CP/s per click.", mult: 1.35, cpsPct: 0.0035, reqCp: 10000000 },
    { id: "c_da_vinci", era: 4, name: "Geared Hoist & Scaffolding", icon: "⚙️", cost: 2500000000, desc: "Click power x1.35 and +0.35% of your CP/s per click.", mult: 1.35, cpsPct: 0.0035, reqCp: 600000000 },
    { id: "c_pneumatic", era: 5, name: "Steam Riveting Gantry", icon: "🔩", cost: 180000000000, desc: "Click power x1.4 and +0.35% of your CP/s per click.", mult: 1.4, cpsPct: 0.0035, reqCp: 50000000000 },
    { id: "c_laser", era: 6, name: "Tower Crane Fleet", icon: "🏗️", cost: 15000000000000, desc: "Click power x1.4 and +0.4% of your CP/s per click.", mult: 1.4, cpsPct: 0.004, reqCp: 4000000000000 },
    { id: "c_exo", era: 7, name: "Automated Prefab Robotics", icon: "🦾", cost: 1200000000000000, desc: "Click power x1.5 and +0.4% of your CP/s per click.", mult: 1.5, cpsPct: 0.004, reqCp: 350000000000000 },
    { id: "c_neural", era: 8, name: "Nano-Swarm Assembler Grid", icon: "🏙️", cost: 120000000000000000, desc: "Click power x1.5 and +0.4% of your CP/s per click.", mult: 1.5, cpsPct: 0.004, reqCp: 35000000000000000 }
  ];

  clickUpgrades.forEach((cu) => {
    UPGRADES.push({
      id: cu.id,
      era: cu.era,
      name: cu.name,
      icon: cu.icon,
      cost: cu.cost,
      desc: cu.desc,
      type: "click_boost",
      flat: cu.flat || 0,
      mult: cu.mult || 1,
      cpsPct: cu.cpsPct || 0,
      req: (s) => s.currentEra >= cu.era && s.totalCp >= cu.reqCp
    });
  });

  const eraTechs = [
    { id: "g_wheel", era: 1, name: "Paved Processional Roads", icon: "🛣️", cost: 15000, mult: 1.15, desc: "All city infrastructure output +15%." },
    { id: "g_alphabet", era: 2, name: "Municipal Zoning Code", icon: "📜", cost: 900000, mult: 1.15, desc: "All city infrastructure output +15%." },
    { id: "g_compass", era: 3, name: "Hanseatic Port Authority", icon: "⚓", cost: 60000000, mult: 1.20, desc: "All city infrastructure output +20%." },
    { id: "g_scientific", era: 4, name: "Grand Urban Masterplan", icon: "🗺️", cost: 4500000000, mult: 1.20, desc: "All city infrastructure output +20%." },
    { id: "g_dynamo", era: 5, name: "Alternating Current City Grid", icon: "💡", cost: 350000000000, mult: 1.25, desc: "All city infrastructure output +25%." },
    { id: "g_internet", era: 6, name: "Metropolitan Ring-Road & Metro", icon: "🚇", cost: 28000000000000, mult: 1.25, desc: "All city infrastructure output +25%." },
    { id: "g_agi", era: 7, name: "Fiber-Optic Smart City Mesh", icon: "📡", cost: 2500000000000000, mult: 1.30, desc: "All city infrastructure output +30%." },
    { id: "g_singularity", era: 8, name: "Autonomous Megacity AI Core", icon: "🌌", cost: 250000000000000000, mult: 1.50, desc: "All city infrastructure output +50%." }
  ];

  eraTechs.forEach((et) => {
    UPGRADES.push({
      id: et.id,
      era: et.era,
      name: et.name,
      icon: et.icon,
      cost: et.cost,
      desc: et.desc,
      type: "global_mult",
      mult: et.mult,
      req: (s) => s.currentEra >= et.era
    });
  });
}

// ============================================================================
// ACHIEVEMENTS (100 Total Achievements with Spoiler Protection)
// ============================================================================
const ACHIEVEMENTS = [];

function registerAchievements() {
  const eraAchTitles = [
    ["Dawn of Humanity", "Strike your first spark in the Stone Age."],
    ["Age of Alloy", "Advance your civilization into the Bronze Age."],
    ["Pax Classica", "Enter the Classical Age of marble and philosophy."],
    ["Feudal Dominion", "Raise banners and enter the Medieval Age."],
    ["Rebirth of Reason", "Flourish in the Renaissance."],
    ["Age of Steam & Iron", "Ignite the boilers of the Industrial Age."],
    ["Splitting the Sky", "Harness the atom in the Atomic Age."],
    ["Silicon Horizon", "Connect the planet in the Information Age."],
    ["High Tech, Low Life", "Reach the neon-drenched Cyberpunk Age."]
  ];
  ERAS.forEach((era, idx) => {
    ACHIEVEMENTS.push({
      id: `ach_era_${idx}`,
      era: idx,
      name: eraAchTitles[idx][0],
      desc: eraAchTitles[idx][1],
      icon: era.icon,
      check: (s) => s.highestEra >= idx
    });
  });

  const cpMilestones = [
    [100, "Campfire Tales", "🔥", 0],
    [5000, "Village Elders", "🛖", 0],
    [100000, "City-State", "🏺", 1],
    [5000000, "Imperial Capital", "👑", 2],
    [250000000, "Continental Power", "🗺️", 3],
    [10000000000, "Industrial Titan", "🏭", 4],
    [500000000000, "Planetary Metropolis", "🌍", 5],
    [25000000000000, "Megacity One", "🌆", 6],
    [1000000000000000, "Cybernetic Sprawl", "🌃", 7],
    [50000000000000000, "Ecumenopolis", "🌐", 8],
    [2.5e18, "Orbital Ringworld", "🪐", 8],
    [1e20, "Solar Hegemony", "☀️", 8],
    [5e21, "Galactic Nexus", "🌌", 8],
    [1e23, "Architect of Eternity", "♾️"]
  ];
  cpMilestones.forEach(([amt, title, icon, minEra = 8], i) => {
    ACHIEVEMENTS.push({
      id: `ach_cp_${i}`,
      era: minEra,
      name: title,
      desc: `Generate ${formatNum(amt)} total Civilization Points.`,
      icon,
      check: (s) => s.allTimeCp >= amt
    });
  });

  const clickMilestones = [
    [1, "First Strike", "🪨"],
    [50, "Calloused Hands", "🔨"],
    [250, "Master Artisan", "⚒️"],
    [1000, "Relentless Builder", "🏗️"],
    [2500, "Bionic Finger", "🦾"],
    [5000, "Overclocked Reflexes", "⚡"],
    [10000, "Cyber-Carpal Champion", "🏆"],
    [25000, "God of the Forge", "🌟"]
  ];
  clickMilestones.forEach(([clicks, title, icon]) => {
    ACHIEVEMENTS.push({
      id: `ach_clicks_${clicks}`,
      era: 0,
      name: title,
      desc: `Click the city core ${clicks.toLocaleString()} times.`,
      icon,
      check: (s) => s.totalClicks >= clicks
    });
  });

  const critMilestones = [
    [1, "Lucky Cleave", "🎯", (s) => (s.totalCrits || 0) >= 1, "Land your first Critical Click (2x)."],
    [50, "Precision Engineer", "💥", (s) => (s.totalCrits || 0) >= 50, "Land 50 Critical Clicks."],
    [250, "Grandmaster Striker", "☄️", (s) => (s.totalCrits || 0) >= 250, "Land 250 Critical Clicks."],
    [1000, "Unstoppable Striker", "🔥", (s) => (s.totalCrits || 0) >= 1000, "Land 1,000 Critical Clicks."]
  ];
  critMilestones.forEach(([_, title, icon, fn, desc], idx) => {
    ACHIEVEMENTS.push({
      id: `ach_crit_${idx}`,
      era: 0,
      name: title,
      desc,
      icon,
      check: fn
    });
  });

  BUILDINGS.forEach((b) => {
    ACHIEVEMENTS.push({
      id: `ach_b_${b.id}_1`,
      era: b.era,
      bId: b.id,
      name: `${b.name} Pioneer`,
      desc: `Construct your first ${b.name}.`,
      icon: b.icon,
      check: (s) => (s.buildings[b.id] || 0) >= 1
    });
    ACHIEVEMENTS.push({
      id: `ach_b_${b.id}_25`,
      era: b.era,
      bId: b.id,
      name: `${b.name} Magnate`,
      desc: `Own at least 25 ${b.name}s at once.`,
      icon: b.icon,
      check: (s) => (s.buildings[b.id] || 0) >= 25
    });
  });

  const totalBldMilestones = [
    [10, "Hamlet Planner", "🏘️"],
    [50, "Urban Developer", "🏙️"],
    [100, "Grand Commissioner", "📐"],
    [250, "Megastructure Engineer", "🌉"],
    [500, "Skyline Sculptor", "🌇"],
    [1000, "Supreme Urbanist", "🏛️"]
  ];
  totalBldMilestones.forEach(([cnt, title, icon]) => {
    ACHIEVEMENTS.push({
      id: `ach_totbld_${cnt}`,
      era: 0,
      name: title,
      desc: `Own ${cnt} total buildings across your city.`,
      icon,
      check: (s) => getTotalBuildings(s) >= cnt
    });
  });

  const techMilestones = [
    [1, "Curious Mind", "🔍"],
    [10, "Natural Philosopher", "📜"],
    [25, "Chief Technologist", "🔬"],
    [50, "Transhuman Savant", "🧬"],
    [75, "Omniscient Archive", "🧠"]
  ];
  techMilestones.forEach(([cnt, title, icon]) => {
    ACHIEVEMENTS.push({
      id: `ach_tech_${cnt}`,
      era: 0,
      name: title,
      desc: `Research ${cnt} technologies.`,
      icon,
      check: (s) => s.upgrades.length >= cnt
    });
  });

  WONDERS.forEach((w) => {
    ACHIEVEMENTS.push({
      id: `ach_wonder_${w.id}`,
      era: w.era,
      name: `Wonder: ${w.name}`,
      desc: `Erect the ${w.name}.`,
      icon: w.icon,
      check: (s) => (s.wonders || []).includes(w.id)
    });
  });
  ACHIEVEMENTS.push(
    { id: "ach_wonders_3", era: 2, name: "Seven Wonders Aspirant", desc: "Construct 3 World Wonders.", icon: "🏛️", check: (s) => (s.wonders || []).length >= 3 },
    { id: "ach_wonders_6", era: 5, name: "Monumental Heritage", desc: "Construct 6 World Wonders.", icon: "🗽", check: (s) => (s.wonders || []).length >= 6 },
    { id: "ach_wonders_9", era: 8, name: "Cradle of Miracles", desc: "Construct all 9 World Wonders.", icon: "🌟", check: (s) => (s.wonders || []).length >= 9 }
  );

  const specialAchs = [
    { id: "ach_anom_1", era: 0, name: "Glitch in the Timeline", desc: "Click 1 Golden Temporal Anomaly.", icon: "✨", check: (s) => s.anomaliesClicked >= 1 },
    { id: "ach_anom_7", era: 0, name: "Chrono Hunter", desc: "Click 7 Golden Temporal Anomalies.", icon: "☄️", check: (s) => s.anomaliesClicked >= 7 },
    { id: "ach_anom_25", era: 0, name: "Master of Paradoxes", desc: "Click 25 Golden Temporal Anomalies.", icon: "🌟", check: (s) => s.anomaliesClicked >= 25 },
    { id: "ach_prestige_1", era: 1, name: "Time Traveler", desc: "Trigger a Time Rift and reset the timeline once.", icon: "⏳", check: (s) => s.prestiges >= 1 },
    { id: "ach_shards_10", era: 2, name: "Chrono-Crystalline", desc: "Accumulate at least 10 Time Shards.", icon: "💎", check: (s) => s.shards >= 10 },
    { id: "ach_shards_100", era: 4, name: "Lord of Eons", desc: "Accumulate at least 100 Time Shards.", icon: "👑", check: (s) => s.shards >= 100 }
  ];
  specialAchs.forEach((a) => ACHIEVEMENTS.push(a));
}

// ============================================================================
// PROCEDURAL WEB AUDIO SYNTHESIZER ENGINE (SoundFX)
// ============================================================================
let audioCtx = null;

function ensureAudio() {
  if (!state.sfxEnabled) return null;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  } catch (_) {
    return null;
  }
}

const SoundFX = {
  note(freq, duration = 0.08, type = "sine", vol = 0.05, delay = 0, pitchEnd = null) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (pitchEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, pitchEnd), t0 + duration);
    }
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.01);
  },

  noise(duration = 0.04, filterFreq = 1200, vol = 0.04, delay = 0) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(filterFreq, t0);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t0);
  },

  click(era) {
    // Slight natural pitch variation (+/- 3%) so rapid clicking sounds organic and crisp
    const pitchBoost = 0.97 + Math.random() * 0.06;
    if (era === 0) {
      this.noise(0.03, 1800 * pitchBoost, 0.05);
      this.note(190 * pitchBoost, 0.045, "triangle", 0.055, 0, 95);
    } else if (era === 1 || era === 2) {
      this.note(520 * pitchBoost, 0.07, "triangle", 0.045, 0, 480);
      this.note(1040 * pitchBoost, 0.04, "sine", 0.025);
    } else if (era === 3 || era === 4) {
      this.noise(0.025, 950, 0.04);
      this.note(340 * pitchBoost, 0.065, "sawtooth", 0.03, 0, 220);
      this.note(680 * pitchBoost, 0.05, "triangle", 0.035);
    } else if (era === 5 || era === 6) {
      this.noise(0.045, 650, 0.045);
      this.note(150 * pitchBoost, 0.06, "sawtooth", 0.04, 0, 110);
      this.note(440 * pitchBoost, 0.05, "sine", 0.03);
    } else {
      this.note(720 * pitchBoost, 0.065, "sawtooth", 0.035, 0, 210);
      this.note(360 * pitchBoost, 0.05, "square", 0.025, 0.01, 540);
    }
  },

  crit() {
    this.note(140, 0.14, "sawtooth", 0.06, 0, 55);
    this.note(587.33, 0.11, "triangle", 0.06, 0);
    this.note(880, 0.13, "triangle", 0.06, 0.035);
    this.note(1174.66, 0.18, "sine", 0.055, 0.07);
  },

  build(era) {
    const base = 220 + era * 28;
    this.noise(0.04, 500, 0.045);
    this.note(base, 0.07, "triangle", 0.05, 0);
    this.note(base * 1.25, 0.09, "triangle", 0.05, 0.055);
  },

  research() {
    this.note(440, 0.09, "triangle", 0.05, 0);
    this.note(554.37, 0.09, "triangle", 0.05, 0.06);
    this.note(659.25, 0.16, "sine", 0.06, 0.12);
  },

  achievement() {
    this.note(783.99, 0.1, "sine", 0.05, 0);
    this.note(1046.5, 0.22, "sine", 0.06, 0.07);
  },

  wonder() {
    const notes = [392.0, 493.88, 587.33, 783.99];
    notes.forEach((f, idx) => {
      this.note(f, 0.22, "triangle", 0.065, idx * 0.09);
      this.note(f * 0.5, 0.22, "sawtooth", 0.03, idx * 0.09);
    });
  },

  eraAdvance() {
    this.noise(0.25, 300, 0.07, 0);
    this.note(110, 0.45, "sawtooth", 0.07, 0, 65);
    const fanfare = [293.66, 369.99, 440.0, 587.33, 880.0];
    fanfare.forEach((f, idx) => {
      this.note(f, 0.38, "triangle", 0.065, 0.08 + idx * 0.08);
    });
  },

  anomalySpawn() {
    this.note(880, 0.12, "sine", 0.035, 0, 1320);
    this.note(1320, 0.15, "sine", 0.035, 0.1, 990);
  },

  anomalyCatch() {
    this.note(523.25, 0.08, "triangle", 0.06, 0);
    this.note(659.25, 0.08, "triangle", 0.06, 0.05);
    this.note(783.99, 0.08, "triangle", 0.06, 0.10);
    this.note(1046.5, 0.25, "sine", 0.07, 0.15);
  }
};

// ============================================================================
// GAME STATE & RUNTIME VARIABLES
// ============================================================================
const SAVE_KEY = "clicktopolis_save_v1";

function createDefaultState() {
  const buildings = {};
  BUILDINGS.forEach((b) => (buildings[b.id] = 0));
  return {
    cityName: "",
    cp: 0,
    totalCp: 0,
    allTimeCp: 0,
    totalClicks: 0,
    totalCrits: 0,
    anomaliesClicked: 0,
    currentEra: 0,
    highestEra: 0,
    shards: 0,
    prestiges: 0,
    doctrine: "balanced",
    sfxEnabled: true,
    buildings,
    upgrades: [],
    revealedUpgrades: [],
    revealedBuildings: ["forager"],
    wonders: [],
    achievements: [],
    startedAt: Date.now(),
    lastSavedAt: Date.now()
  };
}

let state = createDefaultState();
let buyMode = 1;
let achFilter = "all";
let boostMultiplier = 1;
let boostExpiresAt = 0;
let boostName = "⚡ Chrono Overdrive (2x)";

// ============================================================================
// NUMBER FORMATTING & HELPERS
// ============================================================================
const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

function formatNum(n, decimals = 1) {
  if (!isFinite(n) || n < 0) return "0";
  if (n < 1000) {
    return n % 1 === 0 ? n.toFixed(0) : n.toFixed(decimals);
  }
  const tier = Math.floor(Math.log10(Math.abs(n)) / 3);
  if (tier === 0) return n.toFixed(0);
  const suffix = SUFFIXES[tier] || `e${tier * 3}`;
  const scale = Math.pow(10, tier * 3);
  const scaled = n / scale;
  return `${scaled.toFixed(scaled >= 100 ? 1 : 2)}${suffix}`;
}

function getCityDisplayName() {
  return state.cityName && state.cityName.trim() ? state.cityName.trim() : "New Jericho";
}

function getFullCityTitle() {
  const prefix = ERA_CITY_PREFIXES[state.currentEra] || "City of";
  return `${prefix} ${getCityDisplayName()}`;
}

function hasWonder(wId) {
  return (state.wonders || []).includes(wId);
}

function getTotalBuildings(s = state) {
  return Object.values(s.buildings).reduce((a, b) => a + b, 0);
}

function getPopulation() {
  let pop = 1;
  BUILDINGS.forEach((b) => {
    pop += (state.buildings[b.id] || 0) * b.pop;
  });
  if (hasWonder("w_gardens")) pop = Math.round(pop * 1.5);
  return pop;
}

function getBuildingDiscount() {
  return hasWonder("w_cathedral") ? 0.92 : 1.0;
}

function getBuildingBulkCost(b, count) {
  const owned = state.buildings[b.id] || 0;
  const r = 1.18;
  const firstCost = b.baseCost * getBuildingDiscount() * Math.pow(r, owned);
  if (count === 1) return Math.ceil(firstCost);
  return Math.ceil(firstCost * ((Math.pow(r, count) - 1) / (r - 1)));
}

function getMaxAffordableCount(b) {
  const owned = state.buildings[b.id] || 0;
  const r = 1.18;
  const firstCost = b.baseCost * getBuildingDiscount() * Math.pow(r, owned);
  if (state.cp < firstCost) return 1;
  const n = Math.floor(Math.log((state.cp * (r - 1)) / firstCost + 1) / Math.log(r));
  return Math.max(1, n);
}

function getPurchasePlan(b) {
  if (buyMode === "max") {
    const qty = getMaxAffordableCount(b);
    return { qty, cost: getBuildingBulkCost(b, qty) };
  }
  return { qty: buyMode, cost: getBuildingBulkCost(b, buyMode) };
}

// ============================================================================
// PRODUCTION, DOCTRINE, WONDER & CLICK POWER CALCULATIONS
// ============================================================================
function getCritChance() {
  let chance = 0.05;
  if (state.doctrine === "balanced") chance += 0.02;
  else if (state.doctrine === "industrious") chance += 0.05;
  if (hasWonder("w_stonehenge")) chance += 0.03;
  if (hasWonder("w_workshop")) chance += 0.04;
  return chance;
}

function getGlobalMultiplier() {
  let mult = 1;
  mult *= 1 + state.achievements.length * 0.01;
  mult *= 1 + state.shards * 0.10;

  if (state.doctrine === "balanced") mult *= 1.10;
  else if (state.doctrine === "industrious") mult *= 0.90;
  else if (state.doctrine === "prosperity") mult *= 1.20;

  if (hasWonder("w_gardens")) mult *= 1.15;
  if (hasWonder("w_colossus")) mult *= 1.15;
  if (hasWonder("w_workshop")) mult *= 1.20;
  if (hasWonder("w_crystal_palace")) mult *= 1.25;
  if (hasWonder("w_orbital_elevator")) mult *= 1.50;

  UPGRADES.forEach((u) => {
    if (u.type === "global_mult" && state.upgrades.includes(u.id)) {
      mult *= u.mult;
    }
  });

  if (Date.now() < boostExpiresAt) {
    mult *= boostMultiplier;
  }
  return mult;
}

function getBuildingSingleCps(b) {
  let cps = b.baseCps;
  UPGRADES.forEach((u) => {
    if (u.type === "building_mult" && u.target === b.id && state.upgrades.includes(u.id)) {
      cps *= u.mult;
    }
  });
  return cps * getGlobalMultiplier();
}

function getTotalCps() {
  let total = 0;
  BUILDINGS.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    if (count > 0) {
      total += count * getBuildingSingleCps(b);
    }
  });
  return total;
}

function getClickPower() {
  let base = 1;
  let mult = 1;
  let cpsPct = 0;

  UPGRADES.forEach((u) => {
    if (u.type === "click_boost" && state.upgrades.includes(u.id)) {
      base += u.flat || 0;
      mult *= u.mult || 1;
      cpsPct += u.cpsPct || 0;
    }
  });

  if (hasWonder("w_stonehenge")) mult *= 1.25;
  if (hasWonder("w_colossus")) mult *= 1.25;
  if (hasWonder("w_cern")) cpsPct += 0.01;

  if (state.doctrine === "industrious") mult *= 1.25;
  else if (state.doctrine === "prosperity") mult *= 0.85;

  // Achievement & Shard bonus applies to base clicks without inflating the passive-doctrine multiplier
  const progressionBonus = (1 + state.achievements.length * 0.01) * (1 + state.shards * 0.10) * (Date.now() < boostExpiresAt ? boostMultiplier : 1);
  const fromCps = getTotalCps() * cpsPct;
  return (base * mult * progressionBonus) + fromCps;
}

function getPendingShards() {
  const totalPossible = Math.floor(Math.cbrt(state.allTimeCp / 2500000));
  return Math.max(0, totalPossible - state.shards);
}

// ============================================================================
// DISCOVERY / FOG-OF-HISTORY CHECKS
// ============================================================================
function checkProximityReveals() {
  if (!Array.isArray(state.revealedBuildings)) state.revealedBuildings = ["forager"];
  if (!Array.isArray(state.revealedUpgrades)) state.revealedUpgrades = [];
  if (!Array.isArray(state.revealedWonders)) state.revealedWonders = [];

  let changedBld = false;
  BUILDINGS.forEach((b) => {
    if (!state.revealedBuildings.includes(b.id)) {
      if ((state.buildings[b.id] || 0) > 0 || (state.currentEra >= b.era && (state.totalCp >= b.baseCost * 0.45 || state.cp >= b.baseCost * 0.35))) {
        state.revealedBuildings.push(b.id);
        changedBld = true;
      }
    }
  });

  let changedUpg = false;
  UPGRADES.forEach((u) => {
    if (!state.upgrades.includes(u.id) && !state.revealedUpgrades.includes(u.id)) {
      if (u.req(state) && (state.totalCp >= u.cost * 0.50 || state.cp >= u.cost * 0.35)) {
        state.revealedUpgrades.push(u.id);
        changedUpg = true;
      }
    }
  });

  let changedWnd = false;
  WONDERS.forEach((w) => {
    if (!state.revealedWonders.includes(w.id)) {
      if (hasWonder(w.id) || (state.highestEra >= w.era && (state.totalCp >= w.cost * 0.35 || state.cp >= w.cost * 0.25))) {
        state.revealedWonders.push(w.id);
        changedWnd = true;
      }
    }
  });

  if (changedBld) renderBuildingsList();
  if (changedUpg) renderUpgrades();
  if (changedWnd) renderWonders();
}

function showEraRevealBanner(era) {
  const banner = document.getElementById("era-reveal-banner");
  if (!banner) return;
  document.getElementById("era-reveal-icon").textContent = era.icon;
  document.getElementById("era-reveal-title").textContent = `THE ${era.name.toUpperCase()}`;
  document.getElementById("era-reveal-desc").textContent = era.revealDesc;
  banner.classList.remove("hidden");
  banner.style.animation = "none";
  void banner.offsetWidth;
  banner.style.animation = "";
  setTimeout(() => {
    banner.classList.add("hidden");
  }, 4200);
}

function checkEraProgression() {
  let newEra = 0;
  for (let i = ERAS.length - 1; i >= 0; i--) {
    if (state.totalCp >= ERAS[i].threshold) {
      newEra = i;
      break;
    }
  }
  if (newEra > state.currentEra) {
    state.currentEra = newEra;
    if (newEra > state.highestEra) state.highestEra = newEra;
    applyEraTheme();
    checkProximityReveals();
    renderBuildingsList();
    renderInfrastructureDistricts();
    renderUpgrades();
    renderWonders();
    renderAchievements();
    showEraRevealBanner(ERAS[newEra]);
    SoundFX.eraAdvance();
  }
}

function applyEraTheme() {
  const era = ERAS[state.currentEra];
  document.body.setAttribute("data-era", String(era.id));
  document.getElementById("era-badge").textContent = era.name.toUpperCase();
  document.getElementById("city-title-display").textContent = getFullCityTitle();
  document.getElementById("clicker-icon").textContent = era.icon;
  document.getElementById("clicker-caption").textContent = era.action;
  renderEraTimeline();
}

function renderEraTimeline() {
  const container = document.getElementById("era-timeline");
  container.innerHTML = "";
  ERAS.forEach((era) => {
    const isDiscovered = state.highestEra >= era.id;
    const div = document.createElement("div");
    div.className = "era-step" +
      (state.currentEra >= era.id ? " reached" : "") +
      (state.currentEra === era.id ? " current" : "");
    if (isDiscovered) {
      div.title = `${era.name} (Requires ${formatNum(era.threshold)} CP)`;
      div.innerHTML = `<div>${era.icon}</div><div style="font-size:0.62rem;margin-top:2px;">${era.short}</div>`;
    } else {
      div.title = `Uncharted Epoch — Reach ${formatNum(era.threshold)} CP to discover!`;
      div.innerHTML = `<div>❓</div><div style="font-size:0.62rem;margin-top:2px;">???</div>`;
    }
    container.appendChild(div);
  });
}

function updateTopHUD() {
  const cps = getTotalCps();
  const cpc = getClickPower();
  const resEl = document.getElementById("res-amount");
  resEl.textContent = formatNum(state.cp, state.cp < 100 ? 1 : 0);
  document.getElementById("res-cps").textContent = formatNum(cps, 1);
  document.getElementById("res-cpc").textContent = formatNum(cpc, 1);
  document.getElementById("res-pop").textContent = formatNum(getPopulation(), 0);
  document.getElementById("res-shards").textContent = formatNum(state.shards, 0);
  document.getElementById("pending-shards").textContent = `+${formatNum(getPendingShards(), 0)}`;
  document.getElementById("city-title-display").textContent = getFullCityTitle();

  // Panorama overlay label
  const panEraEl = document.getElementById("panorama-era-title");
  if (panEraEl) panEraEl.textContent = `${ERAS[state.currentEra].icon} ${getFullCityTitle()} (${ERAS[state.currentEra].name})`;
  const panCpsEl = document.getElementById("panorama-cps-share");
  if (panCpsEl) panCpsEl.textContent = `City Output: +${formatNum(cps, 1)} CP/s`;

  document.getElementById("bld-total-badge").textContent = getTotalBuildings();

  const critEl = document.getElementById("crit-chance");
  if (critEl) critEl.textContent = `${Math.round(getCritChance() * 100)}%`;

  const buffBar = document.getElementById("active-buff-bar");
  const remMs = boostExpiresAt - Date.now();
  if (remMs > 0) {
    buffBar.classList.remove("hidden");
    document.getElementById("buff-label").textContent = boostName;
    document.getElementById("buff-timer").textContent = `${(remMs / 1000).toFixed(1)}s`;
  } else {
    buffBar.classList.add("hidden");
  }

  const nextEra = ERAS[state.currentEra + 1];
  const currEra = ERAS[state.currentEra];
  if (nextEra) {
    const span = nextEra.threshold - currEra.threshold;
    const prog = Math.min(100, Math.max(0, ((state.totalCp - currEra.threshold) / span) * 100));
    const nextName = state.highestEra >= nextEra.id ? nextEra.name : "???";
    document.getElementById("next-era-label").textContent = `Next Epoch: ${nextName} (${formatNum(nextEra.threshold)} CP)`;
    document.getElementById("era-progress-pct").textContent = `${prog.toFixed(1)}%`;
    document.getElementById("era-progress-fill").style.width = `${prog}%`;
  } else {
    document.getElementById("next-era-label").textContent = "Final Epoch Reached";
    document.getElementById("era-progress-pct").textContent = "100%";
    document.getElementById("era-progress-fill").style.width = "100%";
  }
}

// ============================================================================
// VISUAL INFRASTRUCTURE DISTRICTS (Living Animated Cookie Clicker-Style Rows!)
// ============================================================================
function drawUnitGraphicOnStrip(ctx, bId, x, gy, idx, isNight = false) {
  const phase = animTick * 2.2 + idx * 1.1;

  switch (bId) {
    case "forager": {
      // Thatched Hut: Mud-brick walls + golden reed roof + flickering hearth + rising smoke puffs
      ctx.fillStyle = "#b87d4b";
      ctx.fillRect(x - 11, gy - 14, 22, 14);
      drawPolygon(ctx, [[x, gy - 29], [x - 15, gy - 13], [x + 15, gy - 13]], "#e0a958", "#784719", 1.2);
      // Animated rising hearth smoke puff from apex
      const smokeY = (animTick * 8 + idx * 5) % 14;
      ctx.fillStyle = `rgba(226, 232, 240, ${(0.55 - smokeY / 28).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x + Math.sin(phase) * 2, gy - 31 - smokeY, 2 + smokeY * 0.12, 0, Math.PI * 2);
      ctx.fill();
      // Flickering warm doorway & window
      ctx.fillStyle = isNight ? (Math.sin(phase * 2) > 0 ? "#fde047" : "#f97316") : "#3b2110";
      ctx.fillRect(x - 3, gy - 9, 6, 9);
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(x + 4, gy - 11, 4, 4);
      // Small outdoor campfire on even huts
      if (idx % 2 === 0) {
        const flameH = 3 + Math.sin(phase * 3) * 1.5;
        ctx.fillStyle = "#f97316";
        ctx.fillRect(x + 13, gy - flameH, 3, flameH);
      }
      break;
    }

    case "megalith": {
      // Riverbank Farm: Mud-brick granary silo + spinning wind-vane + swaying golden wheat
      ctx.fillStyle = "#c28b46";
      ctx.fillRect(x - 14, gy - 20, 10, 20);
      drawPolygon(ctx, [[x - 9, gy - 28], [x - 15, gy - 20], [x - 3, gy - 20]], "#d97706");
      // Spinning wooden wind-vane atop granary
      const vaneX = Math.cos(phase) * 3.5;
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x - 9 - vaneX, gy - 30);
      ctx.lineTo(x - 9 + vaneX, gy - 30);
      ctx.stroke();
      // Irrigated soil & swaying golden wheat rows
      ctx.fillStyle = "#4d7c0f";
      ctx.fillRect(x - 2, gy - 4, 18, 4);
      const sway = Math.sin(phase * 0.9) * 1.6;
      ctx.fillStyle = "#facc15";
      for (let wx = x; wx <= x + 13; wx += 4) {
        ctx.fillRect(wx + sway * 0.4, gy - 14, 2, 10);
        ctx.fillRect(wx - 1 + sway, gy - 16, 4, 3);
      }
      break;
    }

    case "foundry": {
      // Irrigation Canal: Flowing blue water channel + pivoting shaduf water-lift + swaying date palm
      ctx.fillStyle = "#d6d3d1";
      ctx.fillRect(x - 16, gy - 8, 32, 8);
      ctx.fillStyle = "#0ea5e9";
      ctx.fillRect(x - 14, gy - 6, 28, 5);
      // Animated water ripple
      const ripOffset = ((animTick * 10 + idx * 6) % 18) - 9;
      ctx.fillStyle = "#bae6fd";
      ctx.fillRect(x + ripOffset - 4, gy - 4, 7, 1.5);
      // Swaying palm tree
      const palmSway = Math.sin(phase * 0.7) * 1.5;
      ctx.fillStyle = "#78350f";
      ctx.fillRect(x - 9, gy - 24, 3, 16);
      drawPolygon(ctx, [[x - 7 + palmSway, gy - 27], [x - 16, gy - 21], [x + 2, gy - 21]], "#15803d");
      drawPolygon(ctx, [[x - 7 + palmSway, gy - 30], [x - 14, gy - 24], [x, gy - 24]], "#22c55e");
      // Pivoting shaduf lever & dipping water bucket
      const tilt = Math.sin(phase * 0.8) * 4;
      ctx.fillStyle = "#92400e";
      ctx.fillRect(x + 6, gy - 20, 2, 12);
      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x + 1, gy - 19 - tilt);
      ctx.lineTo(x + 13, gy - 19 + tilt);
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(x + 12, gy - 15 + tilt, 3, 3);
      break;
    }

    case "ziggurat": {
      // Walled Bazaar: Sandstone arch gate + fluttering merchant awning + glowing lantern
      ctx.fillStyle = "#d49e54";
      ctx.fillRect(x - 15, gy - 24, 18, 24);
      ctx.fillStyle = isNight ? "#fde047" : "#451a03";
      ctx.beginPath();
      ctx.arc(x - 6, gy, 5, Math.PI, 0);
      ctx.fill();
      // Fluttering market awning stall
      const flap = Math.sin(phase * 1.4) * 1.3;
      drawPolygon(ctx, [[x + 3, gy - 16], [x + 16, gy - 11 + flap], [x + 3, gy - 11]], idx % 2 === 0 ? "#dc2626" : "#2563eb");
      ctx.fillStyle = "#fde047";
      ctx.fillRect(x + 5, gy - 11, 9, 11);
      ctx.fillStyle = "#b45309";
      ctx.fillRect(x + 7, gy - 5, 5, 5);
      // Glowing hanging bazaar lantern
      ctx.fillStyle = Math.sin(phase * 2) > -0.3 ? "#fef08a" : "#f97316";
      ctx.fillRect(x + 14, gy - 10 + flap, 2.5, 2.5);
      break;
    }

    case "aqueduct": {
      // Stone Aqueduct: Double-tier Roman masonry arch + animated flowing water crest
      ctx.fillStyle = "#d6d3d1";
      ctx.fillRect(x - 18, gy - 30, 36, 6);
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(x - 18, gy - 33, 36, 3);
      // Animated white water wave crest flowing across top channel
      const waveX = ((animTick * 18 + idx * 9) % 30) - 15;
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(x + waveX, gy - 33, 7, 2);
      ctx.fillStyle = "#e7e5e4";
      ctx.fillRect(x - 14, gy - 24, 7, 24);
      ctx.fillRect(x + 7, gy - 24, 7, 24);
      ctx.fillRect(x - 18, gy - 14, 36, 4);
      break;
    }

    case "academy": {
      // Marble Forum: Classical white marble colonnade + crimson pediment + flickering braziers
      ctx.fillStyle = "#f5f5f4";
      ctx.fillRect(x - 16, gy - 4, 32, 4);
      ctx.fillRect(x - 13, gy - 22, 4, 18);
      ctx.fillRect(x - 5, gy - 22, 4, 18);
      ctx.fillRect(x + 2, gy - 22, 4, 18);
      ctx.fillRect(x + 9, gy - 22, 4, 18);
      drawPolygon(ctx, [[x, gy - 33], [x - 18, gy - 22], [x + 18, gy - 22]], "#dc2626", "#f5f5f4", 1.2);
      // Flickering golden forum brazier flame
      const flame = 2.5 + Math.sin(phase * 3) * 1.2;
      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(x, gy - 6, flame, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "watermill": {
      // River Watermill: Half-timbered millhouse + ROTATING spoked wooden waterwheel & water splash!
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(x - 15, gy - 22, 20, 22);
      drawPolygon(ctx, [[x - 5, gy - 34], [x - 17, gy - 22], [x + 7, gy - 22]], "#991b1b");
      ctx.fillStyle = isNight ? "#fde047" : "#78350f";
      ctx.fillRect(x - 10, gy - 15, 5, 5);
      // Millstream & splash
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(x + 1, gy - 4, 16, 4);
      const wx = x + 9;
      const wy = gy - 9;
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(wx, wy, 7.5, 0, Math.PI * 2);
      ctx.stroke();
      // Rotating spokes
      ctx.lineWidth = 1.4;
      for (let s = 0; s < 4; s++) {
        const ang = animTick * 1.8 + idx + (s * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(wx - Math.cos(ang) * 7, wy - Math.sin(ang) * 7);
        ctx.lineTo(wx + Math.cos(ang) * 7, wy + Math.sin(ang) * 7);
        ctx.stroke();
      }
      // Churning water droplets
      ctx.fillStyle = "#bae6fd";
      ctx.fillRect(wx + 5 + Math.sin(phase * 3) * 2, gy - 5, 2, 2);
      break;
    }

    case "citadel": {
      // Charter Guildhall: Steep-gabled guildhall + stone bell tower + waving guild banner
      ctx.fillStyle = "#fde68a";
      ctx.fillRect(x - 15, gy - 24, 20, 24);
      drawPolygon(ctx, [[x - 5, gy - 36], [x - 17, gy - 24], [x + 7, gy - 24]], "#b91c1c");
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(x + 5, gy - 34, 10, 34);
      drawPolygon(ctx, [[x + 10, gy - 46], [x + 4, gy - 34], [x + 16, gy - 34]], "#2563eb");
      // Waving guild pennant atop spire
      const flagWave = Math.sin(phase * 2) * 2;
      drawPolygon(ctx, [[x + 10, gy - 46], [x + 18, gy - 44 + flagWave], [x + 10, gy - 41]], "#facc15");
      // Glowing stained glass & swinging bell
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(x + 8 + Math.sin(phase) * 0.8, gy - 28, 4, 4);
      ctx.fillRect(x - 10, gy - 16, 4, 5);
      break;
    }

    case "press": {
      // Merchant Exchange: Terracotta palazzo + arched canal bridge + bobbing gondola
      ctx.fillStyle = "#c2410c";
      ctx.fillRect(x - 16, gy - 28, 20, 28);
      drawPolygon(ctx, [[x - 6, gy - 37], [x - 18, gy - 28], [x + 6, gy - 28]], "#7c2d12");
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(x - 12, gy - 22, 4, 6);
      ctx.fillRect(x - 4, gy - 22, 4, 6);
      // Canal & arched stone bridge
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(x + 4, gy - 5, 14, 5);
      ctx.fillStyle = "#e7e5e4";
      ctx.fillRect(x + 4, gy - 12, 14, 4);
      // Gently bobbing merchant gondola under bridge
      const boatX = x + 9 + Math.sin(phase * 0.8) * 3;
      ctx.fillStyle = "#451a03";
      ctx.fillRect(boatX - 3, gy - 6, 7, 2.5);
      ctx.fillStyle = "#fde047";
      ctx.fillRect(boatX + 2, gy - 7.5, 2, 2);
      break;
    }

    case "observatory": {
      // Civic University: Limestone university facade + emerald rotunda dome + rotating telescope & beacon
      ctx.fillStyle = "#d97706";
      ctx.fillRect(x - 15, gy - 22, 30, 22);
      ctx.fillStyle = isNight ? "#fef08a" : "#fef3c7";
      ctx.fillRect(x - 11, gy - 18, 4, 14);
      ctx.fillRect(x - 2, gy - 18, 4, 14);
      ctx.fillRect(x + 7, gy - 18, 4, 14);
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(x, gy - 22, 12, Math.PI, 0);
      ctx.fill();
      // Rotating dome aperture slit & pulsing lantern
      const slitX = Math.sin(phase * 0.6) * 5;
      ctx.strokeStyle = "#064e3b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + slitX, gy - 22);
      ctx.lineTo(x + slitX * 0.5, gy - 33);
      ctx.stroke();
      ctx.fillStyle = Math.sin(phase * 2) > 0 ? "#fef08a" : "#f59e0b";
      ctx.fillRect(x - 1.5, gy - 38, 3, 5);
      break;
    }

    case "steamworks": {
      // Coal Power Station: Red-brick turbine hall + twin smokestacks + billowing steam puffs
      ctx.fillStyle = "#991b1b";
      ctx.fillRect(x - 15, gy - 24, 30, 24);
      ctx.fillStyle = "#57534e";
      ctx.fillRect(x + 2, gy - 42, 5, 18);
      ctx.fillRect(x + 9, gy - 40, 5, 16);
      // Billowing smoke/steam puffs rising from stacks
      const puff1 = (animTick * 12 + idx * 4) % 16;
      const puff2 = (animTick * 12 + idx * 4 + 8) % 16;
      ctx.fillStyle = `rgba(214, 211, 209, ${(0.65 - puff1 / 26).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x + 4.5, gy - 44 - puff1, 2.5 + puff1 * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(214, 211, 209, ${(0.65 - puff2 / 26).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x + 11.5, gy - 42 - puff2, 2.2 + puff2 * 0.15, 0, Math.PI * 2);
      ctx.fill();
      // Pulsing boiler furnace windows
      ctx.fillStyle = Math.sin(phase * 2) > 0 ? "#fde047" : "#f97316";
      ctx.fillRect(x - 11, gy - 16, 6, 9);
      ctx.fillRect(x - 2, gy - 16, 6, 9);
      break;
    }

    case "railhub": {
      // Grand Central Station: Vaulted glass train shed + chugging steam locomotive with steam puffs
      ctx.fillStyle = "#334155";
      ctx.fillRect(x - 16, gy - 22, 20, 22);
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(x - 6, gy - 22, 10, Math.PI, 0);
      ctx.fill();
      // Chugging locomotive oscillating slightly
      const chugX = Math.sin(phase * 1.2) * 2.5;
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(x + 2 + chugX, gy - 14, 14, 10);
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(x + 2 + chugX, gy - 4, 15, 4);
      ctx.fillStyle = "#475569";
      ctx.fillRect(x + 11 + chugX, gy - 20, 4, 6);
      // Headlamp & steam puff
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(x + 15 + chugX, gy - 12, 2, 3);
      const locoPuff = (animTick * 14 + idx * 5) % 12;
      ctx.fillStyle = "rgba(248, 250, 252, 0.65)";
      ctx.beginPath();
      ctx.arc(x + 13 + chugX - locoPuff * 0.4, gy - 22 - locoPuff, 2.5 + locoPuff * 0.12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "fission": {
      // Nuclear Power Plant: Hyperbolic cooling tower + rising vapor plume + pulsing Cherenkov core glow
      const vap = (animTick * 9 + idx * 6) % 15;
      ctx.fillStyle = `rgba(241, 245, 249, ${(0.6 - vap / 26).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x - 8.5, gy - 36 - vap, 3.5 + vap * 0.2, 0, Math.PI * 2);
      ctx.fill();
      drawPolygon(ctx, [[x - 12, gy - 34], [x - 16, gy], [x - 1, gy], [x - 5, gy - 34]], "#e2e8f0");
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(x + 1, gy - 16, 14, 16);
      ctx.beginPath();
      ctx.arc(x + 8, gy - 16, 7, Math.PI, 0);
      ctx.fill();
      // Pulsing Cherenkov blue reactor core window
      ctx.fillStyle = Math.sin(phase * 2) > 0 ? "#38bdf8" : "#0284c7";
      ctx.fillRect(x + 4, gy - 12, 8, 4);
      break;
    }

    case "cosmodrome": {
      // International Airport: Control tower + rotating radar dish + blinking strobe + taxiing jetliner
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(x - 13, gy - 36, 5, 36);
      drawPolygon(ctx, [[x - 16, gy - 42], [x - 5, gy - 42], [x - 7, gy - 35], [x - 14, gy - 35]], "#0284c7");
      // Rotating radar dish atop control tower
      const radW = Math.cos(phase * 1.6) * 4.5;
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x - 10.5 - radW, gy - 45);
      ctx.lineTo(x - 10.5 + radW, gy - 45);
      ctx.stroke();
      if (Math.floor(animTick * 4 + idx) % 2 === 0) {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(x - 11.5, gy - 48, 2, 2);
      }
      // White jetliner on runway with taxi movement
      const jetShift = Math.sin(phase * 0.9) * 2;
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(x - 4 + jetShift, gy - 11, 20, 6);
      drawPolygon(ctx, [[x + 12 + jetShift, gy - 11], [x + 16 + jetShift, gy - 20], [x + 16 + jetShift, gy - 11]], "#2563eb");
      drawPolygon(ctx, [[x + 2 + jetShift, gy - 8], [x + 8 + jetShift, gy - 8], [x + 4 + jetShift, gy - 2]], "#94a3b8");
      break;
    }

    case "fab": {
      // Glass Skyscraper: Reflective blue high-rise + animated exterior glass elevator + blinking strobe
      ctx.fillStyle = "#0369a1";
      ctx.fillRect(x - 12, gy - 42, 24, 42);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x - 12, gy - 42, 24, 42);
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(x - 1, gy - 50, 2, 8);
      if (Math.floor(animTick * 3 + idx) % 2 === 0) {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(x - 1.5, gy - 52, 3, 3);
      }
      for (let wy = gy - 37; wy < gy - 4; wy += 6) {
        ctx.fillStyle = isNight ? "#bae6fd" : "#7dd3fc";
        ctx.fillRect(x - 8, wy, 16, 3);
      }
      // Animated exterior glass sky-elevator riding up & down
      const elevY = gy - 22 + Math.sin(phase * 0.85) * 15;
      ctx.fillStyle = "#fde047";
      ctx.fillRect(x + 9, elevY, 3, 5);
      break;
    }

    case "quantum": {
      // Maglev Transit Hub: Elevated guideway + gliding 500 km/h bullet train + cyan magnetic sparks
      ctx.fillStyle = "#64748b";
      ctx.fillRect(x - 12, gy - 12, 4, 12);
      ctx.fillRect(x + 8, gy - 12, 4, 12);
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(x - 18, gy - 16, 36, 4);
      // Gliding Maglev train car
      const glideX = Math.sin(phase * 1.5) * 3.5;
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(x - 14 + glideX, gy - 25, 24, 8);
      drawPolygon(ctx, [[x + 10 + glideX, gy - 25], [x + 18 + glideX, gy - 17], [x + 10 + glideX, gy - 17]], "#f8fafc");
      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(x - 12 + glideX, gy - 22, 22, 3);
      // Cyan magnetic levitation glow under train
      ctx.fillStyle = "rgba(6, 182, 212, 0.85)";
      ctx.fillRect(x - 14 + glideX, gy - 17, 28, 1.5);
      break;
    }

    case "arcology": {
      // Neon Arcology Spire: Cyber-spire + pulsing neon sky-bridges + darting flying spinner
      const neonColor = idx % 2 === 0 ? "#f43f5e" : "#06b6d4";
      drawPolygon(ctx, [[x - 6, gy - 46], [x - 15, gy], [x + 15, gy], [x + 6, gy - 46]], "#1e1b4b", neonColor, 1.5);
      ctx.fillStyle = Math.sin(phase * 2) > 0 ? "#10b981" : "#06b6d4";
      ctx.fillRect(x - 9, gy - 26, 18, 3);
      ctx.fillStyle = "#fde047";
      for (let wy = gy - 38; wy < gy - 4; wy += 8) {
        ctx.fillRect(x - 5, wy, 3, 4);
        ctx.fillRect(x + 2, wy, 3, 4);
      }
      // Orbiting flying cyber-spinner around spire
      const spinX = x + Math.cos(phase * 1.4) * 14;
      const spinY = gy - 34 + Math.sin(phase * 1.4) * 5;
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(spinX - 2, spinY, 5, 2);
      break;
    }

    default: {
      // Orbital Spaceport: Curved electromagnetic launch loop + ascending delta shuttle & plasma trail
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(x - 15, gy - 14, 30, 14);
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x - 14, gy - 14);
      ctx.quadraticCurveTo(x, gy - 18, x + 14, gy - 44);
      ctx.stroke();
      // Animated launch shuttle accelerating up the electromagnetic track
      const t = ((animTick * 0.75 + idx * 0.35) % 1);
      const sx = (1 - t) * (1 - t) * (x - 12) + 2 * (1 - t) * t * x + t * t * (x + 14);
      const sy = (1 - t) * (1 - t) * (gy - 14) + 2 * (1 - t) * t * (gy - 19) + t * t * (gy - 46);
      // Golden plasma exhaust plume
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(sx - 3, sy + 3, 2.8, 0, Math.PI * 2);
      ctx.fill();
      drawPolygon(ctx, [[sx + 4, sy - 5], [sx - 4, sy + 2], [sx + 3, sy + 3]], "#f8fafc");
      break;
    }
  }
}

function enableHorizontalDragScroll(el) {
  if (!el || el.dataset.dragBound) return;
  el.dataset.dragBound = "1";
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener("mouseleave", () => {
    isDown = false;
  });
  el.addEventListener("mouseup", () => {
    isDown = false;
  });
  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
  el.addEventListener("wheel", (e) => {
    if (el.scrollWidth > el.clientWidth && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 0.8;
    }
  }, { passive: false });
}

function drawDistrictStripCanvas(cvs, b, count) {
  if (!cvs) return;
  const ctx = cvs.getContext("2d");
  const cw = cvs.width;
  const ch = cvs.height;

  const nightFactor = (1 - Math.cos(dayCyclePhase * Math.PI * 2)) / 2;
  const isNight = nightFactor > 0.45;
  const isDuskOrDawn = nightFactor > 0.22 && nightFactor < 0.72;

  // 1. Era Sky Gradient synced with the City Day/Dusk/Night Cycle
  const eraColors = ERAS[b.era].skyColors;
  const bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
  bgGrad.addColorStop(0, eraColors[0]);
  bgGrad.addColorStop(1, eraColors[1]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, cw, ch);

  if (isDuskOrDawn) {
    ctx.fillStyle = "rgba(249, 115, 22, 0.16)";
    ctx.fillRect(0, 0, cw, ch);
  }
  if (nightFactor > 0.05) {
    ctx.fillStyle = `rgba(5, 8, 22, ${(nightFactor * 0.52).toFixed(2)})`;
    ctx.fillRect(0, 0, cw, ch);
  }

  // 2. Twinkling Night Stars or Drifting Day Clouds across the strip
  if (isNight || b.era === 8) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    for (let sx = 24; sx < cw; sx += 65) {
      const sy = 6 + ((sx * 7) % 18);
      if (Math.sin(animTick * 2 + sx) > -0.2) {
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
    }
  } else {
    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    for (let cx = 0; cx < cw; cx += 210) {
      const cloudX = ((cx + animTick * 6) % (cw + 80)) - 40;
      ctx.beginPath();
      ctx.roundRect(cloudX, 7 + (cx % 10), 42, 8, 4);
      ctx.fill();
    }
  }

  // 3. Rolling Horizon Hills
  ctx.fillStyle = ERAS[b.era].hillColors[0];
  ctx.beginPath();
  ctx.moveTo(0, ch - 14);
  for (let hx = 0; hx <= cw; hx += 120) {
    ctx.quadraticCurveTo(hx + 60, ch - 30, hx + 120, ch - 14);
  }
  ctx.lineTo(cw, ch);
  ctx.lineTo(0, ch);
  ctx.closePath();
  ctx.fill();

  // 4. Ground Terrace & District Thoroughfare Road
  ctx.fillStyle = b.era >= 5 ? "#27272a" : "#3f5232";
  ctx.fillRect(0, ch - 14, cw, 14);
  ctx.fillStyle = b.era === 0 ? "#6b4c35" : b.era <= 4 ? "#78716c" : "#18181b";
  ctx.fillRect(0, ch - 5, cw, 5);

  // Streetlamps along modern/medieval district strips at night
  if (b.era >= 2) {
    for (let lx = 48; lx < cw; lx += 80) {
      ctx.fillStyle = "#52525b";
      ctx.fillRect(lx, ch - 19, 1.5, 6);
      if (isNight || isDuskOrDawn) {
        ctx.fillStyle = b.era === 8 ? "#06b6d4" : "#fef08a";
        ctx.fillRect(lx - 0.5, ch - 21, 2.5, 2.5);
      }
    }
  }

  // 5. Draw all Animated Infrastructure Units along the strip
  const visibleUnits = Math.min(60, count);
  const spacing = 40;
  for (let i = 0; i < visibleUnits; i++) {
    const ux = 28 + i * spacing;
    drawUnitGraphicOnStrip(ctx, b.id, ux, ch - 12, i, isNight);
  }

  // 6. Living Foreground District Traffic (Villagers, Carts, Cars, or Hover-Pods)
  const agentCount = Math.min(12, Math.max(3, Math.ceil(visibleUnits / 3)));
  for (let a = 0; a < agentCount; a++) {
    const dir = a % 2 === 0 ? 1 : -1;
    const speed = b.era >= 5 ? 16 : 8;
    const rawPos = (a * 137 + animTick * speed * dir) % cw;
    const ax = rawPos < 0 ? rawPos + cw : rawPos;
    const ay = ch - 4;

    if (b.era <= 4) {
      // Walking citizen / merchant cart
      ctx.fillStyle = a % 2 === 0 ? "#fde047" : "#f97316";
      ctx.fillRect(ax, ay - 3, 4, 3);
    } else {
      // Vehicle / transit pod with night headlights
      ctx.fillStyle = b.era === 8 ? (a % 2 === 0 ? "#06b6d4" : "#f43f5e") : "#38bdf8";
      ctx.fillRect(ax, ay - 3, 8, 3);
      if (isNight || isDuskOrDawn) {
        ctx.fillStyle = "rgba(254, 240, 138, 0.75)";
        ctx.fillRect(dir > 0 ? ax + 8 : ax - 6, ay - 2, 6, 1.5);
      }
    }
  }
}

function drawAllDistrictCanvases() {
  const cityTab = document.getElementById("tab-city");
  if (!cityTab || !cityTab.classList.contains("active")) return;

  BUILDINGS.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    if (count <= 0) return;
    const cvs = document.getElementById(`dist-cvs-${b.id}`);
    if (cvs) {
      drawDistrictStripCanvas(cvs, b, count);
    }
  });
}

function renderInfrastructureDistricts() {
  const container = document.getElementById("infrastructure-districts");
  if (!container) return;

  const totalCps = getTotalCps();
  const ownedBuildings = BUILDINGS.filter((b) => (state.buildings[b.id] || 0) > 0);

  const summaryNote = document.getElementById("districts-summary-note");
  if (summaryNote) {
    summaryNote.textContent = ownedBuildings.length > 0
      ? `${ownedBuildings.length} Active Districts • ${getTotalBuildings().toLocaleString()} Structures (Drag or use ◀ ▶ to pan)`
      : "Construct buildings on the right to expand your city districts";
  }

  if (ownedBuildings.length === 0) {
    container.innerHTML = `<div class="district-empty">🛖 Click the <strong>Build Settlement</strong> emblem on the left to gather your first <strong>15 CP</strong>, then construct a <strong>Thatched Hut</strong> on the right to establish your first City District!</div>`;
    return;
  }

  const emptyEl = container.querySelector(".district-empty");
  if (emptyEl) emptyEl.remove();

  // Remove any strips for buildings with count === 0 (e.g. after prestige or reset)
  Array.from(container.querySelectorAll(".district-strip")).forEach((el) => {
    const bId = el.getAttribute("data-bid");
    if (!bId || (state.buildings[bId] || 0) <= 0) {
      el.remove();
    }
  });

  ownedBuildings.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    const bCps = count * getBuildingSingleCps(b);
    const shareNum = totalCps > 0 ? (bCps / totalCps) * 100 : 0;
    const sharePct = shareNum.toFixed(1);

    const visibleUnits = Math.min(60, count);
    const cw = Math.max(680, visibleUnits * 40 + 135);
    const ch = 76;

    let strip = document.getElementById(`dist-strip-${b.id}`);
    if (!strip) {
      strip = document.createElement("div");
      strip.className = "district-strip";
      strip.id = `dist-strip-${b.id}`;
      strip.setAttribute("data-bid", b.id);
      strip.innerHTML = `
        <div class="district-strip-header">
          <div class="district-title-group">
            <span>${b.icon} ${b.name}</span>
            <span class="district-count-pill" id="dist-cnt-${b.id}">×${count}</span>
          </div>
          <div class="district-stats-group">
            <span class="district-cps" id="dist-cps-${b.id}">+${formatNum(bCps, 1)} CP/s</span>
            <span class="district-share" id="dist-share-${b.id}">(${sharePct}%)</span>
            <div class="district-pan-btns">
              <button class="district-pan-btn" data-pan="-180" title="Pan District Left">◀</button>
              <button class="district-pan-btn" data-pan="180" title="Pan District Right">▶</button>
            </div>
          </div>
        </div>
        <div class="district-share-bar">
          <div class="district-share-fill" id="dist-bar-${b.id}" style="width: ${sharePct}%;"></div>
        </div>
        <div class="district-scroll-wrap" id="dist-scroll-${b.id}">
          <canvas class="district-canvas" id="dist-cvs-${b.id}" width="${cw}" height="${ch}"></canvas>
        </div>
      `;
      container.appendChild(strip);

      const scrollWrap = strip.querySelector(".district-scroll-wrap");
      enableHorizontalDragScroll(scrollWrap);
      strip.querySelectorAll(".district-pan-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const delta = parseInt(btn.getAttribute("data-pan"), 10);
          scrollWrap.scrollBy({ left: delta, behavior: "smooth" });
        });
      });
    } else {
      // Update existing strip in-place so horizontal scroll position is preserved!
      const cntEl = document.getElementById(`dist-cnt-${b.id}`);
      if (cntEl) cntEl.textContent = `×${count}`;
      const cpsEl = document.getElementById(`dist-cps-${b.id}`);
      if (cpsEl) cpsEl.textContent = `+${formatNum(bCps, 1)} CP/s`;
      const shareEl = document.getElementById(`dist-share-${b.id}`);
      if (shareEl) shareEl.textContent = `(${sharePct}%)`;
      const barEl = document.getElementById(`dist-bar-${b.id}`);
      if (barEl) barEl.style.width = `${sharePct}%`;
    }

    const cvs = document.getElementById(`dist-cvs-${b.id}`);
    if (cvs) {
      if (cvs.width !== cw) cvs.width = cw;
      if (cvs.height !== ch) cvs.height = ch;
      drawDistrictStripCanvas(cvs, b, count);
    }
  });
}

function updateDistrictsStats() {
  const totalCps = getTotalCps();
  BUILDINGS.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    if (count <= 0) return;
    const cpsEl = document.getElementById(`dist-cps-${b.id}`);
    const shareEl = document.getElementById(`dist-share-${b.id}`);
    const barEl = document.getElementById(`dist-bar-${b.id}`);
    if (!cpsEl && !shareEl && !barEl) return;
    const bCps = count * getBuildingSingleCps(b);
    const sharePct = totalCps > 0 ? ((bCps / totalCps) * 100).toFixed(1) : "0.0";
    if (cpsEl) cpsEl.textContent = `+${formatNum(bCps, 1)} CP/s`;
    if (shareEl) shareEl.textContent = `(${sharePct}%)`;
    if (barEl) barEl.style.width = `${sharePct}%`;
  });
}

// ============================================================================
// RIGHT PANEL: UPGRADES TRAY & BUILDINGS SHOP (WITH SPOILER PROTECTION)
// ============================================================================
function renderBuildingsList() {
  const list = document.getElementById("buildings-list");
  list.innerHTML = "";

  let shownMystery = false;

  BUILDINGS.forEach((b) => {
    const owned = state.buildings[b.id] || 0;
    const isRevealed = (state.revealedBuildings || []).includes(b.id) || owned > 0;

    if (isRevealed) {
      const plan = getPurchasePlan(b);
      const canAfford = state.cp >= plan.cost;
      const singleCps = getBuildingSingleCps(b);

      const row = document.createElement("button");
      row.className = `building-row ${canAfford ? "affordable" : "unaffordable"}`;
      row.id = `b-row-${b.id}`;
      row.onclick = () => buyBuilding(b.id);

      row.innerHTML = `
        <div class="b-icon">${b.icon}</div>
        <div class="b-details">
          <div class="b-top">
            <span class="b-name">${b.name}</span>
            <span class="b-era-tag">${b.zoneTag} • ${ERAS[b.era].short}</span>
          </div>
          <div class="b-desc">${b.desc}</div>
          <div class="b-meta">
            <span class="b-cost" id="b-cost-${b.id}">⚡ ${formatNum(plan.cost)} CP ${plan.qty > 1 ? `(x${plan.qty})` : ""}</span>
            <span class="b-prod" id="b-prod-${b.id}">+${formatNum(singleCps)} /s</span>
          </div>
        </div>
        <div class="b-count" id="b-cnt-${b.id}">${owned}</div>
      `;
      list.appendChild(row);
    } else if (!shownMystery) {
      shownMystery = true;
      const mysteryRow = document.createElement("div");
      mysteryRow.className = "building-row mystery";
      const hintText = b.era > state.currentEra
        ? "Advance to the next Epoch to unlock new urban infrastructure"
        : `Gather ~${formatNum(Math.ceil(b.baseCost * 0.45))} CP to unveil this city blueprint`;
      mysteryRow.innerHTML = `
        <div class="b-icon">❓</div>
        <div class="b-details">
          <div class="b-top">
            <span class="b-name">Uncharted City Infrastructure</span>
          </div>
          <div class="b-desc">${hintText}</div>
          <div class="b-meta">
            <span class="b-cost">🔒 Blueprint Shrouded</span>
          </div>
        </div>
        <div class="b-count">?</div>
      `;
      list.appendChild(mysteryRow);
    }
  });
}

function updateBuildingsAffordability() {
  BUILDINGS.forEach((b) => {
    const row = document.getElementById(`b-row-${b.id}`);
    if (!row) return;
    const plan = getPurchasePlan(b);
    const canAfford = state.cp >= plan.cost;
    row.classList.toggle("affordable", canAfford);
    row.classList.toggle("unaffordable", !canAfford);

    const costEl = document.getElementById(`b-cost-${b.id}`);
    if (costEl) costEl.textContent = `⚡ ${formatNum(plan.cost)} CP ${plan.qty > 1 ? `(x${plan.qty})` : ""}`;
    const prodEl = document.getElementById(`b-prod-${b.id}`);
    if (prodEl) prodEl.textContent = `+${formatNum(getBuildingSingleCps(b))} /s`;
    const cntEl = document.getElementById(`b-cnt-${b.id}`);
    if (cntEl) cntEl.textContent = state.buildings[b.id] || 0;
  });
}

function buyBuilding(bId) {
  const b = BUILDINGS.find((x) => x.id === bId);
  if (!b) return;
  const plan = getPurchasePlan(b);
  if (state.cp < plan.cost) return;

  state.cp -= plan.cost;
  state.buildings[b.id] = (state.buildings[b.id] || 0) + plan.qty;
  SoundFX.build(b.era);

  checkProximityReveals();
  renderBuildingsList();
  renderInfrastructureDistricts();
  renderUpgrades();
  checkAchievements();
  updateTopHUD();
}

let hoveredUpgradeId = null;

function setUpgradeInspector(u, isMystery = false, reqMet = false) {
  const insp = document.getElementById("upgrade-inspector");
  if (!insp) return;
  if (isMystery) {
    hoveredUpgradeId = "__mystery__";
    insp.innerHTML = `
      <div class="insp-top">
        <span>📜 Undiscovered Civic Upgrade</span>
        <span class="insp-cost">🔒 Shrouded</span>
      </div>
      <div>${reqMet ? `Gather ~${formatNum(Math.ceil(u.cost * 0.5))} CP to unveil this civic upgrade.` : "Expand your city infrastructure to unlock new municipal upgrades."}</div>
    `;
    return;
  }
  if (!u) {
    hoveredUpgradeId = null;
    insp.textContent = "Hover over a civic upgrade tile above to inspect its effect and cost.";
    return;
  }
  hoveredUpgradeId = u.id;
  insp.innerHTML = `
    <div class="insp-top">
      <span>${u.icon} ${u.name}</span>
      <span class="insp-cost">⚡ ${formatNum(u.cost)} CP</span>
    </div>
    <div>${u.desc}</div>
  `;
}

function renderUpgrades() {
  const tray = document.getElementById("upgrades-tray");
  const researchedContainer = document.getElementById("researched-list");
  if (!tray) return;
  tray.innerHTML = "";
  if (researchedContainer) researchedContainer.innerHTML = "";

  const available = UPGRADES.filter(
    (u) => !state.upgrades.includes(u.id) && (state.revealedUpgrades || []).includes(u.id)
  );
  available.sort((a, b) => a.cost - b.cost);

  const nextHidden = UPGRADES.filter(
    (u) => !state.upgrades.includes(u.id) && !(state.revealedUpgrades || []).includes(u.id) && u.era <= state.currentEra
  ).sort((a, b) => a.cost - b.cost)[0];

  document.getElementById("upgrade-badge").textContent = available.length;
  const resCntEl = document.getElementById("researched-count");
  if (resCntEl) resCntEl.textContent = state.upgrades.length;

  available.forEach((u) => {
    const canAfford = state.cp >= u.cost;
    const tile = document.createElement("button");
    tile.className = `upgrade-tile ${canAfford ? "affordable" : "locked"}`;
    tile.id = `upg-card-${u.id}`;
    tile.textContent = u.icon;
    tile.onmouseenter = () => setUpgradeInspector(u);
    tile.onfocus = () => setUpgradeInspector(u);
    tile.onclick = () => buyUpgrade(u.id);
    tray.appendChild(tile);
  });

  if (nextHidden) {
    const reqMet = nextHidden.req(state);
    const mTile = document.createElement("div");
    mTile.className = "upgrade-tile mystery";
    mTile.textContent = "🔭";
    mTile.onmouseenter = () => setUpgradeInspector(nextHidden, true, reqMet);
    tray.appendChild(mTile);
  }

  const stillHovered = available.find((u) => u.id === hoveredUpgradeId);
  if (stillHovered) {
    setUpgradeInspector(stillHovered);
  } else if (hoveredUpgradeId === "__mystery__" && nextHidden) {
    setUpgradeInspector(nextHidden, true, nextHidden.req(state));
  } else if (available.length > 0) {
    setUpgradeInspector(available[0]);
  } else if (nextHidden) {
    setUpgradeInspector(nextHidden, true, nextHidden.req(state));
  } else {
    setUpgradeInspector(null);
  }

  if (researchedContainer) {
    state.upgrades.forEach((uId) => {
      const u = UPGRADES.find((x) => x.id === uId);
      if (!u) return;
      const chip = document.createElement("div");
      chip.className = "researched-chip";
      chip.title = u.desc;
      chip.textContent = `${u.icon} ${u.name}`;
      researchedContainer.appendChild(chip);
    });
  }
}

function updateUpgradesAffordability() {
  UPGRADES.forEach((u) => {
    const card = document.getElementById(`upg-card-${u.id}`);
    if (!card) return;
    const canAfford = state.cp >= u.cost;
    card.classList.toggle("affordable", canAfford);
    card.classList.toggle("locked", !canAfford);
  });
}

function buyUpgrade(uId) {
  const u = UPGRADES.find((x) => x.id === uId);
  if (!u || state.upgrades.includes(uId) || state.cp < u.cost) return;

  state.cp -= u.cost;
  state.upgrades.push(uId);
  SoundFX.research();

  checkProximityReveals();
  renderUpgrades();
  renderBuildingsList();
  renderInfrastructureDistricts();
  checkAchievements();
  updateTopHUD();
}

function renderWonders() {
  const grid = document.getElementById("wonders-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const builtCount = (state.wonders || []).length;
  const knownCount = WONDERS.filter((w) => w.era <= state.highestEra).length;
  document.getElementById("wonder-badge").textContent = `${builtCount}/${knownCount}`;
  document.getElementById("wonders-built-count").textContent = builtCount;

  let shownFutureMystery = false;

  WONDERS.forEach((w) => {
    const isBuilt = hasWonder(w.id);
    const eraDiscovered = state.highestEra >= w.era;
    const isClose = isBuilt || state.totalCp >= w.cost * 0.35 || state.cp >= w.cost * 0.25;

    if (eraDiscovered && isClose) {
      const eraUnlocked = state.currentEra >= w.era;
      const canAfford = state.cp >= w.cost && eraUnlocked && !isBuilt;

      const card = document.createElement("div");
      card.className = `wonder-card ${isBuilt ? "built" : ""}`;
      card.innerHTML = `
        <div>
          <div class="wonder-top">
            <div class="wonder-icon">${w.icon}</div>
            <div>
              <div class="wonder-era">${ERAS[w.era].name} Wonder</div>
              <div class="wonder-title">${w.name}</div>
            </div>
          </div>
          <div class="wonder-effect" style="margin-top:8px;">✨ ${w.effectText}</div>
          <div class="wonder-lore" style="margin-top:4px;">"${w.lore}"</div>
        </div>
        <button class="wonder-btn" id="wonder-btn-${w.id}" ${isBuilt || !canAfford ? "disabled" : ""}>
          ${isBuilt ? "✅ MONUMENT ERECTED" : `🏗️ Construct (${formatNum(w.cost)} CP)`}
        </button>
      `;
      const btn = card.querySelector("button");
      btn.onclick = () => buyWonder(w.id);
      grid.appendChild(card);
    } else if (eraDiscovered && !isClose) {
      const card = document.createElement("div");
      card.className = "wonder-card mystery";
      card.innerHTML = `
        <div>
          <div class="wonder-top">
            <div class="wonder-icon">❓</div>
            <div>
              <div class="wonder-era">${ERAS[w.era].name} Wonder</div>
              <div class="wonder-title">Whispered Megaproject</div>
            </div>
          </div>
          <div class="wonder-lore" style="margin-top:8px;">Reach ~${formatNum(Math.ceil(w.cost * 0.35))} CP to unveil the architectural plans for this Epoch's Great Wonder.</div>
        </div>
        <button class="wonder-btn" disabled>🔒 Plans Incomplete</button>
      `;
      grid.appendChild(card);
    } else if (!shownFutureMystery) {
      shownFutureMystery = true;
      const card = document.createElement("div");
      card.className = "wonder-card mystery";
      card.innerHTML = `
        <div>
          <div class="wonder-top">
            <div class="wonder-icon">🌫️</div>
            <div>
              <div class="wonder-era">Uncharted Epoch</div>
              <div class="wonder-title">Future Monument</div>
            </div>
          </div>
          <div class="wonder-lore" style="margin-top:8px;">Advance your civilization into future Epochs to discover new World Wonders.</div>
        </div>
        <button class="wonder-btn" disabled>🔒 Unknown Epoch</button>
      `;
      grid.appendChild(card);
    }
  });
}

function updateWondersAffordability() {
  WONDERS.forEach((w) => {
    const btn = document.getElementById(`wonder-btn-${w.id}`);
    if (!btn || hasWonder(w.id)) return;
    const eraUnlocked = state.currentEra >= w.era;
    btn.disabled = !(eraUnlocked && state.cp >= w.cost);
  });
}

function buyWonder(wId) {
  const w = WONDERS.find((x) => x.id === wId);
  if (!w || hasWonder(wId) || state.currentEra < w.era || state.cp < w.cost) return;

  state.cp -= w.cost;
  state.wonders.push(wId);
  SoundFX.wonder();
  for (let i = 0; i < 4; i++) {
    spawnCityFirework(140 + i * 165, 36 + Math.random() * 44);
  }

  showToast(w.icon, `World Wonder Erected: ${w.name}!`, w.effectText);
  renderWonders();
  renderBuildingsList();
  renderInfrastructureDistricts();
  checkAchievements();
  updateTopHUD();
}

function checkAchievements() {
  let newlyUnlocked = false;
  ACHIEVEMENTS.forEach((ach) => {
    if (!state.achievements.includes(ach.id) && ach.check(state)) {
      state.achievements.push(ach.id);
      newlyUnlocked = true;
      showToast(ach.icon, `Achievement Unlocked: ${ach.name}`, `${ach.desc} (+1% Global CP/s)`);
      SoundFX.achievement();
    }
  });
  if (newlyUnlocked) {
    renderAchievements();
  }
}

function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";

  const total = ACHIEVEMENTS.length;
  const unlocked = state.achievements.length;
  const pct = ((unlocked / total) * 100).toFixed(1);

  document.getElementById("ach-badge").textContent = `${unlocked}/${total}`;
  document.getElementById("ach-unlocked-count").textContent = unlocked;
  document.getElementById("ach-total-count").textContent = total;
  document.getElementById("ach-pct").textContent = `${pct}%`;
  document.getElementById("ach-bonus-pct").textContent = unlocked * 1;

  ACHIEVEMENTS.forEach((ach) => {
    const isUnlocked = state.achievements.includes(ach.id);
    if (achFilter === "unlocked" && !isUnlocked) return;
    if (achFilter === "locked" && isUnlocked) return;

    const isSpoiler = !isUnlocked && (
      (ach.era !== undefined && ach.era > state.highestEra) ||
      (ach.bId && !(state.revealedBuildings || []).includes(ach.bId))
    );

    const card = document.createElement("div");
    card.className = `ach-card ${isUnlocked ? "unlocked" : "locked"}`;
    card.innerHTML = `
      <div class="ach-icon">${isUnlocked ? ach.icon : isSpoiler ? "❓" : "🔒"}</div>
      <div>
        <div class="ach-title">${isSpoiler ? "Secret of a Future Epoch" : ach.name}</div>
        <div class="ach-desc">${isSpoiler ? "Keep advancing through history to uncover this achievement." : ach.desc}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;
  const rows = [
    ["Civilization Title", getFullCityTitle()],
    ["Current Epoch", `${ERAS[state.currentEra].icon} ${ERAS[state.currentEra].name}`],
    ["Epochs Discovered", `${state.highestEra + 1} / ${ERAS.length}`],
    ["Active State Doctrine", state.doctrine.toUpperCase()],
    ["Current Civilization Points", formatNum(state.cp)],
    ["Total CP (This Timeline)", formatNum(state.totalCp)],
    ["All-Time CP (Across Timelines)", formatNum(state.allTimeCp)],
    ["Production per Second (CP/s)", formatNum(getTotalCps())],
    ["Points per Click", formatNum(getClickPower())],
    ["Critical Click Chance", `${Math.round(getCritChance() * 100)}% (2x Damage)`],
    ["Critical Clicks Landed", (state.totalCrits || 0).toLocaleString()],
    ["Global Production Multiplier", `${(getGlobalMultiplier() * 100).toFixed(0)}%`],
    ["Total Manual Clicks", state.totalClicks.toLocaleString()],
    ["Total City Population", formatNum(getPopulation(), 0)],
    ["Total Buildings Constructed", getTotalBuildings().toLocaleString()],
    ["World Wonders Erected", `${(state.wonders || []).length}`],
    ["Technologies Researched", `${state.upgrades.length}`],
    ["Achievements Unlocked", `${state.achievements.length} / ${ACHIEVEMENTS.length}`],
    ["Temporal Anomalies Captured", state.anomaliesClicked.toLocaleString()],
    ["Time Rifts (Prestiges)", state.prestiges.toLocaleString()],
    ["Time Shards (+10% CP/s each)", state.shards.toLocaleString()]
  ];

  container.innerHTML = rows
    .map(([label, val]) => `<div class="stat-row"><span>${label}</span><span>${val}</span></div>`)
    .join("");
}

// ============================================================================
// CLICKING, CRITICAL HITS, CANVAS SHOCKWAVES & GOLDEN ANOMALIES
// ============================================================================
const canvasRipples = [];
const canvasSparks = [];
let lastClickUiCheck = 0;

function spawnFloatingText(x, y, text, isCrit = false) {
  const layer = document.getElementById("particles-layer");
  const el = document.createElement("div");
  el.className = "floating-num" + (isCrit ? " crit" : "");
  el.textContent = text;
  const jitterX = (Math.random() - 0.5) * 44;
  el.style.left = `${x + jitterX}px`;
  el.style.top = `${y - 16}px`;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function showToast(icon, title, body) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-body">${body}</div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function handleMainClick(e) {
  const isCrit = Math.random() < getCritChance();
  const baseGain = getClickPower();
  const gain = isCrit ? baseGain * 2 : baseGain;

  state.cp += gain;
  state.totalCp += gain;
  state.allTimeCp += gain;
  state.totalClicks += 1;
  if (isCrit) state.totalCrits = (state.totalCrits || 0) + 1;

  // Instant visual feedback on the button and the giant CP counter for uncapped-speed clicking
  const btnEl = e.currentTarget;
  btnEl.classList.add("clicked");
  setTimeout(() => btnEl.classList.remove("clicked"), 45);

  const resEl = document.getElementById("res-amount");
  resEl.textContent = formatNum(state.cp, state.cp < 100 ? 1 : 0);
  resEl.classList.add("pop");
  setTimeout(() => resEl.classList.remove("pop"), 60);

  const rect = btnEl.getBoundingClientRect();
  const hasMouse = e.clientX > 0 || e.clientY > 0;
  const x = hasMouse ? e.clientX : rect.left + rect.width / 2;
  const y = hasMouse ? e.clientY : rect.top + rect.height / 2;
  spawnFloatingText(x, y, isCrit ? `💥 CRIT! +${formatNum(gain)}` : `+${formatNum(gain)}`, isCrit);

  // Map click coordinate into #clicker-fx-canvas (340x240) on the left panel
  const fxCanvas = document.getElementById("clicker-fx-canvas");
  let fxX = 170;
  let fxY = 128;
  if (fxCanvas) {
    const fxRect = fxCanvas.getBoundingClientRect();
    if (fxRect.width > 0 && fxRect.height > 0) {
      fxX = ((x - fxRect.left) / fxRect.width) * fxCanvas.width;
      fxY = ((y - fxRect.top) / fxRect.height) * fxCanvas.height;
    }
  }

  if (canvasRipples.length < 24) {
    canvasRipples.push({
      x: fxX,
      y: fxY,
      r: 18,
      maxR: isCrit ? 155 : 105,
      alpha: 0.85,
      color: isCrit ? "#fde047" : "#f97316"
    });
  }
  if (canvasSparks.length < 120) {
    for (let i = 0; i < (isCrit ? 14 : 6); i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.6 + Math.random() * 3.6;
      canvasSparks.push({
        x: fxX,
        y: fxY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: isCrit ? "#fde047" : "#38bdf8"
      });
    }
  }

  if (isCrit) {
    SoundFX.crit();
  } else {
    SoundFX.click(state.currentEra);
  }

  // Throttle heavy DOM/progression checks during ultra-fast clicking so clicks have zero frame lag
  const now = performance.now();
  if (now - lastClickUiCheck >= 120) {
    lastClickUiCheck = now;
    checkProximityReveals();
    checkEraProgression();
    checkAchievements();
    updateBuildingsAffordability();
    updateUpgradesAffordability();
    updateWondersAffordability();
  }
}

let anomalyTimeoutId = null;

function triggerGoldenAnomaly() {
  const btn = document.getElementById("golden-anomaly");
  if (!btn || !btn.classList.contains("hidden")) return;

  const stage = document.getElementById("city-stage");
  const sanctum = document.getElementById("clicker-sanctum");
  const host = stage && stage.clientWidth > 100 ? stage : sanctum;
  if (!host) return;
  if (btn.parentElement !== host) {
    host.appendChild(btn);
  }

  const maxX = Math.max(40, host.clientWidth - 70);
  const maxY = Math.max(40, host.clientHeight - 70);
  btn.style.left = `${20 + Math.random() * (maxX - 20)}px`;
  btn.style.top = `${36 + Math.random() * (maxY - 46)}px`;
  btn.classList.remove("hidden");
  SoundFX.anomalySpawn();

  const duration = hasWonder("w_apollo") ? 18000 : 12000;
  if (anomalyTimeoutId) clearTimeout(anomalyTimeoutId);
  anomalyTimeoutId = setTimeout(() => {
    btn.classList.add("hidden");
    anomalyTimeoutId = null;
  }, duration);
}

function handleAnomalyClick(e) {
  e.stopPropagation();
  if (anomalyTimeoutId) {
    clearTimeout(anomalyTimeoutId);
    anomalyTimeoutId = null;
  }
  const btn = document.getElementById("golden-anomaly");
  btn.classList.add("hidden");
  state.anomaliesClicked += 1;

  SoundFX.anomalyCatch();

  const rewardMult = hasWonder("w_apollo") ? 1.5 : 1.0;

  if (Math.random() < 0.5) {
    const bonus = Math.max(25, (getTotalCps() * 20 + getClickPower() * 15) * rewardMult);
    state.cp += bonus;
    state.totalCp += bonus;
    state.allTimeCp += bonus;
    showToast("✨", "Temporal Windfall!", `Gained +${formatNum(bonus)} Civilization Points instantly!`);
  } else {
    boostMultiplier = hasWonder("w_apollo") ? 2.5 : 2;
    const secs = hasWonder("w_apollo") ? 35 : 25;
    boostExpiresAt = Date.now() + secs * 1000;
    boostName = `⚡ Chrono Overdrive (${boostMultiplier}x)`;
    showToast("⚡", boostName, `All civilization production is multiplied by ${boostMultiplier}x for ${secs} seconds!`);
  }

  checkProximityReveals();
  checkEraProgression();
  checkAchievements();
  updateTopHUD();
  updateDistrictsStats();
}

// ============================================================================
// LIVING SCROLLABLE CITY PANORAMA, DAY/NIGHT CYCLE, WONDERS & ANIMATIONS
// ============================================================================
const stars = Array.from({ length: 90 }, () => ({
  xRatio: Math.random(),
  y: 8 + Math.random() * 115,
  size: Math.random() > 0.7 ? 2.1 : 1.3,
  phase: Math.random() * Math.PI * 2
}));

const clouds = Array.from({ length: 10 }, (_, idx) => ({
  x: idx * 180 + Math.random() * 60,
  y: 18 + (idx % 3) * 18,
  w: 58 + Math.random() * 38,
  speed: 0.12 + Math.random() * 0.12
}));

const vehicles = Array.from({ length: 16 }, () => ({
  x: Math.random() * 1400,
  y: 38 + Math.random() * 95,
  speed: 0.9 + Math.random() * 1.6,
  dir: Math.random() > 0.5 ? 1 : -1,
  color: Math.random() > 0.5 ? "#06b6d4" : "#f43f5e"
}));

const riverBoats = Array.from({ length: 6 }, (_, idx) => ({
  x: idx * 240 + Math.random() * 90,
  speed: 0.35 + Math.random() * 0.35,
  dir: idx % 2 === 0 ? 1 : -1,
  color: idx % 2 === 0 ? "#dc2626" : "#f59e0b"
}));

const roadTraffic = Array.from({ length: 14 }, (_, idx) => ({
  x: idx * 110 + Math.random() * 50,
  speed: 0.45 + Math.random() * 0.65,
  dir: idx % 2 === 0 ? 1 : -1,
  color: ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#f8fafc"][idx % 5]
}));

const birdFlocks = Array.from({ length: 3 }, (_, idx) => ({
  x: idx * 380 + 80,
  y: 34 + idx * 18,
  speed: 0.55 + idx * 0.12
}));

const skyCraft = {
  x: 180,
  y: 44,
  speed: 0.42,
  dir: 1
};

const cityFireworks = [];
const shootingStars = [];

const rainDrops = Array.from({ length: 65 }, () => ({
  xRatio: Math.random(),
  y: Math.random() * 230,
  len: 8 + Math.random() * 10,
  speed: 4 + Math.random() * 3
}));

const sanctumMotes = Array.from({ length: 28 }, () => ({
  x: Math.random() * 340,
  y: Math.random() * 240,
  r: 1 + Math.random() * 2,
  vy: 0.25 + Math.random() * 0.45,
  alpha: 0.2 + Math.random() * 0.55
}));

let animTick = 0;
// Slow Day/Night cycle: 0.0 = Midday, 0.25 = Sunset/Dusk, 0.5 = Midnight, 0.75 = Dawn
let dayCyclePhase = 0.08;

function spawnCityFirework(x, y) {
  const palette = ["#fde047", "#f43f5e", "#38bdf8", "#a855f7", "#34d399", "#fb923c"];
  const color = palette[Math.floor(Math.random() * palette.length)];
  const sparks = [];
  for (let i = 0; i < 20; i++) {
    const ang = (Math.PI * 2 * i) / 20;
    const spd = 1.2 + Math.random() * 1.8;
    sparks.push({
      x,
      y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      alpha: 1.0,
      color
    });
  }
  cityFireworks.push(...sparks);
}

function drawPolygon(ctx, points, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawTree(ctx, x, y, scale = 1, type = "pine") {
  ctx.fillStyle = "#5c3a21";
  ctx.fillRect(x - 2 * scale, y - 8 * scale, 4 * scale, 8 * scale);
  if (type === "pine") {
    drawPolygon(ctx, [[x, y - 24 * scale], [x - 8 * scale, y - 7 * scale], [x + 8 * scale, y - 7 * scale]], "#2d6a3e");
    drawPolygon(ctx, [[x, y - 30 * scale], [x - 6 * scale, y - 15 * scale], [x + 6 * scale, y - 15 * scale]], "#3b854f");
  } else {
    ctx.fillStyle = "#3f8f4e";
    ctx.beginPath();
    ctx.arc(x, y - 14 * scale, 8 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWonderOnPanorama(ctx, wId, x, gy, isNight) {
  // Subtle upward golden monument spotlight at night
  if (isNight) {
    const beam = ctx.createLinearGradient(x, gy, x, gy - 140);
    beam.addColorStop(0, "rgba(250, 204, 21, 0.24)");
    beam.addColorStop(1, "rgba(250, 204, 21, 0)");
    drawPolygon(ctx, [[x - 26, gy], [x - 48, gy - 135], [x + 48, gy - 135], [x + 26, gy]], beam);
  }

  switch (wId) {
    case "w_stonehenge":
      // Solstice Sanctuary Ring
      [-22, 0, 22].forEach((dx) => {
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(x + dx - 7, gy - 32, 5, 34);
        ctx.fillRect(x + dx + 2, gy - 32, 5, 34);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(x + dx - 9, gy - 38, 18, 6);
      });
      break;

    case "w_gardens":
      // Hanging Gardens Terrace
      ctx.fillStyle = "#d97706";
      ctx.fillRect(x - 36, gy - 18, 72, 20);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(x - 26, gy - 34, 52, 16);
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(x - 16, gy - 48, 32, 14);
      // Lush cascading greenery & waterfalls
      ctx.fillStyle = "#16a34a";
      [-28, -12, 6, 22].forEach((gx) => {
        ctx.beginPath();
        ctx.arc(x + gx, gy - 18, 7, 0, Math.PI * 2);
        ctx.arc(x + gx * 0.6, gy - 34, 6, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(x - 3, gy - 48, 6, 48);
      break;

    case "w_colossus":
      // Grand Civic Colosseum
      ctx.fillStyle = "#e7e5e4";
      ctx.fillRect(x - 42, gy - 44, 84, 46);
      ctx.fillStyle = "#d6d3d1";
      ctx.fillRect(x - 36, gy - 56, 72, 12);
      for (let row = 0; row < 3; row++) {
        for (let ax = x - 34; ax <= x + 28; ax += 12) {
          ctx.fillStyle = isNight ? "#fde047" : "#44403c";
          ctx.fillRect(ax, gy - 12 - row * 13, 6, 8);
        }
      }
      break;

    case "w_cathedral":
      // Astronomical Clock Spire
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(x - 28, gy - 52, 56, 54);
      ctx.fillRect(x - 10, gy - 92, 20, 40);
      drawPolygon(ctx, [[x, gy - 126], [x - 12, gy - 92], [x + 12, gy - 92]], "#1d4ed8");
      // Golden astronomical clock face
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(x, gy - 68, 7, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "w_workshop":
      // Grand Palazzo & Octagonal Dome
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(x - 36, gy - 40, 72, 42);
      ctx.fillStyle = "#c2410c";
      ctx.beginPath();
      ctx.arc(x, gy - 40, 28, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(x - 4, gy - 76, 8, 10);
      break;

    case "w_crystal_palace":
      // Crystal Exhibition Hall
      ctx.fillStyle = "rgba(125, 211, 252, 0.72)";
      ctx.fillRect(x - 44, gy - 38, 88, 40);
      ctx.beginPath();
      ctx.arc(x, gy - 38, 28, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - 44, gy - 38, 88, 40);
      break;

    case "w_apollo":
      // World Trade Broadcast Tower (600m Observation Needle)
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(x - 4, gy - 118, 8, 120);
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(x - 18, gy - 96, 36, 10);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(x - 14, gy - 93, 28, 4);
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(x, gy - 134, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, gy - 118);
      ctx.lineTo(x, gy - 134);
      ctx.stroke();
      break;

    case "w_cern":
      // Central Smart-Grid Spire
      drawPolygon(ctx, [[x, gy - 128], [x - 24, gy + 2], [x + 24, gy + 2]], "#0f172a", "#06b6d4", 2);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, gy - 65, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case "w_orbital_elevator":
      // Bifrost Sky-Elevator
      ctx.fillStyle = "#1e1b4b";
      ctx.fillRect(x - 22, gy - 44, 44, 46);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.9)";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gy + 2);
      ctx.stroke();
      const podY = gy - ((animTick * 28) % gy);
      ctx.fillStyle = "#fde047";
      ctx.fillRect(x - 6, podY, 12, 16);
      break;
  }
}

function drawCityCanvas() {
  const canvas = document.getElementById("city-canvas");
  if (!canvas) return;

  // Dynamically expand the city panorama width left-to-right as more districts & Wonders are built!
  const ownedDistricts = BUILDINGS.filter((b) => (state.buildings[b.id] || 0) > 0);
  const builtWonders = WONDERS.filter((w) => hasWonder(w.id));
  const extraDistricts = ownedDistricts.filter((b) => b.era < state.currentEra || (state.buildings[b.id] || 0) >= 5);
  const targetWidth = Math.max(860, 780 + extraDistricts.length * 95 + builtWonders.length * 115);
  if (canvas.width !== targetWidth) {
    canvas.width = targetWidth;
  }

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const era = state.currentEra;
  const sky = ERAS[era].skyColors;
  const hills = ERAS[era].hillColors;
  animTick += 0.05;

  // Advance SLOW Day/Night Cycle (~3 minutes per full cycle)
  dayCyclePhase = (dayCyclePhase + 0.00028) % 1;
  // nightFactor: 0 at Midday (0.0), 1 at Midnight (0.5)
  const nightFactor = (1 - Math.cos(dayCyclePhase * Math.PI * 2)) / 2;
  const isNight = nightFactor > 0.45;
  const isDuskOrDawn = nightFactor > 0.22 && nightFactor < 0.72;

  const timeBadge = document.getElementById("panorama-time-badge");
  if (timeBadge) {
    let timeText = "☀️ Midday";
    if (dayCyclePhase >= 0.18 && dayCyclePhase < 0.35) timeText = "🌅 Golden Dusk";
    else if (dayCyclePhase >= 0.35 && dayCyclePhase < 0.65) timeText = "🌙 Starlight Night";
    else if (dayCyclePhase >= 0.65 && dayCyclePhase < 0.82) timeText = "🌄 Rosy Dawn";
    if (timeBadge.textContent !== timeText) timeBadge.textContent = timeText;
  }

  // 1. Rich 3-Stop Sky Gradient + Day/Night & Dusk Blending
  const grad = ctx.createLinearGradient(0, 0, 0, h - 36);
  grad.addColorStop(0, sky[0]);
  grad.addColorStop(0.55, sky[1]);
  grad.addColorStop(1, sky[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (isDuskOrDawn) {
    const duskAlpha = (1 - Math.abs(nightFactor - 0.47) * 3.5) * 0.32;
    if (duskAlpha > 0) {
      const duskGrad = ctx.createLinearGradient(0, 0, 0, h - 36);
      duskGrad.addColorStop(0, `rgba(88, 28, 135, ${duskAlpha.toFixed(2)})`);
      duskGrad.addColorStop(1, `rgba(249, 115, 22, ${(duskAlpha * 1.25).toFixed(2)})`);
      ctx.fillStyle = duskGrad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  if (nightFactor > 0.05) {
    ctx.fillStyle = `rgba(5, 8, 22, ${(nightFactor * 0.62).toFixed(2)})`;
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Stars, Shooting Stars & Sun / Moon Arc
  const starVisibility = Math.max(era === 8 ? 0.6 : 0.1, nightFactor);
  stars.forEach((st) => {
    const alpha = starVisibility * (0.25 + 0.55 * Math.sin(animTick + st.phase));
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
    ctx.fillRect(st.xRatio * w, st.y, st.size, st.size);
  });

  // Occasional Shooting Star at night
  if (isNight && Math.random() < 0.008 && shootingStars.length < 2) {
    shootingStars.push({
      x: 100 + Math.random() * (w - 200),
      y: 12 + Math.random() * 45,
      vx: 6 + Math.random() * 4,
      vy: 2 + Math.random() * 1.5,
      life: 1.0
    });
  }
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const ss = shootingStars[i];
    ss.x += ss.vx;
    ss.y += ss.vy;
    ss.life -= 0.06;
    if (ss.life <= 0) {
      shootingStars.splice(i, 1);
      continue;
    }
    ctx.strokeStyle = `rgba(254, 240, 138, ${ss.life.toFixed(2)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
    ctx.stroke();
  }

  // Sun / Moon celestial body
  const orbX = 580;
  const orbY = 44 + Math.sin(dayCyclePhase * Math.PI * 2) * 14;
  const sunGrad = ctx.createRadialGradient(orbX, orbY, 4, orbX, orbY, 34);
  if (era === 8) {
    sunGrad.addColorStop(0, "#f43f5e");
    sunGrad.addColorStop(0.5, "rgba(244, 63, 94, 0.35)");
    sunGrad.addColorStop(1, "rgba(244, 63, 94, 0)");
  } else if (isNight) {
    sunGrad.addColorStop(0, "#e0f2fe");
    sunGrad.addColorStop(0.45, "rgba(186, 230, 253, 0.32)");
    sunGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
  } else {
    sunGrad.addColorStop(0, "#fef08a");
    sunGrad.addColorStop(0.5, "rgba(253, 224, 71, 0.35)");
    sunGrad.addColorStop(1, "rgba(253, 224, 71, 0)");
  }
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(orbX, orbY, 34, 0, Math.PI * 2);
  ctx.fill();

  // Clouds
  if (era < 8) {
    clouds.forEach((c) => {
      c.x += c.speed;
      if (c.x > w + 80) c.x = -90;
      ctx.fillStyle = isNight ? "rgba(148, 163, 184, 0.08)" : "rgba(255, 255, 255, 0.16)";
      ctx.beginPath();
      ctx.roundRect(c.x, c.y, c.w, 12, 6);
      ctx.fill();
    });
  }

  // Daytime Bird Flocks (Era 0-5)
  if (!isNight && era <= 5) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
    ctx.lineWidth = 1.2;
    birdFlocks.forEach((bf) => {
      bf.x += bf.speed;
      if (bf.x > w + 60) bf.x = -60;
      const flap = Math.sin(animTick * 4 + bf.x * 0.05) * 2.5;
      [0, 10, 20].forEach((dx, bi) => {
        const bx = bf.x - dx;
        const by = bf.y + bi * 4;
        ctx.beginPath();
        ctx.moveTo(bx - 4, by - flap);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + 4, by - flap);
        ctx.stroke();
      });
    });
  }

  // Era-fitting Sky Craft: Hot Air Balloon (Era 4-5) or Passenger Jetliner (Era 6-7)
  if (era >= 4 && era <= 7) {
    skyCraft.x += skyCraft.speed * skyCraft.dir;
    if (skyCraft.x > w + 80) skyCraft.x = -80;
    const scX = skyCraft.x;
    const scY = skyCraft.y + Math.sin(animTick * 1.5) * 3;
    if (era === 4 || era === 5) {
      // Hot-air balloon drifting over the city
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(scX, scY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fde047";
      ctx.fillRect(scX - 9, scY - 2, 18, 4);
      ctx.fillStyle = "#78350f";
      ctx.fillRect(scX - 3, scY + 12, 6, 4);
    } else {
      // High-altitude commercial jetliner with blinking beacon
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(scX - 14, scY, 28, 5);
      drawPolygon(ctx, [[scX - 14, scY], [scX - 20, scY - 7], [scX - 8, scY]], "#2563eb");
      if (Math.floor(animTick * 4) % 2 === 0) {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(scX + 12, scY - 1, 3, 3);
      }
    }
  }

  // 3. Repeating Layered Colored Background Hills across full width `w`
  ctx.fillStyle = hills[0];
  ctx.beginPath();
  ctx.moveTo(0, h - 52);
  for (let hx = 0; hx < w; hx += 380) {
    ctx.quadraticCurveTo(hx + 190, h - 104, hx + 380, h - 58);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = hills[1];
  ctx.beginPath();
  ctx.moveTo(0, h - 38);
  for (let hx = 0; hx < w; hx += 340) {
    ctx.quadraticCurveTo(hx + 170, h - 74, hx + 340, h - 40);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Ground Terrace & Road across full width `w`
  ctx.fillStyle = era >= 5 ? "#333942" : "#4d6b3c";
  ctx.fillRect(0, h - 42, w, 22);

  ctx.fillStyle = era === 0 ? "#7c5836" : era <= 4 ? "#9ca3af" : "#1f2937";
  ctx.fillRect(0, h - 28, w, 8);
  if (era >= 5) {
    ctx.fillStyle = era === 8 ? "#06b6d4" : "#fbbf24";
    for (let rx = 10; rx < w; rx += 28) {
      ctx.fillRect(rx, h - 25, 12, 2);
    }
  }

  // Streetlamps along the boulevard that glow warmly at dusk/night!
  if (era >= 2) {
    for (let lx = 45; lx < w; lx += 95) {
      ctx.fillStyle = "#475569";
      ctx.fillRect(lx, h - 39, 2, 11);
      if (isNight || isDuskOrDawn) {
        ctx.fillStyle = era === 8 ? "rgba(6, 182, 212, 0.9)" : "rgba(254, 240, 138, 0.95)";
        ctx.beginPath();
        ctx.arc(lx + 1, h - 40, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // River Foreground across full width `w`
  const riverGrad = ctx.createLinearGradient(0, h - 20, 0, h);
  riverGrad.addColorStop(0, era === 8 ? "#0e2942" : "#1d5c86");
  riverGrad.addColorStop(1, era === 8 ? "#1c1236" : "#0f3754");
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, h - 20, w, 20);

  ctx.fillStyle = era === 8 ? "rgba(6, 182, 212, 0.35)" : "rgba(186, 230, 253, 0.35)";
  for (let wx = 15; wx < w; wx += 45) {
    const offset = Math.sin(animTick * 2 + wx) * 6;
    ctx.fillRect(wx + offset, h - 13 + (wx % 6), 18, 2);
  }

  // 4. MAIN SKYLINE & EXPANDING DISTRICTS + WORLD WONDERS
  const gy = h - 40;

  if (era <= 4) {
    for (let tx = 28; tx < w - 30; tx += 145) {
      drawTree(ctx, tx, gy + 3, 0.85, (tx / 145) % 2 === 0 ? "pine" : "round");
    }
  }

  if (era === 0) {
    const huts = Math.min(6, Math.max(2, (state.buildings.forager || 1) + 1));
    for (let i = 0; i < huts; i++) {
      const hx = 60 + i * 68;
      ctx.fillStyle = "#b87d4b";
      ctx.fillRect(hx - 14, gy - 15, 28, 18);
      drawPolygon(ctx, [[hx, gy - 33], [hx - 19, gy - 14], [hx + 19, gy - 14]], "#e0a958", "#784719", 1.4);
      ctx.fillStyle = isNight ? "#fde047" : "#3b2110";
      ctx.fillRect(hx - 4, gy - 9, 8, 12);
    }

    if ((state.buildings.megalith || 0) > 0) {
      [485, 560, 635].forEach((fx) => {
        ctx.fillStyle = "#c28b46";
        ctx.fillRect(fx - 14, gy - 24, 14, 27);
        drawPolygon(ctx, [[fx - 7, gy - 34], [fx - 16, gy - 24], [fx + 2, gy - 24]], "#d97706");
        ctx.fillStyle = "#facc15";
        for (let wx = fx + 4; wx <= fx + 26; wx += 5) {
          ctx.fillRect(wx, gy - 14, 3, 16);
        }
      });
    }
  } else if (era === 1 || era === 2) {
    const bx = 110;
    ctx.fillStyle = "#d49e54";
    ctx.fillRect(bx - 46, gy - 36, 92, 39);
    ctx.fillStyle = "#e3b268";
    ctx.fillRect(bx - 28, gy - 50, 56, 14);
    ctx.fillStyle = isNight ? "#fde047" : "#451a03";
    ctx.beginPath();
    ctx.arc(bx, gy + 3, 11, Math.PI, 0);
    ctx.fill();
    [bx - 38, bx + 16].forEach((ax, idx) => {
      drawPolygon(ctx, [[ax, gy - 18], [ax + 22, gy - 12], [ax, gy - 12]], idx === 0 ? "#dc2626" : "#2563eb");
      ctx.fillStyle = "#fde047";
      ctx.fillRect(ax + 2, gy - 12, 18, 15);
    });

    const cx = 255;
    ctx.fillStyle = "#d6d3d1";
    ctx.fillRect(cx - 50, gy - 8, 100, 11);
    ctx.fillStyle = "#0ea5e9";
    ctx.fillRect(cx - 46, gy - 6, 92, 7);
    [cx - 32, cx + 28].forEach((px) => {
      ctx.fillStyle = "#78350f";
      ctx.fillRect(px - 2, gy - 32, 4, 24);
      drawPolygon(ctx, [[px, gy - 38], [px - 12, gy - 28], [px + 12, gy - 28]], "#15803d");
    });

    if (era === 2 || (state.buildings.aqueduct || 0) > 0) {
      ctx.fillStyle = "#d6d3d1";
      ctx.fillRect(340, gy - 46, 235, 8);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(340, gy - 48, 235, 3);
      for (let ax = 348; ax < 565; ax += 28) {
        ctx.fillStyle = "#e7e5e4";
        ctx.fillRect(ax, gy - 38, 9, 41);
      }
    }

    const tx = 655;
    ctx.fillStyle = "#f5f5f4";
    ctx.fillRect(tx - 38, gy - 6, 76, 9);
    for (let colX = tx - 32; colX <= tx + 26; colX += 14) {
      ctx.fillStyle = "#e7e5e4";
      ctx.fillRect(colX, gy - 34, 6, 28);
    }
    drawPolygon(ctx, [[tx, gy - 50], [tx - 42, gy - 34], [tx + 42, gy - 34]], "#dc2626", "#f5f5f4", 2);
  } else if (era === 3 || era === 4) {
    const cx = 105;
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(cx - 40, gy - 46, 80, 49);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(cx - 46, gy - 66, 22, 69);
    ctx.fillRect(cx + 24, gy - 66, 22, 69);
    drawPolygon(ctx, [[cx - 35, gy - 90], [cx - 49, gy - 66], [cx - 21, gy - 66]], "#2563eb");
    drawPolygon(ctx, [[cx + 35, gy - 90], [cx + 21, gy - 66], [cx + 49, gy - 66]], "#2563eb");
    ctx.fillStyle = "#451a03";
    ctx.fillRect(cx - 10, gy - 20, 20, 23);

    [195, 260, 325, 390].forEach((hx, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? "#fef3c7" : "#c2410c";
      ctx.fillRect(hx, gy - 34, 44, 37);
      drawPolygon(ctx, [[hx + 22, gy - 52], [hx - 4, gy - 34], [hx + 48, gy - 34]], "#991b1b");
      ctx.fillStyle = isNight ? "#fef08a" : "#fde047";
      ctx.fillRect(hx + 8, gy - 24, 7, 7);
      ctx.fillRect(hx + 26, gy - 24, 7, 7);
    });

    const ox = 565;
    ctx.fillStyle = "#d97706";
    ctx.fillRect(ox - 40, gy - 42, 80, 45);
    ctx.fillStyle = "#fef3c7";
    for (let ux = ox - 30; ux <= ox + 22; ux += 16) {
      ctx.fillRect(ux, gy - 34, 6, 30);
    }
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(ox, gy - 42, 28, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = "#fde047";
    ctx.fillRect(ox - 3, gy - 78, 6, 8);
  } else if (era === 5 || era === 6) {
    ctx.fillStyle = "#991b1b";
    ctx.fillRect(32, gy - 48, 96, 51);
    ctx.fillStyle = "#57534e";
    ctx.fillRect(48, gy - 92, 12, 44);
    ctx.fillRect(98, gy - 86, 12, 38);
    ctx.fillStyle = "rgba(214, 211, 209, 0.5)";
    const puffOffset = (animTick * 12) % 28;
    ctx.beginPath();
    ctx.arc(54, gy - 98 - puffOffset, 8 + puffOffset * 0.2, 0, Math.PI * 2);
    ctx.arc(104, gy - 92 - puffOffset, 7 + puffOffset * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#334155";
    ctx.fillRect(150, gy - 44, 110, 47);
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(205, gy - 44, 42, Math.PI, 0);
    ctx.fill();

    [280, 350, 420].forEach((bx, idx) => {
      const bh = 72 + (idx % 3) * 20;
      ctx.fillStyle = idx % 2 === 0 ? "#475569" : "#334155";
      ctx.fillRect(bx, gy - bh, 52, bh + 3);
      ctx.fillStyle = isNight ? "#fde047" : "#fef08a";
      for (let wy = gy - bh + 10; wy < gy - 6; wy += 12) {
        ctx.fillRect(bx + 8, wy, 7, 6);
        ctx.fillRect(bx + 22, wy, 7, 6);
        ctx.fillRect(bx + 36, wy, 7, 6);
      }
    });

    if (era === 6) {
      drawPolygon(ctx, [[518, gy - 68], [505, gy + 3], [555, gy + 3], [542, gy - 68]], "#cbd5e1", "#94a3b8", 1);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(518, gy - 22, 24, 8);

      const ax = 655;
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(ax - 7, gy - 82, 14, 85);
      drawPolygon(ctx, [[ax - 18, gy - 96], [ax + 18, gy - 96], [ax + 11, gy - 82], [ax - 11, gy - 82]], "#0284c7");
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(ax + 16, gy - 14, 44, 10);
      drawPolygon(ctx, [[ax + 50, gy - 14], [ax + 60, gy - 28], [ax + 60, gy - 14]], "#2563eb");
    }
  } else {
    const towers = [
      { x: 20, w: 46, h: 110, base: "#1e293b", trim: "#06b6d4", roof: "spire" },
      { x: 76, w: 54, h: 142, base: "#1e1b4b", trim: "#f43f5e", roof: "slant" },
      { x: 140, w: 48, h: 98, base: "#0f172a", trim: "#2dd4bf", roof: "flat" },
      { x: 198, w: 58, h: 154, base: "#2e1065", trim: "#06b6d4", roof: "spire" },
      { x: 266, w: 50, h: 120, base: "#172554", trim: "#38bdf8", roof: "slant" },
      { x: 326, w: 62, h: 162, base: "#1e1b4b", trim: "#f43f5e", roof: "spire" },
      { x: 398, w: 52, h: 116, base: "#0f172a", trim: "#2dd4bf", roof: "flat" },
      { x: 460, w: 56, h: 146, base: "#2e1065", trim: "#f43f5e", roof: "slant" },
      { x: 526, w: 48, h: 108, base: "#172554", trim: "#06b6d4", roof: "spire" },
      { x: 584, w: 58, h: 138, base: "#1e293b", trim: "#38bdf8", roof: "slant" },
      { x: 652, w: 50, h: 118, base: "#0f172a", trim: "#f43f5e", roof: "spire" }
    ];

    towers.forEach((t, idx) => {
      const bGrad = ctx.createLinearGradient(t.x, gy - t.h, t.x + t.w, gy);
      bGrad.addColorStop(0, t.base);
      bGrad.addColorStop(1, "#334155");
      ctx.fillStyle = bGrad;
      ctx.fillRect(t.x, gy - t.h, t.w, t.h + 3);

      ctx.strokeStyle = t.trim;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(t.x, gy - t.h, t.w, t.h + 3);

      if (t.roof === "spire") {
        ctx.fillStyle = t.trim;
        ctx.fillRect(t.x + t.w / 2 - 2, gy - t.h - 22, 4, 22);
      } else if (t.roof === "slant") {
        drawPolygon(ctx, [[t.x, gy - t.h], [t.x + t.w, gy - t.h - 16], [t.x + t.w, gy - t.h]], t.trim);
      }

      for (let wy = gy - t.h + 10; wy < gy - 8; wy += 11) {
        for (let wx = t.x + 6; wx < t.x + t.w - 8; wx += 10) {
          ctx.fillStyle = (wx + wy + idx) % 3 === 0 ? t.trim : "rgba(224, 242, 254, 0.78)";
          ctx.fillRect(wx, wy, 5, 6);
        }
      }
    });

    // Elevated Maglev Transit Line across entire width
    ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
    ctx.fillRect(0, gy - 18, w, 4);
    const trainX = ((animTick * 90) % (w + 120)) - 60;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(trainX, gy - 25, 58, 7);
    ctx.fillStyle = "#06b6d4";
    ctx.fillRect(trainX + 4, gy - 23, 50, 2.5);
  }

  // 5. DRAW ALL ERECTED WORLD WONDERS & EXPANDED DISTRICTS ALONG THE SCROLLABLE HORIZON
  let cursorX = 765;
  builtWonders.forEach((wonder) => {
    drawWonderOnPanorama(ctx, wonder.id, cursorX, gy, isNight);
    cursorX += 115;
  });

  extraDistricts.forEach((b, idx) => {
    drawUnitGraphicOnStrip(ctx, b.id, cursorX - 18, gy + 2, idx, isNight);
    drawUnitGraphicOnStrip(ctx, b.id, cursorX + 18, gy + 2, idx + 1, isNight);
    cursorX += 95;
  });

  // 6. LIVING ROAD TRAFFIC & CITIZENS
  roadTraffic.forEach((rt) => {
    rt.x += rt.speed * rt.dir;
    if (rt.x > w + 30) rt.x = -30;
    if (rt.x < -30) rt.x = w + 30;
    const ry = h - 26;
    if (era <= 4) {
      // Citizen & wooden cart
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(rt.x, ry - 4, 6, 4);
    } else {
      // Automobile / Tram with glowing headlights at night
      ctx.fillStyle = rt.color;
      ctx.fillRect(rt.x, ry - 4, 11, 4);
      if (isNight || isDuskOrDawn) {
        ctx.fillStyle = "rgba(254, 240, 138, 0.75)";
        const beamX = rt.dir > 0 ? rt.x + 11 : rt.x - 10;
        ctx.fillRect(beamX, ry - 3, 10, 2);
      }
    }
  });

  // 7. LIVING RIVER BOATS & SHIPS
  riverBoats.forEach((rb) => {
    rb.x += rb.speed * rb.dir;
    if (rb.x > w + 40) rb.x = -40;
    if (rb.x < -40) rb.x = w + 40;
    const by = h - 11;
    // Water wake
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(rb.dir > 0 ? rb.x - 10 : rb.x + 16, by + 2, 9, 1.5);
    // Boat hull
    drawPolygon(ctx, [[rb.x - 10, by - 3], [rb.x + 14, by - 3], [rb.x + 10, by + 2], [rb.x - 6, by + 2]], era >= 5 ? "#334155" : "#78350f");
    if (era >= 1 && era <= 4) {
      // Billowing sail
      drawPolygon(ctx, [[rb.x + 2, by - 16], [rb.x - 6, by - 4], [rb.x + 10, by - 4]], "#f8fafc");
    } else if (era >= 5) {
      // Cabin & lit porthole
      ctx.fillStyle = era === 8 ? "#06b6d4" : "#facc15";
      ctx.fillRect(rb.x - 3, by - 6, 8, 3);
    }
  });

  if (era >= 6) {
    vehicles.forEach((v) => {
      v.x += v.speed * v.dir;
      if (v.x > w + 24) v.x = -24;
      if (v.x < -24) v.x = w + 24;
      ctx.fillStyle = era === 8 ? v.color : "#38bdf8";
      ctx.fillRect(v.x, v.y, 14, 3);
    });
  }

  // Occasional Celebratory Fireworks at Dusk/Night!
  if ((isNight || isDuskOrDawn) && Math.random() < 0.015 && cityFireworks.length < 40) {
    spawnCityFirework(80 + Math.random() * (w - 160), 28 + Math.random() * 55);
  }
  for (let i = cityFireworks.length - 1; i >= 0; i--) {
    const fw = cityFireworks[i];
    fw.x += fw.vx;
    fw.y += fw.vy;
    fw.vy += 0.03;
    fw.alpha -= 0.028;
    if (fw.alpha <= 0) {
      cityFireworks.splice(i, 1);
      continue;
    }
    ctx.fillStyle = fw.color;
    ctx.globalAlpha = Math.max(0, fw.alpha);
    ctx.fillRect(fw.x, fw.y, 2.5, 2.5);
    ctx.globalAlpha = 1;
  }

  if (era === 8) {
    ctx.strokeStyle = "rgba(6, 182, 212, 0.28)";
    ctx.lineWidth = 1;
    rainDrops.forEach((r) => {
      r.y += r.speed;
      if (r.y > h) {
        r.y = -10;
        r.xRatio = Math.random();
      }
      const rx = r.xRatio * w;
      ctx.beginPath();
      ctx.moveTo(rx, r.y);
      ctx.lineTo(rx - 2, r.y + r.len);
      ctx.stroke();
    });
  }
}

// ============================================================================
// LEFT CLICKER SANCTUM: ATMOSPHERIC BACKLIT SHADOW SKYLINE, MOTES & CLICK FX
// ============================================================================
function drawClickerFxCanvas() {
  const canvas = document.getElementById("clicker-fx-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const era = state.currentEra;
  ctx.clearRect(0, 0, w, h);

  // 1. Backlit Aura Halo behind the Clicker Button
  const pulse = 78 + Math.sin(animTick * 2.2) * 8;
  const auraGrad = ctx.createRadialGradient(w / 2, h / 2 + 8, 12, w / 2, h / 2 + 8, pulse + 38);
  auraGrad.addColorStop(0, era === 8 ? "rgba(6, 182, 212, 0.28)" : "rgba(249, 115, 22, 0.28)");
  auraGrad.addColorStop(0.55, era === 8 ? "rgba(244, 63, 94, 0.12)" : "rgba(250, 204, 21, 0.10)");
  auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = auraGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Floating Ambient Civilization Motes drifting upward
  sanctumMotes.forEach((m) => {
    m.y -= m.vy * 1.15;
    if (m.y < -6) {
      m.y = h + 4;
      m.x = Math.random() * w;
    }
    ctx.fillStyle = era === 8 ? `rgba(6, 182, 212, ${m.alpha})` : `rgba(253, 224, 71, ${m.alpha})`;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Atmospheric Backlit City Shadow Silhouette along the bottom of the Left Clicker Sanctum!
  const baseY = h;
  // Distant shadow hill/skyline layer
  ctx.fillStyle = "rgba(12, 14, 24, 0.65)";
  ctx.beginPath();
  ctx.moveTo(0, baseY - 22);
  ctx.quadraticCurveTo(85, baseY - 48, 170, baseY - 26);
  ctx.quadraticCurveTo(255, baseY - 52, w, baseY - 24);
  ctx.lineTo(w, baseY);
  ctx.lineTo(0, baseY);
  ctx.closePath();
  ctx.fill();

  // Foreground crisp dark silhouette structures with glowing windows
  ctx.fillStyle = "rgba(6, 7, 13, 0.92)";
  ctx.fillRect(0, baseY - 12, w, 12);

  const silBlocks = era <= 1
    ? [[18, 22, 22], [55, 26, 28], [250, 28, 26], [292, 24, 22]]
    : era <= 4
    ? [[14, 26, 36], [48, 28, 48], [84, 24, 30], [234, 26, 34], [268, 30, 52], [304, 24, 38]]
    : [[10, 26, 58], [42, 28, 76], [76, 24, 48], [106, 22, 64], [216, 24, 62], [246, 30, 82], [282, 26, 54], [312, 22, 68]];

  silBlocks.forEach(([sx, sw, sh], idx) => {
    ctx.fillStyle = "rgba(7, 9, 16, 0.94)";
    ctx.fillRect(sx, baseY - sh, sw, sh);
    if (era >= 2 && era <= 4 && idx % 2 === 1) {
      drawPolygon(ctx, [[sx + sw / 2, baseY - sh - 14], [sx - 2, baseY - sh], [sx + sw + 2, baseY - sh]], "rgba(7, 9, 16, 0.94)");
    }
    // Glowing silhouette windows
    ctx.fillStyle = era === 8 ? (idx % 2 === 0 ? "#06b6d4" : "#f43f5e") : "#fde047";
    for (let wy = baseY - sh + 6; wy < baseY - 10; wy += 9) {
      ctx.fillRect(sx + 5, wy, 4, 4);
      if (sw >= 24) ctx.fillRect(sx + sw - 9, wy, 4, 4);
    }
  });

  // 4. Click Shockwave Ripples & Sparks
  for (let i = canvasRipples.length - 1; i >= 0; i--) {
    const rp = canvasRipples[i];
    rp.r += 5.2;
    rp.alpha -= 0.038;
    if (rp.alpha <= 0 || rp.r >= rp.maxR) {
      canvasRipples.splice(i, 1);
      continue;
    }
    ctx.strokeStyle = rp.color;
    ctx.globalAlpha = Math.max(0, rp.alpha);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (let i = canvasSparks.length - 1; i >= 0; i--) {
    const sp = canvasSparks[i];
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.life -= 0.045;
    if (sp.life <= 0) {
      canvasSparks.splice(i, 1);
      continue;
    }
    ctx.fillStyle = sp.color;
    ctx.globalAlpha = Math.max(0, sp.life);
    ctx.fillRect(sp.x, sp.y, 3.5, 3.5);
    ctx.globalAlpha = 1;
  }
}

// ============================================================================
// CITY NAMING MODAL LOGIC
// ============================================================================
function openCityNameModal() {
  const modal = document.getElementById("city-name-modal");
  const input = document.getElementById("city-name-input");
  input.value = state.cityName || RANDOM_CITY_NAMES[Math.floor(Math.random() * RANDOM_CITY_NAMES.length)];
  modal.classList.remove("hidden");
  setTimeout(() => input.select(), 60);
}

function confirmCityName() {
  const input = document.getElementById("city-name-input");
  const chosen = input.value.trim();
  state.cityName = chosen || RANDOM_CITY_NAMES[0];
  document.getElementById("city-name-modal").classList.add("hidden");
  SoundFX.wonder();
  applyEraTheme();
  updateTopHUD();
  saveGame(false);
}

// ============================================================================
// SAVE / LOAD / EXPORT / IMPORT / PRESTIGE
// ============================================================================
function saveGame(showNotification = false) {
  state.lastSavedAt = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  if (showNotification) {
    showToast("💾", "Timeline Saved", `${getFullCityTitle()} has been saved to browser storage.`);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state = { ...createDefaultState(), ...parsed };
    state.buildings = { ...createDefaultState().buildings, ...(parsed.buildings || {}) };
    state.wonders = Array.isArray(parsed.wonders) ? parsed.wonders : [];
    state.revealedBuildings = Array.isArray(parsed.revealedBuildings) ? parsed.revealedBuildings : ["forager"];
    state.revealedUpgrades = Array.isArray(parsed.revealedUpgrades) ? parsed.revealedUpgrades : [];

    const elapsedSec = Math.max(0, (Date.now() - (state.lastSavedAt || Date.now())) / 1000);
    if (elapsedSec > 10) {
      const offlineGain = getTotalCps() * elapsedSec * 0.5;
      if (offlineGain > 1) {
        state.cp += offlineGain;
        state.totalCp += offlineGain;
        state.allTimeCp += offlineGain;
        setTimeout(() => {
          showToast("🌙", `Welcome Back to ${getCityDisplayName()}!`, `Earned +${formatNum(offlineGain)} CP while offline (${Math.round(elapsedSec)}s).`);
        }, 400);
      }
    }
  } catch (err) {
    console.error("Failed to load save:", err);
  }
}

function triggerPrestige() {
  const pending = getPendingShards();
  if (pending <= 0) {
    showToast("⏳", "Not Enough Timeline Energy", "Reach at least 2,500,000 all-time CP to crystallize your first Time Shard.");
    return;
  }
  if (!confirm(`Open a Time Rift and reset ${getCityDisplayName()} to the Stone Age in exchange for +${pending} Time Shards?\n\nEach Time Shard grants a permanent +10% CP/s boost, and you keep all unlocked Achievements!`)) {
    return;
  }

  const nextState = createDefaultState();
  nextState.cityName = state.cityName;
  nextState.allTimeCp = state.allTimeCp;
  nextState.highestEra = state.highestEra;
  nextState.totalClicks = state.totalClicks;
  nextState.totalCrits = state.totalCrits || 0;
  nextState.anomaliesClicked = state.anomaliesClicked;
  nextState.achievements = [...state.achievements];
  nextState.sfxEnabled = state.sfxEnabled;
  nextState.shards = state.shards + pending;
  nextState.prestiges = state.prestiges + 1;

  state = nextState;
  saveGame();
  SoundFX.eraAdvance();
  applyEraTheme();
  renderBuildingsList();
  renderInfrastructureDistricts();
  renderUpgrades();
  renderWonders();
  checkAchievements();
  renderAchievements();
  updateTopHUD();
  showToast("⏳", "Time Rift Ascended!", `You now possess ${state.shards} Time Shards (+${state.shards * 10}% permanent production).`);
}

// ============================================================================
// INITIALIZATION & EVENT LISTENERS
// ============================================================================
function init() {
  registerUpgrades();
  registerAchievements();
  loadGame();
  checkProximityReveals();

  if (!state.cityName || !state.cityName.trim()) {
    openCityNameModal();
  }

  applyEraTheme();
  renderBuildingsList();
  renderInfrastructureDistricts();
  renderUpgrades();
  renderWonders();
  renderAchievements();
  updateTopHUD();

  document.getElementById("btn-rename-city").addEventListener("click", openCityNameModal);
  document.getElementById("btn-random-name").addEventListener("click", () => {
    const pick = RANDOM_CITY_NAMES[Math.floor(Math.random() * RANDOM_CITY_NAMES.length)];
    document.getElementById("city-name-input").value = pick;
    SoundFX.click(0);
  });
  document.getElementById("btn-confirm-name").addEventListener("click", confirmCityName);
  document.getElementById("city-name-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmCityName();
  });

  const soundBtn = document.getElementById("btn-sound");
  soundBtn.textContent = state.sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
  soundBtn.addEventListener("click", () => {
    state.sfxEnabled = !state.sfxEnabled;
    soundBtn.textContent = state.sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
    if (state.sfxEnabled) SoundFX.achievement();
    saveGame(false);
  });

  document.querySelectorAll(".doctrine-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-doctrine") === state.doctrine);
    btn.addEventListener("click", () => {
      state.doctrine = btn.getAttribute("data-doctrine");
      document.querySelectorAll(".doctrine-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      SoundFX.research();
      renderBuildingsList();
      renderInfrastructureDistricts();
      updateTopHUD();
    });
  });

  const mainClickerBtn = document.getElementById("main-clicker");
  mainClickerBtn.addEventListener("pointerdown", (e) => {
    if (e.button && e.button !== 0) return;
    handleMainClick(e);
  });
  mainClickerBtn.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
      e.preventDefault();
      handleMainClick(e);
    }
  });
  document.getElementById("golden-anomaly").addEventListener("click", handleAnomalyClick);

  const cityViewport = document.getElementById("city-scroll-viewport");
  if (cityViewport) {
    enableHorizontalDragScroll(cityViewport);
  }
  const btnPanLeft = document.getElementById("btn-pan-left");
  if (btnPanLeft && cityViewport) {
    btnPanLeft.addEventListener("click", () => {
      cityViewport.scrollBy({ left: -240, behavior: "smooth" });
    });
  }
  const btnPanRight = document.getElementById("btn-pan-right");
  if (btnPanRight && cityViewport) {
    btnPanRight.addEventListener("click", () => {
      cityViewport.scrollBy({ left: 240, behavior: "smooth" });
    });
  }

  document.querySelectorAll(".buy-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".buy-mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const val = btn.getAttribute("data-qty");
      buyMode = val === "max" ? "max" : parseInt(val, 10);
      renderBuildingsList();
    });
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(`tab-${tabId}`).classList.add("active");
      if (tabId === "stats") renderStats();
      if (tabId === "wonders") renderWonders();
      if (tabId === "city") renderInfrastructureDistricts();
    });
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      achFilter = btn.getAttribute("data-filter");
      renderAchievements();
    });
  });

  document.getElementById("btn-buy-all-upgrades").addEventListener("click", () => {
    const avail = UPGRADES.filter(
      (u) => !state.upgrades.includes(u.id) && (state.revealedUpgrades || []).includes(u.id)
    ).sort((a, b) => a.cost - b.cost);
    let bought = 0;
    avail.forEach((u) => {
      if (state.cp >= u.cost) {
        state.cp -= u.cost;
        state.upgrades.push(u.id);
        bought++;
      }
    });
    if (bought > 0) {
      SoundFX.research();
      checkProximityReveals();
      renderUpgrades();
      renderBuildingsList();
      renderInfrastructureDistricts();
      checkAchievements();
      updateTopHUD();
    }
  });

  const modal = document.getElementById("save-modal");
  const textarea = document.getElementById("save-textarea");
  document.getElementById("btn-export").addEventListener("click", () => {
    saveGame(false);
    textarea.value = btoa(encodeURIComponent(JSON.stringify(state)));
    modal.classList.remove("hidden");
  });
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  document.getElementById("btn-copy-save").addEventListener("click", () => {
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    showToast("📋", "Copied Save Crystal", "Your encoded save string is on your clipboard.");
  });
  document.getElementById("btn-import-save").addEventListener("click", () => {
    try {
      const code = textarea.value.trim();
      if (!code) return;
      const decoded = JSON.parse(decodeURIComponent(atob(code)));
      state = { ...createDefaultState(), ...decoded };
      state.buildings = { ...createDefaultState().buildings, ...(decoded.buildings || {}) };
      state.wonders = Array.isArray(decoded.wonders) ? decoded.wonders : [];
      state.revealedBuildings = Array.isArray(decoded.revealedBuildings) ? decoded.revealedBuildings : ["forager"];
      state.revealedUpgrades = Array.isArray(decoded.revealedUpgrades) ? decoded.revealedUpgrades : [];
      state.revealedWonders = Array.isArray(decoded.revealedWonders) ? decoded.revealedWonders : [];
      document.querySelectorAll(".doctrine-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-doctrine") === state.doctrine);
      });
      soundBtn.textContent = state.sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
      saveGame(false);
      checkProximityReveals();
      applyEraTheme();
      renderBuildingsList();
      renderInfrastructureDistricts();
      renderUpgrades();
      renderWonders();
      renderAchievements();
      updateTopHUD();
      modal.classList.add("hidden");
      showToast("📥", "Timeline Restored!", "Successfully imported your civilization data.");
    } catch (_) {
      alert("Invalid save string! Please check the code and try again.");
    }
  });

  document.getElementById("btn-save").addEventListener("click", () => saveGame(true));
  document.getElementById("btn-prestige").addEventListener("click", triggerPrestige);
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("Are you sure you want to completely wipe your save and found a new settlement?")) {
      localStorage.removeItem(SAVE_KEY);
      state = createDefaultState();
      boostExpiresAt = 0;
      document.querySelectorAll(".doctrine-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-doctrine") === state.doctrine);
      });
      soundBtn.textContent = state.sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
      checkProximityReveals();
      applyEraTheme();
      renderBuildingsList();
      renderInfrastructureDistricts();
      renderUpgrades();
      renderWonders();
      renderAchievements();
      updateTopHUD();
      openCityNameModal();
    }
  });

  // Main Game Loop (20 FPS)
  let lastTick = performance.now();
  let uiRefreshAccum = 0;
  setInterval(() => {
    const now = performance.now();
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    const gained = getTotalCps() * dt;
    if (gained > 0) {
      state.cp += gained;
      state.totalCp += gained;
      state.allTimeCp += gained;
    }

    updateTopHUD();
    drawCityCanvas();
    drawAllDistrictCanvases();
    drawClickerFxCanvas();

    uiRefreshAccum += dt;
    if (uiRefreshAccum >= 0.4) {
      uiRefreshAccum = 0;
      checkProximityReveals();
      checkEraProgression();
      checkAchievements();
      updateDistrictsStats();
      updateBuildingsAffordability();
      updateUpgradesAffordability();
      updateWondersAffordability();
      const statsTab = document.getElementById("tab-stats");
      if (statsTab && statsTab.classList.contains("active")) {
        renderStats();
      }
    }
  }, 50);

  setInterval(() => {
    const headlines = ERAS[state.currentEra].news;
    const rawPick = headlines[Math.floor(Math.random() * headlines.length)];
    document.getElementById("news-text").textContent = rawPick.replace(/\{CITY\}/g, getCityDisplayName());
  }, 9000);

  setInterval(() => {
    if (Math.random() < 0.42) triggerGoldenAnomaly();
  }, 26000);

  setInterval(() => saveGame(false), 15000);
}

window.addEventListener("DOMContentLoaded", init);
