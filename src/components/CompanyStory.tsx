"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const textCol = textColRef.current;
    if (!section || !image || !textCol) return;

    const ctx = gsap.context(() => {
      const textElements = textCol.querySelectorAll("h2, p");

      gsap.set(image, { opacity: 0, y: 35, filter: "blur(12px)" });
      gsap.set(textElements, { opacity: 0, y: 35 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(
        image,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        textElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "none",
        },
        0.15
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
            tl.progress(maxProgress);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-14 md:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
              <div
                ref={imageRef}
                className="absolute inset-0 will-change-[filter,transform]"
              >
                <Image
                  src="/puf_factory.png"
                  alt="Synergy PUF Automated Factory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div ref={textColRef} className="lg:col-span-6">
            <div className="mb-5 max-w-xl">
              <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-gray-900 sm:text-4xl">
                Engineered for Precision, Built for Durability.
              </h2>
              <p className="mt-3 text-base font-light leading-relaxed text-gray-600">
                Synergy PUF was established to bridge the gap between heavy
                industrial construction and modern energy-efficient insulation
                standards.
              </p>
            </div>
            <div className="max-w-xl space-y-3 text-sm leading-relaxed text-gray-600 md:text-[15px]">
              <p>
                From humble beginnings as an industrial supplier, Synergy PUF
                has evolved into a premier pan-India manufacturer equipped with
                automated continuous PUF sandwich panel foaming lines.
              </p>
              <p>
                Our high-density polyurethane core technology guarantees minimum
                thermal bridge transmission, flame-retardant B1/B2 fire safety,
                and exceptional structural load ratings required by large-span
                cold logistics and pharmaceutical cleanroom installations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
