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
// CIVIC ORDINANCES & INFRASTRUCTURE UPGRADES (155 Total Civic Upgrades!)
// ============================================================================
const UPGRADES = [];

const UPGRADE_CATEGORY_LABELS = {
  building_mult: "District Upgrade",
  synergy: "District Synergy",
  census: "Citizen Census",
  sprawl: "Urban Sprawl",
  special: "Civic Ordinance",
  click_boost: "Builder Tooling",
  global_mult: "Urban Masterplan"
};

function hasUpgrade(uId) {
  return (state.upgrades || []).includes(uId);
}

function registerUpgrades() {
  // 1. DISTRICT INFRASTRUCTURE TIERS (5 Tiers per Building: 1, 10, 25, 50, 100 owned = 90 Upgrades)
  const tierNames = [
    ["Woven Reed Roofs", "Clay Hearth Chimneys", "Dry-Stone Footings", "Paved Village Lanes", "Ancestor Longhouse Commons"],
    ["Silt Flood Ditches", "Ox-Drawn Plowshares", "Mud-Brick Granaries", "Terraced River Orchards", "Nilometer Floodgates"],
    ["Counterweight Shadufs", "Baked-Brick Sluice Gates", "Masonry Lock Chambers", "Royal Waterworks Board", "Archimedean Screw Batteries"],
    ["Shaded Linen Awnings", "Standardized Bronze Weights", "Caravanserai Courtyards", "Harbor Wharf Warehouses", "Grand Incense & Spice Souk"],
    ["Pozzolana Hydraulic Mortar", "Double-Tiered Stone Arches", "Settling Cisterns", "Municipal Thermae Baths", "Cloaca Maxima Vaults"],
    ["Paved Via Sacra", "Columned Civic Basilica", "Citizen Rostra Plaza", "Senatorial Municipal Mint", "Imperial Marble Curia"],
    ["Overshot Timber Millwheels", "Stone-Lined Millraces", "Fulling & Bakery Guilds", "Twin-Weir River Dam", "Royal River Locks & Sluices"],
    ["Cobblestone Thoroughfares", "Guildhall Bell Tower", "Free Market Town Charter", "Star-Bastion City Walls", "Sovereign Free-City League"],
    ["Rialto Stone Arch Bridge", "Double-Entry Clearinghouse", "Maritime Harbor Insurance", "Grand Piazza Arcade", "Bourse of the Seven Seas"],
    ["Public Reading Rotunda", "Botanical Teaching Gardens", "Astronomical Clock Cupola", "School of Civil Architecture", "Grand Academy of Urban Sciences"],
    ["High-Pressure Steam Boilers", "Rotary Dynamo Generators", "Electric Streetlamp Network", "High-Voltage Substations", "Regional Pumped-Hydro Grid"],
    ["Bessemer Steel Rails", "Pneumatic Track Switches", "Vaulted Glass Train Shed", "Underground Subway Links", "Transcontinental Sleeper Express"],
    ["Pressurized Reactor Domes", "Hyperbolic Cooling Towers", "Automated Grid Dispatch", "Superconducting City Ring", "Tokamak Fusion Pilot Core"],
    ["Instrument Landing Radar", "Parallel Jet Runways", "Automated People-Movers", "International Concourse Hub", "Supersonic Stratosphere Wing"],
    ["Tuned Mass Wind Dampers", "Double-Deck Express Lifts", "Solar Curtain-Wall Glass", "Sky-Lobby Transit Bridges", "Diamond-Frame Supertall Core"],
    ["Superconducting Guideways", "Aerodynamic Nose Cones", "AI Headway Control", "Vacuum-Tube Express Loops", "Sub-Continental Hyperloop Mesh"],
    ["Hydroponic Sky-Atriums", "Holographic Transit Decks", "Atmospheric Rain Catchers", "Autonomous Drone Skyways", "Stratospheric Cloud-Gardens"],
    ["Electromagnetic Launch Track", "Cryogenic Fuel Plazas", "Orbital Commuter Lounges", "Planetary Gateway Ring", "Geostationary Orbital Terminus"]
  ];

  const tierFlavors = [
    "Warm hearths and dry thatch turn a camp into a permanent home.",
    "Every annual flood leaves behind black river silt worth its weight in gold.",
    "Where water flows by the surveyor's rod, the desert blooms into orchard.",
    "Copper scales and sealed clay jars keep every caravan merchant honest.",
    "Fresh mountain water arcs across the valley on two hundred stone piers.",
    "Under marble colonnades, citizens debate laws, taxes, and tomorrow's harvest.",
    "The river never sleeps, turning oak gears day and night for the city's bakers.",
    "City air makes you free—provided you pay your guild dues on market day.",
    "Bills of exchange signed on the Rialto finance ships three oceans away.",
    "An educated citizenry builds straighter bridges and deeper harbors.",
    "Copper wires hum overhead as gaslight gives way to the electric age.",
    "All timetables in the republic are set by the Grand Central station clock.",
    "Split atoms warm a million apartments without a single wisp of coal smoke.",
    "Every ninety seconds, another silver airliner touches down from across the globe.",
    "Steel and Low-E glass reach past the clouds to anchor the financial core.",
    "Frictionless magnetic cushions turn a two-hour commute into a ten-minute glide.",
    "Whole neighborhoods blossom two hundred floors above the street-level rain.",
    "The morning commuter shuttle now docks at Low Earth Orbit Platform Four."
  ];

  const tierThresholds = [1, 10, 25, 50, 100];
  const tierCostMults = [12, 160, 2200, 35000, 650000];

  BUILDINGS.forEach((b, bIdx) => {
    tierThresholds.forEach((reqCount, tIdx) => {
      UPGRADES.push({
        id: `b_${b.id}_t${tIdx}`,
        name: tierNames[bIdx][tIdx],
        icon: b.icon,
        era: b.era,
        cost: Math.round(b.baseCost * tierCostMults[tIdx]),
        desc: `${b.name} (${b.districtName}) output is DOUBLED (2x).`,
        flavor: tierFlavors[bIdx],
        type: "building_mult",
        cat: "building_mult",
        target: b.id,
        mult: 2,
        req: (s) => (s.buildings[b.id] || 0) >= reqCount
      });
    });
  });

  // 2. INTER-DISTRICT SYNERGIES (18 Upgrades linking pairs of city districts!)
  const synergyUpgrades = [
    {
      id: "syn_hearth_grain", era: 0, icon: "🧺", name: "Communal Granary Baskets",
      cost: 1600, bA: "forager", bB: "megalith", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Woven reed storage baskets carry riverbank harvests straight to every family hearth."
    },
    {
      id: "syn_silt_sluice", era: 1, icon: "💧", name: "Flooded Orchard Channels",
      cost: 22000, bA: "megalith", bB: "foundry", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Feeder ditches from the main canal keep every riverside field green through the dry season."
    },
    {
      id: "syn_barge_wharf", era: 1, icon: "🛶", name: "Canal Barge Wharves",
      cost: 260000, bA: "foundry", bB: "ziggurat", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Flat-bottomed canal barges unload figs, cedar, and pottery right at the bazaar gates."
    },
    {
      id: "syn_caravan_lead", era: 2, icon: "🐪", name: "Caravan Watering Basins",
      cost: 3500000, bA: "ziggurat", bB: "aqueduct", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Aqueduct-fed marble troughs refresh merchant camel trains arriving at the market quarter."
    },
    {
      id: "syn_nymphaeum", era: 2, icon: "⛲", name: "Forum Nymphaeum Fountains",
      cost: 48000000, bA: "aqueduct", bB: "academy", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Cascading public fountains cool the marble colonnades where senators and citizens gather."
    },
    {
      id: "syn_senate_assize", era: 3, icon: "⚖️", name: "Municipal Bread & Flour Assize",
      cost: 700000000, bA: "academy", bB: "watermill", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Civic magistrates regulate flour weights and watermill tolls along the riverfront."
    },
    {
      id: "syn_guild_mills", era: 3, icon: "🥖", name: "Fullers & Bakers Guild Charter",
      cost: 10500000000, bA: "watermill", bB: "citadel", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "River-powered trip hammers and flour mills supply the Old Town guild workshops."
    },
    {
      id: "syn_hans_clearing", era: 4, icon: "🧾", name: "Merchant Contor Bills of Credit",
      cost: 150000000000, bA: "citadel", bB: "press", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Guild aldermen settle international trade balances with a stroke of the banker's quill."
    },
    {
      id: "syn_chair_econ", era: 4, icon: "📚", name: "Chair of Civic Jurisprudence",
      cost: 2300000000000, bA: "press", bB: "observatory", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Merchant princes endow university chairs in maritime law, mathematics, and architecture."
    },
    {
      id: "syn_polytechnic", era: 5, icon: "🔬", name: "Polytechnic Thermodynamics Lab",
      cost: 35000000000000, bA: "observatory", bB: "steamworks", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "University engineers design high-efficiency steam turbines for the municipal power grid."
    },
    {
      id: "syn_traction_grid", era: 5, icon: "⚡", name: "Electrified Third-Rail Switchyards",
      cost: 520000000000000, bA: "steamworks", bB: "railhub", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Dedicated rotary converters feed high-voltage traction power straight to the rail terminus."
    },
    {
      id: "syn_atomic_express", era: 6, icon: "🚆", name: "Grid-Powered Express Corridors",
      cost: 8000000000000000, bA: "railhub", bB: "fission", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Abundant nuclear baseload power lets electric commuter trains run every ninety seconds."
    },
    {
      id: "syn_jet_grid", era: 6, icon: "🛫", name: "Runway Radar & Hydrogen Plant",
      cost: 130000000000000000, bA: "fission", bB: "cosmodrome", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Dedicated reactor lines power airport radar arrays, terminal climate systems, and fuel synthesis."
    },
    {
      id: "syn_corporate_shuttle", era: 7, icon: "🚁", name: "Executive Skyport Air-Link",
      cost: 2100000000000000000, bA: "cosmodrome", bB: "fab", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Rooftop vertiports and customs lounges connect global flights directly to downtown towers."
    },
    {
      id: "syn_sub_concourse", era: 7, icon: "🚄", name: "Subterranean Maglev Concourse",
      cost: 34000000000000000000, bA: "fab", bB: "quantum", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "High-speed maglev platforms open directly into the underground lobbies of every skyscraper."
    },
    {
      id: "syn_skybridge_loop", era: 8, icon: "🚝", name: "Vertical Maglev Sky-Bridges",
      cost: 560000000000000000000, bA: "quantum", bB: "arcology", reqA: 15, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Maglev cars transition seamlessly from horizontal city tracks into vertical arcology shafts."
    },
    {
      id: "syn_orbital_hook", era: 8, icon: "🚀", name: "Arcology Launch-Loop Concourse",
      cost: 9500000000000000000000, bA: "arcology", bB: "dyson", reqA: 10, reqB: 5, boostA: 0.02, boostB: 0.01,
      flavor: "Upper arcology sky-decks connect directly to the sub-orbital shuttle boarding rings."
    },
    {
      id: "syn_alpha_omega", era: 8, icon: "🏛️", name: "Founders' Heritage Biosphere Domes",
      cost: 25000000000000000000000, bA: "forager", bB: "dyson", reqA: 50, reqB: 5, boostA: 0.05, boostB: 0.005,
      flavor: "Preserved under climate-controlled glass domes, the city's original thatched huts inspire orbital travelers."
    }
  ];

  synergyUpgrades.forEach((syn) => {
    const bObjA = BUILDINGS.find((b) => b.id === syn.bA);
    const bObjB = BUILDINGS.find((b) => b.id === syn.bB);
    UPGRADES.push({
      id: syn.id,
      era: syn.era,
      name: syn.name,
      icon: syn.icon,
      cost: syn.cost,
      desc: `${bObjA.name} gains +${(syn.boostA * 100).toFixed(0)}% CP/s per ${bObjB.name}, and ${bObjB.name} gains +${(syn.boostB * 100).toFixed(1).replace(/\.0$/, "")}% CP/s per ${bObjA.name}.`,
      flavor: syn.flavor,
      type: "synergy",
      cat: "synergy",
      bA: syn.bA,
      bB: syn.bB,
      boostA: syn.boostA,
      boostB: syn.boostB,
      req: (s) => (s.buildings[syn.bA] || 0) >= syn.reqA && (s.buildings[syn.bB] || 0) >= syn.reqB
    });
  });

  // 3. CITIZEN CENSUS & HOUSING ORDINANCES (9 Upgrades, 1 per Era — boosts Population & Global CP/s!)
  const censusUpgrades = [
    { id: "cen_0", era: 0, name: "Hearth Tally Sticks", icon: "🪵", cost: 420, popMult: 1.20, cpsMult: 1.10, reqCp: 160, flavor: "Notched willow wands record every family sharing the village granary." },
    { id: "cen_1", era: 1, name: "Cuneiform Clay Census", icon: "🏺", cost: 28000, popMult: 1.25, cpsMult: 1.12, reqCp: 10000, flavor: "Baked clay tablets list every canal plot, orchard, and artisan household." },
    { id: "cen_2", era: 2, name: "Censor's Marble Citizen Roll", icon: "📜", cost: 1600000, popMult: 1.25, cpsMult: 1.15, reqCp: 550000, flavor: "Every five years, citizens gather in the Campus Martius to register their household." },
    { id: "cen_3", era: 3, name: "Burghers' Domesday Ledger", icon: "📖", cost: 110000000, popMult: 1.30, cpsMult: 1.15, reqCp: 38000000, flavor: "Bound in calfskin and locked in the Guildhall chest, not a single watermill escapes the tally." },
    { id: "cen_4", era: 4, name: "Parish & Piazza Registry", icon: "🏮", cost: 8500000000, popMult: 1.30, cpsMult: 1.18, reqCp: 2800000000, flavor: "Oil streetlamps and night-watchmen keep the growing canal wards safe after sundown." },
    { id: "cen_5", era: 5, name: "Penny Post & Street Directory", icon: "📮", cost: 650000000000, popMult: 1.35, cpsMult: 1.20, reqCp: 220000000000, flavor: "Numbered rowhouses and twice-daily mail delivery knit a million citizens into one metropolis." },
    { id: "cen_6", era: 6, name: "Metropolitan Beltway Zoning", icon: "🛣️", cost: 52000000000000, popMult: 1.40, cpsMult: 1.22, reqCp: 18000000000000, flavor: "Leafy garden suburbs and express commuter lines welcome the post-war baby boom." },
    { id: "cen_7", era: 7, name: "Unified Smart-Citizen Pass", icon: "💳", cost: 4500000000000000, popMult: 1.50, cpsMult: 1.25, reqCp: 1500000000000000, flavor: "One contactless card opens your maglev gate, library account, and sky-park conservatory." },
    { id: "cen_8", era: 8, name: "Neural Census Hive-Consensus", icon: "🧠", cost: 450000000000000000, popMult: 1.65, cpsMult: 1.35, reqCp: 150000000000000000, flavor: "Billions of citizens vote on municipal budget allocations in picoseconds via the city mesh." }
  ];

  censusUpgrades.forEach((cen) => {
    UPGRADES.push({
      id: cen.id,
      era: cen.era,
      name: cen.name,
      icon: cen.icon,
      cost: cen.cost,
      desc: `City Population +${Math.round((cen.popMult - 1) * 100)}% and all infrastructure output +${Math.round((cen.cpsMult - 1) * 100)}%.`,
      flavor: cen.flavor,
      type: "census",
      cat: "census",
      popMult: cen.popMult,
      mult: cen.cpsMult,
      req: (s) => s.currentEra >= cen.era && s.totalCp >= cen.reqCp
    });
  });

  // 4. URBAN SPRAWL MILESTONES (7 Upgrades scaling with Total Buildings Constructed!)
  const sprawlUpgrades = [
    { id: "spr_15", era: 0, reqBld: 15, name: "Boundary Marker Cairns", icon: "🪨", cost: 900, perBld: 0.001, flavor: "Stacked river stones mark where the village commons end and the farmlands begin." },
    { id: "spr_40", era: 1, reqBld: 40, name: "Hippodamian Gridiron Plan", icon: "📏", cost: 45000, perBld: 0.001, flavor: "Straight avenues intersecting at right angles make every new city block twice as efficient." },
    { id: "spr_80", era: 2, reqBld: 80, name: "Pomerium Ring-Wall Expansion", icon: "🧱", cost: 2800000, perBld: 0.001, flavor: "As the suburbs outgrow the old ramparts, a wider circuit of stone walls embraces the city." },
    { id: "spr_140", era: 4, reqBld: 140, name: "Grand Radial Boulevards", icon: "🌳", cost: 16000000000, perBld: 0.001, flavor: "Tree-lined diagonal avenues link every district plaza to the central riverfront." },
    { id: "spr_220", era: 5, reqBld: 220, name: "Electric Streetcar Suburbs", icon: "🚋", cost: 1200000000000, perBld: 0.001, flavor: "Overhead trolley wires turn distant pastures into thriving residential boroughs." },
    { id: "spr_320", era: 7, reqBld: 320, name: "Elevated Pedway & Skywalk Network", icon: "🌉", cost: 9000000000000000, perBld: 0.001, flavor: "Climate-controlled glass skybridges connect seventy downtown blocks above the traffic." },
    { id: "spr_450", era: 8, reqBld: 450, name: "Continental Megacity Charter", icon: "🌐", cost: 900000000000000000, perBld: 0.0015, flavor: "From the coastal spaceports to the mountain arcologies, one unbroken skyline spans the horizon." }
  ];

  sprawlUpgrades.forEach((sp) => {
    UPGRADES.push({
      id: sp.id,
      era: sp.era,
      name: sp.name,
      icon: sp.icon,
      cost: sp.cost,
      desc: `All city infrastructure gains +${(sp.perBld * 100).toFixed(2).replace(/0$/, "")}% CP/s per total building owned in your city.`,
      flavor: sp.flavor,
      type: "sprawl",
      cat: "sprawl",
      perBld: sp.perBld,
      req: (s) => s.currentEra >= sp.era && getTotalBuildings(s) >= sp.reqBld
    });
  });

  // 5. CIVIC FESTIVALS, CRITICAL ARCHITECTURE & MUNICIPAL FINANCE LAWS (14 Upgrades)
  const specialUpgrades = [
    {
      id: "sp_bonfire", era: 0, name: "Harvest Bonfire Festival", icon: "🎪", cost: 650,
      desc: "All infrastructure output +10% and Golden Civic Booms appear 20% more frequently.",
      flavor: "Roasted grain, cider, and drums by the river rally the whole settlement.",
      mult: 1.10, anomalyFreq: 0.80,
      req: (s) => getTotalBuildings(s) >= 8
    },
    {
      id: "sp_brick_kilns", era: 1, name: "Standardized Royal Brick Kilns", icon: "🧱", cost: 19000,
      desc: "All city infrastructure costs 3% less CP to construct.",
      flavor: "Stamped with the city seal, uniform mud bricks cut construction waste across every ward.",
      discount: 0.97,
      req: (s) => getTotalBuildings(s) >= 20 && s.currentEra >= 1
    },
    {
      id: "sp_volunteer_brigade", era: 1, name: "Citizen Corvée Brigades", icon: "⚒️", cost: 55000,
      desc: "Click power +20% and +1.5% Global CP/s per order of magnitude (log10) of City Population.",
      flavor: "Between harvest and flood, every citizen lends a hand on the levee walls.",
      clickMult: 1.20, popLogCps: 0.015,
      req: (s) => s.currentEra >= 1 && s.totalClicks >= 40
    },
    {
      id: "sp_groma", era: 2, name: "Roman Surveyor's Groma", icon: "🎯", cost: 1200000,
      desc: "Critical Click chance +2% and Critical Click multiplier increased by +0.25x.",
      flavor: "Plumb bobs and bronze sighting crosses align aqueducts and avenues to the millimeter.",
      critChance: 0.02, critMultBonus: 0.25,
      req: (s) => s.currentEra >= 2 && (s.totalCrits || 0) >= 10
    },
    {
      id: "sp_bread_circus", era: 2, name: "Public Grain Dole & Games", icon: "🎭", cost: 3800000,
      desc: "Golden Civic Booms grant +25% larger CP rewards and Overdrive lasts +4s longer.",
      flavor: "Free loaves and chariot races keep the forum cheering through every season.",
      anomalyReward: 1.25, anomalyBuffSec: 4,
      req: (s) => s.currentEra >= 2 && s.totalCp >= 1200000
    },
    {
      id: "sp_crane_yards", era: 3, name: "Municipal Timber & Stone Yards", icon: "🏗️", cost: 85000000,
      desc: "All city infrastructure costs an additional 4% less CP to construct.",
      flavor: "Seasoned oak beams and dressed limestone blocks sit ready by the river wharf.",
      discount: 0.96,
      req: (s) => s.currentEra >= 3 && getTotalBuildings(s) >= 55
    },
    {
      id: "sp_theodolite", era: 4, name: "Brass Optical Theodolite", icon: "🔭", cost: 6000000000,
      desc: "Critical Click chance +2% and Critical Click multiplier increased by +0.25x.",
      flavor: "Telescopic lenses and vernier scales let Renaissance architects span the widest canals.",
      critChance: 0.02, critMultBonus: 0.25,
      req: (s) => s.currentEra >= 4 && (s.totalCrits || 0) >= 35
    },
    {
      id: "sp_carnival", era: 4, name: "Grand Canal Regatta & Carnival", icon: "🚣", cost: 18000000000,
      desc: "Golden Civic Booms stay visible 25% longer and grant +25% larger rewards.",
      flavor: "Gilded barges and masked revelers fill the lantern-lit piazzas from dusk till dawn.",
      anomalyReward: 1.25, anomalyStay: 1.25,
      req: (s) => s.currentEra >= 4 && s.totalCp >= 6000000000
    },
    {
      id: "sp_bessemer_prefab", era: 5, name: "Prefabricated Cast-Iron Frames", icon: "🔩", cost: 480000000000,
      desc: "All city infrastructure costs an additional 5% less CP to construct.",
      flavor: "Numbered iron columns cast at the foundry bolt together on-site in a single week.",
      discount: 0.95,
      req: (s) => s.currentEra >= 5 && getTotalBuildings(s) >= 110
    },
    {
      id: "sp_world_fair", era: 5, name: "Centennial World's Exposition", icon: "🎡", cost: 1500000000000,
      desc: "All infrastructure output +15% and Chrono Overdrive buffs gain +0.5x extra multiplier.",
      flavor: "Visitors from every continent marvel at the Palace of Electricity and the giant Ferris wheel.",
      mult: 1.15, overdriveBonus: 0.5,
      req: (s) => s.currentEra >= 5 && s.totalCp >= 500000000000
    },
    {
      id: "sp_laser_level", era: 6, name: "Laser Gyroscope Surveying", icon: "🔬", cost: 38000000000000,
      desc: "Critical Click chance +3% and Critical Click multiplier increased by +0.25x.",
      flavor: "Coherent ruby-laser beams guide tunnel-boring machines beneath the entire metro area.",
      critChance: 0.03, critMultBonus: 0.25,
      req: (s) => s.currentEra >= 6 && (s.totalCrits || 0) >= 75
    },
    {
      id: "sp_civic_pride", era: 6, name: "Metropolitan Civic Pride Campaign", icon: "🗽", cost: 110000000000000,
      desc: "Click power +25% and +2% Global CP/s per order of magnitude (log10) of City Population.",
      flavor: "Neon welcome signs, botanical parks, and symphony halls make every citizen proud of their city.",
      clickMult: 1.25, popLogCps: 0.02,
      req: (s) => s.currentEra >= 6 && s.totalCp >= 35000000000000
    },
    {
      id: "sp_muni_bonds", era: 7, name: "AAA Municipal Infrastructure Bonds", icon: "💹", cost: 3200000000000000,
      desc: "All city infrastructure costs 5% less CP and produces +15% CP/s.",
      flavor: "Global pension funds compete to finance your city's next maglev line at near-zero interest.",
      discount: 0.95, mult: 1.15,
      req: (s) => s.currentEra >= 7 && getTotalBuildings(s) >= 180
    },
    {
      id: "sp_quantum_cad", era: 8, name: "Quantum Structural Simulation", icon: "⚡", cost: 320000000000000000,
      desc: "Critical Click chance +3% and Critical Click multiplier increased by +0.25x.",
      flavor: "Qubit stress-tensors optimize every carbon-nanotube truss before the first drone lifts off.",
      critChance: 0.03, critMultBonus: 0.25,
      req: (s) => s.currentEra >= 8 && (s.totalCrits || 0) >= 120
    }
  ];

  specialUpgrades.forEach((sp) => {
    UPGRADES.push({
      ...sp,
      type: "special",
      cat: "special"
    });
  });

  // 6. CONSTRUCTION TOOLING & CLICK UPGRADES (9 Upgrades, 1 per Era)
  const clickUpgrades = [
    { id: "c_flint", era: 0, name: "Timber Framing Mallets", icon: "🔨", cost: 100, desc: "Base click +1 CP and +0.25% of your CP/s per click.", flavor: "Seasoned oak mallets and mortise chisels raise sturdy ridgepoles in half the time.", flat: 1, cpsPct: 0.0025, reqCp: 35 },
    { id: "c_lever", era: 1, name: "Mud-Brick Molds & Plumb Lines", icon: "🧱", cost: 8000, desc: "Click power x1.25 and +0.25% of your CP/s per click.", flavor: "Wooden brick frames let a single mason form four hundred sun-dried bricks a day.", mult: 1.25, cpsPct: 0.0025, reqCp: 2500 },
    { id: "c_crane", era: 2, name: "Roman Treadwheel Crane", icon: "🏗️", cost: 500000, desc: "Click power x1.25 and +0.25% of your CP/s per click.", flavor: "Compound pulleys and a timber walking-wheel lift six-ton marble architraves with ease.", mult: 1.25, cpsPct: 0.0025, reqCp: 150000 },
    { id: "c_guild", era: 3, name: "Master Mason Guild Square", icon: "📐", cost: 35000000, desc: "Click power x1.35 and +0.35% of your CP/s per click.", flavor: "Geometric ratios guarded by the cathedral lodge turn raw stone into soaring ribs.", mult: 1.35, cpsPct: 0.0035, reqCp: 10000000 },
    { id: "c_da_vinci", era: 4, name: "Geared Hoist & Scaffolding", icon: "⚙️", cost: 2500000000, desc: "Click power x1.35 and +0.35% of your CP/s per click.", flavor: "Reversible worm-gear winches allow domes to be raised without centering timbers.", mult: 1.35, cpsPct: 0.0035, reqCp: 600000000 },
    { id: "c_pneumatic", era: 5, name: "Steam Riveting Gantry", icon: "🔩", cost: 180000000000, desc: "Click power x1.4 and +0.35% of your CP/s per click.", flavor: "White-hot iron rivets clinch bridge girders together with a deafening staccato roar.", mult: 1.4, cpsPct: 0.0035, reqCp: 50000000000 },
    { id: "c_laser", era: 6, name: "Tower Crane Fleet", icon: "🏗️", cost: 15000000000000, desc: "Click power x1.4 and +0.4% of your CP/s per click.", flavor: "Self-climbing slewing cranes crown every block of the expanding downtown skyline.", mult: 1.4, cpsPct: 0.004, reqCp: 4000000000000 },
    { id: "c_exo", era: 7, name: "Automated Prefab Robotics", icon: "🦾", cost: 1200000000000000, desc: "Click power x1.5 and +0.4% of your CP/s per click.", flavor: "Robotic gantry welders assemble entire skyscraper floors in twenty-four hours.", mult: 1.5, cpsPct: 0.004, reqCp: 350000000000000 },
    { id: "c_neural", era: 8, name: "Nano-Swarm Assembler Grid", icon: "🏙️", cost: 120000000000000000, desc: "Click power x1.5 and +0.4% of your CP/s per click.", flavor: "Programmable utility fog extrudes diamondoid spires directly from atmospheric carbon.", mult: 1.5, cpsPct: 0.004, reqCp: 35000000000000000 }
  ];

  clickUpgrades.forEach((cu) => {
    UPGRADES.push({
      id: cu.id,
      era: cu.era,
      name: cu.name,
      icon: cu.icon,
      cost: cu.cost,
      desc: cu.desc,
      flavor: cu.flavor,
      type: "click_boost",
      cat: "click_boost",
      flat: cu.flat || 0,
      mult: cu.mult || 1,
      cpsPct: cu.cpsPct || 0,
      req: (s) => s.currentEra >= cu.era && s.totalCp >= cu.reqCp
    });
  });

  // 7. EPOCH URBAN MASTERPLANS (8 Upgrades, Era 1–8)
  const eraTechs = [
    { id: "g_wheel", era: 1, name: "Paved Processional Roads", icon: "🛣️", cost: 15000, mult: 1.15, desc: "All city infrastructure output +15%.", flavor: "Limestone flagstones and curbstones keep wheeled carts rolling through winter rains." },
    { id: "g_alphabet", era: 2, name: "Municipal Zoning Code", icon: "📜", cost: 900000, mult: 1.15, desc: "All city infrastructure output +15%.", flavor: "Bronze tablets on the forum wall set building heights, fire lanes, and market hours." },
    { id: "g_compass", era: 3, name: "Hanseatic Port Authority", icon: "⚓", cost: 60000000, mult: 1.20, desc: "All city infrastructure output +20%.", flavor: "Dredged river channels and timber treadwheel cranes welcome deep-draft merchant cogs." },
    { id: "g_scientific", era: 4, name: "Grand Urban Masterplan", icon: "🗺️", cost: 4500000000, mult: 1.20, desc: "All city infrastructure output +20%.", flavor: "Symmetric piazzas, straight canal vistas, and harmonious classical facades unify the city." },
    { id: "g_dynamo", era: 5, name: "Alternating Current City Grid", icon: "💡", cost: 350000000000, mult: 1.25, desc: "All city infrastructure output +25%.", flavor: "Step-up transformers carry clean polyphase power to every borough and factory floor." },
    { id: "g_internet", era: 6, name: "Metropolitan Ring-Road & Metro", icon: "🚇", cost: 28000000000000, mult: 1.25, desc: "All city infrastructure output +25%.", flavor: "Deep-bore subway tubes and multi-lane beltways keep millions moving without gridlock." },
    { id: "g_agi", era: 7, name: "Fiber-Optic Smart City Mesh", icon: "📡", cost: 2500000000000000, mult: 1.30, desc: "All city infrastructure output +30%.", flavor: "Millisecond telemetry balances water pressure, maglev headways, and solar storage citywide." },
    { id: "g_singularity", era: 8, name: "Autonomous Megacity AI Core", icon: "🌌", cost: 250000000000000000, mult: 1.50, desc: "All city infrastructure output +50%.", flavor: "A sentient municipal mind orchestrates ten billion lives with effortless civic harmony." }
  ];

  eraTechs.forEach((et) => {
    UPGRADES.push({
      id: et.id,
      era: et.era,
      name: et.name,
      icon: et.icon,
      cost: et.cost,
      desc: et.desc,
      flavor: et.flavor,
      type: "global_mult",
      cat: "global_mult",
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
    [1, "Village Ordinance", "🔍"],
    [15, "Town Alderman", "📜"],
    [40, "Civic Lawgiver", "⚖️"],
    [80, "Grand Masterplanner", "🗺️"],
    [125, "Omniscient Urbanist", "🧠"]
  ];
  techMilestones.forEach(([cnt, title, icon]) => {
    ACHIEVEMENTS.push({
      id: `ach_tech_${cnt}`,
      era: 0,
      name: title,
      desc: `Enact ${cnt} Civic Upgrades.`,
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

const SEASONS = [
  {
    id: "spring",
    name: "🌸 Spring Thaw",
    desc: "Melting snows restore river basins. Farm yields +25%, +10% Population growth.",
    icon: "🌸",
    duration: 45,
    farmMod: 1.25,
    powerDemandMod: 1.0,
    crisisRiskMod: 0.8
  },
  {
    id: "summer",
    name: "☀️ Summer Heatwave",
    desc: "Scorching sun spikes power grid cooling demand by +35%. Wildfire crisis risk +40%.",
    icon: "☀️",
    duration: 45,
    farmMod: 1.10,
    powerDemandMod: 1.35,
    crisisRiskMod: 1.4
  },
  {
    id: "autumn",
    name: "🍂 Autumn Harvest",
    desc: "Bountiful granary reserves collected! Farm yields +50%, citizen morale +15%.",
    icon: "🍂",
    duration: 45,
    farmMod: 1.50,
    powerDemandMod: 0.95,
    crisisRiskMod: 0.9
  },
  {
    id: "winter",
    name: "❄️ Great Blizzard",
    desc: "Sub-zero frost halts agriculture (-50% farm yields) and spikes heating power demand (+45%).",
    icon: "❄️",
    duration: 45,
    farmMod: 0.50,
    powerDemandMod: 1.45,
    crisisRiskMod: 1.3
  }
];

function createDefaultCivState() {
  return {
    food: 100,
    happiness: 100,
    stability: 100,
    integrity: 100,
    taxRate: "normal",
    jobs: {
      farmers: 30,
      workers: 30,
      scholars: 20,
      guards: 20
    },
    crises: {},
    overdrives: {},
    collapses: 0,
    seasonIdx: 0,
    seasonTimer: 45,
    granary: 100,
    granaryCap: 100,
    grainNetRate: 0,
    gridPower: 50,
    gridDemand: 25,
    upkeepCost: 0,
    isFamine: false,
    isBrownout: false,
    laws: {
      rationing: false,
      overtime: false,
      research: false,
      curfew: false
    }
  };
}

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
    devUnlocked: false,
    civ: createDefaultCivState(),
    startedAt: Date.now(),
    lastSavedAt: Date.now()
  };
}

const DEV_SECRET_KEYWORD = "metropolisclicktopolisapocalypse";
let state = createDefaultState();
let buyMode = 1;
let achFilter = "all";
let boostMultiplier = 1;
let boostExpiresAt = 0;
let boostName = "⚡ Chrono Overdrive (2x)";
let devGodMode = false;
let devAlwaysCrit = false;
let devImmortalMode = false;
let devKeyBuffer = "";
let selectedDistrictId = null;
let hoveredDistrictId = null;

function ensureCivState() {
  if (!state.civ || typeof state.civ !== "object") {
    state.civ = createDefaultCivState();
  }
  const def = createDefaultCivState();
  if (!isFinite(state.civ.food)) state.civ.food = def.food;
  if (!isFinite(state.civ.happiness)) state.civ.happiness = def.happiness;
  if (!isFinite(state.civ.stability)) state.civ.stability = def.stability;
  if (!isFinite(state.civ.integrity)) state.civ.integrity = def.integrity;
  if (!state.civ.taxRate) state.civ.taxRate = "normal";
  if (!state.civ.jobs || typeof state.civ.jobs !== "object") {
    state.civ.jobs = { ...def.jobs };
  }
  if (!state.civ.crises || typeof state.civ.crises !== "object") {
    state.civ.crises = {};
  }
  if (!state.civ.overdrives || typeof state.civ.overdrives !== "object") {
    state.civ.overdrives = {};
  }
  if (!isFinite(state.civ.collapses)) state.civ.collapses = 0;
  if (!isFinite(state.civ.seasonIdx)) state.civ.seasonIdx = 0;
  if (!isFinite(state.civ.seasonTimer)) state.civ.seasonTimer = 45;
  if (!isFinite(state.civ.granary)) state.civ.granary = 100;
  if (!isFinite(state.civ.granaryCap)) state.civ.granaryCap = 100;
  if (!isFinite(state.civ.grainNetRate)) state.civ.grainNetRate = 0;
  if (!isFinite(state.civ.gridPower)) state.civ.gridPower = 50;
  if (!isFinite(state.civ.gridDemand)) state.civ.gridDemand = 25;
  if (!isFinite(state.civ.upkeepCost)) state.civ.upkeepCost = 0;
  if (typeof state.civ.isFamine !== "boolean") state.civ.isFamine = false;
  if (typeof state.civ.isBrownout !== "boolean") state.civ.isBrownout = false;
  if (!state.civ.laws || typeof state.civ.laws !== "object") {
    state.civ.laws = { rationing: false, overtime: false, research: false, curfew: false };
  }
}

// ============================================================================
// VERCEL ANALYTICS & TELEMETRY INTEGRATION
// ============================================================================
function trackGameEvent(name, data = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", { name, ...data });
    }
  } catch (err) {
    // Non-blocking telemetry
    console.debug("[Analytics]", name, data, err);
  }
}

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
  let popMult = 1;
  if (hasWonder("w_gardens")) popMult *= 1.5;
  UPGRADES.forEach((u) => {
    if (u.type === "census" && u.popMult && state.upgrades.includes(u.id)) {
      popMult *= u.popMult;
    }
  });
  return Math.round(pop * popMult);
}

function getBuildingDiscount() {
  let disc = hasWonder("w_cathedral") ? 0.92 : 1.0;
  UPGRADES.forEach((u) => {
    if (u.type === "special" && u.discount && state.upgrades.includes(u.id)) {
      disc *= u.discount;
    }
  });
  return disc;
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
// PRODUCTION, DOCTRINE, STRATEGY VITALS, WONDER & CLICK POWER CALCULATIONS
// ============================================================================
function getCritChance() {
  if (devAlwaysCrit) return 1.0;
  let chance = 0.05;
  if (state.doctrine === "balanced") chance += 0.02;
  else if (state.doctrine === "industrious") chance += 0.05;
  if (hasWonder("w_stonehenge")) chance += 0.03;
  if (hasWonder("w_workshop")) chance += 0.04;
  UPGRADES.forEach((u) => {
    if (u.type === "special" && u.critChance && state.upgrades.includes(u.id)) {
      chance += u.critChance;
    }
  });
  return chance;
}

function getCritMultiplier() {
  let mult = 2.0;
  UPGRADES.forEach((u) => {
    if (u.type === "special" && u.critMultBonus && state.upgrades.includes(u.id)) {
      mult += u.critMultBonus;
    }
  });
  return mult;
}

function getTaxMultiplier() {
  ensureCivState();
  switch (state.civ.taxRate) {
    case "low": return 0.80;
    case "high": return 1.35;
    case "brutal": return 1.75;
    default: return 1.00;
  }
}

function getGlobalMultiplier() {
  ensureCivState();
  let mult = 1;
  mult *= 1 + state.achievements.length * 0.01;
  mult *= 1 + state.shards * 0.10;

  if (state.doctrine === "balanced") mult *= 1.10;
  else if (state.doctrine === "industrious") mult *= 0.90;
  else if (state.doctrine === "prosperity") mult *= 1.20;

  // Tax policy & Scholar workforce bonus
  mult *= getTaxMultiplier();
  const scholarsPct = state.civ.jobs.scholars || 20;
  mult *= Math.max(0.7, 1 + (scholarsPct - 15) * 0.015);

  // Golden Age Harmony Bonus when all vitals >= 80%
  if (state.civ.food >= 80 && state.civ.happiness >= 80 && state.civ.stability >= 80 && state.civ.integrity >= 80) {
    mult *= 1.20;
  }

  if (hasWonder("w_gardens")) mult *= 1.15;
  if (hasWonder("w_colossus")) mult *= 1.15;
  if (hasWonder("w_workshop")) mult *= 1.20;
  if (hasWonder("w_crystal_palace")) mult *= 1.25;
  if (hasWonder("w_orbital_elevator")) mult *= 1.50;

  const totBlds = getTotalBuildings();
  let popOrders = 0;
  let needPopOrders = false;

  UPGRADES.forEach((u) => {
    if (!state.upgrades.includes(u.id)) return;
    if ((u.type === "global_mult" || u.type === "census" || u.type === "special") && u.mult) {
      mult *= u.mult;
    }
    if (u.type === "sprawl" && u.perBld) {
      mult *= 1 + totBlds * u.perBld;
    }
    if (u.type === "special" && u.popLogCps) {
      if (!needPopOrders) {
        needPopOrders = true;
        popOrders = Math.max(0, Math.log10(Math.max(1, getPopulation())));
      }
      mult *= 1 + popOrders * u.popLogCps;
    }
  });

  if (Date.now() < boostExpiresAt) {
    mult *= boostMultiplier;
  }
  if (devGodMode) {
    mult *= 1000;
  }
  return mult;
}

function getBuildingSingleCps(b) {
  ensureCivState();
  let cps = b.baseCps;
  UPGRADES.forEach((u) => {
    if (!state.upgrades.includes(u.id)) return;
    if (u.type === "building_mult" && u.target === b.id) {
      cps *= u.mult;
    } else if (u.type === "synergy") {
      if (u.bA === b.id) {
        cps *= 1 + (state.buildings[u.bB] || 0) * u.boostA;
      } else if (u.bB === b.id) {
        cps *= 1 + (state.buildings[u.bA] || 0) * u.boostB;
      }
    }
  });
  // District Overdrive (2x for 30s)
  if ((state.civ.overdrives[b.id] || 0) > Date.now()) {
    cps *= 2.0;
  }
  // Active Crisis penalty on this district (-75% output until resolved)
  if (state.civ.crises[b.id]) {
    cps *= 0.25;
  }
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

function getUpkeepCost() {
  ensureCivState();
  let totalUpkeep = 0;
  BUILDINGS.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    if (count > 0) {
      // Scale upkeep with era: Era 0 is free; Era 1+ scales smoothly with structure tier
      const eraRates = [0, 0.0006, 0.0018, 0.0035, 0.0055, 0.0075];
      const rate = eraRates[b.era] !== undefined ? eraRates[b.era] : 0.008;
      totalUpkeep += count * (b.baseCost * rate);
    }
  });

  // Science Subsidies Ordinance increases municipal upkeep by +15%
  if (state.civ.laws && state.civ.laws.research) {
    totalUpkeep *= 1.15;
  }

  state.civ.upkeepCost = totalUpkeep;
  return totalUpkeep;
}

// Net CP/s accounts for Civilization Deficit / Unrest / Upkeep / Famine / Brownouts! Can go NEGATIVE!
function getNetCps() {
  ensureCivState();
  let gross = getTotalCps();
  if (gross <= 0) return 0;

  // Law bonuses
  if (state.civ.laws && state.civ.laws.overtime) {
    gross *= 1.20; // +20% industrial overtime bonus
  }
  if (state.civ.laws && state.civ.laws.research) {
    gross *= 1.12; // +12% scholar discovery bonus
  }

  // Famine penalty (-60% output if granary is empty!)
  if (state.civ.isFamine) {
    gross *= 0.40;
  }

  // Brownout / Power Grid failure (-65% output if load exceeds capacity!)
  if (state.civ.isBrownout) {
    gross *= 0.35;
  }

  // Vitals penalties
  let penaltyFactor = 0;
  if (state.civ.food < 30) {
    penaltyFactor += ((30 - state.civ.food) / 30) * 0.85;
  }
  if (state.civ.happiness < 30) {
    penaltyFactor += ((30 - state.civ.happiness) / 30) * 0.75;
  }
  if (state.civ.stability < 35) {
    penaltyFactor += ((35 - state.civ.stability) / 35) * 1.10;
  }
  const activeCrisisCount = Object.keys(state.civ.crises || {}).length;
  if (activeCrisisCount > 0) {
    penaltyFactor += activeCrisisCount * 0.22;
  }

  const grossAfterVitals = gross * (1 - Math.min(1.5, penaltyFactor));
  const upkeep = getUpkeepCost();

  return grossAfterVitals - upkeep;
}

function getClickPower() {
  ensureCivState();
  let base = 1;
  let mult = 1;
  let cpsPct = 0;

  UPGRADES.forEach((u) => {
    if (!state.upgrades.includes(u.id)) return;
    if (u.type === "click_boost") {
      base += u.flat || 0;
      mult *= u.mult || 1;
      cpsPct += u.cpsPct || 0;
    } else if (u.type === "special" && u.clickMult) {
      mult *= u.clickMult;
    }
  });

  if (hasWonder("w_stonehenge")) mult *= 1.25;
  if (hasWonder("w_colossus")) mult *= 1.25;
  if (hasWonder("w_cern")) cpsPct += 0.01;

  if (state.doctrine === "industrious") mult *= 1.25;
  else if (state.doctrine === "prosperity") mult *= 0.85;

  // Engineer workforce boosts construction click power
  const workersPct = state.civ.jobs.workers || 30;
  mult *= Math.max(0.75, 1 + (workersPct - 20) * 0.015);

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
    trackGameEvent("era_advance", { era: ERAS[newEra].name });
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
  ensureCivState();
  const netCps = getNetCps();
  const cpc = getClickPower();
  const pop = getPopulation();
  const resEl = document.getElementById("res-amount");
  resEl.textContent = formatNum(state.cp, state.cp < 100 ? 1 : 0);

  const cpsEl = document.getElementById("res-cps");
  const rateBanner = document.getElementById("cp-rate-banner");
  if (netCps < 0) {
    cpsEl.textContent = `-${formatNum(Math.abs(netCps), 1)} /s (DEFICIT!)`;
    if (rateBanner) rateBanner.classList.add("deficit");
  } else {
    cpsEl.textContent = `+${formatNum(netCps, 1)} /s`;
    if (rateBanner) rateBanner.classList.remove("deficit");
  }

  document.getElementById("res-cpc").textContent = formatNum(cpc, 1);
  document.getElementById("res-pop").textContent = formatNum(pop, 0);
  document.getElementById("res-shards").textContent = formatNum(state.shards, 0);
  document.getElementById("pending-shards").textContent = `+${formatNum(getPendingShards(), 0)}`;
  document.getElementById("city-title-display").textContent = getFullCityTitle();

  // Panorama overlay label
  const panEraEl = document.getElementById("panorama-era-title");
  if (panEraEl) panEraEl.textContent = `${ERAS[state.currentEra].icon} ${getFullCityTitle()} (${ERAS[state.currentEra].name})`;
  const panCpsEl = document.getElementById("panorama-cps-share");
  if (panCpsEl) {
    panCpsEl.textContent = netCps < 0
      ? `⚠️ Deficit: -${formatNum(Math.abs(netCps), 1)} CP/s`
      : `Net Output: +${formatNum(netCps, 1)} CP/s`;
    panCpsEl.style.borderColor = netCps < 0 ? "#ef4444" : "rgba(255,255,255,0.16)";
    panCpsEl.style.color = netCps < 0 ? "#fca5a5" : "#fafaf9";
  }

  document.getElementById("bld-total-badge").textContent = getTotalBuildings();

  // Strategy Vitals & Workforce HUD
  const updateVitalBar = (key, valElId, fillElId) => {
    const val = Math.round(Math.max(0, Math.min(100, state.civ[key])));
    const valEl = document.getElementById(valElId);
    const fillEl = document.getElementById(fillElId);
    if (valEl) valEl.textContent = `${val}%`;
    if (fillEl) {
      fillEl.style.width = `${val}%`;
      fillEl.classList.toggle("low", val < 30);
      if (fillEl.parentElement && fillEl.parentElement.parentElement) {
        fillEl.parentElement.parentElement.classList.toggle("critical", val < 25);
      }
    }
  };
  updateVitalBar("food", "vital-food-val", "vital-food-fill");
  updateVitalBar("happiness", "vital-happy-val", "vital-happy-fill");
  updateVitalBar("stability", "vital-stab-val", "vital-stab-fill");
  updateVitalBar("integrity", "vital-grid-val", "vital-grid-fill");

  const wfPopEl = document.getElementById("wf-pop-total");
  if (wfPopEl) wfPopEl.textContent = formatNum(pop, 0);
  const fPctEl = document.getElementById("job-farmers-pct");
  if (fPctEl) fPctEl.textContent = `${state.civ.jobs.farmers}%`;
  const wPctEl = document.getElementById("job-workers-pct");
  if (wPctEl) wPctEl.textContent = `${state.civ.jobs.workers}%`;
  const sPctEl = document.getElementById("job-scholars-pct");
  if (sPctEl) sPctEl.textContent = `${state.civ.jobs.scholars}%`;
  const gPctEl = document.getElementById("job-guards-pct");
  if (gPctEl) gPctEl.textContent = `${state.civ.jobs.guards}%`;

  const crisisCount = Object.keys(state.civ.crises || {}).length;
  const crisisBadge = document.getElementById("crisis-count-badge");
  if (crisisBadge) crisisBadge.textContent = crisisCount;
  const repairBtn = document.getElementById("btn-decree-repair");
  if (repairBtn) repairBtn.classList.toggle("urgent", crisisCount > 0 || state.civ.integrity < 35);

  const warnBar = document.getElementById("collapse-warning-bar");
  const warnText = document.getElementById("collapse-warning-text");
  if (warnBar && warnText) {
    if (state.civ.stability < 32 || state.civ.food < 22 || crisisCount >= 2 || netCps < 0) {
      warnBar.classList.remove("hidden");
      if (state.civ.stability < 20) {
        warnText.textContent = `🌋 IMMINENT COLLAPSE! Stability at ${Math.round(state.civ.stability)}%! Lower taxes, assign Watchmen, or resolve crises immediately!`;
      } else if (crisisCount > 0) {
        warnText.textContent = `🚨 ${crisisCount} District Crisis(es) active in your 2.5D City! Click the burning districts on the map or click '🚒 Fix Crises'!`;
      } else {
        warnText.textContent = `⚠️ CIVIC DEFICIT! Low Food (${Math.round(state.civ.food)}%) or Morale (${Math.round(state.civ.happiness)}%) is draining your Civilization Points!`;
      }
    } else {
      warnBar.classList.add("hidden");
    }
  }

  // Real-time Strategy Economy & Seasons Deck
  const season = SEASONS[state.civ.seasonIdx] || SEASONS[0];
  const seasonBadge = document.getElementById("season-badge");
  if (seasonBadge) {
    seasonBadge.textContent = season.name;
    seasonBadge.setAttribute("data-season", season.id);
    seasonBadge.title = `${season.name}: ${season.desc}`;
  }
  const seasonTimerDesc = document.getElementById("season-timer-desc");
  if (seasonTimerDesc) {
    seasonTimerDesc.textContent = `${Math.ceil(Math.max(0, state.civ.seasonTimer))}s remaining`;
  }

  // Granary Pill
  const granaryVal = document.getElementById("res-granary-val");
  const granaryRate = document.getElementById("res-granary-rate");
  const granaryPill = document.getElementById("pill-granary");
  if (granaryVal) granaryVal.textContent = `${formatNum(state.civ.granary, 0)} / ${formatNum(state.civ.granaryCap, 0)}`;
  if (granaryRate) {
    const rate = state.civ.grainNetRate || 0;
    const sign = rate >= 0 ? "+" : "";
    granaryRate.textContent = `${sign}${formatNum(rate, 1)}/s`;
    granaryRate.className = `strat-res-rate ${rate >= 0 ? "positive" : "negative"}`;
  }
  if (granaryPill) {
    granaryPill.classList.toggle("critical", state.civ.isFamine || state.civ.granary < 15);
    granaryPill.classList.toggle("warning", !state.civ.isFamine && state.civ.granary < 35);
  }

  // Power Grid Pill
  const gridVal = document.getElementById("res-grid-val");
  const gridPill = document.getElementById("pill-grid");
  if (gridVal) {
    const loadPct = Math.round((state.civ.gridDemand / Math.max(1, state.civ.gridPower)) * 100);
    gridVal.textContent = `${loadPct}% (${formatNum(state.civ.gridDemand, 0)}/${formatNum(state.civ.gridPower, 0)} MW)`;
  }
  if (gridPill) {
    gridPill.classList.toggle("critical", state.civ.isBrownout);
    gridPill.classList.toggle("warning", !state.civ.isBrownout && (state.civ.gridDemand / Math.max(1, state.civ.gridPower)) > 0.85);
  }

  // Upkeep Pill
  const upkeepVal = document.getElementById("res-upkeep-val");
  const upkeepPill = document.getElementById("pill-upkeep");
  if (upkeepVal) {
    const up = getUpkeepCost();
    upkeepVal.textContent = `${formatNum(up, 1)} CP/s`;
  }
  if (upkeepPill) {
    upkeepPill.classList.toggle("warning", netCps < 0);
  }

  // Law buttons active state sync
  document.querySelectorAll(".law-btn").forEach((btn) => {
    const lawKey = btn.getAttribute("data-law");
    btn.classList.toggle("active", Boolean(state.civ.laws && state.civ.laws[lawKey]));
  });

  const critEl = document.getElementById("crit-chance");
  if (critEl) {
    const cMult = getCritMultiplier();
    const cMultStr = cMult % 1 === 0 ? `${cMult.toFixed(0)}x` : `${cMult}x`;
    critEl.textContent = `${Math.round(getCritChance() * 100)}% (${cMultStr})`;
  }

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

// ============================================================================
// MINIMIZED DISTRICT DOCK & INTERACTIVE 2.5D DISTRICT INSPECTOR
// ============================================================================
function drawAllDistrictCanvases() {
  // Districts are now rendered directly inside the 2.5D Isometric City Canvas!
}

function openDistrictInspector(bId) {
  ensureCivState();
  const b = BUILDINGS.find((x) => x.id === bId);
  if (!b) return;
  selectedDistrictId = bId;
  const overlay = document.getElementById("district-inspector-overlay");
  if (!overlay) return;
  overlay.classList.remove("hidden");
  updateDistrictInspectorUI();
  renderInfrastructureDistricts();
}

function updateDistrictInspectorUI() {
  ensureCivState();
  const overlay = document.getElementById("district-inspector-overlay");
  if (!overlay || overlay.classList.contains("hidden") || !selectedDistrictId) return;
  const b = BUILDINGS.find((x) => x.id === selectedDistrictId);
  if (!b) return;

  const count = state.buildings[b.id] || 0;
  const bCps = count * getBuildingSingleCps(b);
  const crisis = state.civ.crises[b.id];
  const isOverdriven = (state.civ.overdrives[b.id] || 0) > Date.now();
  const health = crisis ? Math.max(15, Math.round(crisis.health || 50)) : Math.round(state.civ.integrity);

  document.getElementById("dist-insp-icon").textContent = b.icon;
  document.getElementById("dist-insp-name").textContent = `${b.name} (${b.districtName})`;
  document.getElementById("dist-insp-sub").textContent = `${b.zoneTag} • ${ERAS[b.era].short} • ×${count} Built`;
  document.getElementById("dist-insp-cps").textContent = `+${formatNum(bCps, 1)} CP/s`;
  document.getElementById("dist-insp-health").textContent = `${health}%`;

  const statusEl = document.getElementById("dist-insp-status");
  if (crisis) {
    statusEl.className = "dist-status-crisis";
    statusEl.textContent = `${crisis.label} (-75% CP/s)`;
  } else if (isOverdriven) {
    const rem = Math.ceil(((state.civ.overdrives[b.id] || 0) - Date.now()) / 1000);
    statusEl.className = "dist-status-ok";
    statusEl.textContent = `⚡ Overdriven 2× (${rem}s)`;
  } else {
    statusEl.className = "dist-status-ok";
    statusEl.textContent = "🟢 Operational";
  }

  const plan = getPurchasePlan(b);
  const buyBtn = document.getElementById("btn-dist-buy");
  if (buyBtn) {
    buyBtn.textContent = `🏗️ +${plan.qty} (${formatNum(plan.cost)} CP)`;
    buyBtn.disabled = state.cp < plan.cost;
  }

  const odBtn = document.getElementById("btn-dist-overdrive");
  if (odBtn) {
    odBtn.textContent = isOverdriven ? "⚡ Overdrive Active" : "⚡ Overdrive (2× 30s)";
    odBtn.disabled = isOverdriven || count <= 0;
  }

  const repBtn = document.getElementById("btn-dist-repair");
  if (repBtn) {
    if (crisis) {
      repBtn.textContent = `🚒 Extinguish ${crisis.short || "Crisis"}!`;
      repBtn.disabled = false;
    } else {
      repBtn.textContent = "🔧 Fortify (+Health)";
      repBtn.disabled = state.civ.integrity >= 99;
    }
  }
}

function renderInfrastructureDistricts() {
  ensureCivState();
  const container = document.getElementById("infrastructure-districts");
  if (!container) return;

  const ownedBuildings = BUILDINGS.filter((b) => (state.buildings[b.id] || 0) > 0);
  const summaryNote = document.getElementById("districts-summary-note");
  if (summaryNote) {
    summaryNote.textContent = ownedBuildings.length > 0
      ? `${ownedBuildings.length} Active 2.5D Districts • ${getTotalBuildings().toLocaleString()} Structures`
      : "Click the Build emblem or right-hand store to establish your first 2.5D District";
  }

  if (ownedBuildings.length === 0) {
    container.innerHTML = `<div style="font-size:0.75rem;color:var(--text-muted);padding:4px 6px;">🛖 No districts built yet — gather <strong>15 CP</strong> and construct a <strong>Thatched Hut</strong> (or click its 2.5D plot on the map) to raise your first district!</div>`;
    return;
  }

  container.innerHTML = "";
  ownedBuildings.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    const bCps = count * getBuildingSingleCps(b);
    const crisis = state.civ.crises[b.id];
    const isOverdriven = (state.civ.overdrives[b.id] || 0) > Date.now();

    const chip = document.createElement("button");
    chip.className = "mini-district-chip" +
      (selectedDistrictId === b.id ? " selected" : "") +
      (crisis ? " in-crisis" : "");
    chip.id = `mini-chip-${b.id}`;
    chip.title = `${b.name} (${b.districtName}) — Click to inspect & manage in 2.5D City`;
    chip.innerHTML = `
      <span class="mini-chip-icon">${crisis ? "🚨" : b.icon}</span>
      <div class="mini-chip-info">
        <div class="mini-chip-top">
          <span>${b.name}</span>
          <span class="mini-chip-cnt" id="dist-cnt-${b.id}">×${count}</span>
        </div>
        <div class="mini-chip-sub" id="dist-cps-${b.id}">
          ${crisis ? `<span style="color:#fca5a5;">${crisis.label}</span>` : `${isOverdriven ? "⚡ " : ""}+${formatNum(bCps, 1)}/s`}
        </div>
      </div>
    `;
    chip.addEventListener("click", () => {
      openDistrictInspector(b.id);
      panToIsoDistrict(b.id);
    });
    container.appendChild(chip);
  });
}

function updateDistrictsStats() {
  ensureCivState();
  BUILDINGS.forEach((b) => {
    const count = state.buildings[b.id] || 0;
    if (count <= 0) return;
    const cntEl = document.getElementById(`dist-cnt-${b.id}`);
    const cpsEl = document.getElementById(`dist-cps-${b.id}`);
    const chipEl = document.getElementById(`mini-chip-${b.id}`);
    const bCps = count * getBuildingSingleCps(b);
    const crisis = state.civ.crises[b.id];
    const isOverdriven = (state.civ.overdrives[b.id] || 0) > Date.now();
    if (cntEl) cntEl.textContent = `×${count}`;
    if (cpsEl) {
      cpsEl.innerHTML = crisis
        ? `<span style="color:#fca5a5;">${crisis.label}</span>`
        : `${isOverdriven ? "⚡ " : ""}+${formatNum(bCps, 1)}/s`;
    }
    if (chipEl) {
      chipEl.classList.toggle("in-crisis", Boolean(crisis));
      chipEl.classList.toggle("selected", selectedDistrictId === b.id);
    }
  });
  updateDistrictInspectorUI();
}

// ============================================================================
// CIVILIZATION & POPULATION STRATEGY ENGINE + COLLAPSE SYSTEM
// ============================================================================
const CRISIS_TYPES = [
  { type: "fire", label: "🔥 District Fire", short: "Fire" },
  { type: "riot", label: "🪧 Citizen Riot", short: "Riot" },
  { type: "plague", label: "☣️ Outbreak", short: "Plague" },
  { type: "blackout", label: "⚡ Grid Failure", short: "Blackout" }
];

let nextCrisisCheckAt = Date.now() + 22000;

function spawnDistrictCrisis(forceBId = null, causeLabel = null) {
  ensureCivState();
  const owned = BUILDINGS.filter((b) => (state.buildings[b.id] || 0) > 0);
  if (owned.length === 0) return;

  const target = forceBId
    ? BUILDINGS.find((b) => b.id === forceBId)
    : owned[Math.floor(Math.random() * owned.length)];
  if (!target || state.civ.crises[target.id]) return;

  const pick = CRISIS_TYPES[Math.floor(Math.random() * CRISIS_TYPES.length)];
  state.civ.crises[target.id] = {
    type: pick.type,
    label: causeLabel || pick.label,
    short: pick.short,
    health: 55,
    hitsRemaining: 3,
    duration: 0,
    startedAt: Date.now()
  };

  SoundFX.click(0);
  renderInfrastructureDistricts();
  updateTopHUD();
  showToast("🚨", `${causeLabel || pick.label} in ${target.name}!`, `Click the ${target.name} district in the 2.5D city (or '🚒 Fix Crises') before Stability collapses!`);
}

function resolveDistrictCrisis(bId, clientX = null, clientY = null) {
  ensureCivState();
  const crisis = state.civ.crises[bId];
  const b = BUILDINGS.find((x) => x.id === bId);
  if (!crisis || !b) return false;

  // Multi-tap interactive triage (3 rapid taps required on map)
  crisis.hitsRemaining = (crisis.hitsRemaining !== undefined ? crisis.hitsRemaining : 3) - 1;
  crisis.health = Math.min(100, (crisis.health || 50) + 18);

  if (crisis.hitsRemaining > 0) {
    SoundFX.click(0);
    if (clientX !== null && clientY !== null) {
      spawnFloatingText(clientX, clientY, `🧯 Triaging... (${crisis.hitsRemaining} left)`, false);
    }
    renderInfrastructureDistricts();
    updateDistrictInspectorUI();
    return false;
  }

  // Crisis completely extinguished!
  delete state.civ.crises[bId];
  state.civ.stability = Math.min(100, state.civ.stability + 10);
  state.civ.integrity = Math.min(100, state.civ.integrity + 8);
  const reward = Math.max(20, Math.ceil(getTotalCps() * 4 + getClickPower() * 5));
  state.cp += reward;
  state.totalCp += reward;
  state.allTimeCp += reward;

  if (clientX !== null && clientY !== null) {
    spawnFloatingText(clientX, clientY, `🚒 Crisis Extinguished! +${formatNum(reward)} CP`, true);
  }
  SoundFX.achievement();
  renderInfrastructureDistricts();
  updateDistrictInspectorUI();
  updateTopHUD();
  showToast("🚒", `${b.name} Stabilized!`, `Crisis extinguished! +10% Stability & +${formatNum(reward)} CP relief bonus.`);
  return true;
}

function triggerCivilizationCollapse(reason = "Unchecked urban unrest, famine, and neglected district crises") {
  ensureCivState();
  const lostCp = Math.floor(state.cp * 0.38);
  state.cp = Math.max(0, state.cp - lostCp);

  let lostStructures = 0;
  BUILDINGS.forEach((b) => {
    const owned = state.buildings[b.id] || 0;
    if (owned > 1) {
      const drop = Math.max(1, Math.floor(owned * 0.15));
      state.buildings[b.id] = Math.max(1, owned - drop);
      lostStructures += drop;
    }
  });

  state.civ.collapses = (state.civ.collapses || 0) + 1;
  trackGameEvent("civilization_collapse", { collapses: String(state.civ.collapses) });
  state.civ.food = 68;
  state.civ.happiness = 65;
  state.civ.stability = 65;
  state.civ.integrity = 70;
  state.civ.granary = 60;
  state.civ.isFamine = false;
  state.civ.isBrownout = false;
  state.civ.taxRate = "normal";
  state.civ.crises = {};

  document.querySelectorAll(".tax-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-tax") === "normal");
  });

  const modal = document.getElementById("collapse-modal");
  if (modal) {
    document.getElementById("collapse-modal-desc").textContent =
      `${reason} caused ${getFullCityTitle()} to suffer a Civilization Collapse! Emergency reconstruction has stabilized the city at a heavy cost.`;
    document.getElementById("collapse-lost-cp").textContent = `-${formatNum(lostCp)} CP`;
    document.getElementById("collapse-lost-blds").textContent = `-${lostStructures} Structures`;
    modal.classList.remove("hidden");
  }

  for (let i = 0; i < 6; i++) {
    spawnCityFirework(150 + i * 140, 60 + (i % 2) * 35);
  }
  SoundFX.eraAdvance();
  renderBuildingsList();
  renderInfrastructureDistricts();
  updateTopHUD();
  saveGame(false);
}

