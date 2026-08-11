export interface Product {
  slug: string;
  name: string;
  category: "PUF Panels" | "Roofing Panels" | "Wall Panels" | "Cold Storage Panels" | "Insulated Doors";
  shortDescription: string;
  description: string;
  image: string;
  specifications: {
    thickness: string;
    density: string;
    thermalConductivity: string;
    facingMaterial: string;
    fireRating: string;
    jointType: string;
  };
  applications: string[];
  features: string[];
}

export const products: Product[] = [
  {
    slug: "puf-wall-panels",
    name: "PUF Wall Panels",
    category: "Wall Panels",
    shortDescription: "High-density polyurethane insulated wall panels with tongue-and-groove joint design for optimal thermal performance.",
    description: "Synergy PUF Wall Panels are precision-engineered sandwich panels featuring a rigid polyurethane foam core enclosed between pre-painted galvanized steel (PPGI) or stainless steel sheets. Designed for industrial factories, cleanrooms, and commercial buildings.",
    image: "/cold_storage.png",
    specifications: {
      thickness: "30mm - 150mm",
      density: "40 ± 2 kg/m³",
      thermalConductivity: "0.022 W/m.K",
      facingMaterial: "PPGI / PPGL / Stainless Steel",
      fireRating: "B2 / B1 Flame Retardant",
      jointType: "Tongue & Groove Interlocking",
    },
    applications: [
      "Industrial Factory Enclosures",
      "Pharmaceutical Cleanrooms",
      "Food Processing Facilities",
      "Commercial Building Cladding",
    ],
    features: [
      "Superior thermal insulation value",
      "Zero moisture absorption rate",
      "Quick and modular interlocking assembly",
      "High aesthetic pre-finished appearance",
    ],
  },
  {
    slug: "puf-roof-panels",
    name: "Insulated PUF Roofing Panels",
    category: "Roofing Panels",
    shortDescription: "Trapezoidal metallic roofing panels with continuous PUF foam core for leak-proof weather protection.",
    description: "Engineered specifically for large-span industrial and commercial roofs, Synergy PUF Roofing Panels combine structural strength with extreme heat insulation. The crest profile ensures efficient rainwater drainage while eliminating thermal bridges.",
    image: "/puf_roof_panel.png",
    specifications: {
      thickness: "30mm - 100mm",
      density: "40 ± 2 kg/m³",
      thermalConductivity: "0.023 W/m.K",
      facingMaterial: "Pre-coated Steel / Aluminium",
      fireRating: "B2 Class",
      jointType: "Overlapping Rib Joint",
    },
    applications: [
      "Warehouse Roofing",
      "Manufacturing Plants",
      "Logistics Hubs",
      "Sports Arenas & Hangers",
    ],
    features: [
      "High load-bearing capacity",
      "Solar reflection & heat barrier",
      "Built-in weather-tight seal",
      "Drastic reduction in HVAC energy consumption",
    ],
  },
  {
    slug: "cold-storage-panels",
    name: "Cold Storage Insulation Panels",
    category: "Cold Storage Panels",
    shortDescription: "Ultra-thick PUF panels specifically built for blast freezers, cold rooms, and controlled atmosphere stores.",
    description: "Designed to maintain operating temperatures from -40°C to +15°C, our Cold Storage Panels utilize cam-lock and tongue-and-groove jointing to prevent thermal bridging and vapor transmission.",
    image: "/puf_panel_stack.png",
    specifications: {
      thickness: "60mm - 200mm",
      density: "40 - 45 kg/m³",
      thermalConductivity: "0.020 W/m.K",
      facingMaterial: "SS 304 / Food-Grade PPGI",
      fireRating: "B1 Self-Extinguishing",
      jointType: "Cam-Lock & Dual Gasket",
    },
    applications: [
      "Blast Freezers & Chillers",
      "Pharma Cold Warehouses",
      "Dairy & Meat Processing Stores",
      "Horticulture Atmosphere Storage",
    ],
    features: [
      "Extreme thermal barrier down to -40°C",
      "Food-grade hygienic surface finish",
      "Hermetically sealed cam-lock joints",
      "Low life-cycle operational cost",
    ],
  },
  {
    slug: "cleanroom-panels",
    name: "Modular Cleanroom Panels",
    category: "PUF Panels",
    shortDescription: "Flush surface antibacterial insulated panels compliant with US-FDA and GMP cleanroom standards.",
    description: "Synergy Modular Cleanroom Panels provide a completely smooth, flush surface that prevents dust accumulation and accommodates integrated HEPA filters, air risers, and flush doors.",
    image: "/cleanroom_panel.png",
    specifications: {
      thickness: "50mm - 100mm",
      density: "40 ± 2 kg/m³",
      thermalConductivity: "0.022 W/m.K",
      facingMaterial: "Antimicrobial Powder Coated GI",
      fireRating: "Class O / B1",
      jointType: "Flush Aluminium / Silicone Joint",
    },
    applications: [
      "Biotech & Pharma Labs",
      "Electronic Chip Manufacturing",
      "Surgical Operation Theatres",
      "High-Precision Optics Manufacturing",
    ],
    features: [
      "Zero particle retention design",
      "Resistant to chemical cleaning agents",
      "Flush view glass & door integration",
      "Acoustic damping performance",
    ],
  },
  {
    slug: "insulated-doors",
    name: "Heavy-Duty Insulated Cold Doors",
    category: "Insulated Doors",
    shortDescription: "Hinged and sliding insulated doors engineered for cold rooms, chillers, and industrial cleanrooms.",
    description: "Our range of hinged, sliding, and vertical lift insulated doors feature high-density PUF cores, heavy-duty stainless steel hinges, and heated gasket frames to prevent frost formation.",
    image: "/puf_factory.png",
    specifications: {
      thickness: "80mm - 150mm",
      density: "42 kg/m³",
      thermalConductivity: "0.021 W/m.K",
      facingMaterial: "Stainless Steel / Anodized Aluminium",
      fireRating: "B2 Rated",
      jointType: "Magnetic & Heated Perimeter Gasket",
    },
    applications: [
      "Walk-in Freezers",
      "Distribution Centers",
      "Cleanroom Airlocks",
      "Food Processing Plant Access",
    ],
    features: [
      "Internal safety release mechanism",
      "Automated sliding options",
      "Heated frame elements to prevent icing",
      "Impact resistant kickplates",
    ],
  },
];
