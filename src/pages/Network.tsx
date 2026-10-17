import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Factory,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  Wrench,
  Handshake,
  TrendingUp,
  ChevronRight,
  Globe,
} from "lucide-react";

import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { Seo } from "@/components/seo/Seo";
import { SiteLayout } from "@/components/site/SiteLayout";
import { marqueeCities, seoByPath } from "@/data/siteData";

/* ═══════════════════════════════════════════════════════════════════
   IMAGES — Downloaded cinematic assets
   ═══════════════════════════════════════════════════════════════════ */
import imgHero from "@/assets/downloaded/01-network-hero-cinematic.jpg";
import imgFactory from "@/assets/downloaded/02-pvc-extrusion-factory.jpg";
import imgLogistics from "@/assets/downloaded/03-logistics-freight-fleet.jpg";
import imgWarehouse from "@/assets/downloaded/04-smart-warehouse-storage.jpg";
import imgWallPanels from "@/assets/downloaded/05-architectural-wall-panels.jpg";
import imgCraftsman from "@/assets/downloaded/06-craftsman-interior-installation.jpg";
import imgPartnership from "@/assets/downloaded/07-dealers-partnership-handshake.jpg";
import imgProfiles from "@/assets/downloaded/08-upvc-window-door-profiles.jpg";
import imgQuality from "@/assets/downloaded/09-quality-testing-inspection.jpg";
import imgShowroom from "@/assets/downloaded/10-minimalist-pvc-showroom.jpg";

/* ═══════════════════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS & EASING
   Premium cubic-bezier easing matching modern design systems
   ═══════════════════════════════════════════════════════════════════ */
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: PREMIUM_EASE },
  }),
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: PREMIUM_EASE },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: PREMIUM_EASE },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

// Hero metrics
const HERO_METRICS = [
  { value: "2,500+", label: "Active Members" },
  { value: "38", label: "Districts" },
  { value: "4,200+", label: "Projects Done" },
  { value: "24/7", label: "Trade Support" },
];

// Stakeholder pillars
const ECOSYSTEM_PILLARS = [
  {
    title: "Contractors",
    count: "520+",
    tag: "Project Teams",
    icon: Compass,
    image: imgCraftsman,
    desc: "Verified interior contractors managing measurement, 3D drawings, material requisition, and customer handover.",
    checks: ["Verified Business KYC", "Direct Customer Leads", "Wholesale Pricing"],
    registerPath: "/register?role=contractor",
  },
  {
    title: "Carpenters",
    count: "1,850+",
    tag: "Master Fitters",
    icon: Wrench,
    image: imgProfiles,
    desc: "Field-tested craftsmen trained in PVC edge-banding, modular cupboard joints, and hardware calibration.",
    checks: ["Digital ID Verified", "Daily Work Queue", "Fair Wage Transparency"],
    registerPath: "/register?role=labour",
  },
  {
    title: "Dealers",
    count: "85+",
    tag: "Material Hubs",
    icon: Warehouse,
    image: imgShowroom,
    desc: "Regional showrooms and warehouse depots with ready inventory of boards, hardware, adhesives, and trims.",
    checks: ["Zero Stockout Buffer", "Direct Mill-Rate", "B2B Wholesale Access"],
    registerPath: "/register?role=dealer",
  },
  {
    title: "Manufacturers",
    count: "24+",
    tag: "Extrusion Plants",
    icon: Factory,
    image: imgFactory,
    desc: "Heavy industrial plants producing certified UV-resistant, fire-retardant, termite-proof PVC sheets and UPVC profiles.",
    checks: ["Standard Extrusion Specs", "Statewide Distribution", "Bulk Procurement"],
    registerPath: "/register?role=manufacturer",
  },
];

// Supply chain pipeline stages
const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Extrusion & Manufacturing",
    metric: "24+ Plants",
    icon: Factory,
    image: imgFactory,
    detail: "Direct industrial extrusion of lead-free, eco-friendly PVC & UPVC panels, fluted profiles, and laminated sheets.",
  },
  {
    step: "02",
    title: "Transit Freight",
    metric: "Dedicated Fleet",
    icon: Truck,
    image: imgLogistics,
    detail: "Bulk palletized freight from regional mills directly into Tamil Nadu holding yards.",
  },
  {
    step: "03",
    title: "District Depots",
    metric: "85+ Hubs",
    icon: Warehouse,
    image: imgWarehouse,
    detail: "Zero-stockout warehousing across 38 districts — contractor orders staged within 24 hours.",
  },
  {
    step: "04",
    title: "Planning & Quoting",
    metric: "520+ Teams",
    icon: Compass,
    image: imgWallPanels,
    detail: "Precision laser measurement, square-foot quotation, and engineering blueprint sign-off.",
  },
  {
    step: "05",
    title: "Master Installation",
    metric: "1,850+ Verified",
    icon: Wrench,
    image: imgCraftsman,
    detail: "Standardized joinery, invisible fastener fitment, and digital ID accountability.",
  },
];

