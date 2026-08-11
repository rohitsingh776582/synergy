import { Award, Truck, Handshake } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "Multi-Certified",
      description: "FM, UL, BIS, ISO & More",
    },
    {
      icon: Truck,
      title: "Pan-India Dispatch",
      description: "Delivered to your site in 30 days",
    },
    {
      icon: Handshake,
      title: "End-to-End Service",
      description: "From design to installation support",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 py-8 text-center max-w-4xl mx-auto">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="mb-3.5 text-gray-900">
              <Icon className="w-8 h-8 md:w-9 md:h-9 stroke-[1.6]" />
            </div>
            <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">
              {badge.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug max-w-[180px] mx-auto">
              {badge.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
