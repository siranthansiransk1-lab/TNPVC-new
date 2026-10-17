import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Share2, Check, ArrowLeft, ShieldCheck, Sparkles, Layers, Award } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import type { GalleryItemDefinition } from "./FloatingGallery";

// Gallery assets for complementary photography
import { galleryAssets } from "@/assets/gallery";
import wallPanelImg from "@/assets/wall-panel.webp";
import bentoUpvcWindow from "@/assets/bento-upvc-window.webp";
import bentoInstallation from "@/assets/bento-installation.webp";
import bentoShowroom from "@/assets/bento-showroom.webp";
import bentoPvcWall from "@/assets/bento-pvc-wall.webp";
import tvUnitsImg from "@/assets/tv-units.webp";
import capboardImg from "@/assets/capboard.webp";
import heroInteriorImg from "@/assets/hero-interior.webp";
import wallStickersImg from "@/assets/wall-stickers.webp";

// Curated complementary gallery shots for each project definition
const COMPLEMENTARY_SHOTS: Record<string, { image: string; caption: string }[]> = {
  "desert-palms": [
    { image: galleryAssets.steppedPromenade, caption: "Curved marble amphitheater adjacent to dunes" },
    { image: wallPanelImg, caption: "Tactile architectural timber grain specification" },
  ],
  "stepped-promenade": [
    { image: galleryAssets.travertinePool, caption: "Submerged travertine pool and hydraulic perimeter" },
    { image: galleryAssets.flutedVilla, caption: "Cast limestone fluting detail in natural daylight" },
  ],
  "structural-craft": [
    { image: bentoPvcWall, caption: "High-density polymer fluted profile study" },
    { image: tvUnitsImg, caption: "Integrated ambient channel joinery system" },
  ],
  "travertine-pool": [
    { image: galleryAssets.desertPalms, caption: "Contextual topography and pure mineral horizon" },
    { image: galleryAssets.circularRelief, caption: "Acoustic diffuser medallion texture study" },
  ],
  "circular-relief": [
    { image: wallPanelImg, caption: "Full fluted interior wall panelling interface" },
    { image: wallStickersImg, caption: "Dimensional water-resistant surface coating" },
  ],
  "showroom-gallery": [
    { image: heroInteriorImg, caption: "Complete minimalist living pavilion execution" },
    { image: capboardImg, caption: "Modular wardrobe and precision cabinetry integration" },
  ],
  "fluted-villa": [
    { image: galleryAssets.steppedPromenade, caption: "Civic marble terrace and geometric landscaping" },
    { image: bentoUpvcWindow, caption: "Multi-chamber soundproof UPVC window casements" },
  ],
  "pvc-wall": [
    { image: wallPanelImg, caption: "Bespoke fluted wall installation in situ" },
    { image: bentoInstallation, caption: "Certified trade alignment and laser leveling" },
  ],
  "bento-installation": [
    { image: bentoShowroom, caption: "Final showroom benchmark and client review" },
    { image: bentoUpvcWindow, caption: "EPDM weatherproofing and thermal seal calibration" },
  ],
  "upvc-windows": [
    { image: galleryAssets.flutedVilla, caption: "Frameless facade glazing and exterior pillars" },
    { image: bentoInstallation, caption: "Structural expansion anchoring and sound isolation" },
  ],
  "tv-units": [
    { image: wallPanelImg, caption: "Seamless acoustic backing and hidden cable routes" },
    { image: capboardImg, caption: "High-density scratch-resistant storage integration" },
  ],
  "modular-wardrobes": [
    { image: tvUnitsImg, caption: "Continuous architectural joinery across living zones" },
    { image: bentoPvcWall, caption: "Durable moisture-resistant substrate verification" },
  ],
  "luxury-residence": [
    { image: galleryAssets.flutedVilla, caption: "Exterior contemporary residential colonnade" },
    { image: tvUnitsImg, caption: "Integrated custom media wall with brass inlays" },
  ],
  "tactile-surfaces": [
    { image: galleryAssets.circularRelief, caption: "Organic sculpted wall medallion in natural walnut" },
    { image: wallPanelImg, caption: "Acoustic timber louver panelling coordination" },
  ],
};

