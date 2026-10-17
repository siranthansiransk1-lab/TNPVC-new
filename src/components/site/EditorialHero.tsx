import React, { useState, useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { cn } from "@/lib/utils";

interface Metric {
  value: string;
  label: string;
  sublabel?: string;
}

const METRICS_EDITORIAL: Metric[] = [
  {
    value: "600+",
    label: "Happy Homes",
    sublabel: "Across India",
  },
  {
    value: "250+",
    label: "Commercial Projects",
    sublabel: "Delivered",
  },
  {
    value: "90%",
    label: "Customer Satisfaction",
    sublabel: "Rate",
  },
  {
    value: "100+",
    label: "Dealers & Partners",
    sublabel: "Pan India",
  },
];

export const EditorialHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Hook up standardized GSAP hero animation
  useHeroAnimation(containerRef);

  const handleScrollDown = () => {
    const gallerySection = document.getElementById("gallery-showcase") || document.querySelector("[data-gallery-container]");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.95,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      data-hero="true"
      className="relative h-screen min-h-[620px] max-h-[1100px] w-full flex flex-col justify-between overflow-hidden bg-zinc-950 text-white select-none"
      aria-label="Editorial Hero Showcase"
    >
      {/* ─── Background Cinematic Image ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          data-hero-bg
          src="/images/hero-luxury-interior.jpg"
          alt="Luxury Interior Architecture - TN-PVC Interiors"
          className="w-full h-full object-cover object-center scale-100 will-change-transform"
          loading="eager"
        />
        {/* Top Gradient for Seamless Header Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none" />
        {/* Subtle Radial Vignette for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
      </div>

      {/* ─── Top Spacer for Fixed Header ─── */}
      <div className="h-16 sm:h-20 w-full relative z-10 shrink-0" />

      {/* ─── Center / Massive Editorial Typography ─── */}
      <div className="container relative z-10 my-auto py-2 sm:py-4 flex flex-col justify-center flex-1">
        {/* Subtle Brand Badge */}
        <div data-hero-badge className="mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-white/90 backdrop-blur-md">
            <Sparkles className="size-3 text-white/80" />
            <span>TN-PVC Interiors • Pan India</span>
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div data-hero-headline className="max-w-[1300px]">
          <h1 className="font-serif font-light text-white text-[9.5vw] sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[7.2rem] tracking-tight leading-[0.92] drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            Modern Spaces, <span className="italic font-normal">Better</span>
            <span className="block mt-1 sm:mt-2">Living.</span>
          </h1>
          <p
            data-hero-subtext
            className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl font-normal leading-relaxed drop-shadow-md"
          >
            High-quality PVC interiors for homes, offices and commercial spaces — across India.
          </p>
        </div>
      </div>

      {/* ─── Bottom Stats Bar & Scroll Indicator ─── */}
      <div data-hero-bottom className="relative z-10 w-full border-t border-white/15 bg-gradient-to-t from-black/85 via-black/40 to-transparent backdrop-blur-[1px] pt-4 sm:pt-5 pb-6 sm:pb-8 shrink-0">
        <div className="container flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 lg:gap-8">
          {/* 4 Editorial Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 flex-1 w-full lg:w-auto">
            {METRICS_EDITORIAL.map((metric, idx) => (
              <div key={idx} className="flex flex-col group">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans drop-shadow-sm group-hover:text-primary-foreground/95 transition-colors">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-white/90 leading-snug mt-1 max-w-[210px] drop-shadow-sm">
                  {metric.label}
                </span>
                {metric.sublabel && (
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/65 leading-tight tracking-wide mt-0.5">
                    {metric.sublabel}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Scroll Down Action */}
          <div className="w-full lg:w-auto flex justify-end shrink-0 pt-1 lg:pt-0">
            <button
              onClick={handleScrollDown}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-white/90 hover:text-white transition-all cursor-pointer group py-1 px-2.5 rounded-lg hover:bg-white/10"
              aria-label="Scroll down to explore gallery"
            >
              <span>Scroll</span>
              <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
