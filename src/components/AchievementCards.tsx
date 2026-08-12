import { Trophy, Users, Factory, CalendarDays } from "lucide-react";
import Container from "./Container";

const achievements = [
  {
    icon: Trophy,
    value: "10,000+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: "350+",
    label: "Workforce",
  },
  {
    icon: Factory,
    value: "5,00,000+",
    label: "Lakh Sq Ft Production\nCapacity / Month",
  },
  {
    icon: CalendarDays,
    value: "4+",
    label: "Decades of Trust &\nExperience",
  },
] as const;

export default function AchievementCards() {
  return (
    <section className="w-full bg-[#f5f5f7] py-12 md:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="flex flex-col items-center border border-gray-100 bg-white px-5 py-8 text-center"
            >
              <Icon
                className="h-7 w-7 text-[#5b176e] stroke-[1.5]"
                aria-hidden
              />
              <p className="mt-4 text-3xl font-semibold tracking-tight text-[#5b176e] sm:text-[2rem]">
                {value}
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500 leading-relaxed whitespace-pre-line">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