interface BybangProjectSheetProps {
  item: GalleryItemDefinition;
  itemsList: GalleryItemDefinition[];
  onClose: () => void;
  onSelectNext: (nextItem: GalleryItemDefinition) => void;
}

export const BybangProjectSheet: React.FC<BybangProjectSheetProps> = ({
  item,
  itemsList,
  onClose,
  onSelectNext,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Determine current project index and next project in cycle
  const currentIndex = itemsList.findIndex((i) => i.id === item.id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextItem = itemsList[(safeIndex + 1) % itemsList.length];
  const prevItem = itemsList[(safeIndex - 1 + itemsList.length) % itemsList.length];

  const complementary = COMPLEMENTARY_SHOTS[item.id] || [
    { image: galleryAssets.flutedVilla, caption: "Architectural detail & material study" },
    { image: wallPanelImg, caption: "Crafted interior surface integration" },
  ];

  // Lock body scroll when project sheet is active
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Smooth entrance animation using GSAP
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Background fade-in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      // Sheet expansion from bottom with cubic-bezier easing
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        }
      );
    });

    return () => ctx.revert();
  }, [item.id]);

  // Graceful animated close handler
  const handleAnimatedClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (containerRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [isClosing, onClose]);

  // Keyboard navigation: Escape closes, ArrowLeft/ArrowRight navigates
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleAnimatedClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onSelectNext(nextItem);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onSelectNext(prevItem);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAnimatedClose, onSelectNext, nextItem, prevItem]);

  // Share functionality with copy feedback
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/#gallery-showcase`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {
        // Fallback
      }
    }
  };

  const formattedIndex = String(safeIndex + 1).padStart(2, "0");
  const formattedTotal = String(itemsList.length).padStart(2, "0");

  const whatsappMessage = encodeURIComponent(
    `Hi TN-PVC Interiors Team, I am interested in learning more about the "${item.title}" specification (${item.category}). Please share details on materials, pricing, and certified installation across Tamil Nadu.`
  );

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} Architectural Case Study`}
      className="fixed inset-0 z-[100] bg-neutral-950/70 backdrop-blur-md overflow-y-auto overflow-x-hidden selection:bg-neutral-900 selection:text-white will-change-transform"
      onClick={handleAnimatedClose}
    >
      {/* ─── Main Editorial Sheet (Inspired by bybang.co Case View) ─── */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative min-h-screen w-full bg-[#fbfbfa] text-neutral-900 flex flex-col will-change-transform shadow-2xl"
      >
        {/* ─── Top Architectural Sticky Navigation Header ─── */}
        <header className="sticky top-0 z-50 w-full bg-[#fbfbfa]/90 backdrop-blur-md border-b border-neutral-200/70 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between transition-colors">
          {/* Left: Brand Monogram & Case Study Archive Index */}
          <div className="flex items-center gap-3 sm:gap-4 select-none">
            <span className="size-7 sm:size-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-xs tracking-tighter">
              TN
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-neutral-900 uppercase">
                {formattedIndex} / {formattedTotal}
              </span>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <span className="hidden sm:inline font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-500 uppercase">
                ARCHITECTURAL SPECIFICATION
              </span>
            </div>
          </div>

          {/* Right: Tactile Actions (Share + Close) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              data-text-link
              className={cn(
                "group px-3 sm:px-4 py-1.5 rounded-full border text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer",
                copied
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white/80 border-neutral-300/80 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950"
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3 text-white" />
                  COPIED
                </>
              ) : (
                <>
                  <Share2 className="size-3 text-neutral-500 group-hover:text-neutral-900" />
                  SHARE
                </>
              )}
            </button>

            <button
              onClick={handleAnimatedClose}
              data-text-link
              aria-label="Close project view"
              className="px-3.5 sm:px-5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              CLOSE ✕
            </button>
          </div>
        </header>

        {/* ─── Hero Section: Massive Kinetic Title & Exhibition Media ─── */}
        <section className="relative w-full px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto flex-1">
          {/* Overlapping Kinetic Display Title */}
          <div className="relative mb-6 sm:mb-10 select-none">
            <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              {item.category} • TAMIL NADU NETWORK
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[115px] font-black uppercase tracking-tighter leading-[0.88] text-neutral-950 break-words">
              {item.title}
            </h1>
          </div>

          {/* Primary High-Impact Hero Architectural Exhibition Media */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-lg group">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="eager"
            />
            {/* Subtle Gradient & Status Tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between pointer-events-none">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                PLATE {formattedIndex} // TN-PVC SPECIFICATION
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <Sparkles className="size-3 text-white" />
                VERIFIED ARCHITECTURAL ASSET
              </span>
            </div>
          </div>

          {/* ─── Two-Column Editorial Specifications & Narrative Grid ─── */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start border-t border-neutral-200/80 pt-10 sm:pt-14">
            {/* Left Column: Architectural Specification Matrix */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 block">
                [ SPECIFICATION MATRIX ]
              </span>

              <div className="divide-y divide-neutral-200/70 border-y border-neutral-200/70 text-left">
                <div className="py-3 sm:py-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                    YEAR / ARCHIVE
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">
                    2026 // RELEASE 04
                  </span>
                </div>

                <div className="py-3 sm:py-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                    TYPOLOGY
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {item.category}
                  </span>
                </div>

                <div className="py-3 sm:py-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                    PRIMARY MATERIAL
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 text-right max-w-[220px]">
                    {item.material}
                  </span>
                </div>

                <div className="py-3 sm:py-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                    REGIONAL COVERAGE
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">
                    TAMIL NADU & PAN INDIA
                  </span>
                </div>

                <div className="py-3 sm:py-3.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                    TRADE CERTIFICATION
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    TNPVC Master Craftsmen
                  </span>
                </div>
              </div>

              {/* Material Craftsmanship Highlights */}
              <div className="p-5 rounded-2xl bg-neutral-100/70 border border-neutral-200/80 space-y-3">
                <div className="flex items-center gap-2 text-neutral-900">
                  <Layers className="size-4 text-neutral-800" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                    Engineering Characteristics
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Engineered with zero formaldehyde, water resistance, termite immunity, and acoustic dampening. Precision CNC joint profiling guarantees zero visible edge seams across commercial and residential scales.
                </p>
              </div>
            </div>

            {/* Right Column: High-Fashion Editorial Narrative & Concept */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-2">
                  [ CONCEPT & SPATIAL EXECUTION ]
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                  Crafting architectural permanence through high-density polymer innovation.
                </h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                <p>
                  {item.description}
                </p>
                <p>
                  At TN-PVC Interiors, every spatial project bridges industrial manufacturing and field execution. By connecting specialized extrusion facilities directly with certified carpenter teams, we eliminate middle friction and deliver exacting craftsmanship with durable modern finishes.
                </p>
              </div>

              {/* Direct Action Hub (WhatsApp + Trade Hub) */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/919944747377?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-text-link
                  className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  Inquire on WhatsApp // Trade Spec
                </a>

                <Link
                  to="/register#register-section"
                  onClick={onClose}
                  data-text-link
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
                >
                  <Award className="size-4" />
                  Join Guild Network
                </Link>
              </div>
            </div>
          </div>

          {/* ─── Complementary Multi-Image Exhibition (bybang.co Signature) ─── */}
          <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-neutral-200/80">
            <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-6">
              [ COMPLEMENTARY ARCHITECTURAL PERSPECTIVES ]
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {complementary.map((shot, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={shot.image}
                      alt={shot.caption}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 bg-white/95 border-t border-neutral-200/60 flex items-center justify-between">
                    <p className="text-xs font-medium text-neutral-700 leading-snug">
                      {shot.caption}
                    </p>
                    <span className="font-mono text-[10px] text-neutral-400 shrink-0 ml-3">
                      FIG. {formattedIndex}.{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Next Project Footer Bar (Seamless Continuous Browsing) ─── */}
          <div className="mt-16 sm:mt-24 pt-10 pb-16 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 select-none">
            <div className="space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-neutral-400 block">
                [ NEXT SPECIFICATION ]
              </span>
              <h4 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
                {nextItem.title}
              </h4>
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                {nextItem.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectNext(prevItem)}
                data-text-link
                className="px-4 py-3 rounded-full border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-neutral-950 font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                PREV
              </button>

              <button
                onClick={() => onSelectNext(nextItem)}
                data-text-link
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                NEXT PROJECT
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