function tickCivilizationStrategy(dt) {
  ensureCivState();
  const totBlds = getTotalBuildings();
  if (totBlds < 2) {
    // Keep starter settlement completely stable until player has built at least 2 structures
    state.civ.food = 100;
    state.civ.happiness = 100;
    state.civ.stability = 100;
    state.civ.integrity = 100;
    state.civ.granary = 100;
    return;
  }

  const jobs = state.civ.jobs;
  const activeCrisisIds = Object.keys(state.civ.crises || {});
  const crisisCount = activeCrisisIds.length;

  // 1. Advance Seasons & Weather Cycle
  state.civ.seasonTimer -= dt;
  if (state.civ.seasonTimer <= 0) {
    state.civ.seasonIdx = (state.civ.seasonIdx + 1) % SEASONS.length;
    const nextSeason = SEASONS[state.civ.seasonIdx];
    state.civ.seasonTimer = nextSeason.duration;
    showToast(nextSeason.icon, `Season Shift: ${nextSeason.name}!`, nextSeason.desc);
    SoundFX.wonder();
  }
  const season = SEASONS[state.civ.seasonIdx] || SEASONS[0];

  // 2. Physical Granary Stockpile & Famine Simulation
  const granaryCap = 100 +
    (state.buildings.megalith || 0) * 20 +
    (state.buildings.aqueduct || 0) * 45 +
    (state.buildings.watermill || 0) * 90 +
    (state.buildings.arcology || 0) * 350;
  state.civ.granaryCap = granaryCap;

  const baseGrainSupply = 1.2 +
    (state.buildings.forager || 0) * 0.45 +
    (state.buildings.megalith || 0) * 1.6 +
    (state.buildings.aqueduct || 0) * 4.2 +
    (state.buildings.watermill || 0) * 8.5 +
    (state.buildings.arcology || 0) * 28.0;
  const farmerMult = (state.civ.jobs.farmers / 25) * season.farmMod;
  const grainInflow = baseGrainSupply * farmerMult;

  let grainConsumption = Math.max(0.6, (totBlds * 0.35) + (Math.log10(Math.max(1, getPopulation())) * 1.5));
  if (state.civ.laws && state.civ.laws.rationing) {
    grainConsumption *= 0.60; // -40% consumption from emergency rationing
  }
  if (season.id === "winter") {
    grainConsumption *= 1.30; // +30% winter calorie demand
  }

  const netGrainRate = grainInflow - grainConsumption;
  state.civ.grainNetRate = netGrainRate;
  state.civ.granary = Math.max(0, Math.min(granaryCap, state.civ.granary + netGrainRate * dt));

  if (state.civ.granary <= 0.05 && totBlds >= 3) {
    state.civ.isFamine = true;
    state.civ.food = Math.max(0, state.civ.food - 6.0 * dt);
    state.civ.happiness = Math.max(0, state.civ.happiness - 4.5 * dt);
    state.civ.stability = Math.max(0, state.civ.stability - 3.5 * dt);
  } else {
    state.civ.isFamine = false;
    const foodTarget = Math.min(100, Math.max(20, 42 + (jobs.farmers - 15) * 2.1));
    const foodDelta = (foodTarget - state.civ.food) * 0.10 * dt - (crisisCount * 0.35 * dt);
    state.civ.food = Math.max(0, Math.min(100, state.civ.food + foodDelta));
  }

  // 3. Power Grid Balance & Brownouts
  const baseGridPower = 25 +
    (state.buildings.forager || 0) * 0.5 +
    (state.buildings.quarry || 0) * 1.5 +
    (state.buildings.watermill || 0) * 4.0 +
    (state.buildings.steamworks || 0) * 16.0 +
    (state.buildings.fission || 0) * 60.0 +
    (state.buildings.quantum || 0) * 160.0 +
    (state.buildings.dyson || 0) * 600.0;
  const workerPowerMult = Math.max(0.4, state.civ.jobs.workers / 25);
  const gridPower = baseGridPower * workerPowerMult;
  state.civ.gridPower = gridPower;

  let gridDemand = 10 +
    (state.buildings.foundry || 0) * 1.8 +
    (state.buildings.workshop || 0) * 2.5 +
    (state.buildings.steamworks || 0) * 5.0 +
    (state.buildings.rail || 0) * 10.0 +
    (state.buildings.fission || 0) * 12.0 +
    (state.buildings.telecom || 0) * 22.0 +
    (state.buildings.cyber || 0) * 40.0 +
    (state.buildings.quantum || 0) * 65.0 +
    (state.buildings.singularity || 0) * 110.0;
  gridDemand *= season.powerDemandMod;
  if (state.civ.laws && state.civ.laws.overtime) {
    gridDemand *= 1.20; // +20% demand from overtime
  }
  state.civ.gridDemand = gridDemand;

  const gridLoad = gridDemand / Math.max(1, gridPower);
  if (gridLoad > 1.05 && totBlds >= 4) {
    state.civ.isBrownout = true;
    state.civ.integrity = Math.max(0, state.civ.integrity - (gridLoad - 1.0) * 5.5 * dt);
    state.civ.stability = Math.max(0, state.civ.stability - 2.0 * dt);
  } else {
    state.civ.isBrownout = false;
    const gridTarget = Math.min(100, Math.max(20, 48 + (jobs.workers - 15) * 1.9));
    const gridDelta = (gridTarget - state.civ.integrity) * 0.08 * dt - (crisisCount * 0.65 * dt);
    state.civ.integrity = Math.max(0, Math.min(100, state.civ.integrity + gridDelta));
  }

  // 4. Citizen Morale & Happiness
  let taxDrift = 0;
  if (state.civ.taxRate === "low") taxDrift = +1.1;
  else if (state.civ.taxRate === "normal") taxDrift = +0.15;
  else if (state.civ.taxRate === "high") taxDrift = -0.95;
  else if (state.civ.taxRate === "brutal") taxDrift = -2.4;

  let lawHappyDrift = 0;
  if (state.civ.laws && state.civ.laws.rationing) lawHappyDrift -= 1.0;
  if (state.civ.laws && state.civ.laws.curfew) lawHappyDrift -= 1.3;
  if (season.id === "autumn") lawHappyDrift += 0.8; // Harvest festival morale bonus

  const festivalBonus = Date.now() < boostExpiresAt ? 1.5 : 0;
  const happyTarget = Math.min(100, Math.max(10, 48 + (jobs.scholars - 15) * 1.8));
  let happyRate = (happyTarget - state.civ.happiness) * 0.06 + taxDrift + lawHappyDrift + festivalBonus - (crisisCount * 0.6);
  if (state.civ.food < 35) happyRate -= (35 - state.civ.food) * 0.06;
  state.civ.happiness = Math.max(0, Math.min(100, state.civ.happiness + happyRate * dt));

  // 5. Civic Stability & Order
  let stabRate = (jobs.guards - 18) * 0.08;
  if (state.civ.food >= 65 && state.civ.happiness >= 65 && crisisCount === 0 && !state.civ.isFamine && !state.civ.isBrownout) {
    stabRate += 0.75;
  }
  if (state.civ.laws && state.civ.laws.overtime) stabRate -= 0.65;
  if (state.civ.food < 30) stabRate -= (30 - state.civ.food) * 0.085;
  if (state.civ.happiness < 35) stabRate -= (35 - state.civ.happiness) * 0.075;
  if (state.civ.integrity < 30) stabRate -= (30 - state.civ.integrity) * 0.06;
  if (state.civ.taxRate === "brutal") stabRate -= 1.35;
  else if (state.civ.taxRate === "high") stabRate -= 0.38;
  else if (state.civ.taxRate === "low") stabRate += 0.65;
  stabRate -= crisisCount * 0.95;

  state.civ.stability = Math.max(0, Math.min(100, state.civ.stability + stabRate * dt));

  // 6. Crisis Contagion & Damage over time
  activeCrisisIds.forEach((bId) => {
    const cr = state.civ.crises[bId];
    if (cr) {
      cr.duration = (cr.duration || 0) + dt;
      cr.health = Math.max(5, (cr.health || 55) - 1.2 * dt);

      // Contagion! If crisis is unchecked for > 25 seconds, it can spread to an uninfected neighbor!
      if (cr.duration > 25 && Math.random() < 0.06 * dt && crisisCount < 4) {
        const ownedUninfected = BUILDINGS.filter((b) => (state.buildings[b.id] || 0) > 0 && !state.civ.crises[b.id]);
        if (ownedUninfected.length > 0) {
          const spreadTarget = ownedUninfected[Math.floor(Math.random() * ownedUninfected.length)];
          spawnDistrictCrisis(spreadTarget.id, `${cr.short} Outbreak`);
          showToast("🔥", `Contagion Spreads!`, `Unchecked ${cr.label} spread to the ${spreadTarget.name} district!`);
        }
        cr.duration = 10;
      }
    }
  });

  // 7. Periodic Crisis Spawner (Factoring Season Risk & Curfew Ordinance)
  if (totBlds >= 4 && Date.now() >= nextCrisisCheckAt) {
    let guardFactor = Math.max(0.05, 0.36 - (jobs.guards * 0.008) + (state.civ.taxRate === "brutal" ? 0.22 : 0));
    guardFactor *= season.crisisRiskMod;
    if (state.civ.laws && state.civ.laws.curfew) {
      guardFactor *= 0.50; // Curfew cuts crisis chance in half!
    }
    if (crisisCount < 4 && Math.random() < guardFactor) {
      spawnDistrictCrisis();
    }
    nextCrisisCheckAt = Date.now() + 20000 + Math.random() * 14000;
  }

  // 8. Catastrophic Civilization Collapse Check
  if (state.civ.stability <= 0.2) {
    if (devImmortalMode) {
      state.civ.stability = 25;
    } else {
      let reason = "Severe civic instability and neglected urban crises";
      if (state.civ.isFamine || state.civ.food < 15) reason = "Catastrophic Famine and empty granary stockpiles";
      else if (state.civ.isBrownout) reason = "Total Power Grid blackout and municipal collapse";
      else if (state.civ.taxRate === "brutal" || state.civ.happiness < 15) reason = "A violent city-wide Tax Revolt and citizen uprising";
      else if (crisisCount >= 2) reason = "Uncontrolled multi-district fires and contagions";
      triggerCivilizationCollapse(reason);
    }
  }
}

