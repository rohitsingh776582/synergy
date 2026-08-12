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
    <section className="w-full bg-white py-12 md:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-[#f3eaf7] px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#5b176e]">
                <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#2d1b3d] sm:text-[15px]">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs font-light text-[#7a6b88] sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
