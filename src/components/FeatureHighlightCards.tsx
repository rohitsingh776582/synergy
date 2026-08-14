import { Truck, Award, HeartHandshake } from "lucide-react";
import Container from "./Container";

const features = [
  {
    icon: Truck,
    title: "Pan-India Dispatch",
    subtitle: "Delivered to your site in 30 days",
  },
  {
    icon: Award,
    title: "Multi-Certified",
    subtitle: "FM, UL, BIS, ISO & more",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Service",
    subtitle: "From design to installation support",
  },
] as const;

export default function FeatureHighlightCards() {
  return (
    <section className="w-full border-t border-gray-200/80 bg-[#f7f5f8] py-6 md:py-8">
      <Container>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 bg-[#efe6f4] px-4 py-3.5 md:px-5 md:py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#5b176e]">
                <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#2d1b3d]">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs font-light leading-snug text-[#7a6b88]">
                  {title === "Pan-India Dispatch" ? (
                    <>
                      Delivered to your site in{" "}
                      <span className="stat-number font-bold text-black">
                        30 days
                      </span>
                    </>
                  ) : (
                    subtitle
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