function adjustWorkforce(jobKey, delta) {
  ensureCivState();
  const jobs = state.civ.jobs;
  const keys = ["farmers", "workers", "scholars", "guards"];
  if (!keys.includes(jobKey)) return;

  const currentVal = jobs[jobKey];
  const nextVal = Math.max(5, Math.min(70, currentVal + delta));
  const actualDelta = nextVal - currentVal;
  if (actualDelta === 0) return;

  // Balance the delta across the other castes so total always equals 100%
  const others = keys.filter((k) => k !== jobKey);
  let remaining = -actualDelta;
  for (const ok of others) {
    if (remaining === 0) break;
    const avail = remaining > 0 ? 70 - jobs[ok] : jobs[ok] - 5;
    if (avail <= 0) continue;
    const step = remaining > 0 ? Math.min(remaining, avail) : Math.max(remaining, -avail);
    jobs[ok] += step;
    remaining -= step;
  }

  jobs[jobKey] = 100 - others.reduce((acc, k) => acc + jobs[k], 0);
  SoundFX.click(state.currentEra);
  updateTopHUD();
  renderBuildingsList();
  renderInfrastructureDistricts();
}

function setupStrategyControls() {
  ensureCivState();

  // Workforce +/- buttons
  document.querySelectorAll(".wf-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = btn.getAttribute("data-job");
      const delta = parseInt(btn.getAttribute("data-delta"), 10);
      adjustWorkforce(job, delta);
    });
  });

  // Tax Rate buttons
  document.querySelectorAll(".tax-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-tax") === state.civ.taxRate);
    btn.addEventListener("click", () => {
      state.civ.taxRate = btn.getAttribute("data-tax");
      document.querySelectorAll(".tax-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      SoundFX.research();
      updateTopHUD();
      renderBuildingsList();
      renderInfrastructureDistricts();
    });
  });

  // Civic Ordinances & Strategic Laws
  document.querySelectorAll(".law-btn").forEach((btn) => {
    const lawKey = btn.getAttribute("data-law");
    btn.classList.toggle("active", Boolean(state.civ.laws && state.civ.laws[lawKey]));
    btn.addEventListener("click", () => {
      ensureCivState();
      state.civ.laws[lawKey] = !state.civ.laws[lawKey];
      btn.classList.toggle("active", state.civ.laws[lawKey]);
      SoundFX.research();
      updateTopHUD();
      renderBuildingsList();
      renderInfrastructureDistricts();
      const status = state.civ.laws[lawKey] ? "ENACTED" : "REPEALED";
      showToast("📜", `Ordinance ${status}`, `${btn.textContent.trim()} is now ${status.toLowerCase()}.`);
    });
  });

  // Emergency Decree 1: Grain Dole
  document.getElementById("btn-decree-ration")?.addEventListener("click", () => {
    const cost = Math.max(10, Math.ceil(state.cp * 0.08 + getTotalCps() * 4));
    if (state.cp < cost) {
      showToast("🍞", "Insufficient Treasury", `Need ${formatNum(cost)} CP to issue an Emergency Grain Dole.`);
      return;
    }
    state.cp -= cost;
    state.civ.food = Math.min(100, state.civ.food + 30);
    state.civ.happiness = Math.min(100, state.civ.happiness + 10);
    SoundFX.buy();
    updateTopHUD();
    showToast("🍞", "Emergency Grain Dole Issued!", `Restored +30% Food & +10% Morale (-${formatNum(cost)} CP).`);
  });

  // Emergency Decree 2: Bread & Circuses
  document.getElementById("btn-decree-circus")?.addEventListener("click", () => {
    const cost = Math.max(15, Math.ceil(state.cp * 0.10 + getTotalCps() * 5));
    if (state.cp < cost) {
      showToast("🎪", "Insufficient Treasury", `Need ${formatNum(cost)} CP to hold Bread & Circuses.`);
      return;
    }
    state.cp -= cost;
    state.civ.happiness = Math.min(100, state.civ.happiness + 30);
    state.civ.stability = Math.min(100, state.civ.stability + 15);
    for (let i = 0; i < 3; i++) spawnCityFirework(200 + i * 220, 45);
    SoundFX.wonder();
    updateTopHUD();
    showToast("🎪", "Grand Civic Games Held!", `Restored +30% Morale & +15% Stability (-${formatNum(cost)} CP).`);
  });

  // Emergency Decree 3: Deploy Watch & Repair Brigades
  document.getElementById("btn-decree-repair")?.addEventListener("click", () => {
    const cost = Math.max(12, Math.ceil(state.cp * 0.08 + getTotalCps() * 4));
    if (state.cp < cost && Object.keys(state.civ.crises).length === 0) {
      showToast("🚒", "Insufficient Treasury", `Need ${formatNum(cost)} CP to deploy full city repair brigades.`);
      return;
    }
    state.cp = Math.max(0, state.cp - Math.min(state.cp, cost));
    state.civ.crises = {};
    state.civ.integrity = Math.min(100, state.civ.integrity + 30);
    state.civ.stability = Math.min(100, state.civ.stability + 20);
    SoundFX.achievement();
    renderInfrastructureDistricts();
    updateDistrictInspectorUI();
    updateTopHUD();
    showToast("🚒", "Watch & Repair Brigades Deployed!", "All district crises extinguished! +30% Grid Health & +20% Stability.");
  });

  // Collapse Recovery Modal button
  document.getElementById("btn-recover-collapse")?.addEventListener("click", () => {
    document.getElementById("collapse-modal")?.classList.add("hidden");
    SoundFX.buy();
    trackGameEvent("collapse_recovered", { era: ERAS[state.currentEra].name });
  });

  // Fullscreen 2.5D City Toggles
  const toggleFullscreen25D = () => {
    document.body.classList.toggle("fullscreen-25d");
    const isFs = document.body.classList.contains("fullscreen-25d");
    const topBtn = document.getElementById("btn-fullscreen-top");
    if (topBtn) topBtn.textContent = isFs ? "✕ Exit Fullscreen" : "⛶ 2.5D Fullscreen";
    setTimeout(() => drawCityCanvas(), 50);
  };
  document.getElementById("btn-fullscreen-top")?.addEventListener("click", toggleFullscreen25D);
  document.getElementById("btn-fullscreen-city")?.addEventListener("click", toggleFullscreen25D);

  // Interactive 2.5D District Inspector Buttons
  document.getElementById("btn-close-dist-insp")?.addEventListener("click", () => {
    document.getElementById("district-inspector-overlay")?.classList.add("hidden");
    selectedDistrictId = null;
    renderInfrastructureDistricts();
  });

  document.getElementById("btn-dist-buy")?.addEventListener("click", () => {
    if (selectedDistrictId) {
      buyBuilding(selectedDistrictId);
      updateDistrictInspectorUI();
    }
  });

  document.getElementById("btn-dist-overdrive")?.addEventListener("click", () => {
    if (!selectedDistrictId) return;
    ensureCivState();
    state.civ.overdrives[selectedDistrictId] = Date.now() + 30000;
    state.civ.happiness = Math.max(5, state.civ.happiness - 7);
    const b = BUILDINGS.find((x) => x.id === selectedDistrictId);
    SoundFX.wonder();
    updateDistrictInspectorUI();
    renderInfrastructureDistricts();
    updateTopHUD();
    if (b) showToast("⚡", `${b.name} Overdriven!`, "2.0× District Output for 30s (-7% Citizen Morale).");
  });

  document.getElementById("btn-dist-repair")?.addEventListener("click", () => {
    if (!selectedDistrictId) return;
    ensureCivState();
    if (state.civ.crises[selectedDistrictId]) {
      resolveDistrictCrisis(selectedDistrictId);
    } else {
      state.civ.integrity = Math.min(100, state.civ.integrity + 18);
      state.civ.stability = Math.min(100, state.civ.stability + 6);
      SoundFX.buy();
      updateDistrictInspectorUI();
      updateTopHUD();
      showToast("🔧", "District Fortified!", "Restored +18% Grid Integrity & +6% Stability.");
    }
  });
}