// Partnership benefits (from AiPvcGroups)
const PARTNERSHIP_BENEFITS = [
  "20% monthly revenue share from digital operations",
  "70% earnings from freelance projects",
  "Access to a strong, ready-made network",
  "Long-term growth and stability",
];

/* ═══════════════════════════════════════════════════════════════════
   INFINITE MARQUEE COMPONENT (Clean White / Luxury-Light Theme)
   ═══════════════════════════════════════════════════════════════════ */
const InfiniteMarquee = ({
  items,
  speed = 30,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3 w-full">
      <motion.div
        className="flex gap-4 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-200/90 shadow-xs px-4 py-2 text-xs font-semibold text-neutral-800 hover:text-primary hover:border-primary/40 hover:shadow-sm transition-all duration-300"
          >
            <MapPin className="size-3 text-primary" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const AnimatedCounter = ({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
    >
      {value}
    </motion.span>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PIPELINE NODE COMPONENT — Interactive Supply Chain Step (Light Theme)
   ═══════════════════════════════════════════════════════════════════ */
const PipelineNode = ({
  stage,
  index,
  isActive,
  onClick,
}: {
  stage: (typeof PIPELINE_STAGES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = stage.icon;
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center text-center cursor-pointer group transition-all duration-300 focus:outline-none ${isActive ? "scale-105" : "opacity-70 hover:opacity-100"
        }`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Connector line between steps */}
      {index < PIPELINE_STAGES.length - 1 && (
        <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-8px)] h-px bg-gradient-to-r from-primary/30 to-neutral-200 hidden lg:block" />
      )}

      {/* Node circle */}
      <div
        className={`relative size-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${isActive
          ? "bg-primary text-white shadow-md shadow-primary/30 ring-4 ring-primary/10"
          : "bg-white border border-neutral-200 text-neutral-600 group-hover:border-primary/40 group-hover:text-primary"
          }`}
      >
        <Icon className="size-5" />
        <span
          className={`absolute -top-1.5 -right-1.5 size-5 rounded-full text-[10px] font-black flex items-center justify-center shadow-xs ${isActive ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600 border border-neutral-200"
            }`}
        >
          {stage.step}
        </span>
      </div>

      {/* Label */}
      <p
        className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-200 max-w-[110px] leading-tight ${isActive ? "text-neutral-950" : "text-neutral-500 group-hover:text-neutral-800"
          }`}
      >
        {stage.title}
      </p>
      <span
        className={`text-[10px] font-mono mt-1 font-semibold transition-colors ${isActive ? "text-primary" : "text-neutral-400"
          }`}
      >
        {stage.metric}
      </span>
    </motion.button>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN NETWORK PAGE COMPONENT (White / Luxury-Light Editorial Aesthetic)
   ═══════════════════════════════════════════════════════════════════ */
export const Network = () => {
  const seo = seoByPath["/network"] || {
    title: "Network | TN-PVC Interiors — 38 Districts, 2,500+ Members",
    description: "Tamil Nadu's premier PVC & UPVC trade ecosystem across 38 districts.",
    keywords: ["TN-PVC Network", "Tamil Nadu PVC Trade", "B2B PVC Interiors"],
  };

  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Standardized Hero Animation Engine
  useHeroAnimation(heroRef);

  const handleNetworkScrollDown = () => {
    const nextSection = document.getElementById("network-marquee") || document.getElementById("network-ecosystem");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.95,
        behavior: "smooth",
      });
    }
  };

  // Auto-cycle pipeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineStep((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SiteLayout>
      <Seo
        {...seo}
        path="/network"
        title="Network | TN-PVC Interiors — 38 Districts, 2,500+ Members"
      />

      {/* Root Container: Standard Global Background #FAF9F5 */}
      <div className="min-h-screen bg-background text-neutral-950 selection:bg-primary/20 selection:text-primary antialiased overflow-hidden">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 01 — CINEMATIC EDITORIAL HERO
            Standardized styling matching Home page with unified GSAP animation
            ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          data-hero="true"
          className="relative h-screen min-h-[620px] max-h-[1100px] w-full flex flex-col justify-between overflow-hidden bg-zinc-950 text-white select-none scroll-mt-0"
          aria-label="Network Trade Ecosystem Hero Showcase"
        >
          {/* Background Cinematic Image matching Home / About editorial style */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              data-hero-bg
              src={imgHero}
              alt="TN-PVC Statewide Connection Network"
              className="w-full h-full object-cover object-center scale-100 will-change-transform filter contrast-[1.05] brightness-[0.82]"
              loading="eager"
            />

            {/* Top Gradient for Seamless Header Blending matching Home */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85 pointer-events-none" />
            {/* Subtle Radial Vignette for Depth matching Home */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
          </div>

          {/* Ambient Brand Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/[0.12] blur-[150px] rounded-full pointer-events-none" />

          {/* ─── Top Spacer for Fixed Header matching Home ─── */}
          <div className="h-16 sm:h-20 w-full relative z-10 shrink-0" />

          {/* ─── Center / Massive Editorial Typography matching Home ─── */}
          <div className="container relative z-10 my-auto py-2 sm:py-4 flex flex-col justify-center flex-1">
            {/* Subtle Brand Badge matching Home */}
            <div data-hero-badge className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-white/90 backdrop-blur-md">
                <Sparkles className="size-3 text-white/80" />
                <span>Trade Infrastructure • 38 Districts</span>
              </span>
            </div>

            {/* Large Editorial Headline matching Home typography */}
            <div data-hero-headline className="max-w-[1300px]">
              <h1 className="font-serif font-light text-white text-[9.5vw] sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[7.2rem] tracking-tight leading-[0.92] drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                The Statewide <span className="italic font-normal">Connection</span>
                <span className="block mt-1 sm:mt-2">System.</span>
              </h1>
            </div>

            {/* Subtext matching Home */}
            <div data-hero-subtext className="mt-4 sm:mt-6 max-w-2xl">
              <p className="text-sm sm:text-base lg:text-lg font-light leading-relaxed text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                Tamil Nadu's operating trade infrastructure uniting certified extrusion mills, regional warehouse hubs, contractors, and master craftsmen.
              </p>
            </div>

            {/* CTA Pair matching Home action buttons */}
            <div data-hero-actions className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8">
              <Link
                to="/register#register-section"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/20 backdrop-blur-md shadow-sm"
              >
                <span>Join the Network</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ─── Bottom Stats Bar & Scroll Indicator matching Home ─── */}
          <div data-hero-bottom className="relative z-10 w-full border-t border-white/15 bg-gradient-to-t from-black/85 via-black/40 to-transparent backdrop-blur-[1px] pt-4 sm:pt-5 pb-6 sm:pb-8 shrink-0">
            <div className="container flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5 lg:gap-8">
              {/* 4 Editorial Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 flex-1 w-full lg:w-auto">
                {HERO_METRICS.map((metric, idx) => (
                  <div key={idx} className="flex flex-col group">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans drop-shadow-sm group-hover:text-primary-foreground/95 transition-colors">
                      <AnimatedCounter value={metric.value} />
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-white/85 leading-snug mt-1 max-w-[210px] drop-shadow-sm">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Scroll Down Action */}
              <div className="w-full lg:w-auto flex justify-end shrink-0 pt-1 lg:pt-0">
                <button
                  onClick={handleNetworkScrollDown}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-white/90 hover:text-white transition-all cursor-pointer group py-1 px-2.5 rounded-lg hover:bg-white/10"
                  aria-label="Scroll down to explore network"
                >
                  <span>Explore</span>
                  <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            DISTRICT MARQUEE — Infinite Scrolling City Badges (Light)
            ═══════════════════════════════════════════════════════════════ */}
        <section id="network-marquee" className="relative py-4 border-y border-neutral-200/80 bg-neutral-50/60 overflow-hidden">
          <InfiniteMarquee items={marqueeCities} speed={55} />
          <InfiniteMarquee items={[...marqueeCities].reverse()} speed={48} reverse />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 02 — ECOSYSTEM PILLARS (4 Stakeholder Groups)
            Light Alabaster / Cream background like Scene 01 in About.tsx
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-luxury-light text-luxury-charcoal transition-colors duration-500">
          {/* Subtle Ambient Brand Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] blur-[140px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 max-w-7xl relative z-10">
            {/* Section Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Ecosystem Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-neutral-950 leading-[1.05]">
                Four Interlocking
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Trade Pillars
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-normal">
                Connecting every node in the modern interior fabrication value chain.
              </p>
            </motion.div>

            {/* Pillar Grid — Pure White Cards with Refined Hover State */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {ECOSYSTEM_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                const isHovered = hoveredPillar === i;

                return (
                  <motion.div
                    key={pillar.title}
                    variants={i % 2 === 0 ? fadeSlideLeft : fadeSlideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    onMouseEnter={() => setHoveredPillar(i)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 cursor-pointer flex flex-col"
                  >
                    {/* Background image container */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-100">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Gradient for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Top badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                          {pillar.count} {pillar.tag}
                        </span>
                      </div>

                      {/* Bottom Title inside photo */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                        <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">
                          {pillar.title}
                        </h3>
                        <Icon className="size-5 text-white/80 group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    {/* Content below photo */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {pillar.desc}
                      </p>

                      {/* Progressive Disclosure Checklist */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                            className="overflow-hidden space-y-2 pt-2 border-t border-neutral-100"
                          >
                            {pillar.checks.map((check) => (
                              <div
                                key={check}
                                className="flex items-center gap-2 text-[11px] font-semibold text-neutral-700"
                              >
                                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                                <span>{check}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="pt-2">
                        <Link
                          to={pillar.registerPath}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-neutral-950 transition-colors group/link"
                        >
                          <span>Register Role</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 03 — FIVE-LAYER SUPPLY CHAIN PIPELINE
            Pure White canvas with interactive nodes and visual showcase
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-background border-t border-neutral-200/80 overflow-hidden">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 max-w-7xl relative z-10">
            {/* Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-14 sm:mb-16 space-y-3"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Supply Chain Operating Model
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-neutral-950 leading-[1.05]">
                Five-Layer Direct
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Production Pipeline
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto font-normal">
                Eliminating middlemen with end-to-end accountability from extrusion to installation.
              </p>
            </motion.div>

            {/* Pipeline Step Interactive Selector */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-12 sm:mb-14"
            >
              {PIPELINE_STAGES.map((stage, i) => (
                <motion.div key={stage.step} variants={fadeUp} custom={i}>
                  <PipelineNode
                    stage={stage}
                    index={i}
                    isActive={activePipelineStep === i}
                    onClick={() => setActivePipelineStep(i)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Active Stage Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePipelineStep}
                initial={{ opacity: 0, y: 18, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.45, ease: PREMIUM_EASE }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-neutral-50/70 rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-sm"
              >
                {/* Photo with stage badge */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-neutral-200">
                  <img
                    src={PIPELINE_STAGES[activePipelineStep].image}
                    alt={PIPELINE_STAGES[activePipelineStep].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating metric on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-black text-white uppercase tracking-wider">
                      Stage {PIPELINE_STAGES[activePipelineStep].step}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white bg-primary px-3 py-1 rounded-full shadow-xs">
                      {PIPELINE_STAGES[activePipelineStep].metric}
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Step {PIPELINE_STAGES[activePipelineStep].step} of 05
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
                      {PIPELINE_STAGES[activePipelineStep].title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm sm:text-base font-normal">
                      {PIPELINE_STAGES[activePipelineStep].detail}
                    </p>
                  </div>

                  {/* Progress navigation dots */}
                  <div className="flex items-center gap-2 pt-4">
                    {PIPELINE_STAGES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePipelineStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${i === activePipelineStep
                          ? "w-8 bg-primary"
                          : "w-3 bg-neutral-300 hover:bg-neutral-400"
                          }`}
                        aria-label={`Go to stage ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 04 — PARTNERSHIP TRANSPARENCY
            Consolidated from AiPvcGroups — Crisp Alabaster / Luxury-Light
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-luxury-light text-luxury-charcoal border-t border-neutral-200/80">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Column — Editorial Photo with Floating Verified Card */}
              <motion.div
                variants={fadeSlideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] shadow-xl border border-neutral-200/90">
                  <img
                    src={imgPartnership}
                    alt="Partnership Transparency"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating White Card */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 p-5 shadow-xl">
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Handshake className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight text-neutral-950">
                          Partnership Framework
                        </p>
                        <p className="text-[11px] text-neutral-500 font-medium">
                          Signed Legal Agreement & Governance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                      <ShieldCheck className="size-4" />
                      <span>Verified · Transparent · Structured Revenue Share</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column — Editorial Content & Benefits */}
              <motion.div
                variants={fadeSlideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                    <Globe className="size-3.5" />
                    Partnership Transparency
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.08] text-neutral-950">
                    Building a Structured
                    <br />
                    <span className="bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Trade Ecosystem
                    </span>
                  </h2>

                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base font-normal max-w-lg">
                    TN-PVC guarantees fair margins, reliable stock availability, and continuous project
                    referrals, creating long-term stability for every stakeholder.
                  </p>
                </div>

                {/* Benefit Cards (Crisp Pure White) */}
                <div className="space-y-3">
                  {PARTNERSHIP_BENEFITS.map((benefit, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex items-center gap-4 rounded-2xl bg-white border border-neutral-200/90 p-4 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <TrendingUp className="size-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Flow Pills */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  {["One Contact", "One Quality Standard", "Continuous Growth"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2.5">
                      <span className="inline-flex items-center rounded-full bg-white border border-neutral-200/90 px-3.5 py-1.5 text-xs font-bold text-neutral-800 uppercase tracking-wider shadow-xs">
                        {step}
                      </span>
                      {i < 2 && <ChevronRight className="size-3.5 text-neutral-400" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 05 — IMMERSIVE IMAGE GALLERY (Clean White)
            Alternating left-right architectural reveals
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-background border-t border-neutral-200/80">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 max-w-7xl space-y-16 sm:space-y-24">
            {/* Row 1: Wall Panels — Left Image, Right Text */}
            <motion.div
              variants={fadeSlideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-neutral-200/90">
                <img
                  src={imgWallPanels}
                  alt="Architectural Wall Panels"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Premium Materials
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950">
                  Architectural-Grade PVC Wall Panels
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                  UV-resistant, fire-retardant, and termite-proof panels engineered for decades of durability
                  and delivered directly from certified extrusion mills.
                </p>
              </div>
            </motion.div>

            {/* Row 2: Quality Testing — Right Image, Left Text */}
            <motion.div
              variants={fadeSlideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="space-y-3.5 lg:order-1 order-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Quality Assurance
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950">
                  Certified Testing & Inspection
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                  Every extrusion batch undergoes rigorous impact, tensile strength, and environmental
                  safety testing before entering regional wholesale distribution.
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:order-2 order-1 shadow-md border border-neutral-200/90">
                <img
                  src={imgQuality}
                  alt="Quality Testing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Row 3: Showroom — Left Image, Right Text */}
            <motion.div
              variants={fadeSlideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-neutral-200/90">
                <img
                  src={imgShowroom}
                  alt="PVC Showroom"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Dealer Network
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950">
                  Minimalist PVC Showrooms
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                  85+ dealer showrooms and warehouse depots across Tamil Nadu — offering ready inventory
                  and same-day staging for interior contractor orders.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 06 — GEOGRAPHIC COVERAGE (All 38 Districts)
            Clean Alabaster / Luxury-Light Canvas
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-luxury-light text-luxury-charcoal border-t border-neutral-200/80">
          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl relative z-10 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Geographic Reach
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-neutral-950 leading-[1.05]">
                All{" "}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  38 Districts
                </span>
                <br />Across Tamil Nadu
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                Active regional depots, verified field coordinators, and direct contractor
                coordination desks in every district.
              </p>
            </motion.div>

            {/* District Corridor Metric Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 max-w-4xl mx-auto"
            >
              {[
                { label: "Northern Corridor", count: "8", sub: "Districts" },
                { label: "Western Corridor", count: "8", sub: "Districts" },
                { label: "Central & Delta", count: "10", sub: "Districts" },
                { label: "Southern Belt", count: "12", sub: "Districts" },
              ].map((zone, i) => (
                <motion.div
                  key={zone.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl bg-white border border-neutral-200/90 p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all text-center"
                >
                  <p className="text-3xl sm:text-4xl font-black font-mono text-neutral-950">{zone.count}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">{zone.sub}</p>
                  <p className="text-xs font-bold text-primary mt-2">{zone.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Marquee Scroller */}
            <div className="mt-12 bg-white/70 py-2 rounded-2xl border border-neutral-200/80">
              <InfiniteMarquee items={marqueeCities.slice(0, 19)} speed={48} />
              <InfiniteMarquee items={marqueeCities.slice(19)} speed={42} reverse />
            </div>


          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              to="/register#register-section"
              className="group inline-flex items-center gap-2.5 rounded-full bg-neutral-950 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/25 active:scale-95"
            >
              <span>Apply for Verification</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="tel:+918870826404"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-400 shadow-xs"
            >
              <PhoneCall className="size-4" />
              <span>Direct Helpline</span>
            </a>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
};

export default Network;
