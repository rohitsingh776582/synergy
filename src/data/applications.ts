export interface Application {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
  recommendedPanels: string[];
}

export const applications: Application[] = [
  {
    slug: "cold-storage-and-blast-freezers",
    title: "Cold Storage & Blast Freezers",
    category: "Temperature Controlled Storage",
    shortDescription: "Precision insulated panels engineered for refrigerated logistics, chillers, and deep freezers.",
    description: "Maintaining strict thermal isolation is essential for perishable food, vaccines, and chemicals. Synergy PUF panels ensure constant low temperatures from -40°C to +15°C with minimal energy loss.",
    image: "/cold_storage.png",
    benefits: [
      "Up to 40% reduction in refrigeration compressor energy",
      "Vapor-tight tongue-and-groove joint sealing",
      "Custom thickness options up to 200mm",
      "Conforms to International Cold Chain Standards",
    ],
    recommendedPanels: [
      "Cold Storage PUF Panels (100mm - 150mm)",
      "Heated Frame Insulated Sliding Doors",
      "High Density Floor Insulation Sheets",
    ],
  },
  {
    slug: "pharmaceutical-and-cleanrooms",
    title: "Pharmaceutical Cleanrooms",
    category: "Healthcare & Biotech",
    shortDescription: "Hygienic flush-mount wall and ceiling systems compliant with WHO-GMP cleanroom standards.",
    description: "Pharma cleanrooms require non-porous, smooth, and jointless enclosures that withstand continuous chemical sterilization while maintaining negative or positive air pressure.",
    image: "/cleanroom_panel.png",
    benefits: [
      "Flush surfaces eliminate particle traps",
      "Antimicrobial pre-coated sheet option",
      "Compatible with H2O2 decontamination gas",
      "Seamless integration of HEPA filter cutouts",
    ],
    recommendedPanels: [
      "Modular Cleanroom PUF Panels (50mm)",
      "Flush Double-Glazed View Panels",
      "Hermetic Cleanroom Airlock Doors",
    ],
  },
  {
    slug: "warehouses-and-factories",
    title: "Industrial Warehouses & Factories",
    category: "Industrial Construction",
    shortDescription: "High-strength insulated wall cladding and roofing systems for large footprint industrial buildings.",
    description: "Protect large industrial spaces from harsh ambient heat, rain noise, and structural wear with Synergy double-skin insulated roof and wall paneling.",
    image: "/puf_roof_panel.png",
    benefits: [
      "Rapid modular assembly saves up to 50% construction time",
      "High solar reflectance keeps indoor spaces cool",
      "Long span capability reduces structural steel framework requirements",
      "Fire retardant foam core for enhanced safety",
    ],
    recommendedPanels: [
      "Insulated PUF Roofing Panels (30mm - 50mm)",
      "External Wall Cladding PUF Sheets",
      "Polycarbonate Daylighting Ridge Panels",
    ],
  },
  {
    slug: "food-processing-plants",
    title: "Food & Beverage Processing",
    category: "Food Safety & Processing",
    shortDescription: "Washdown-grade hygienic insulated enclosures for dairy, meat, seafood, and bakery units.",
    description: "Food safety mandates easy-to-clean walls and ceilings that resist moisture, grease, and biological growth. Our panels feature food-grade coatings or SS 304 facings.",
    image: "/puf_factory.png",
    benefits: [
      "Hygienic food-grade certification",
      "Corrosion-proof under high humidity conditions",
      "Seamless pest & insect barrier",
      "Durable against daily pressurized water washdowns",
    ],
    recommendedPanels: [
      "Stainless Steel 304 PUF Wall Panels",
      "Coved Hygienic Corner Trims",
      "Rapid Roll Thermal Insulated Shutters",
    ],
  },
];
