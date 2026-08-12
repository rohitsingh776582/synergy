import Container from "./Container";

const avatars = [
  { initials: "AK", tone: "bg-[#d6d3d1]" },
  { initials: "RS", tone: "bg-[#a8a29e]" },
  { initials: "PM", tone: "bg-[#78716c]" },
  { initials: "NJ", tone: "bg-[#57534e]" },
  { initials: "VK", tone: "bg-[#44403c]" },
] as const;

const partners = [
  {
    name: "Luminary",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M7 12a5 5 0 0 1 5-5M17 12a5 5 0 0 1-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "45 Degrees°",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M7 17 17 7M10 7h7v7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Codecraft_",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <rect x="3.5" y="8.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="11.5" y="4.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Frequency",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 16c2.5-4 4.5-6 8-6s5.5 2 8 6M6.5 12.5c1.8-2.8 3.4-4 5.5-4s3.7 1.2 5.5 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Northline",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 3v18M8 8l4-4 4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Vertex Labs",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 4 4 19h16L12 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Aether Co",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Blueprint",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 7h16M4 12h10M4 17h13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

function PartnerRow({ suffix = "" }: { suffix?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-10 sm:gap-12 lg:gap-14 pr-10 sm:pr-12 lg:pr-14">
      {partners.map((partner) => (
        <div
          key={`${partner.name}${suffix}`}
          className="flex shrink-0 items-center gap-2 text-gray-800"
        >
          <span className="text-gray-700">{partner.icon}</span>
          <span className="whitespace-nowrap text-sm font-normal tracking-tight sm:text-[15px]">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      className="relative z-10 w-full border-y border-gray-200"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <Container>
        <div className="flex items-center gap-6 py-8 sm:gap-8 lg:gap-10 lg:py-10">
          {/* Happy clients — stays fixed */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="flex items-center -space-x-2.5">
              {avatars.map((avatar) => (
                <div
                  key={avatar.initials}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-normal text-white sm:h-10 sm:w-10 ${avatar.tone}`}
                  aria-hidden
                >
                  {avatar.initials}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0.5 text-black" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
                    <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77 5.3 15.96l.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-light text-gray-500 sm:text-sm">99+ Happy clients</p>
            </div>
          </div>

          {/* Logos marquee — continuous from right */}
          <div className="trusted-marquee relative min-w-0 flex-1 overflow-hidden">
            <div className="trusted-marquee-track flex w-max">
              <PartnerRow />
              <PartnerRow suffix="-dup" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