// ============================================================================
// RIGHT PANEL: UPGRADES TRAY & BUILDINGS SHOP (WITH SPOILER PROTECTION)
// ============================================================================
const BUILDING_MILESTONES = [1, 5, 15, 30, 50, 75, 100, 150, 200];

function getBuildingNextMilestoneInfo(owned) {
  let prev = 0;
  for (const m of BUILDING_MILESTONES) {
    if (owned < m) {
      const pct = Math.min(100, Math.max(0, ((owned - prev) / (m - prev)) * 100));
      return { next: m, pct };
    }
    prev = m;
  }
  return { next: Math.ceil((owned + 1) / 50) * 50, pct: 100 };
}

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
      const ms = getBuildingNextMilestoneInfo(owned);

      const row = document.createElement("button");
      row.className = `building-row ${canAfford ? "affordable" : "unaffordable"}`;
      row.id = `b-row-${b.id}`;
      row.setAttribute("data-zone", b.zoneTag);
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
            <span class="b-milestone-badge" id="b-ms-${b.id}" title="Next Civic Upgrade / Synergy Milestone">🎯 ${owned}/${ms.next}</span>
          </div>
        </div>
        <div class="b-count" id="b-cnt-${b.id}">${owned}</div>
        <div class="b-milestone-track">
          <div class="b-milestone-fill" id="b-ms-fill-${b.id}" style="width: ${ms.pct.toFixed(1)}%;"></div>
        </div>
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

    const owned = state.buildings[b.id] || 0;
    const ms = getBuildingNextMilestoneInfo(owned);

    const costEl = document.getElementById(`b-cost-${b.id}`);
    if (costEl) costEl.textContent = `⚡ ${formatNum(plan.cost)} CP ${plan.qty > 1 ? `(x${plan.qty})` : ""}`;
    const prodEl = document.getElementById(`b-prod-${b.id}`);
    if (prodEl) prodEl.textContent = `+${formatNum(getBuildingSingleCps(b))} /s`;
    const cntEl = document.getElementById(`b-cnt-${b.id}`);
    if (cntEl) cntEl.textContent = owned;
    const msEl = document.getElementById(`b-ms-${b.id}`);
    if (msEl) msEl.textContent = `🎯 ${owned}/${ms.next}`;
    const msFill = document.getElementById(`b-ms-fill-${b.id}`);
    if (msFill) msFill.style.width = `${ms.pct.toFixed(1)}%`;
  });
}

function buyBuilding(bId) {
  const b = BUILDINGS.find((x) => x.id === bId);
  if (!b) return;
  const plan = getPurchasePlan(b);
  if (state.cp < plan.cost) return;

  const prevOwned = state.buildings[b.id] || 0;
  state.cp -= plan.cost;
  state.buildings[b.id] = prevOwned + plan.qty;
  const newOwned = state.buildings[b.id];
  SoundFX.build(b.era);

  // Celebrate crossing a district milestone with fireworks!
  if (BUILDING_MILESTONES.some((m) => prevOwned < m && newOwned >= m)) {
    spawnCityFirework(180 + Math.random() * 450, 38 + Math.random() * 40);
    spawnCityFirework(250 + Math.random() * 450, 35 + Math.random() * 45);
    showToast(b.icon, `${b.name} Milestone!`, `Your ${b.districtName} reached ${newOwned} structures!`);
  }

  checkProximityReveals();
  renderBuildingsList();
  renderInfrastructureDistricts();
  renderUpgrades();
  checkAchievements();
  updateTopHUD();
}

let hoveredUpgradeId = null;

function getUpgradeLiveBonusText(u) {
  if (u.type === "synergy") {
    const bObjA = BUILDINGS.find((b) => b.id === u.bA);
    const bObjB = BUILDINGS.find((b) => b.id === u.bB);
    const cntA = state.buildings[u.bA] || 0;
    const cntB = state.buildings[u.bB] || 0;
    const pctA = Math.round(cntB * u.boostA * 100);
    const pctB = (cntA * u.boostB * 100).toFixed(1).replace(/\.0$/, "");
    return `Live Synergy: ${bObjA.name} +${pctA}% | ${bObjB.name} +${pctB}%`;
  }
  if (u.type === "sprawl" && u.perBld) {
    const tot = getTotalBuildings();
    const pct = (tot * u.perBld * 100).toFixed(1);
    return `Live Sprawl Bonus: +${pct}% Global CP/s (${tot} buildings)`;
  }
  if (u.type === "special" && u.popLogCps) {
    const orders = Math.max(0, Math.log10(Math.max(1, getPopulation())));
    const pct = (orders * u.popLogCps * 100).toFixed(1);
    return `Live Citizen Bonus: +${pct}% Global CP/s`;
  }
  return "";
}

