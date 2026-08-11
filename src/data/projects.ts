export interface Project {
  slug: string;
  name: string;
  client: string;
  location: string;
  industry: string;
  areaInstalled: string;
  completionYear: string;
  shortDescription: string;
  description: string;
  image: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: "noida-cold-storage-hub",
    name: "Mega Cold Chain Hub",
    client: "Apex Cold Chain Logistics",
    location: "Noida, Uttar Pradesh",
    industry: "Cold Storage & Logistics",
    areaInstalled: "120,000 Sq. Ft.",
    completionYear: "2025",
    shortDescription: "Turnkey supply and installation of 150mm cam-lock PUF panels for a multi-temperature distribution facility.",
    description: "Synergy PUF engineered and installed high-density insulated wall and ceiling panels for Apex Cold Chain Hub. The facility houses 6 distinct temperature zones ranging from ambient (+15°C) down to deep blast freezer (-35°C).",
    image: "/cold_storage.png",
    highlights: [
      "Zero thermal bridge installation",
      "Completed 15 days ahead of schedule",
      "Cut client HVAC operating costs by 32%",
      "US-FDA food grade compliant finish",
    ],
  },
  {
    slug: "hyderabad-pharma-cleanroom",
    name: "Sterile Pharma Manufacturing Plant",
    client: "BioMed Pharma Pvt Ltd",
    location: "Hyderabad, Telangana",
    industry: "Pharmaceutical",
    areaInstalled: "65,000 Sq. Ft.",
    completionYear: "2024",
    shortDescription: "Custom modular cleanroom panels with flush window integration for Class 10,000 cleanroom spaces.",
    description: "Designed for high-potency sterile injectable manufacturing, Synergy supplied antibacterial ceiling and wall panels along with integrated flush view panels and air-tight airlocks.",
    image: "/cleanroom_panel.png",
    highlights: [
      "Passed all US-FDA & WHO-GMP audits",
      "Flush joint sealed with medical silicone",
      "Zero dust accumulation design",
      "Integrated air return risers",
    ],
  },
  {
    slug: "gurugram-auto-warehouse",
    name: "Automotive Assembly Warehouse Roof",
    client: "SteelCraft Infra & Auto",
    location: "Gurugram, Haryana",
    industry: "Manufacturing & Warehousing",
    areaInstalled: "180,000 Sq. Ft.",
    completionYear: "2025",
    shortDescription: "Supply of 50mm trapezoidal PUF insulated metal roof sheets for solar-integrated factory roof.",
    description: "To combat severe summer heat gain in northern India, SteelCraft selected Synergy PUF trapezoidal roofing panels. The high-reflectance pre-painted steel exterior combined with PUF core maintained comfortable indoor worker temperatures.",
    image: "/puf_roof_panel.png",
    highlights: [
      "High roof load-bearing capacity",
      "Seamless solar panel mounting brackets",
      "100% leak-proof lap joint engineering",
      "Extreme thermal comfort for 1,200+ workers",
    ],
  },
  {
    slug: "bengaluru-food-processing",
    name: "Dairy & Frozen Food Processing Facility",
    client: "FreshFields Dairy Foods",
    location: "Bengaluru, Karnataka",
    industry: "Food Processing",
    areaInstalled: "85,000 Sq. Ft.",
    completionYear: "2024",
    shortDescription: "Food-grade stainless steel faced PUF wall panels for automated milk and ice-cream processing units.",
    description: "Synergy delivered SS 304 food-grade PUF sandwich panels for automated processing chambers requiring daily chemical washdown and strict temperature regulation.",
    image: "/puf_factory.png",
    highlights: [
      "SS 304 corrosion resistant surface",
      "High resistance to steam and organic acids",
      "Integrated insulated doors and rapid roll shutters",
      "Certified non-toxic & odor-free core",
    ],
  },
];