function setUpgradeInspector(u, isMystery = false, reqMet = false) {
  const insp = document.getElementById("upgrade-inspector");
  if (!insp) return;
  if (isMystery) {
    hoveredUpgradeId = "__mystery__";
    const catKey = u.cat || u.type || "building_mult";
    const catLabel = UPGRADE_CATEGORY_LABELS[catKey] || "Civic Upgrade";
    insp.innerHTML = `
      <div class="insp-top">
        <div class="insp-title-wrap">
          <span>📜 Undiscovered ${catLabel}</span>
          <span class="insp-cat-pill" data-cat="${catKey}">${catLabel}</span>
        </div>
        <span class="insp-cost">🔒 Shrouded</span>
      </div>
      <div>${reqMet ? `Gather ~${formatNum(Math.ceil(u.cost * 0.5))} CP to unveil this civic upgrade.` : "Expand your city infrastructure to unlock new municipal ordinances & synergies."}</div>
    `;
    return;
  }
  if (!u) {
    hoveredUpgradeId = null;
    insp.textContent = "Hover over a civic upgrade tile above to inspect its effect and cost.";
    return;
  }
  hoveredUpgradeId = u.id;
  const catKey = u.cat || u.type || "building_mult";
  const catLabel = UPGRADE_CATEGORY_LABELS[catKey] || "Civic Upgrade";
  const liveBonus = getUpgradeLiveBonusText(u);
  insp.innerHTML = `
    <div class="insp-top">
      <div class="insp-title-wrap">
        <span>${u.icon} ${u.name}</span>
        <span class="insp-cat-pill" data-cat="${catKey}">${catLabel}</span>
      </div>
      <span class="insp-cost">⚡ ${formatNum(u.cost)} CP</span>
    </div>
    <div>${u.desc}</div>
    ${liveBonus ? `<div class="insp-live-bonus">✨ ${liveBonus}</div>` : ""}
    ${u.flavor ? `<div class="insp-flavor">"${u.flavor}"</div>` : ""}
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
  if (resCntEl) resCntEl.textContent = `${state.upgrades.length} / ${UPGRADES.length}`;

  available.forEach((u) => {
    const canAfford = state.cp >= u.cost;
    const tile = document.createElement("button");
    tile.className = `upgrade-tile ${canAfford ? "affordable" : "locked"}`;
    tile.id = `upg-card-${u.id}`;
    tile.setAttribute("data-cat", u.cat || u.type || "building_mult");
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
      chip.title = `${u.desc}${u.flavor ? ` — "${u.flavor}"` : ""}`;
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
  trackGameEvent("wonder_built", { wonder: w.name, era: ERAS[w.era].name });
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
      trackGameEvent("achievement_unlocked", { achievement: ach.name });
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
  const cMult = getCritMultiplier();
  const cMultStr = cMult % 1 === 0 ? `${cMult.toFixed(0)}x` : `${cMult}x`;
  const discountPct = Math.round((1 - getBuildingDiscount()) * 100);
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
    ["Critical Click Chance", `${Math.round(getCritChance() * 100)}% (${cMultStr} Damage)`],
    ["Critical Clicks Landed", (state.totalCrits || 0).toLocaleString()],
    ["Global Production Multiplier", `${(getGlobalMultiplier() * 100).toFixed(0)}%`],
    ["Infrastructure Cost Discount", `${discountPct}% Off`],
    ["Total Manual Clicks", state.totalClicks.toLocaleString()],
    ["Total City Population", formatNum(getPopulation(), 0)],
    ["Total Buildings Constructed", getTotalBuildings().toLocaleString()],
    ["World Wonders Erected", `${(state.wonders || []).length} / ${WONDERS.length}`],
    ["Civic Upgrades Enacted", `${state.upgrades.length} / ${UPGRADES.length}`],
    ["Achievements Unlocked", `${state.achievements.length} / ${ACHIEVEMENTS.length}`],
    ["Golden Civic Booms Captured", state.anomaliesClicked.toLocaleString()],
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
  const gain = isCrit ? baseGain * getCritMultiplier() : baseGain;

  state.cp += gain;
  state.totalCp += gain;
  state.allTimeCp += gain;
  state.totalClicks += 1;
  if (isCrit) state.totalCrits = (state.totalCrits || 0) + 1;

  // Instant visual feedback on the button and the giant CP counter for uncapped-speed clicking
  const btnEl = (e && e.currentTarget) || document.getElementById("main-clicker");
  if (btnEl && btnEl.classList) {
    btnEl.classList.add("clicked");
    setTimeout(() => btnEl.classList.remove("clicked"), 45);
  }

  const resEl = document.getElementById("res-amount");
  if (resEl) {
    resEl.textContent = formatNum(state.cp, state.cp < 100 ? 1 : 0);
    resEl.classList.add("pop");
    setTimeout(() => resEl.classList.remove("pop"), 60);
  }

  const rect = btnEl && typeof btnEl.getBoundingClientRect === "function" 
    ? btnEl.getBoundingClientRect() 
    : { left: 100, top: 100, width: 80, height: 80 };
  const hasMouse = e && (e.clientX > 0 || e.clientY > 0);
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

  let duration = hasWonder("w_apollo") ? 18000 : 12000;
  if (hasUpgrade("sp_carnival")) duration = Math.round(duration * 1.25);
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

  let rewardMult = hasWonder("w_apollo") ? 1.5 : 1.0;
  if (hasUpgrade("sp_bread_circus")) rewardMult *= 1.25;
  if (hasUpgrade("sp_carnival")) rewardMult *= 1.25;

  if (Math.random() < 0.5) {
    const bonus = Math.max(25, (getTotalCps() * 20 + getClickPower() * 15) * rewardMult);
    state.cp += bonus;
    state.totalCp += bonus;
    state.allTimeCp += bonus;
    showToast("✨", "Civic Boom Windfall!", `Gained +${formatNum(bonus)} Civilization Points instantly!`);
  } else {
    boostMultiplier = (hasWonder("w_apollo") ? 2.5 : 2.0) + (hasUpgrade("sp_world_fair") ? 0.5 : 0);
    const secs = (hasWonder("w_apollo") ? 35 : 25) + (hasUpgrade("sp_bread_circus") ? 4 : 0);
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
  ctx.fillStyle = type === "cyber" ? "#1e1b4b" : "#5c3a21";
  ctx.fillRect(x - 2 * scale, y - 8 * scale, 4 * scale, 8 * scale);
  if (type === "pine") {
    drawPolygon(ctx, [[x, y - 24 * scale], [x - 8 * scale, y - 7 * scale], [x + 8 * scale, y - 7 * scale]], "#2d6a3e");
    drawPolygon(ctx, [[x, y - 30 * scale], [x - 6 * scale, y - 15 * scale], [x + 6 * scale, y - 15 * scale]], "#3b854f");
  } else if (type === "cherry") {
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(x, y - 15 * scale, 8.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fbcfe8";
    ctx.beginPath();
    ctx.arc(x - 2 * scale, y - 17 * scale, 4.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "autumn") {
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(x, y - 15 * scale, 8.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(x + 2 * scale, y - 17 * scale, 4.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "cyber") {
    ctx.fillStyle = "rgba(6, 182, 212, 0.78)";
    ctx.beginPath();
    ctx.arc(x, y - 15 * scale, 7.5 * scale, 0, Math.PI * 2);
    ctx.fill();
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

// ============================================================================
// 2.5D ISOMETRIC GEOMETRY & BUILDING PRIMITIVES
// ============================================================================
const ZONE_ISO_COLORS = {
  Residential:   { top: "#fed7aa", left: "#f97316", right: "#c2410c", accent: "#fb923c", curb: "#ffedd5" },
  Agriculture:   { top: "#bbf7d0", left: "#22c55e", right: "#15803d", accent: "#4ade80", curb: "#dcfce7" },
  Waterworks:    { top: "#bae6fd", left: "#0284c7", right: "#0369a1", accent: "#38bdf8", curb: "#e0f2fe" },
  Commerce:      { top: "#fef08a", left: "#eab308", right: "#a16207", accent: "#facc15", curb: "#fef9c3" },
  Civic:         { top: "#f1f5f9", left: "#a855f7", right: "#7e22ce", accent: "#c084fc", curb: "#ffffff" },
  Industry:      { top: "#fecaca", left: "#ef4444", right: "#991b1b", accent: "#f87171", curb: "#fee2e2" },
  Finance:       { top: "#99f6e4", left: "#14b8a6", right: "#0f766e", accent: "#2dd4bf", curb: "#ccfbf1" },
  Education:     { top: "#c7d2fe", left: "#6366f1", right: "#4338ca", accent: "#818cf8", curb: "#e0e7ff" },
  Utilities:     { top: "#fde68a", left: "#f59e0b", right: "#b45309", accent: "#fbbf24", curb: "#fef3c7" },
  Transit:       { top: "#a5f3fc", left: "#06b6d4", right: "#0e7490", accent: "#22d3ee", curb: "#cffafe" },
  Aviation:      { top: "#bfdbfe", left: "#3b82f6", right: "#1d4ed8", accent: "#60a5fa", curb: "#dbeafe" },
  "High-Rise":   { top: "#bae6fd", left: "#0284c7", right: "#075985", accent: "#7dd3fc", curb: "#e0f2fe" },
  Megastructure: { top: "#fecdd3", left: "#f43f5e", right: "#be123c", accent: "#fb7185", curb: "#ffe4e6" },
  Spaceport:     { top: "#e9d5ff", left: "#a855f7", right: "#6b21a8", accent: "#c084fc", curb: "#f3e8ff" }
};

// Stores live hitboxes of every 2.5D District Parcel rendered on #city-canvas
let isoParcelHitboxes = [];

function drawIsoPlinth(ctx, cx, cy, rx, ry, depth, topCol, leftCol, rightCol, strokeCol, lineW = 1.4, isHovered = false) {
  const lift = isHovered ? 4 : 0;
  const drawCy = cy - lift;

  // 1. Soft directional ambient drop shadow beneath plinth on valley terrain
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  drawPolygon(
    ctx,
    [
      [cx, cy - ry + depth + 4],
      [cx + rx + 8, cy + depth + 4],
      [cx, cy + ry + depth + 10],
      [cx - rx - 8, cy + depth + 4]
    ]
  );
  ctx.restore();

  // 2. Left 3D Extruded Face (Direct illumination)
  drawPolygon(
    ctx,
    [
      [cx - rx, drawCy],
      [cx, drawCy + ry],
      [cx, drawCy + ry + depth],
      [cx - rx, drawCy + depth]
    ],
    leftCol,
    strokeCol,
    0.6
  );

  // 3. Right 3D Extruded Face (Volumetric shading)
  drawPolygon(
    ctx,
    [
      [cx, drawCy + ry],
      [cx + rx, drawCy],
      [cx + rx, drawCy + depth],
      [cx, drawCy + ry + depth]
    ],
    rightCol,
    strokeCol,
    0.6
  );

  // 4. Top Isometric Diamond Surface
  drawPolygon(
    ctx,
    [
      [cx, drawCy - ry],
      [cx + rx, drawCy],
      [cx, drawCy + ry],
      [cx - rx, drawCy]
    ],
    topCol,
    strokeCol,
    lineW
  );

  // 5. Delicate Architectural Paver / Curb Bevel
  drawPolygon(
    ctx,
    [
      [cx, drawCy - ry + 3],
      [cx + rx - 5, drawCy],
      [cx, drawCy + ry - 3],
      [cx - rx + 5, drawCy]
    ],
    null,
    "rgba(255, 255, 255, 0.35)",
    0.75
  );

  // Subtle corner paver stones
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fillRect(cx - rx + 8, drawCy - 1, 3, 2);
  ctx.fillRect(cx + rx - 11, drawCy - 1, 3, 2);
}

function drawIsoBox3D(ctx, cx, cy, rx, ry, hBox, topCol, leftCol, rightCol, winCol = null) {
  // Left wall
  drawPolygon(
    ctx,
    [
      [cx - rx, cy - hBox],
      [cx, cy + ry - hBox],
      [cx, cy + ry],
      [cx - rx, cy]
    ],
    leftCol,
    "rgba(0,0,0,0.18)",
    0.5
  );
  // Right wall
  drawPolygon(
    ctx,
    [
      [cx, cy + ry - hBox],
      [cx + rx, cy - hBox],
      [cx + rx, cy],
      [cx, cy + ry]
    ],
    rightCol,
    "rgba(0,0,0,0.22)",
    0.5
  );
  // Roof diamond
  drawPolygon(
    ctx,
    [
      [cx, cy - ry - hBox],
      [cx + rx, cy - hBox],
      [cx, cy + ry - hBox],
      [cx - rx, cy - hBox]
    ],
    topCol,
    "rgba(255,255,255,0.3)",
    0.6
  );

  // Isometric windows
  if (winCol && hBox >= 12) {
    ctx.fillStyle = winCol;
    for (let wy = cy - hBox + 4; wy < cy - 2; wy += 5.5) {
      ctx.fillRect(cx - rx * 0.65, wy, 2.5, 3);
      ctx.fillRect(cx + rx * 0.28, wy, 2.5, 3);
    }
  }
}

// Bespoke 2.5D Isometric Landmark Architecture Engine for all 18 Districts
function drawIsoDistrictArchitecture(ctx, bId, cx, cy, count, isNight, animTick, isHovered, isSelected) {
  const phase = animTick * 2.2;
  const winGlow = isNight ? "#fde047" : "rgba(255, 255, 255, 0.85)";

  switch (bId) {
    case "forager": {
      // 🛖 Thatched Hut & Campfire (Stone Age)
      // Main Hut Walls
      drawPolygon(ctx, [[cx - 15, cy - 8], [cx + 15, cy - 8], [cx + 15, cy + 5], [cx - 15, cy + 5]], "#b45309", "#78350f", 1);
      // Conical Golden Thatched Roof
      drawPolygon(ctx, [[cx, cy - 28], [cx - 19, cy - 7], [cx + 19, cy - 7]], "#f59e0b", "#d97706", 1.2);
      drawPolygon(ctx, [[cx, cy - 28], [cx - 14, cy - 13], [cx + 14, cy - 13]], "#fbbf24", "#d97706", 0.8);
      // Warm doorway
      ctx.fillStyle = isNight ? (Math.sin(phase * 3) > 0 ? "#fef08a" : "#f97316") : "#451a03";
      ctx.fillRect(cx - 3.5, cy - 2, 7, 7);
      // Animated Rising Smoke
      const smkY = (animTick * 12) % 18;
      ctx.fillStyle = `rgba(241, 245, 249, ${(0.6 - smkY / 30).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(cx + Math.sin(phase) * 2, cy - 30 - smkY, 2 + smkY * 0.15, 0, Math.PI * 2);
      ctx.fill();
      // Stone Campfire
      ctx.fillStyle = "#78716c";
      ctx.beginPath();
      ctx.arc(cx + 26, cy + 3, 5, 0, Math.PI * 2);
      ctx.fill();
      const flm = 3 + Math.sin(phase * 4) * 2;
      ctx.fillStyle = "#f97316";
      ctx.fillRect(cx + 25, cy + 3 - flm, 3, flm);
      ctx.fillStyle = "#fde047";
      ctx.fillRect(cx + 25.5, cy + 2 - flm * 0.6, 2, flm * 0.6);
      break;
    }

    case "megalith": {
      // 🌾 Floodplain Farmlands (Stone Age)
      // Terraced Wheat Ridge
      ctx.fillStyle = "#15803d";
      ctx.fillRect(cx - 24, cy - 4, 22, 10);
      const sway = Math.sin(phase * 0.8) * 1.5;
      ctx.fillStyle = "#facc15";
      for (let wx = cx - 22; wx <= cx - 4; wx += 4) {
        ctx.fillRect(wx + sway * 0.4, cy - 12, 2, 8);
        ctx.fillRect(wx - 1 + sway, cy - 14, 4, 3);
      }
      // White & Red Windmill
      drawPolygon(ctx, [[cx + 10, cy - 18], [cx + 24, cy - 18], [cx + 26, cy + 6], [cx + 8, cy + 6]], "#f8fafc", "#cbd5e1", 1);
      drawPolygon(ctx, [[cx + 17, cy - 28], [cx + 9, cy - 18], [cx + 25, cy - 18]], "#dc2626");
      // Spinning Windmill Blades
      const bAng = animTick * 2.8;
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 4; i++) {
        const a = bAng + (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx + 17, cy - 20);
        ctx.lineTo(cx + 17 + Math.cos(a) * 12, cy - 20 + Math.sin(a) * 12);
        ctx.stroke();
      }
      // Stone water well
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.arc(cx - 5, cy + 7, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(cx - 5, cy + 7, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "foundry": {
      // 🛶 Canal & Levee Waterworks (Bronze Age)
      // Turquoise Canal Basin
      drawPolygon(ctx, [[cx - 26, cy - 6], [cx + 26, cy - 6], [cx + 22, cy + 5], [cx - 22, cy + 5]], "#0284c7", "#0369a1", 1.2);
      ctx.fillStyle = "#38bdf8";
      const wrip = Math.sin(phase * 2) * 4;
      ctx.fillRect(cx - 14 + wrip, cy - 3, 16, 2);
      // Turning Waterwheel
      const wAng = animTick * 2.2;
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx + 12, cy - 5, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 12 - Math.cos(wAng) * 7, cy - 5 - Math.sin(wAng) * 7);
      ctx.lineTo(cx + 12 + Math.cos(wAng) * 7, cy - 5 + Math.sin(wAng) * 7);
      ctx.stroke();
      // Date Palm Tree
      ctx.fillStyle = "#78350f";
      ctx.fillRect(cx - 18, cy - 20, 3, 14);
      drawPolygon(ctx, [[cx - 16, cy - 24], [cx - 28, cy - 18], [cx - 6, cy - 18]], "#15803d");
      drawPolygon(ctx, [[cx - 16, cy - 27], [cx - 24, cy - 22], [cx - 10, cy - 22]], "#22c55e");
      break;
    }

    case "ziggurat": {
      // 🏺 Walled Bazaar & Granaries (Bronze Age)
      // 2-Tier Stepped Ziggurat
      drawIsoBox3D(ctx, cx, cy - 6, 18, 9, 8, "#d97706", "#b45309", "#78350f");
      drawIsoBox3D(ctx, cx, cy - 16, 12, 6, 7, "#f59e0b", "#d97706", "#92400e");
      // Golden Ceremonial Brazier
      ctx.fillStyle = "#facc15";
      ctx.fillRect(cx - 2.5, cy - 27, 5, 4);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(cx - 1.5, cy - 31 - Math.sin(phase * 4) * 2, 3, 4);
      // Striped Bazaar Canopies
      drawPolygon(ctx, [[cx - 22, cy + 2], [cx - 10, cy + 2], [cx - 8, cy + 7], [cx - 20, cy + 7]], "#ef4444");
      drawPolygon(ctx, [[cx + 10, cy + 2], [cx + 22, cy + 2], [cx + 20, cy + 7], [cx + 8, cy + 7]], "#f59e0b");
      break;
    }

    case "aqueduct": {
      // 🏛️ Imperial Aqueduct & Thermae (Classical Age)
      // Double-Arched Stone Aqueduct
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(cx - 26, cy - 22, 52, 6);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(cx - 24, cy - 24, 48, 3);
      // 3 Aqueduct Piers & Arches
      [-16, 0, 16].forEach((px) => {
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(cx + px - 3, cy - 16, 6, 16);
      });
      // Marble Fountain Pool
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 4, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Splashing fountain jet
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(cx - 1, cy - 3 - Math.sin(phase * 3) * 3, 2, 6);
      // Italian Cypress Tree
      drawPolygon(ctx, [[cx + 25, cy - 26], [cx + 22, cy - 2], [cx + 28, cy - 2]], "#14532d");
      break;
    }

    case "forum": {
      // 🏛️ Civic Forum & Basilicas (Classical Age)
      // Classical Parthenon Temple
      drawIsoBox3D(ctx, cx, cy - 2, 22, 10, 14, "#f8fafc", "#e2e8f0", "#94a3b8");
      // Fluted Peristyle Columns
      [-16, -6, 4, 14].forEach((colX) => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx + colX, cy - 14, 3, 14);
      });
      // Triangular Marble Pediment
      drawPolygon(ctx, [[cx, cy - 24], [cx - 22, cy - 14], [cx + 22, cy - 14]], "#f1f5f9", "#cbd5e1", 1);
      // Golden Relief Medallion & Goddess Statue
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(cx, cy - 17, 3, 0, Math.PI * 2);
      ctx.fill();
      // Senatorial Red Standard
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(cx + 22, cy - 22, 6, 12);
      break;
    }

    case "watermill": {
      // ⚙️ Guild Riverbanks & Mills (Medieval Age)
      // Half-Timbered Mill Building
      drawIsoBox3D(ctx, cx - 6, cy - 2, 16, 9, 16, "#334155", "#e2e8f0", "#94a3b8");
      // Timber beams
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - 9); ctx.lineTo(cx - 4, cy - 2);
      ctx.moveTo(cx - 20, cy - 2); ctx.lineTo(cx - 4, cy - 9);
      ctx.stroke();
      // Stone Chimney with Smoke
      ctx.fillStyle = "#64748b";
      ctx.fillRect(cx - 18, cy - 28, 5, 12);
      const mSmk = (animTick * 10) % 15;
      ctx.fillStyle = `rgba(241, 245, 249, ${(0.6 - mSmk / 25).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(cx - 16, cy - 30 - mSmk, 2 + mSmk * 0.15, 0, Math.PI * 2);
      ctx.fill();
      // Overshot Waterwheel
      const wmAng = animTick * 3;
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx + 16, cy + 2, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#bae6fd";
      ctx.fillRect(cx + 12 + Math.sin(wmAng) * 4, cy + 5, 8, 3);
      break;
    }

    case "manor": {
      // 🏰 Fortified Boroughs & Guildhalls (Medieval Age)
      // Central Stone Keep with Battlements
      drawIsoBox3D(ctx, cx, cy - 2, 16, 9, 18, "#64748b", "#475569", "#334155");
      // Crenelations
      [-12, -4, 4, 12].forEach((bx) => {
        ctx.fillStyle = "#475569";
        ctx.fillRect(cx + bx - 2, cy - 22, 4, 3);
      });
      // Twin Conical Blue Turret Towers
      [-18, 18].forEach((tx) => {
        ctx.fillStyle = "#475569";
        ctx.fillRect(cx + tx - 4, cy - 22, 8, 22);
        drawPolygon(ctx, [[cx + tx, cy - 34], [cx + tx - 6, cy - 22], [cx + tx + 6, cy - 22]], "#1d4ed8");
        // Fluttering Golden Heraldic Pennant
        ctx.fillStyle = "#facc15";
        ctx.fillRect(cx + tx, cy - 38, 7, 4);
      });
      // Arched Portcullis
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(cx - 4, cy, 8, 8);
      break;
    }

    case "bazaar": {
      // 🏛️ Grand Canal Rialto & Exchanges (Renaissance)
      // Pink Marble Venetian Palazzo
      drawIsoBox3D(ctx, cx, cy - 4, 20, 10, 16, "#f43f5e", "#fda4af", "#e11d48");
      // White Marble Arched Loggia
      [-12, -4, 4, 12].forEach((lx) => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx + lx - 2, cy - 14, 4, 8);
      });
      // Arched Rialto Bridge over Canal
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy + 6, 16, Math.PI, 0);
      ctx.stroke();
      // Striped Gondola Mooring Poles
      [-22, 22].forEach((px) => {
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(cx + px - 1.5, cy - 12, 3, 18);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx + px - 1.5, cy - 8, 3, 3);
        ctx.fillRect(cx + px - 1.5, cy - 2, 3, 3);
      });
      // Wooden Gondola
      drawPolygon(ctx, [[cx - 10, cy + 7], [cx + 10, cy + 7], [cx + 7, cy + 10], [cx - 7, cy + 10]], "#1e293b");
      break;
    }

    case "observatory": {
      // 🔭 Renaissance Academia & Domes (Renaissance)
      // Stately Academia Rotunda
      drawIsoBox3D(ctx, cx, cy - 2, 18, 9, 14, "#fed7aa", "#ea580c", "#9a3412");
      // Enormous Copper Patina / Terracotta Octagonal Dome
      ctx.fillStyle = "#0d9488";
      ctx.beginPath();
      ctx.arc(cx, cy - 16, 13, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Lantern Cupola
      ctx.fillStyle = "#facc15";
      ctx.fillRect(cx - 3, cy - 33, 6, 5);
      // Brass Astronomical Armillary Sphere & Telescope
      const tAng = animTick * 1.5;
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx + 16, cy - 14, 4.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 16, cy - 14);
      ctx.lineTo(cx + 23 + Math.cos(tAng) * 4, cy - 20 + Math.sin(tAng) * 4);
      ctx.stroke();
      break;
    }

    case "steamworks": {
      // 🏭 Foundry Yards & Power Dynamos (Industrial Age)
      // Dark Red Brick Factory Building
      drawIsoBox3D(ctx, cx - 4, cy - 2, 20, 10, 16, "#475569", "#dc2626", "#7f1d1d", winGlow);
      // Twin Tall Smokestacks with billowy steam
      [-12, -4].forEach((sx) => {
        ctx.fillStyle = "#991b1b";
        ctx.fillRect(cx + sx - 3, cy - 32, 6, 20);
        ctx.fillStyle = "#facc15";
        ctx.fillRect(cx + sx - 3.5, cy - 32, 7, 2);
        // Billowy steam puffs
        const sPuff = (animTick * 16 + sx * 4) % 22;
        ctx.fillStyle = `rgba(248, 250, 252, ${(0.65 - sPuff / 34).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(cx + sx + Math.sin(phase + sx) * 3, cy - 34 - sPuff, 3.5 + sPuff * 0.18, 0, Math.PI * 2);
        ctx.fill();
      });
      // Exposed Spinning Brass Flywheel with Sparks
      const flyAng = animTick * 6;
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx + 14, cy - 2, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#fde047";
      ctx.fillRect(cx + 13 + Math.cos(flyAng) * 6, cy - 3 + Math.sin(flyAng) * 6, 2.5, 2.5);
      break;
    }

    case "railway": {
      // 🚂 Transcontinental Train Depot (Industrial Age)
      // Vaulted Green Cast-Iron & Glass Depot
      drawIsoBox3D(ctx, cx, cy - 4, 22, 11, 14, "#0284c7", "#059669", "#064e3b");
      // Steel Railroad Tracks
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 24, cy + 6); ctx.lineTo(cx + 24, cy + 6);
      ctx.moveTo(cx - 24, cy + 9); ctx.lineTo(cx + 24, cy + 9);
      ctx.stroke();
      // Dark-Green Steam Locomotive
      const tPos = Math.sin(animTick * 1.5) * 8;
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(cx - 10 + tPos, cy - 2, 20, 8);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(cx + 6 + tPos, cy - 8, 6, 6);
      // Golden Headlight Beam
      ctx.fillStyle = "#facc15";
      ctx.fillRect(cx - 11 + tPos, cy, 2, 4);
      break;
    }

    case "fission": {
      // ⚛️ Nuclear & Hydroelectric Grids (Atomic Age)
      // Hyperbolic Curved Concrete Cooling Tower
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy + 6);
      ctx.quadraticCurveTo(cx - 8, cy - 14, cx - 11, cy - 28);
      ctx.lineTo(cx + 11, cy - 28);
      ctx.quadraticCurveTo(cx + 8, cy - 14, cx + 16, cy + 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Glowing Cherenkov Blue Rim & Plume
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(cx - 10, cy - 29, 20, 2.5);
      const vPuff = (animTick * 10) % 24;
      ctx.fillStyle = `rgba(224, 242, 254, ${(0.6 - vPuff / 36).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(cx + Math.sin(phase) * 3, cy - 32 - vPuff, 5 + vPuff * 0.22, 0, Math.PI * 2);
      ctx.fill();
      // Substation Transformers with Spark
      ctx.fillStyle = "#475569";
      ctx.fillRect(cx + 16, cy - 6, 8, 12);
      ctx.fillStyle = Math.sin(phase * 4) > 0 ? "#38bdf8" : "#fde047";
      ctx.fillRect(cx + 18, cy - 10, 4, 4);
      break;
    }

    case "aerodrome": {
      // ✈️ International Jetport Terminal (Atomic Age)
      // Modern Curved Wing Airport Terminal
      drawIsoBox3D(ctx, cx - 4, cy - 2, 22, 10, 12, "#e0f2fe", "#0284c7", "#0369a1", "#38bdf8");
      // Tall Air Traffic Control Radar Tower
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(cx - 18, cy - 28, 6, 26);
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.arc(cx - 15, cy - 30, 6, 0, Math.PI * 2);
      ctx.fill();
      // Pulsing Red Beacon
      ctx.fillStyle = Math.sin(phase * 3) > 0 ? "#ef4444" : "#ffffff";
      ctx.fillRect(cx - 16, cy - 38, 2, 3);
      // Passenger Jet Airliner on Tarmac
      ctx.fillStyle = "#ffffff";
      drawPolygon(ctx, [[cx + 14, cy - 6], [cx + 26, cy + 2], [cx + 8, cy + 2]], "#ffffff", "#cbd5e1", 1);
      ctx.fillRect(cx + 16, cy - 8, 3, 14);
      break;
    }

    case "skyscraper": {
      // 🏙️ Financial Core & Supertalls (Information Age)
      // Clustered Glass Curtain-Wall Skyscraper Towers
      drawIsoBox3D(ctx, cx - 8, cy - 2, 12, 6, 32, "#7dd3fc", "#0284c7", "#075985", winGlow);
      drawIsoBox3D(ctx, cx + 10, cy, 14, 7, 44, "#38bdf8", "#0369a1", "#082f49", winGlow);
      // Elevated Glass Sky-Bridge
      ctx.fillStyle = "rgba(125, 211, 252, 0.85)";
      ctx.fillRect(cx - 2, cy - 22, 10, 4);
      // Rooftop Spire with Flashing Strobe
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + 10, cy - 44); ctx.lineTo(cx + 10, cy - 58);
      ctx.stroke();
      ctx.fillStyle = Math.sin(phase * 4) > 0 ? "#ffffff" : "#ef4444";
      ctx.fillRect(cx + 9, cy - 60, 2, 3);
      break;
    }

    case "maglev": {
      // 🚅 High-Speed Maglev & AI Grid (Information Age)
      // Elevated Guideway Viaduct
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(cx - 24, cy - 10, 48, 4);
      [-16, 0, 16].forEach((vx) => {
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(cx + vx - 2, cy - 6, 4, 12);
      });
      // Glowing Cyan Magnetic Rail
      ctx.fillStyle = "#06b6d4";
      ctx.fillRect(cx - 24, cy - 11, 48, 1.5);
      // Gliding Aerodynamic Maglev Bullet Train
      const mgPos = Math.sin(animTick * 2) * 14;
      drawPolygon(ctx, [[cx - 12 + mgPos, cy - 14], [cx + 12 + mgPos, cy - 14], [cx + 10 + mgPos, cy - 9], [cx - 10 + mgPos, cy - 9]], "#ffffff", "#06b6d4", 1);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(cx - 8 + mgPos, cy - 12, 16, 1.8);
      break;
    }

    case "arcology": {
      // 🌿 Stratospheric Arcologies (Cyberpunk Age)
      // 3-Tier Stepped Eco-Arcology Pyramid
      drawIsoBox3D(ctx, cx, cy - 2, 24, 12, 14, "#15803d", "#0e7490", "#083344");
      drawIsoBox3D(ctx, cx, cy - 16, 16, 8, 12, "#22c55e", "#0891b2", "#0e7490");
      drawIsoBox3D(ctx, cx, cy - 28, 10, 5, 10, "#4ade80", "#06b6d4", "#155e75");
      // Geodesic Glass Dome
      ctx.fillStyle = "rgba(125, 211, 252, 0.75)";
      ctx.beginPath();
      ctx.arc(cx, cy - 38, 7, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Cascading Waterfall
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(cx - 2, cy - 14, 4, 16);
      // Flying Aerocab
      const acX = cx + Math.sin(phase * 1.5) * 18;
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(acX - 3, cy - 44, 6, 2.5);
      break;
    }

    case "spaceport": {
      // 🚀 Orbital Launch & Dyson Relays (Cyberpunk Age)
      // Massive Hexagonal Launch Platform
      drawPolygon(ctx, [[cx - 22, cy - 4], [cx + 22, cy - 4], [cx + 16, cy + 6], [cx - 16, cy + 6]], "#334155", "#64748b", 1.5);
      // Red Gantry Umbilical Tower
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(cx - 14, cy - 38, 5, 36);
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 9, cy - 30); ctx.lineTo(cx, cy - 30);
      ctx.moveTo(cx - 9, cy - 18); ctx.lineTo(cx, cy - 18);
      ctx.stroke();
      // Sleek Orbital Heavy Rocket
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(cx - 3, cy - 46, 6, 38);
      drawPolygon(ctx, [[cx, cy - 54], [cx - 3, cy - 46], [cx + 3, cy - 46]], "#facc15");
      // Plasma Exhaust Glow at launchpad
      const pGlow = Math.sin(phase * 4) * 3;
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(cx, cy - 6, 4 + pGlow, 0, Math.PI * 2);
      ctx.fill();
      // Parabolic Satellite Dish
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx + 16, cy - 12, 6, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
      break;
    }
  }
}

function getIsoParcelCenter(bIdx, w, h) {
  const horizonY = Math.max(92, Math.floor(h * 0.27));
  const valleyH = h - horizonY;
  // 3 depth rows × 6 columns across the 2.5D isometric city valley
  const col = Math.floor(bIdx / 3); // 0..5
  const row = bIdx % 3;             // 0 (Upper), 1 (Mid), 2 (Lower)
  const usableW = Math.max(960, w - 160);
  const spacingX = usableW / 6;
  const staggerX = row === 1 ? spacingX * 0.28 : row === 2 ? -spacingX * 0.14 : 0;
  const cx = Math.round(95 + col * spacingX + staggerX);
  const rowRatios = [0.24, 0.54, 0.82];
  const cy = Math.round(horizonY + valleyH * rowRatios[row]);
  return { cx, cy, row, col };
}

function panToIsoDistrict(bId) {
  const bIdx = BUILDINGS.findIndex((b) => b.id === bId);
  const canvas = document.getElementById("city-canvas");
  const viewport = document.getElementById("city-scroll-viewport");
  if (bIdx < 0 || !canvas || !viewport) return;
  const pos = getIsoParcelCenter(bIdx, canvas.width, canvas.height);
  const targetScroll = Math.max(0, pos.cx - viewport.clientWidth / 2);
  viewport.scrollTo({ left: targetScroll, behavior: "smooth" });
}

function drawCityCanvas() {
  ensureCivState();
  const canvas = document.getElementById("city-canvas");
  if (!canvas) return;

  const viewport = canvas.parentElement;
  const viewportW = viewport && viewport.clientWidth > 0 ? viewport.clientWidth : 1080;
  const viewportH = viewport && viewport.clientHeight > 0 ? viewport.clientHeight : 380;
  const targetWidth = Math.max(viewportW, 1180);
  const targetHeight = Math.max(viewportH, 320);

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const pxW = Math.round(targetWidth * dpr);
  const pxH = Math.round(targetHeight * dpr);

  if (canvas.width !== pxW || canvas.height !== pxH) {
    canvas.width = pxW;
    canvas.height = pxH;
  }

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = targetWidth;
  const h = targetHeight;
  const era = state.currentEra;
  const sky = ERAS[era].skyColors;
  const hills = ERAS[era].hillColors;
  const horizonY = Math.max(92, Math.floor(h * 0.27));
  animTick += 0.05;

  // Advance SLOW Day/Night Cycle
  dayCyclePhase = (dayCyclePhase + 0.00028) % 1;
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

  // 1. SKY HORIZON (Top 27% of 2.5D Viewport)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY + 28);
  skyGrad.addColorStop(0, sky[0]);
  skyGrad.addColorStop(0.65, sky[1]);
  skyGrad.addColorStop(1, sky[2]);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, horizonY + 28);

  if (isDuskOrDawn) {
    const duskAlpha = (1 - Math.abs(nightFactor - 0.47) * 3.5) * 0.38;
    if (duskAlpha > 0) {
      ctx.fillStyle = `rgba(249, 115, 22, ${duskAlpha.toFixed(2)})`;
      ctx.fillRect(0, 0, w, horizonY + 28);
    }
  }
  if (nightFactor > 0.05) {
    ctx.fillStyle = `rgba(5, 8, 22, ${(nightFactor * 0.65).toFixed(2)})`;
    ctx.fillRect(0, 0, w, horizonY + 28);
  }

  // Twinkling Stars in Sky
  const starVisibility = Math.max(era === 8 ? 0.65 : 0.08, nightFactor);
  stars.forEach((st) => {
    const sy = (st.y / 140) * (horizonY - 14);
    const alpha = starVisibility * (0.28 + 0.62 * Math.sin(animTick + st.phase));
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
    ctx.fillRect(st.xRatio * w, sy, st.size, st.size);
  });

  // Radiant Sun / Moon Orb with Soft Corona
  const orbX = w * 0.72;
  const orbY = 32 + Math.sin(dayCyclePhase * Math.PI * 2) * 10;
  const sunGrad = ctx.createRadialGradient(orbX, orbY, 4, orbX, orbY, 34);
  sunGrad.addColorStop(0, era === 8 ? "#f43f5e" : isNight ? "#e0f2fe" : "#fef08a");
  sunGrad.addColorStop(0.45, era === 8 ? "rgba(244,63,94,0.35)" : isNight ? "rgba(186,230,253,0.35)" : "rgba(253,224,71,0.42)");
  sunGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(orbX, orbY, 34, 0, Math.PI * 2);
  ctx.fill();

  // Daytime Rainbow Arc or Nighttime Aurora Borealis
  if (!isNight && era <= 6) {
    const rbColors = [
      "rgba(239, 68, 68, 0.16)", "rgba(249, 115, 22, 0.16)", "rgba(250, 204, 21, 0.16)",
      "rgba(34, 197, 94, 0.16)", "rgba(56, 189, 248, 0.16)", "rgba(168, 85, 247, 0.16)"
    ];
    ctx.lineWidth = 2.8;
    rbColors.forEach((col, rIdx) => {
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.arc(w * 0.32, horizonY + 14, 148 - rIdx * 3, Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();
    });
  } else if (isNight) {
    const auroraColors = ["rgba(52, 211, 153, 0.18)", "rgba(6, 182, 212, 0.16)", "rgba(192, 132, 252, 0.15)"];
    auroraColors.forEach((acol, aIdx) => {
      ctx.strokeStyle = acol;
      ctx.lineWidth = 9 - aIdx * 2;
      ctx.beginPath();
      for (let ax = 0; ax <= w; ax += 38) {
        const ay = 20 + aIdx * 8 + Math.sin(animTick * 0.8 + ax * 0.012 + aIdx) * 9;
        if (ax === 0) ctx.moveTo(ax, ay);
        else ctx.lineTo(ax, ay);
      }
      ctx.stroke();
    });
  }

  // Flocks of birds gliding across the sky
  birdFlocks.forEach((bf) => {
    bf.x += bf.speed;
    if (bf.x > w + 60) bf.x = -50;
    const flap = Math.sin(animTick * 5.5 + bf.x * 0.08) * 3;
    ctx.strokeStyle = isNight ? "rgba(148, 163, 184, 0.45)" : "rgba(30, 41, 59, 0.72)";
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 4; i++) {
      const bx = bf.x + i * 14;
      const by = bf.y + (i % 2) * 5;
      ctx.beginPath();
      ctx.moveTo(bx - 4, by - flap);
      ctx.quadraticCurveTo(bx - 1, by, bx, by + 1);
      ctx.quadraticCurveTo(bx + 1, by, bx + 4, by - flap);
      ctx.stroke();
    }
  });

  // Soft drifting clouds in sky + soft ambient terrain shadow
  clouds.forEach((cl) => {
    cl.x += cl.speed;
    if (cl.x > w + 110) cl.x = -90;

    // Cloud shadow drifting across valley terrain
    ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
    ctx.beginPath();
    ctx.ellipse(cl.x + 20, horizonY + 65 + (cl.y % 40), cl.w * 0.7, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fluffy cloud body in sky
    const cloudGrad = ctx.createLinearGradient(0, cl.y - 12, 0, cl.y + 12);
    if (isNight) {
      cloudGrad.addColorStop(0, "rgba(51, 65, 85, 0.45)");
      cloudGrad.addColorStop(1, "rgba(30, 41, 59, 0.28)");
    } else if (isDuskOrDawn) {
      cloudGrad.addColorStop(0, "rgba(254, 215, 170, 0.88)");
      cloudGrad.addColorStop(1, "rgba(244, 114, 182, 0.62)");
    } else {
      cloudGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      cloudGrad.addColorStop(1, "rgba(226, 232, 240, 0.75)");
    }
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.arc(cl.x, cl.y, 13, 0, Math.PI * 2);
    ctx.arc(cl.x + 15, cl.y - 6, 17, 0, Math.PI * 2);
    ctx.arc(cl.x + 34, cl.y - 2, 14, 0, Math.PI * 2);
    ctx.arc(cl.x + 20, cl.y + 6, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  });

  // Distant Mountain Ridge with atmospheric haze
  ctx.fillStyle = hills[0];
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  let lastHx = 0;
  for (let hx = 0; hx < w; hx += 280) {
    lastHx = hx + 280;
    ctx.quadraticCurveTo(hx + 140, horizonY - 44, lastHx, horizonY);
  }
  ctx.lineTo(Math.max(w, lastHx), horizonY + 22);
  ctx.lineTo(0, horizonY + 22);
  ctx.closePath();
  ctx.fill();

  // Soft atmospheric haze wash along the ridge base
  const hazeGrad = ctx.createLinearGradient(0, horizonY - 14, 0, horizonY + 16);
  hazeGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
  hazeGrad.addColorStop(1, isNight ? "rgba(15, 23, 42, 0.45)" : "rgba(255, 255, 255, 0.28)");
  ctx.fillStyle = hazeGrad;
  ctx.fillRect(0, horizonY - 14, w, 30);

  // Erected World Wonders along the Upper Acropolis Ridge!
  const builtWonders = WONDERS.filter((wObj) => hasWonder(wObj.id));
  builtWonders.forEach((wonder, wIdx) => {
    const wx = 120 + wIdx * 115;
    drawWonderOnPanorama(ctx, wonder.id, wx, horizonY + 2, isNight);
  });

  // 2. 2.5D ISOMETRIC TERRACED CITY VALLEY PLANE (horizonY to h)
  const terrainGrad = ctx.createLinearGradient(0, horizonY, 0, h);
  if (era >= 7) {
    terrainGrad.addColorStop(0, "#0f172a");
    terrainGrad.addColorStop(0.5, "#1e293b");
    terrainGrad.addColorStop(1, "#090d16");
  } else if (era >= 5) {
    terrainGrad.addColorStop(0, "#27272a");
    terrainGrad.addColorStop(0.5, "#3f3f46");
    terrainGrad.addColorStop(1, "#18181b");
  } else {
    terrainGrad.addColorStop(0, hills[1]);
    terrainGrad.addColorStop(0.55, isNight ? "#142517" : "#2f4f2c");
    terrainGrad.addColorStop(1, isNight ? "#0d180f" : "#243c22");
  }
  ctx.fillStyle = terrainGrad;
  ctx.fillRect(0, horizonY, w, h - horizonY);

  // Soft Isometric Diamond Ground Grid
  ctx.strokeStyle = era >= 7 ? "rgba(6, 182, 212, 0.08)" : "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  const isoStep = 90;
  for (let gx = -h; gx < w + h; gx += isoStep) {
    ctx.beginPath();
    ctx.moveTo(gx, horizonY);
    ctx.lineTo(gx + (h - horizonY) * 1.6, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, horizonY);
    ctx.lineTo(gx - (h - horizonY) * 1.6, h);
    ctx.stroke();
  }

  // 3D Terraced Elevation Ledges separating Upper, Mid, and Lower Isometric Tiers
  const valleyH = h - horizonY;
  const ledge1Y = Math.round(horizonY + valleyH * 0.37);
  const ledge2Y = Math.round(horizonY + valleyH * 0.68);
  [ledge1Y, ledge2Y].forEach((ly) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.fillRect(0, ly, w, 7);
    ctx.fillStyle = era >= 5 ? "rgba(148, 163, 184, 0.2)" : "rgba(241, 245, 249, 0.18)";
    ctx.fillRect(0, ly, w, 2);
  });

  // 3. 2.5D MEANDERING RIVER & CANAL CHANNEL
  const riverY = ledge2Y + 8;
  const riverH = 26;

  // Sandy / Stone Riverbank Shore
  ctx.fillStyle = era >= 5 ? "#475569" : era >= 2 ? "#78716c" : "#785338";
  ctx.fillRect(0, riverY - 4, w, riverH + 8);

  const riverGrad = ctx.createLinearGradient(0, riverY, 0, riverY + riverH);
  riverGrad.addColorStop(0, era === 8 ? "#0e7490" : "#0284c7");
  riverGrad.addColorStop(0.5, era === 8 ? "#06b6d4" : "#0ea5e9");
  riverGrad.addColorStop(1, era === 8 ? "#1e1b4b" : "#0369a1");
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, riverY, w, riverH);

  // Animated Translucent Water Caustics & Foam
  ctx.fillStyle = era === 8 ? "rgba(34, 211, 238, 0.45)" : "rgba(224, 242, 254, 0.45)";
  for (let wx = 15; wx < w; wx += 48) {
    const waveOff = Math.sin(animTick * 2.2 + wx * 0.15) * 8;
    ctx.fillRect(wx + waveOff, riverY + 5 + ((wx * 3) % 12), 18, 2);
  }

  // Stone & Steel Arched Bridges spanning the River with Glowing Lanterns
  for (let bx = 180; bx < w - 100; bx += 290) {
    drawPolygon(
      ctx,
      [
        [bx - 24, riverY - 6],
        [bx + 24, riverY - 6],
        [bx + 32, riverY + riverH + 6],
        [bx - 16, riverY + riverH + 6]
      ],
      era >= 5 ? "#334155" : "#e2e8f0",
      "rgba(0,0,0,0.5)",
      1.3
    );
    // Bridge Lantern Posts
    ctx.fillStyle = "#facc15";
    ctx.fillRect(bx - 12, riverY - 8, 3, 3);
    ctx.fillRect(bx + 16, riverY + riverH + 2, 3, 3);
  }

  // River Boats gliding smoothly along the canal
  riverBoats.forEach((rb) => {
    rb.x += rb.speed * rb.dir;
    if (rb.x > w + 45) rb.x = -45;
    if (rb.x < -45) rb.x = w + 45;
    const by = riverY + 13;
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(rb.dir > 0 ? rb.x - 12 : rb.x + 18, by + 2, 10, 1.5);
    drawPolygon(
      ctx,
      [[rb.x - 12, by - 4], [rb.x + 16, by - 4], [rb.x + 11, by + 3], [rb.x - 7, by + 3]],
      era >= 5 ? "#1e293b" : "#92400e"
    );
    if (era >= 1 && era <= 4) {
      drawPolygon(ctx, [[rb.x + 2, by - 16], [rb.x - 6, by - 4], [rb.x + 10, by - 4]], "#f8fafc");
    } else if (era >= 5) {
      ctx.fillStyle = era === 8 ? "#06b6d4" : "#facc15";
      ctx.fillRect(rb.x - 4, by - 7, 9, 3.5);
    }
  });

  // 4. 2.5D ISOMETRIC ROAD NETWORK & MOVING CITIZENS/TRAFFIC
  const parcelCenters = BUILDINGS.map((b, idx) => ({
    b,
    idx,
    ...getIsoParcelCenter(idx, w, h)
  }));

  // Paved Road Links
  ctx.strokeStyle = era === 0 ? "rgba(120, 83, 56, 0.72)" : era <= 4 ? "rgba(203, 213, 225, 0.55)" : "rgba(30, 41, 59, 0.88)";
  ctx.lineWidth = 9;
  parcelCenters.forEach((p, idx) => {
    if (idx + 3 < parcelCenters.length) {
      const nextCol = parcelCenters[idx + 3];
      ctx.beginPath();
      ctx.moveTo(p.cx, p.cy);
      ctx.lineTo(nextCol.cx, nextCol.cy);
      ctx.stroke();
    }
    if (p.row < 2 && idx + 1 < parcelCenters.length) {
      const nextRow = parcelCenters[idx + 1];
      ctx.beginPath();
      ctx.moveTo(p.cx, p.cy);
      ctx.lineTo(nextRow.cx, nextRow.cy);
      ctx.stroke();
    }
  });

  // Tiny Animated Vehicles on Roads
  roadTraffic.forEach((veh, vIdx) => {
    veh.x += veh.speed * veh.dir;
    if (veh.x > w + 40) veh.x = -40;
    if (veh.x < -40) veh.x = w + 40;
    const pTarget = parcelCenters[vIdx % parcelCenters.length];
    const vy = pTarget.cy + ((vIdx % 3) - 1) * 8;
    ctx.fillStyle = veh.color;
    ctx.fillRect(veh.x - 4, vy - 2, 8, 4);
    // Headlight glow
    ctx.fillStyle = isNight ? "#fde047" : "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(veh.dir > 0 ? veh.x + 4 : veh.x - 6, vy - 1, 2, 2);
  });

  // Clustered Trees between districts
  const treeStyles = era >= 7 ? ["cyber"] : ["pine", "cherry", "round", "autumn"];
  parcelCenters.forEach((p, idx) => {
    drawTree(ctx, p.cx - 66, p.cy - 8, 0.82, treeStyles[idx % treeStyles.length]);
    drawTree(ctx, p.cx + 66, p.cy + 10, 0.82, treeStyles[(idx + 2) % treeStyles.length]);
  });

  // 5. RENDER ALL 18 2.5D ISOMETRIC DISTRICT PARCELS (Sorted Back-to-Front by Y!)
  isoParcelHitboxes = [];
  const sortedParcels = [...parcelCenters].sort((a, b) => a.cy - b.cy);
  const rx = 56;
  const ry = 24;
  const plinthDepth = 9;

  sortedParcels.forEach((p) => {
    const b = p.b;
    const count = state.buildings[b.id] || 0;
    const isRevealed = (state.revealedBuildings || []).includes(b.id) || count > 0;
    if (!isRevealed && b.era > state.currentEra + 1) return;

    const { cx, cy } = p;
    const isSelected = selectedDistrictId === b.id;
    const isHovered = hoveredDistrictId === b.id;
    const crisis = state.civ.crises[b.id];
    const isOverdriven = (state.civ.overdrives[b.id] || 0) > Date.now();
    const zCol = ZONE_ISO_COLORS[b.zoneTag] || ZONE_ISO_COLORS.Residential;

    // Register interactive 2.5D parcel hitbox
    isoParcelHitboxes.push({
      bId: b.id,
      cx,
      cy,
      x: cx - rx - 8,
      y: cy - ry - 54,
      w: rx * 2 + 16,
      h: ry * 2 + 72
    });

    if (count <= 0) {
      // Unbuilt Revealed Blueprint Plot in 2.5D
      if (isRevealed) {
        drawPolygon(
          ctx,
          [[cx, cy - ry], [cx + rx, cy], [cx, cy + ry], [cx - rx, cy]],
          isHovered ? "rgba(56, 189, 248, 0.28)" : "rgba(15, 23, 42, 0.52)",
          isHovered ? "#38bdf8" : "rgba(255, 255, 255, 0.28)",
          isHovered ? 2.2 : 1
        );
        ctx.save();
        ctx.font = "bold 10px 'Segoe UI', system-ui, sans-serif";
        ctx.fillStyle = isHovered ? "#fef08a" : "rgba(226, 232, 240, 0.85)";
        ctx.textAlign = "center";
        ctx.fillText(`🔨 ${b.icon} ${b.name}`, cx, cy - 2);
        ctx.font = "9px 'Consolas', monospace";
        ctx.fillStyle = state.cp >= b.baseCost ? "#34d399" : "#94a3b8";
        ctx.fillText(`Click to Build (${formatNum(b.baseCost)} CP)`, cx, cy + 11);
        ctx.restore();
      }
      return;
    }

    // Active Owned 2.5D Isometric District Plinth!
    const borderCol = crisis
      ? "#ef4444"
      : isSelected || isHovered
      ? "#fde047"
      : isOverdriven
      ? "#38bdf8"
      : zCol.accent;
    const lineW = isSelected || isHovered || crisis ? 2.5 : 1.3;

    drawIsoPlinth(
      ctx,
      cx,
      cy,
      rx,
      ry,
      plinthDepth,
      zCol.top,
      zCol.left,
      zCol.right,
      borderCol,
      lineW,
      isHovered || isSelected
    );

    // Draw 3D Isometric Sub-Structures around the parcel based on building count!
    const subCount = Math.min(4, Math.floor(Math.log2(count + 1)));
    const winColor = isNight ? "#fde047" : "rgba(224, 242, 254, 0.8)";
    const subOffsets = [
      [-26, -5],
      [26, -5],
      [-22, 8],
      [22, 8]
    ];
    for (let s = 0; s < subCount; s++) {
      const [ox, oy] = subOffsets[s];
      const boxH = Math.min(36, 12 + b.era * 2.5 + (s % 2) * 4);
      drawIsoBox3D(
        ctx,
        cx + ox,
        cy + oy,
        10,
        5,
        boxH,
        zCol.accent,
        zCol.left,
        zCol.right,
        winColor
      );
    }

    // Draw the BESPOKE 2.5D ISOMETRIC LANDMARK ARCHITECTURE!
    drawIsoDistrictArchitecture(ctx, b.id, cx, cy + 2, count, isNight, animTick, isHovered, isSelected);

    // Animated 2.5D Citizens walking on the parcel
    const citX = cx + Math.sin(animTick * 1.8 + p.idx) * 24;
    const citY = cy + 9 + Math.cos(animTick * 1.8 + p.idx) * 4;
    ctx.fillStyle = "#fde047";
    ctx.fillRect(citX - 1.5, citY - 4, 3, 4);

    // If District is in CRISIS: Leaping Flames & Billowing Smoke
    if (crisis) {
      for (let f = 0; f < 4; f++) {
        const fx = cx - 16 + f * 10 + Math.sin(animTick * 4 + f) * 4;
        const fy = cy - 18 - ((animTick * 18 + f * 8) % 26);
        ctx.fillStyle = f % 2 === 0 ? "rgba(239, 68, 68, 0.88)" : "rgba(250, 204, 21, 0.88)";
        ctx.beginPath();
        ctx.arc(fx, fy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      const alertY = cy - 46 + Math.sin(animTick * 4) * 3;
      ctx.save();
      ctx.font = "bold 10px 'Segoe UI', sans-serif";
      const alertTxt = `🚨 ${crisis.short.toUpperCase()}! CLICK TO FIX`;
      const tw = ctx.measureText(alertTxt).width + 12;
      ctx.fillStyle = "rgba(185, 28, 28, 0.95)";
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(cx - tw / 2, alertY - 10, tw, 18, 9);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(alertTxt, cx, alertY - 1);
      ctx.restore();
    }

    // Floating Glassmorphism District Badge at the front of the Isometric Plinth
    ctx.save();
    ctx.font = "bold 10px 'Segoe UI', system-ui, sans-serif";
    const labelTxt = `${b.icon} ×${count}${isOverdriven ? " ⚡2×" : ""}`;
    const lw = Math.max(46, ctx.measureText(labelTxt).width + 12);
    const badgeX = cx - lw / 2;
    const badgeY = cy + ry + 2;
    ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.95)" : "rgba(10, 14, 24, 0.90)";
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, lw, 16, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isSelected ? "#09090b" : "#f8fafc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labelTxt, cx, badgeY + 8.5);
    ctx.restore();
  });

  // 6. Celebratory Fireworks (at Dusk/Night or during an active Festival!)
  const isFestivalActive = Date.now() < boostExpiresAt;
  const fwChance = isFestivalActive ? 0.08 : (isNight || isDuskOrDawn ? 0.018 : 0);
  if (fwChance > 0 && Math.random() < fwChance && cityFireworks.length < 70) {
    spawnCityFirework(70 + Math.random() * (w - 140), 24 + Math.random() * (horizonY + 40));
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

  // 7. VOICES OF THE CITIZENS: Interactive Floating Speech Bubbles!
  drawAndUpdateCitizenSpeechBubble(ctx, w, horizonY + 55);
}

const CITIZEN_VOICES = [
  // Era 0: Stone Age
  [
    "🔥 This roasted mammoth is 10/10!",
    "🌾 Look! The river seeds sprouted!",
    "🛖 Our new thatched roof keeps the rain out!",
    "🪨 Who stacked that huge stone?!"
  ],
  // Era 1: Bronze Age
  [
    "🏺 Fresh figs and pottery at the Bazaar!",
    "🛶 The new canal doubled our harvest!",
    "✨ Copper tools make building so much faster!",
    "🌴 Shade by the irrigation levee feels amazing!"
  ],
  // Era 2: Classical Age
  [
    "🏛️ The Senate debated for six hours straight!",
    "💧 Mountain water from the Aqueduct is so crisp!",
    "🎭 Tonight's amphitheater comedy is sold out!",
    "🫒 Olive oil exports are at an all-time high!"
  ],
  // Era 3: Medieval Age
  [
    "⚙️ Hear that watermill hum by the river!",
    "🥖 Warm sourdough fresh from the Bakers' Guild!",
    "🏰 The new stone watchtower looks impenetrable!",
    "🎺 Jousting tournament at the town square!"
  ],
  // Era 4: Renaissance
  [
    "🌉 The view from the Grand Canal bridge is pure art!",
    "🎓 Just attended an astronomy lecture at the University!",
    "🏦 Merchant ships arrived with spices & silk!",
    "🎨 Maestro painted another fresco in the piazza!"
  ],
  // Era 5: Industrial Age
  [
    "🚂 All aboard the 8:15 steam express!",
    "💡 Electric streetlamps turned night into day!",
    "☕ Triple espresso before my foundry shift!",
    "🎷 Brass band playing in the park tonight!"
  ],
  // Era 6: Atomic Age
  [
    "✈️ Non-stop jet flight departing Terminal 4!",
    "⚛️ Clean reactor power for the whole metro grid!",
    "🚇 Caught the underground metro with 2 seconds to spare!",
    "📻 New rock-and-roll broadcast on every radio!"
  ],
  // Era 7: Information Age
  [
    "🚄 500 km/h on the Maglev and my coffee didn't spill!",
    "🏢 The sunset from Floor 118 is breathtaking!",
    "💻 Fiber-optic ping across the city is 0.2ms!",
    "🌿 Rooftop sky-gardens smell like fresh pine!"
  ],
  // Era 8: Cyberpunk & Cosmic Age
  [
    "🏙️ Arcology Deck 300 has the best ramen in the sector!",
    "🚀 Weekend shuttle to the Orbital Ring is boarding!",
    "🤖 My domestic droid just composed a synth symphony!",
    "✨ The neon reflections on the river look magical tonight!"
  ]
];

let activeSpeechBubble = null;
let nextSpeechBubbleAt = Date.now() + 3500;

function drawAndUpdateCitizenSpeechBubble(ctx, w, h) {
  const now = Date.now();
  if (!activeSpeechBubble && now >= nextSpeechBubbleAt) {
    const eraQuotes = CITIZEN_VOICES[state.currentEra] || CITIZEN_VOICES[0];
    const text = eraQuotes[Math.floor(Math.random() * eraQuotes.length)];
    const bx = 130 + Math.random() * Math.max(260, Math.min(w - 260, 580));
    const by = h - 78 - Math.random() * 28;
    const borderColors = ["#f472b6", "#facc15", "#34d399", "#38bdf8", "#c084fc", "#fb923c"];
    activeSpeechBubble = {
      text,
      x: bx,
      y: by,
      bornAt: now,
      expiresAt: now + 7500,
      color: borderColors[Math.floor(Math.random() * borderColors.length)],
      w: 200,
      h: 26
    };
  }

  if (!activeSpeechBubble) return;
  if (now >= activeSpeechBubble.expiresAt) {
    activeSpeechBubble = null;
    nextSpeechBubbleAt = now + 5000 + Math.random() * 4500;
    return;
  }

  const sb = activeSpeechBubble;
  const bobY = sb.y + Math.sin(animTick * 2.5) * 2.5;
  ctx.save();
  ctx.font = "bold 11px 'Segoe UI', system-ui, sans-serif";
  const textW = ctx.measureText(sb.text).width;
  const boxW = Math.ceil(textW + 22);
  const boxH = 24;
  const boxX = Math.max(12, Math.min(w - boxW - 12, sb.x - boxW / 2));
  const boxY = bobY - boxH;
  sb.hitX = boxX;
  sb.hitY = boxY;
  sb.hitW = boxW;
  sb.hitH = boxH + 8;

  // Speech bubble pill
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = sb.color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  // Speech bubble pointer tail
  const tailX = Math.max(boxX + 14, Math.min(boxX + boxW - 14, sb.x));
  ctx.beginPath();
  ctx.moveTo(tailX - 5, boxY + boxH);
  ctx.lineTo(tailX, boxY + boxH + 6);
  ctx.lineTo(tailX + 5, boxY + boxH);
  ctx.closePath();
  ctx.fillStyle = sb.color;
  ctx.fill();

  // Quote text
  ctx.fillStyle = "#f8fafc";
  ctx.textBaseline = "middle";
  ctx.fillText(sb.text, boxX + 11, boxY + boxH / 2 + 0.5);
  ctx.restore();
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
  if (chosen.toLowerCase() === DEV_SECRET_KEYWORD) {
    if (!state.cityName || !state.cityName.trim()) {
      state.cityName = RANDOM_CITY_NAMES[0];
    }
    document.getElementById("city-name-modal").classList.add("hidden");
    unlockDevConsole(true);
    applyEraTheme();
    updateTopHUD();
    saveGame(false);
    return;
  }
  state.cityName = chosen || RANDOM_CITY_NAMES[0];
  document.getElementById("city-name-modal").classList.add("hidden");
  SoundFX.wonder();
  applyEraTheme();
  updateTopHUD();
  saveGame(false);
}

// ============================================================================
// ARCHITECT DEVELOPER CONSOLE ("metropolisclicktopolisapocalypse")
// ============================================================================
function refreshAllDevUI() {
  checkProximityReveals();
  applyEraTheme();
  renderBuildingsList();
  renderInfrastructureDistricts();
  renderUpgrades();
  renderWonders();
  checkAchievements();
  renderAchievements();
  updateTopHUD();
  saveGame(false);
}

function unlockDevConsole(openModal = true) {
  state.devUnlocked = true;
  document.querySelectorAll("#btn-dev-console, .dev-menu-btn").forEach((btn) => btn.classList.remove("hidden"));
  SoundFX.wonder();
  showToast("🛠️", "Architect Dev Access Unlocked!", "Full timeline manipulation enabled via metropolisclicktopolisapocalypse.");
  if (openModal) {
    const devModal = document.getElementById("dev-modal");
    if (devModal) devModal.classList.remove("hidden");
  }
  saveGame(false);
}

function setupDevConsole() {
  const devBtns = document.querySelectorAll("#btn-dev-console, .dev-menu-btn");
  const devModal = document.getElementById("dev-modal");
  const closeDevBtn = document.getElementById("btn-close-dev");

  if (state.devUnlocked) {
    devBtns.forEach((btn) => btn.classList.remove("hidden"));
  }

  devBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("game-menu-modal")?.classList.add("hidden");
      devModal?.classList.remove("hidden");
    });
  });
  if (closeDevBtn && devModal) {
    closeDevBtn.addEventListener("click", () => {
      devModal.classList.add("hidden");
    });
  }

  // Global keyboard listener for typing "metropolisclicktopolisapocalypse" anywhere
  window.addEventListener("keydown", (e) => {
    if (!e.key || e.key.length !== 1) return;
    devKeyBuffer = (devKeyBuffer + e.key.toLowerCase()).slice(-DEV_SECRET_KEYWORD.length);
    if (devKeyBuffer === DEV_SECRET_KEYWORD) {
      devKeyBuffer = "";
      unlockDevConsole(true);
    }
  });

  // 1. CP Manipulation Buttons
  document.querySelectorAll("[data-dev-cp]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const addVal = parseFloat(btn.getAttribute("data-dev-cp"));
      if (addVal > 0) {
        state.cp += addVal;
        state.totalCp += addVal;
        state.allTimeCp += addVal;
        SoundFX.buy();
        refreshAllDevUI();
      }
    });
  });

  const cpX10 = document.getElementById("dev-cp-x10");
  if (cpX10) {
    cpX10.addEventListener("click", () => {
      const gain = Math.max(1000, state.cp * 9);
      state.cp += gain;
      state.totalCp += gain;
      state.allTimeCp += gain;
      SoundFX.buy();
      refreshAllDevUI();
    });
  }

  const cpX1000 = document.getElementById("dev-cp-x1000");
  if (cpX1000) {
    cpX1000.addEventListener("click", () => {
      const gain = Math.max(100000, state.cp * 999);
      state.cp += gain;
      state.totalCp += gain;
      state.allTimeCp += gain;
      SoundFX.buy();
      refreshAllDevUI();
    });
  }

  const setCpBtn = document.getElementById("dev-set-cp");
  if (setCpBtn) {
    setCpBtn.addEventListener("click", () => {
      const val = parseFloat(document.getElementById("dev-custom-cp").value);
      if (isFinite(val) && val >= 0) {
        state.cp = val;
        state.totalCp = Math.max(state.totalCp, val);
        state.allTimeCp = Math.max(state.allTimeCp, val);
        SoundFX.buy();
        refreshAllDevUI();
      }
    });
  }

  // 2. Era / Epoch Jump Buttons
  const eraBtnsWrap = document.getElementById("dev-era-buttons");
  if (eraBtnsWrap) {
    eraBtnsWrap.innerHTML = "";
    ERAS.forEach((era, idx) => {
      const b = document.createElement("button");
      b.className = "dev-btn";
      b.textContent = `${era.icon} ${idx}: ${era.name}`;
      b.addEventListener("click", () => {
        state.currentEra = idx;
        state.highestEra = Math.max(state.highestEra, idx);
        state.totalCp = Math.max(state.totalCp, era.threshold);
        state.allTimeCp = Math.max(state.allTimeCp, era.threshold);
        BUILDINGS.forEach((bld) => {
          if (bld.era <= idx && !state.revealedBuildings.includes(bld.id)) {
            state.revealedBuildings.push(bld.id);
          }
        });
        UPGRADES.forEach((u) => {
          if (u.era <= idx && !state.revealedUpgrades.includes(u.id)) {
            state.revealedUpgrades.push(u.id);
          }
        });
        SoundFX.eraAdvance();
        refreshAllDevUI();
        showToast(era.icon, `Jumped to ${era.name}`, `Epoch set to ${era.name}.`);
      });
      eraBtnsWrap.appendChild(b);
    });
  }

  // 3. Districts & Buildings Manipulation
  const bldSelect = document.getElementById("dev-building-select");
  if (bldSelect) {
    bldSelect.innerHTML = BUILDINGS.map(
      (b) => `<option value="${b.id}">[Era ${b.era}] ${b.icon} ${b.name}</option>`
    ).join("");
  }

  document.getElementById("dev-bld-era-25")?.addEventListener("click", () => {
    BUILDINGS.filter((b) => b.era <= state.currentEra).forEach((b) => {
      state.buildings[b.id] = (state.buildings[b.id] || 0) + 25;
      if (!state.revealedBuildings.includes(b.id)) state.revealedBuildings.push(b.id);
    });
    SoundFX.buy();
    refreshAllDevUI();
  });

  document.getElementById("dev-bld-all-10")?.addEventListener("click", () => {
    BUILDINGS.forEach((b) => {
      state.buildings[b.id] = (state.buildings[b.id] || 0) + 10;
      if (!state.revealedBuildings.includes(b.id)) state.revealedBuildings.push(b.id);
    });
    SoundFX.buy();
    refreshAllDevUI();
  });

  document.getElementById("dev-bld-all-50")?.addEventListener("click", () => {
    BUILDINGS.forEach((b) => {
      state.buildings[b.id] = (state.buildings[b.id] || 0) + 50;
      if (!state.revealedBuildings.includes(b.id)) state.revealedBuildings.push(b.id);
    });
    SoundFX.buy();
    refreshAllDevUI();
  });

  document.getElementById("dev-reveal-all-blds")?.addEventListener("click", () => {
    state.revealedBuildings = BUILDINGS.map((b) => b.id);
    SoundFX.research();
    refreshAllDevUI();
  });

  document.getElementById("dev-clear-blds")?.addEventListener("click", () => {
    BUILDINGS.forEach((b) => {
      state.buildings[b.id] = 0;
    });
    refreshAllDevUI();
  });

  document.getElementById("dev-add-single-bld")?.addEventListener("click", () => {
    const bId = bldSelect.value;
    const qty = Math.max(0, parseInt(document.getElementById("dev-building-qty").value, 10) || 0);
    if (bId && qty > 0) {
      state.buildings[bId] = (state.buildings[bId] || 0) + qty;
      if (!state.revealedBuildings.includes(bId)) state.revealedBuildings.push(bId);
      SoundFX.buy();
      refreshAllDevUI();
    }
  });

  document.getElementById("dev-set-single-bld")?.addEventListener("click", () => {
    const bId = bldSelect.value;
    const qty = Math.max(0, parseInt(document.getElementById("dev-building-qty").value, 10) || 0);
    if (bId) {
      state.buildings[bId] = qty;
      if (!state.revealedBuildings.includes(bId)) state.revealedBuildings.push(bId);
      SoundFX.buy();
      refreshAllDevUI();
    }
  });

  // 4. Civic Upgrades, Wonders & Achievements
  document.getElementById("dev-unlock-all-upgrades")?.addEventListener("click", () => {
    state.revealedUpgrades = UPGRADES.map((u) => u.id);
    state.upgrades = UPGRADES.map((u) => u.id);
    SoundFX.research();
    refreshAllDevUI();
    showToast("📜", "All 155 Civic Upgrades Unlocked!", "Every civic upgrade and synergy is now active.");
  });

  document.getElementById("dev-reveal-all-upgrades")?.addEventListener("click", () => {
    state.revealedUpgrades = UPGRADES.map((u) => u.id);
    SoundFX.research();
    refreshAllDevUI();
  });

  document.getElementById("dev-build-all-wonders")?.addEventListener("click", () => {
    state.wonders = WONDERS.map((w) => w.id);
    SoundFX.wonder();
    refreshAllDevUI();
    showToast("🏛️", "All 9 World Wonders Erected!", "Every monumental wonder now graces your skyline.");
  });

  document.getElementById("dev-unlock-all-ach")?.addEventListener("click", () => {
    state.achievements = ACHIEVEMENTS.map((a) => a.id);
    SoundFX.achievement();
    refreshAllDevUI();
    showToast("🏆", "All 100 Achievements Unlocked!", "+100% permanent achievement bonus active.");
  });

  // 5. God-Mode Multipliers, Time Shards & World Controls
  const godBtn = document.getElementById("dev-toggle-god");
  if (godBtn) {
    godBtn.addEventListener("click", () => {
      devGodMode = !devGodMode;
      godBtn.textContent = `⚡ 1,000× God Multiplier: ${devGodMode ? "ON" : "OFF"}`;
      godBtn.classList.toggle("active-toggle", devGodMode);
      SoundFX.wonder();
      refreshAllDevUI();
    });
  }

  const critBtn = document.getElementById("dev-toggle-crit");
  if (critBtn) {
    critBtn.addEventListener("click", () => {
      devAlwaysCrit = !devAlwaysCrit;
      critBtn.textContent = `💥 100% Crit Clicks: ${devAlwaysCrit ? "ON" : "OFF"}`;
      critBtn.classList.toggle("active-toggle", devAlwaysCrit);
      SoundFX.achievement();
      refreshAllDevUI();
    });
  }

    document.getElementById("dev-add-shards-100")?.addEventListener("click", () => {
    state.shards += 100;
    SoundFX.wonder();
    refreshAllDevUI();
  });

  const immortalBtn = document.getElementById("dev-toggle-immortal");
  if (immortalBtn) {
    immortalBtn.addEventListener("click", () => {
      devImmortalMode = !devImmortalMode;
      immortalBtn.textContent = `🛡️ Collapse Immunity: ${devImmortalMode ? "ON" : "OFF"}`;
      immortalBtn.classList.toggle("active-toggle", devImmortalMode);
      SoundFX.wonder();
      refreshAllDevUI();
    });
  }

  document.getElementById("dev-restore-vitals")?.addEventListener("click", () => {
    ensureCivState();
    state.civ.food = 100;
    state.civ.happiness = 100;
    state.civ.stability = 100;
    state.civ.integrity = 100;
    state.civ.crises = {};
    SoundFX.wonder();
    refreshAllDevUI();
    showToast("💚", "Vitals Restored!", "All civic vitals at 100% and active crises cleared.");
  });

  document.getElementById("dev-cycle-season")?.addEventListener("click", () => {
    ensureCivState();
    state.civ.seasonIdx = (state.civ.seasonIdx + 1) % SEASONS.length;
    state.civ.seasonTimer = SEASONS[state.civ.seasonIdx].duration;
    SoundFX.wonder();
    refreshAllDevUI();
    showToast(SEASONS[state.civ.seasonIdx].icon, "Season Shifted!", `Now in ${SEASONS[state.civ.seasonIdx].name}`);
  });

  document.getElementById("dev-trigger-famine")?.addEventListener("click", () => {
    ensureCivState();
    state.civ.granary = 0;
    state.civ.food = 8;
    state.civ.isFamine = true;
    SoundFX.click(0);
    refreshAllDevUI();
    showToast("🌾", "Dev Famine Triggered!", "Granary emptied, citizens starving! -60% output!");
  });

  document.getElementById("dev-trigger-brownout")?.addEventListener("click", () => {
    ensureCivState();
    state.civ.gridDemand = state.civ.gridPower * 1.6;
    state.civ.isBrownout = true;
    state.civ.integrity = 18;
    SoundFX.click(0);
    refreshAllDevUI();
    showToast("⚡", "Dev Grid Brownout Triggered!", "Power load exceeded 160% capacity! -65% output!");
  });

  document.getElementById("dev-spawn-crisis")?.addEventListener("click", () => {
    spawnDistrictCrisis();
    refreshAllDevUI();
  });

  document.getElementById("dev-force-collapse")?.addEventListener("click", () => {
    triggerCivilizationCollapse("Architect God-Mode manual collapse trigger");
    refreshAllDevUI();
  });

  document.getElementById("dev-add-shards-10k")?.addEventListener("click", () => {
    state.shards += 10000;
    SoundFX.wonder();
    refreshAllDevUI();
  });

  document.getElementById("dev-spawn-anomaly")?.addEventListener("click", () => {
    spawnGoldenAnomaly();
    showToast("✨", "Golden Anomaly Spawned!", "Look over your City Panorama to catch it.");
  });

  document.getElementById("dev-cycle-time")?.addEventListener("click", () => {
    dayCyclePhase = (dayCyclePhase + 0.25) % 1;
    drawCityCanvas();
    drawAllDistrictCanvases();
  });
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
    state.upgrades = Array.isArray(parsed.upgrades) ? parsed.upgrades : [];
    state.achievements = Array.isArray(parsed.achievements) ? parsed.achievements : [];
    ensureCivState();

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

function openPrestigeModal() {
  const pending = getPendingShards();
  const currentShards = state.shards || 0;
  
  const curShardsEl = document.getElementById("prestige-current-shards");
  const curMultEl = document.getElementById("prestige-current-mult");
  const pendShardsEl = document.getElementById("prestige-pending-shards");
  const pendMultEl = document.getElementById("prestige-pending-mult");
  const confirmBtn = document.getElementById("btn-confirm-prestige");

  if (curShardsEl) curShardsEl.textContent = formatNum(currentShards);
  if (curMultEl) curMultEl.textContent = `+${currentShards * 10}% Permanent Boost`;
  
  if (pendShardsEl) pendShardsEl.textContent = `+${formatNum(pending)}`;
  if (pendMultEl) pendMultEl.textContent = `+${pending * 10}% Extra Boost`;

  if (confirmBtn) {
    if (pending <= 0) {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "⏳ Insufficient CP (Need 2.5M All-Time)";
    } else {
      confirmBtn.disabled = false;
      confirmBtn.textContent = `🌌 Transmute Realm (+${formatNum(pending)} Shards)`;
    }
  }

  document.getElementById("prestige-modal")?.classList.remove("hidden");
}

function closePrestigeModal() {
  document.getElementById("prestige-modal")?.classList.add("hidden");
}

function executePrestige() {
  const pending = getPendingShards();
  if (pending <= 0) {
    showToast("⏳", "Not Enough Timeline Energy", "Reach at least 2,500,000 all-time CP to crystallize your first Time Shard.");
    closePrestigeModal();
    return;
  }

  closePrestigeModal();

  const nextState = createDefaultState();
  nextState.cityName = state.cityName;
  nextState.allTimeCp = state.allTimeCp;
  nextState.highestEra = state.highestEra;
  nextState.totalClicks = state.totalClicks;
  nextState.totalCrits = state.totalCrits || 0;
  nextState.anomaliesClicked = state.anomaliesClicked;
  nextState.achievements = [...state.achievements];
  nextState.sfxEnabled = state.sfxEnabled;
  nextState.devUnlocked = state.devUnlocked;
  nextState.shards = state.shards + pending;
  nextState.prestiges = state.prestiges + 1;

  // Clear active timers & boosts
  boostMultiplier = 1;
  boostExpiresAt = 0;

  state = nextState;
  ensureCivState();
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
  trackGameEvent("prestige_ascend", { shards: String(state.shards), prestiges: String(state.prestiges) });
  showToast("⏳", "Time Rift Ascended!", `You now possess ${state.shards} Time Shards (+${state.shards * 10}% permanent production).`);
}

function triggerPrestige() {
  openPrestigeModal();
}

// ============================================================================
// INITIALIZATION & EVENT LISTENERS
// ============================================================================
function init() {
  registerUpgrades();
  registerAchievements();
  loadGame();
  checkProximityReveals();
  trackGameEvent("game_session_start", { era: ERAS[state.currentEra].name, prestiges: String(state.prestiges) });

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
  setupDevConsole();
  setupStrategyControls();

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
  const syncSoundUI = () => {
    if (soundBtn) soundBtn.textContent = state.sfxEnabled ? "🔊 SFX" : "🔇 OFF";
    const menuSoundLabel = document.getElementById("menu-sound-label");
    const menuSoundSub = document.getElementById("menu-sound-sub");
    const menuSoundIcon = document.getElementById("menu-sound-icon");
    if (menuSoundLabel) menuSoundLabel.textContent = state.sfxEnabled ? "Audio Effects: ON" : "Audio Effects: MUTED";
    if (menuSoundSub) menuSoundSub.textContent = state.sfxEnabled ? "Synthesized game audio: ACTIVE" : "Click to unmute sound effects";
    if (menuSoundIcon) menuSoundIcon.textContent = state.sfxEnabled ? "🔊" : "🔇";
  };
  syncSoundUI();

  soundBtn?.addEventListener("click", () => {
    state.sfxEnabled = !state.sfxEnabled;
    syncSoundUI();
    if (state.sfxEnabled) SoundFX.achievement();
    saveGame(false);
  });

  // Game Menu Modal Controls
  const gameMenuModal = document.getElementById("game-menu-modal");
  document.getElementById("btn-game-menu")?.addEventListener("click", () => {
    syncSoundUI();
    gameMenuModal?.classList.remove("hidden");
    SoundFX.click(0);
  });
  document.getElementById("btn-close-game-menu")?.addEventListener("click", () => {
    gameMenuModal?.classList.add("hidden");
    SoundFX.click(0);
  });
  document.getElementById("btn-menu-rename")?.addEventListener("click", () => {
    gameMenuModal?.classList.add("hidden");
    openCityNameModal();
  });
  document.getElementById("btn-sound-menu")?.addEventListener("click", () => {
    state.sfxEnabled = !state.sfxEnabled;
    syncSoundUI();
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

  setupCivicCouncilAndVoices();

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
      if (code.toLowerCase() === DEV_SECRET_KEYWORD) {
        modal.classList.add("hidden");
        unlockDevConsole(true);
        return;
      }
      const decoded = JSON.parse(decodeURIComponent(atob(code)));
      state = { ...createDefaultState(), ...decoded };
      state.buildings = { ...createDefaultState().buildings, ...(decoded.buildings || {}) };
      state.wonders = Array.isArray(decoded.wonders) ? decoded.wonders : [];
      state.revealedBuildings = Array.isArray(decoded.revealedBuildings) ? decoded.revealedBuildings : ["forager"];
      state.revealedUpgrades = Array.isArray(decoded.revealedUpgrades) ? decoded.revealedUpgrades : [];
      state.revealedWonders = Array.isArray(decoded.revealedWonders) ? decoded.revealedWonders : [];
      ensureCivState();
      document.querySelectorAll(".doctrine-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-doctrine") === state.doctrine);
      });
      syncSoundUI();
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
  document.getElementById("btn-menu-prestige")?.addEventListener("click", () => {
    gameMenuModal?.classList.add("hidden");
    openPrestigeModal();
  });
  document.getElementById("btn-close-prestige-modal")?.addEventListener("click", closePrestigeModal);
  document.getElementById("btn-cancel-prestige")?.addEventListener("click", closePrestigeModal);
  document.getElementById("btn-confirm-prestige")?.addEventListener("click", executePrestige);
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

    tickCivilizationStrategy(dt);
    const netRate = getNetCps();
    const netGained = netRate * dt;
    if (netGained > 0) {
      state.cp += netGained;
      state.totalCp += netGained;
      state.allTimeCp += netGained;
    } else if (netGained < 0) {
      // Negative CP/s deficit drains treasury down to 0
      state.cp = Math.max(0, state.cp + netGained);
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
      updateCivicCouncilButton();
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
    const spawnChance = hasUpgrade("sp_bonfire") ? 0.52 : 0.42;
    if (Math.random() < spawnChance) triggerGoldenAnomaly();
  }, 26000);

  setInterval(() => saveGame(false), 15000);
}

// ============================================================================
// CIVIC COUNCIL PETITIONS & CLICKABLE CITIZEN SPEECH BUBBLES
// ============================================================================
const CIVIC_PETITIONS = [
  {
    era: 0,
    avatar: "🔥",
    speaker: "Elder Kaya, Hearth-Keeper",
    prompt: "The river harvest is bountiful! Shall we light the Great Solstice Bonfire or organize a communal flint-knapping drive?",
    choiceA: "🎉 Light the Solstice Bonfire",
    choiceB: "🪨 Communal Builders' Drive"
  },
  {
    era: 1,
    avatar: "🏺",
    speaker: "Master Enki, Canal-Wright",
    prompt: "Merchant barges have arrived at the Walled Bazaar with exotic dyes and copper ingots! How shall we celebrate?",
    choiceA: "🎊 Grand Riverfront Jubilee",
    choiceB: "⚒️ Commission Guild Artisans"
  },
  {
    era: 2,
    avatar: "🏛️",
    speaker: "Senator Octavia of the Forum",
    prompt: "The public baths and marble colonnades are gleaming! Shall we declare a week of Amphitheater Games or distribute civic stipends?",
    choiceA: "🎭 Declare Amphitheater Games",
    choiceB: "🪙 Distribute Senate Stipends"
  },
  {
    era: 3,
    avatar: "🏰",
    speaker: "Guildmaster Beatrice",
    prompt: "The river watermills and town guilds have exceeded their quotas! Shall we host a Royal Charter Tournament or expand the guild treasury?",
    choiceA: "🎺 Royal Charter Tournament",
    choiceB: "📜 Guild Treasury Windfall"
  },
  {
    era: 4,
    avatar: "🎨",
    speaker: "Maestro Leonardo, Court Polymath",
    prompt: "Our Grand Canal Piazza is the envy of the world! Shall we unveil a Masquerade Carnival or auction our newest inventions?",
    choiceA: "🎭 Grand Canal Masquerade",
    choiceB: "🧭 Merchant Exchange Grant"
  },
  {
    era: 5,
    avatar: "🎩",
    speaker: "Chief Engineer Isambard",
    prompt: "Grand Central Station and the electric streetlamps are running at peak steam! Shall we host an Industrial Exposition or issue railway dividends?",
    choiceA: "🎡 Grand Steam Exposition",
    choiceB: "🚂 Railway Dividend Payout"
  },
  {
    era: 6,
    avatar: "🎙️",
    speaker: "Mayor Evelyn Vance",
    prompt: "International flights are landing every minute at our Skyport! Shall we broadcast a World Music Festival or cash in aviation bonds?",
    choiceA: "🎸 World Broadcast Festival",
    choiceB: "✈️ Skyport Bond Maturity"
  },
  {
    era: 7,
    avatar: "💻",
    speaker: "Director Kael, Smart-Grid AI",
    prompt: "Maglev corridors and downtown skyscrapers report 99.9% civic harmony! Shall we launch a Holo-Light Sky Show or harvest quantum dividends?",
    choiceA: "🌈 Holo-Light Sky Festival",
    choiceB: "💎 Quantum Dividend Surge"
  },
  {
    era: 8,
    avatar: "🌌",
    speaker: "Star-Weaver Lyra, Orbital Envoy",
    prompt: "The Neon Arcologies and Orbital Spaceports are resonating with cosmic energy! Shall we ignite a Nebula Festival or channel a Singularity Grant?",
    choiceA: "✨ Cosmic Nebula Festival",
    choiceB: "🚀 Singularity Treasury Grant"
  }
];

let councilCooldownUntil = 0;

function updateCivicCouncilButton() {
  const btn = document.getElementById("btn-civic-council");
  if (!btn) return;
  const remaining = Math.ceil((councilCooldownUntil - Date.now()) / 1000);
  if (remaining > 0) {
    btn.disabled = true;
    btn.textContent = `🎭 Council (${remaining}s)`;
  } else {
    btn.disabled = false;
    btn.textContent = "🎭 Civic Council: Ready!";
  }
}

function openCivicPetition() {
  const card = document.getElementById("civic-petition-card");
  if (!card) return;
  const pet = CIVIC_PETITIONS[state.currentEra] || CIVIC_PETITIONS[0];
  document.getElementById("petition-avatar").textContent = pet.avatar;
  document.getElementById("petition-speaker").textContent = pet.speaker;
  document.getElementById("petition-prompt").textContent = `"${pet.prompt}"`;

  const instantGrant = Math.max(35, Math.ceil(getTotalCps() * 25 + getClickPower() * 25));
  const btnA = document.getElementById("btn-petition-choice-a");
  const btnB = document.getElementById("btn-petition-choice-b");
  btnA.innerHTML = `<span>${pet.choiceA}</span><span class="petition-choice-sub">🔥 1.75× City Output + Fireworks for 35s</span>`;
  btnB.innerHTML = `<span>${pet.choiceB}</span><span class="petition-choice-sub">💰 Instant +${formatNum(instantGrant)} CP Treasury Grant</span>`;

  card.classList.remove("hidden");
  SoundFX.research();
}

function setupCivicCouncilAndVoices() {
  const councilBtn = document.getElementById("btn-civic-council");
  const card = document.getElementById("civic-petition-card");
  const dismissBtn = document.getElementById("btn-dismiss-petition");
  const btnA = document.getElementById("btn-petition-choice-a");
  const btnB = document.getElementById("btn-petition-choice-b");

  if (councilBtn) {
    councilBtn.addEventListener("click", () => {
      if (Date.now() < councilCooldownUntil) return;
      openCivicPetition();
    });
  }
  if (dismissBtn && card) {
    dismissBtn.addEventListener("click", () => {
      card.classList.add("hidden");
    });
  }
  if (btnA && card) {
    btnA.addEventListener("click", () => {
      card.classList.add("hidden");
      councilCooldownUntil = Date.now() + 45000;
      boostMultiplier = 1.75;
      boostExpiresAt = Date.now() + 35000;
      boostName = `🎉 ${ERAS[state.currentEra].short} City Festival (1.75×)`;
      for (let i = 0; i < 4; i++) {
        spawnCityFirework(120 + i * 180, 28 + (i % 2) * 25);
      }
      SoundFX.wonder();
      updateCivicCouncilButton();
      updateTopHUD();
      showToast("🎉", "City Festival Begins!", "Citizens fill the streets! 1.75× Global City Output for 35 seconds!");
    });
  }
  if (btnB && card) {
    btnB.addEventListener("click", () => {
      card.classList.add("hidden");
      councilCooldownUntil = Date.now() + 45000;
      const grant = Math.max(35, Math.ceil(getTotalCps() * 25 + getClickPower() * 25));
      state.cp += grant;
      state.totalCp += grant;
      state.allTimeCp += grant;
      spawnCityFirework(260, 42);
      spawnCityFirework(480, 36);
      SoundFX.buy();
      updateCivicCouncilButton();
      updateTopHUD();
      showToast("💰", "Civic Treasury Grant!", `Received +${formatNum(grant)} CP from the city guilds!`);
    });
  }

  // Clickable Citizen Speech Bubbles & 2.5D Isometric District Parcels on #city-canvas!
  const cityCanvas = document.getElementById("city-canvas");
  if (cityCanvas) {
    cityCanvas.addEventListener("mousemove", (e) => {
      const rect = cityCanvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      let hovered = null;
      for (let i = isoParcelHitboxes.length - 1; i >= 0; i--) {
        const hit = isoParcelHitboxes[i];
        if (cx >= hit.x && cx <= hit.x + hit.w && cy >= hit.y && cy <= hit.y + hit.h) {
          hovered = hit.bId;
          break;
        }
      }

      const overBubble = activeSpeechBubble && activeSpeechBubble.hitW &&
        cx >= activeSpeechBubble.hitX - 8 && cx <= activeSpeechBubble.hitX + activeSpeechBubble.hitW + 8 &&
        cy >= activeSpeechBubble.hitY - 8 && cy <= activeSpeechBubble.hitY + activeSpeechBubble.hitH + 8;

      if (hovered !== hoveredDistrictId) {
        hoveredDistrictId = hovered;
      }
      cityCanvas.style.cursor = (hovered || overBubble) ? "pointer" : "default";
    });

    cityCanvas.addEventListener("mouseleave", () => {
      hoveredDistrictId = null;
    });

    cityCanvas.addEventListener("click", (e) => {
      const rect = cityCanvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      // 1. Check Citizen Speech Bubble click
      if (activeSpeechBubble && activeSpeechBubble.hitW) {
        const sb = activeSpeechBubble;
        if (cx >= sb.hitX - 8 && cx <= sb.hitX + sb.hitW + 8 && cy >= sb.hitY - 8 && cy <= sb.hitY + sb.hitH + 8) {
          const bonus = Math.max(10, Math.ceil(getTotalCps() * 6 + getClickPower() * 5));
          state.cp += bonus;
          state.totalCp += bonus;
          state.allTimeCp += bonus;
          spawnCityFirework(sb.x, sb.y - 12);
          spawnFloatingText(e.clientX, e.clientY, `💬 +${formatNum(bonus)} CP`, true);
          SoundFX.achievement();
          activeSpeechBubble = null;
          nextSpeechBubbleAt = Date.now() + 5500;
          updateTopHUD();
          return;
        }
      }

      // 2. Check 2.5D Isometric District Parcel click!
      for (let i = isoParcelHitboxes.length - 1; i >= 0; i--) {
        const hit = isoParcelHitboxes[i];
        if (cx >= hit.x && cx <= hit.x + hit.w && cy >= hit.y && cy <= hit.y + hit.h) {
          const bId = hit.bId;
          const count = state.buildings[bId] || 0;
          // If active crisis: resolve immediately on click!
          if (state.civ && state.civ.crises && state.civ.crises[bId]) {
            resolveDistrictCrisis(bId, e.clientX, e.clientY);
            return;
          }
          // If unbuilt but revealed: buy directly!
          if (count <= 0) {
            buyBuilding(bId);
            return;
          }
          // Otherwise open the 2.5D District Inspector
          openDistrictInspector(bId);
          return;
        }
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", init);
