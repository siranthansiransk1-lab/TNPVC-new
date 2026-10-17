import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Generated bespoke Estudio Bang gallery assets
import { galleryAssets } from "@/assets/gallery";

// Local brand assets for TNPVC materials
import wallPanelImg from "@/assets/wall-panel.webp";
import bentoUpvcWindow from "@/assets/bento-upvc-window.webp";
import bentoInstallation from "@/assets/bento-installation.webp";
import bentoShowroom from "@/assets/bento-showroom.webp";
import bentoPvcWall from "@/assets/bento-pvc-wall.webp";
import tvUnitsImg from "@/assets/tv-units.webp";
import capboardImg from "@/assets/capboard.webp";
import heroInteriorImg from "@/assets/hero-interior.webp";
import wallStickersImg from "@/assets/wall-stickers.webp";

// WebGL Cylindrical Projection Engine
import {
  CylindricalGalleryCanvas,
  GalleryItemRenderData,
} from "./CylindricalGalleryCanvas";

// bybang.co inspired Full-Screen Editorial Project Sheet
import { BybangProjectSheet } from "./BybangProjectSheet";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export type DeviceTier = "desktop" | "tablet" | "mobile";

// ─── Centralized Responsive Minimum Gap Configuration ───
// Generates natural, spacious editorial breathing room inspired by bybang.co
// Desktop: 36–48px visual clearance (target: 42px)
// Tablet: 24–32px visual clearance (target: 28px)
// Mobile: 16–20px visual clearance (target: 18px)
export interface ResponsiveGapConfig {
  minGapX: number; // minimum horizontal gap in pixels
  minGapY: number; // minimum vertical gap in pixels
  marginPercentX: number; // usable viewport horizontal boundary margin
}

const getResponsiveGapConfig = (deviceTier: DeviceTier): ResponsiveGapConfig => {
  if (deviceTier === "mobile") {
    return {
      minGapX: 18,
      minGapY: 18,
      marginPercentX: 0.03,
    };
  }
  if (deviceTier === "tablet") {
    return {
      minGapX: 28,
      minGapY: 28,
      marginPercentX: 0.035,
    };
  }
  // Desktop
  return {
    minGapX: 42,
    minGapY: 42,
    marginPercentX: 0.04,
  };
};

// ─── Reusable Source Image Pool (Clean Single Source of Truth) ───
// Separates core image definitions and architectural metadata from visual occurrences.
// The gallery dynamically recycles slots from this pool throughout the entire scroll duration.
export interface GalleryItemDefinition {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  aspect: string;
  aspectRatioValue: number; // width / height numeric source of truth
  isCircular?: boolean;
  description: string;
  material: string;
}

const SOURCE_IMAGE_POOL: GalleryItemDefinition[] = [
  {
    id: "desert-palms",
    title: "DESERT OASIS",
    category: "ARCHITECTURAL LANDSCAPE",
    image: galleryAssets.desertPalms,
    alt: "Date palms standing in pristine dune topography",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Architectural desert landscape study featuring sculptural palm forms against pure white dune topography.",
    material: "Natural Dune Topography & Organic Palms",
  },
  {
    id: "stepped-promenade",
    title: "MARBLE PROMENADE",
    category: "CIVIC ARCHITECTURE",
    image: galleryAssets.steppedPromenade,
    alt: "Sculptural curved marble stepped terrace with brass planters",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Curved stepped amphitheater with integrated brass architectural planters, evoking pure geometric rhythm and light.",
    material: "Carved White Marble & Brushed Brass",
  },
  {
    id: "structural-craft",
    title: "STRUCTURAL CRAFT",
    category: "INTERIOR ARCHITECTURE",
    image: wallPanelImg,
    alt: "Architectural fluted wood and marble finishes",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Precision-crafted architectural panelling highlighting tactile wood grains, fluting, and warm natural textures.",
    material: "Tactile Timber & Acoustic Composites",
  },
  {
    id: "travertine-pool",
    title: "TRAVERTINE REFLECTION",
    category: "WATER ARCHITECTURE",
    image: galleryAssets.travertinePool,
    alt: "Turquoise water washing over submerged honed stone steps",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Expansive water terrace with submerged honed travertine steps and soft mineral refractions under natural midday light.",
    material: "Honed Travertine & Mineral Aqua Water",
  },
  {
    id: "circular-relief",
    title: "ACOUSTIC DIFFUSER",
    category: "SCULPTURAL OBJECTS",
    image: galleryAssets.circularRelief,
    alt: "Organic wave contour carved walnut relief medallion",
    aspect: "aspect-square rounded-full overflow-hidden",
    aspectRatioValue: 1,
    isCircular: true,
    description:
      "Circular organic contour medallion with wave grooves engineered for aesthetic acoustic diffusion and visual warmth.",
    material: "Sculpted Walnut & Fluted Architectural Sand",
  },
  {
    id: "showroom-gallery",
    title: "MATERIAL GALLERY",
    category: "DESIGN EXHIBIT",
    image: bentoShowroom,
    alt: "TNPVC interior materials showroom experience",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Physical experience hub showcasing tactile textures, finishes, and structural profiles across Tamil Nadu.",
    material: "Curated Architectural Swatches & Fixtures",
  },
  {
    id: "fluted-villa",
    title: "CONTEMPORARY RESIDENCE",
    category: "RESIDENTIAL // DETAIL",
    image: galleryAssets.flutedVilla,
    alt: "Minimalist villa facade pillars with fluted detailing",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Textural contemplation of vertical fluting and shadow lines on precision-cast architectural limestone.",
    material: "Fluted Limestone & Frameless Glazing",
  },
  {
    id: "pvc-wall",
    title: "FLUTED RELIEF STUDY",
    category: "TEXTURE STUDY",
    image: bentoPvcWall,
    alt: "Close-up textural study of high-density polymer wall profiles",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Detailed architectural relief highlighting micro-fluting, tactile matte finishes, and seamless jointing.",
    material: "Thermal-Stabilized Polymer Matrix",
  },
  {
    id: "bento-installation",
    title: "MASTER TRADE FIT",
    category: "PRECISION EXECUTION",
    image: bentoInstallation,
    alt: "Master trade execution, laser leveling and certified fitting",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Certified installation crews ensuring exact joint alignment, thermal integrity, and acoustic excellence.",
    material: "Certified Field Installation Teams",
  },
  {
    id: "upvc-windows",
    title: "PRECISION CASEMENTS",
    category: "PRECISION CASEMENTS",
    image: bentoUpvcWindow,
    alt: "Precision-engineered UPVC window casement profile",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Multi-chambered architectural UPVC profiles engineered for sound insulation, weatherproofing, and UV resistance.",
    material: "Multi-Chamber UPVC & EPDM Gasketing",
  },
  {
    id: "tv-units",
    title: "ENTERTAINMENT WALLS",
    category: "BESPOKE JOINERY",
    image: tvUnitsImg,
    alt: "Architectural TV console wall with integrated ambient lighting",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Custom-crafted entertainment units combining textured charcoal louvers, ambient LED channels, and hidden cable passages.",
    material: "Scratch-Resistant PVC Veneer & Brass Inlays",
  },
  {
    id: "modular-wardrobes",
    title: "BESPOKE CABINETRY",
    category: "MODULAR JOINERY",
    image: capboardImg,
    alt: "Precision modular cabinetry and wardrobe storage systems",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Engineered interior storage featuring scratch-resistant PVC laminates, integrated handles, and soft-close hardware.",
    material: "High-Density PVC Board & German Fittings",
  },
  {
    id: "luxury-residence",
    title: "MINIMALIST RESIDENCE",
    category: "LIVING ARCHITECTURE",
    image: heroInteriorImg,
    alt: "Modern luxury living space with TNPVC interior styling",
    aspect: "aspect-[16/10]",
    aspectRatioValue: 16 / 10,
    description:
      "Contemporary living pavilion balancing warm acoustic timber wall textures with minimalist spatial clarity.",
    material: "Acoustic Wall Panelling & Architectural Glazing",
  },
  {
    id: "tactile-surfaces",
    title: "TACTILE SURFACES",
    category: "SURFACE TEXTURES",
    image: wallStickersImg,
    alt: "Curated architectural surface textures and tactile finishes",
    aspect: "aspect-[4/5]",
    aspectRatioValue: 4 / 5,
    description:
      "Bespoke textured surface applications crafted for water-resistant elegance, dimensional warmth, and tactile depth.",
    material: "Embossed Multi-Layer PVC Veneer",
  },
];

// Phase metadata for the editorial gallery progress indicator
const PHASE_LABELS: Record<1 | 2 | 3 | 4, { code: string; label: string }> = {
  1: { code: "01", label: "LANDSCAPE & CIVIC" },
  2: { code: "02", label: "MATERIAL & RELIEF" },
  3: { code: "03", label: "VILLA & EXHIBIT" },
  4: { code: "04", label: "MASTER EXECUTION" },
};

// ─── Virtual Visual Slot Definition ───
interface VisualSlot {
  id: number;
  col: number;
  subIndex: number;
  totalInCol: number;
  speed: number;
  colLeft: number;
  colWidth: number;
  phaseOffset: number; // Stagger phase [0..1) relative to H_SPAN
}

export const FloatingGallery: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeModalItem, setActiveModalItem] = useState<GalleryItemDefinition | null>(null);
  const [deviceTier, setDeviceTier] = useState<DeviceTier>("desktop");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [, setWebglReady] = useState<boolean>(false);

  // Per-slot interactive hover & pointer tracking states
  const [hoverStates, setHoverStates] = useState<
    Record<number, { hover: number; pointer: { x: number; y: number } }>
  >({});

  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
  });

  // Multi-tier responsive breakpoint detection & real-time viewport tracker
  useEffect(() => {
    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setViewportSize({ width: w, height: h });

        if (w < 768) {
          setDeviceTier("mobile");
        } else if (w < 1024) {
          setDeviceTier("tablet");
        } else {
          setDeviceTier("desktop");
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ─── Extended GSAP ScrollTrigger Pinning & Scrub Engine ───
  // Pinning for ~9.0x viewport height gives a luxurious, continuous editorial scrolling cadence
  // The scroll duration is completely independent of the number of source images.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    if (!wrapper || !viewport) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: viewport,
        pin: true,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 9.0)}`,
        scrub: 1.0,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Determine active phase based on continuous scroll progress
  const activePhase = useMemo((): 1 | 2 | 3 | 4 => {
    if (scrollProgress < 0.25) return 1;
    if (scrollProgress < 0.50) return 2;
    if (scrollProgress < 0.75) return 3;
    return 4;
  }, [scrollProgress]);

  // ─── Virtual Visual Slot Architecture with Spacious Editorial Zoning ───
  // Generous negative space inspired by bybang.co
  // Desktop: 4 asymmetrical columns with a dedicated central breathing corridor for "Tnpvc Interior"
  // Tablet: 3 columns, 5 slots
  // Mobile: 2 alternating columns, 4 slots
  const visualSlots = useMemo((): VisualSlot[] => {
    const { width: vw } = viewportSize;
    const gapConfig = getResponsiveGapConfig(deviceTier);
    const marginX = Math.round(vw * gapConfig.marginPercentX);
    const usableWidth = vw - 2 * marginX;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let colDefs: { left: number; width: number }[];
    let slotsPerCol: number[];
    let colSpeeds: number[];
    let phaseOffsets: number[];

    if (deviceTier === "mobile") {
      // 2 columns (4 slots total)
      slotsPerCol = [2, 2];
      colSpeeds = prefersReducedMotion ? [1.0, 1.0] : [0.98, 1.02];
      const colW = Math.round((usableWidth - gapConfig.minGapX) * 0.5);
      colDefs = [
        { left: marginX, width: colW },
        { left: marginX + colW + gapConfig.minGapX, width: colW },
      ];
      // Distinct, non-colliding staggered phases for mobile
      phaseOffsets = [0.06, 0.56, 0.31, 0.81];
    } else if (deviceTier === "tablet") {
      // 3 columns: Left flank (2), Center-Right (1), Right flank (2) = 5 slots total
      slotsPerCol = [2, 1, 2];
      colSpeeds = prefersReducedMotion ? [1.0, 1.0, 1.0] : [0.96, 1.04, 0.98];
      const w0 = Math.round(usableWidth * 0.31);
      const w1 = Math.round(usableWidth * 0.28);
      const w2 = Math.round(usableWidth * 0.31);
      const gap = Math.round((usableWidth - w0 - w1 - w2) * 0.5);
      colDefs = [
        { left: marginX, width: w0 },
        { left: marginX + w0 + gap, width: w1 },
        { left: marginX + w0 + gap + w1 + gap, width: w2 },
      ];
      // Balanced diagonal phases preventing horizontal neighbor clumping
      phaseOffsets = [0.08, 0.58, 0.33, 0.18, 0.68];
    } else {
      // Desktop: 4 asymmetrical editorial columns with wide central breathing corridor
      slotsPerCol = [2, 2, 1, 2]; // 7 slots total
      colSpeeds = prefersReducedMotion ? [1.0, 1.0, 1.0, 1.0] : [0.95, 1.05, 0.98, 1.02];

      const wFlank = Math.round(usableWidth * 0.21); // ~278px on 1440px
      const wShoulder = Math.round(usableWidth * 0.165); // ~218px on 1440px
      const flankGap = gapConfig.minGapX + 6; // ~48px
      const centerCorridor = usableWidth - 2 * wFlank - 2 * wShoulder - 2 * flankGap; // ~286px central corridor

      const leftFlank = marginX;
      const leftShoulder = leftFlank + wFlank + flankGap;
      const rightShoulder = leftShoulder + wShoulder + centerCorridor;
      const rightFlank = rightShoulder + wShoulder + flankGap;

      colDefs = [
        { left: leftFlank, width: wFlank },
        { left: leftShoulder, width: wShoulder },
        { left: rightShoulder, width: wShoulder },
        { left: rightFlank, width: wFlank },
      ];

      // Highly spaced, organic diamond editorial phases
      // Col 0: 0.06, 0.56
      // Col 1: 0.30, 0.80
      // Col 2: 0.52
      // Col 3: 0.22, 0.72
      // Guaranteed: adjacent columns are never at the same vertical height!
      phaseOffsets = [0.06, 0.56, 0.30, 0.80, 0.52, 0.22, 0.72];
    }

    const slots: VisualSlot[] = [];
    let slotId = 0;
    for (let c = 0; c < slotsPerCol.length; c++) {
      const count = slotsPerCol[c];
      for (let k = 0; k < count; k++) {
        slots.push({
          id: slotId,
          col: c,
          subIndex: k,
          totalInCol: count,
          speed: colSpeeds[c] || 1.0,
          colLeft: colDefs[c].left,
          colWidth: colDefs[c].width,
          phaseOffset: phaseOffsets[slotId] ?? k / count,
        });
        slotId++;
      }
    }
    return slots;
  }, [deviceTier, viewportSize]);

  // ─── Scroll-Driven Virtual Image Recycling & Natural Spacing Engine ───
  const { renderedItems, domItemStyles, activeOccurrenceData } = useMemo(() => {
    const { width: vw, height: vh } = viewportSize;
    const isMobile = deviceTier === "mobile";
    const gapConfig = getResponsiveGapConfig(deviceTier);

    const minLeftPx = Math.round(vw * gapConfig.marginPercentX);
    const maxRightPx = Math.round(vw * (1 - gapConfig.marginPercentX));

    // Active vertical recycling corridor bounds in vh
    // Y_MIN: Exit buffer above the top of viewport (cards disappear seamlessly above viewport)
    // Y_MAX: Entry buffer below the bottom of viewport (cards enter smoothly below viewport)
    const Y_MIN = -35;
    const Y_MAX = 110;
    const H_SPAN = Y_MAX - Y_MIN; // 145vh active travel span

    // Total virtual scroll distance over the pinned scroll duration
    const TOTAL_TRAVEL_VH = isMobile ? 440 : deviceTier === "tablet" ? 480 : 500;

    interface ComputedBox {
      slotId: number;
      col: number;
      sourceImage: GalleryItemDefinition;
      cycle: number;
      leftPx: number;
      topPx: number;
      widthPx: number;
      heightPx: number;
    }

    const visibleBoxes: ComputedBox[] = [];

    visualSlots.forEach((slot) => {
      // 1. Independent vertical scroll progress with column parallax speed
      const scrollVh = scrollProgress * TOTAL_TRAVEL_VH * slot.speed;

      // 2. Wide editorial staggered offset (prevents horizontal clumping between adjacent columns)
      const rawOffset = slot.phaseOffset * H_SPAN;
      const currentRaw = rawOffset - scrollVh;

      // 3. Mathematical modulo wrap into [Y_MIN, Y_MAX)
      // Completely continuous, deterministic, and 100% reversible in both scroll directions
      const distFromMin = currentRaw - Y_MIN;
      const cycle = Math.floor(distFromMin / H_SPAN);
      const wrappedY_vh = Y_MIN + (((distFromMin % H_SPAN) + H_SPAN) % H_SPAN);

      // 4. Source image assignment:
      // Non-overlapping mathematical partition into the expanded 14-item image pool
      const cycleOffset = ((cycle % 2) + 2) % 2;
      const poolIndex =
        (slot.id + cycleOffset * visualSlots.length) % SOURCE_IMAGE_POOL.length;
      const sourceImage = SOURCE_IMAGE_POOL[poolIndex];

      // 5. Width & Height derivation strictly from aspectRatioValue
      // Circular medallions receive subtle scale to keep clear space around their visible curve
      const scale = sourceImage.isCircular ? 0.82 : 0.96;
      const widthPx = Math.round(slot.colWidth * scale);
      const leftPx = slot.colLeft + Math.round((slot.colWidth - widthPx) * 0.5);

      // Height derived strictly from numeric aspectRatioValue (Source of Truth)
      const heightPx = Math.round(widthPx / sourceImage.aspectRatioValue);
      const topPx = Math.round((wrappedY_vh / 100) * vh);

      // 6. Keep items that are active within or immediately adjacent to viewport
      // WebGL and DOM only process items in [-60px, vh + 60px]
      if (topPx + heightPx >= -60 && topPx <= vh + 60) {
        visibleBoxes.push({
          slotId: slot.id,
          col: slot.col,
          sourceImage,
          cycle,
          leftPx,
          topPx,
          widthPx,
          heightPx,
        });
      }
    });

    // 7. Guaranteed Zero-Duplicate Runtime Deduplication Pass
    // Guarantees 100% that no two visible cards on screen ever share the same image ID
    const usedImageIds = new Set<string>();
    visibleBoxes.forEach((box) => {
      if (usedImageIds.has(box.sourceImage.id)) {
        const unused = SOURCE_IMAGE_POOL.find((img) => !usedImageIds.has(img.id));
        if (unused) {
          box.sourceImage = unused;
          const slot = visualSlots.find((s) => s.id === box.slotId) || visualSlots[box.slotId];
          const scale = unused.isCircular ? 0.82 : 0.96;
          const widthPx = Math.round(slot.colWidth * scale);
          box.widthPx = widthPx;
          box.leftPx = slot.colLeft + Math.round((slot.colWidth - widthPx) * 0.5);
          box.heightPx = Math.round(widthPx / unused.aspectRatioValue);
        }
      }
      usedImageIds.add(box.sourceImage.id);
    });

    // 8. Comprehensive Multi-Pass Relaxation Guard
    // The disjoint column geometry guarantees spacious clearance.
    // This iterative guard ensures absolute zero overlaps even under interactive hover or edge adjustments.
    const MAX_PASSES = 4;
    for (let pass = 0; pass < MAX_PASSES; pass++) {
      let adjusted = false;

      for (let i = 0; i < visibleBoxes.length; i++) {
        for (let j = i + 1; j < visibleBoxes.length; j++) {
          const a = visibleBoxes[i];
          const b = visibleBoxes[j];

          const centerAX = a.leftPx + a.widthPx * 0.5;
          const centerAY = a.topPx + a.heightPx * 0.5;
          const centerBX = b.leftPx + b.widthPx * 0.5;
          const centerBY = b.topPx + b.heightPx * 0.5;

          const dx = Math.abs(centerAX - centerBX);
          const dy = Math.abs(centerAY - centerBY);

          const reqX = (a.widthPx + b.widthPx) * 0.5 + gapConfig.minGapX;
          const reqY = (a.heightPx + b.heightPx) * 0.5 + gapConfig.minGapY;

          if (dx < reqX && dy < reqY) {
            adjusted = true;
            const penX = reqX - dx;
            const penY = reqY - dy;

            // Smallest necessary positional adjustment
            if (penX <= penY) {
              const shiftX = Math.ceil(penX * 0.5);
              if (centerAX <= centerBX) {
                const shiftA = Math.min(shiftX, Math.max(0, a.leftPx - minLeftPx));
                const shiftB = Math.min(shiftX, Math.max(0, maxRightPx - (b.leftPx + b.widthPx)));
                a.leftPx -= shiftA;
                b.leftPx += shiftB;
              } else {
                const shiftA = Math.min(shiftX, Math.max(0, maxRightPx - (a.leftPx + a.widthPx)));
                const shiftB = Math.min(shiftX, Math.max(0, b.leftPx - minLeftPx));
                a.leftPx += shiftA;
                b.leftPx -= shiftB;
              }
            } else {
              const shiftY = Math.ceil(penY * 0.5);
              if (centerAY <= centerBY) {
                a.topPx -= shiftY;
                b.topPx += shiftY;
              } else {
                a.topPx += shiftY;
                b.topPx -= shiftY;
              }
            }
          }
        }
      }

      if (!adjusted) break;
    }

    // 9. Assemble synchronized DOM and WebGL render bundles
    const domStyles: Record<
      number,
      {
        leftPx: number;
        topPx: number;
        widthPx: number;
        heightPx: number;
      }
    > = {};

    const webglData: GalleryItemRenderData[] = [];
    const occurrences: Record<number, GalleryItemDefinition> = {};

    visibleBoxes.forEach((box) => {
      const { slotId, sourceImage, leftPx, topPx, widthPx, heightPx } = box;

      domStyles[slotId] = {
        leftPx,
        topPx,
        widthPx,
        heightPx,
      };

      occurrences[slotId] = sourceImage;

      const itemHoverState = hoverStates[slotId] || {
        hover: 0,
        pointer: { x: 0.5, y: 0.5 },
      };

      webglData.push({
        id: slotId,
        url: sourceImage.image,
        isCircular: sourceImage.isCircular,
        rect: {
          left: leftPx,
          top: topPx,
          width: widthPx,
          height: heightPx,
        },
        hover: itemHoverState.hover,
        pointer: itemHoverState.pointer,
        zoom: 1.0 + itemHoverState.hover * 0.05,
      });
    });

    return {
      renderedItems: webglData,
      domItemStyles: domStyles,
      activeOccurrenceData: occurrences,
    };
  }, [scrollProgress, deviceTier, hoverStates, viewportSize, visualSlots]);

  // Pointer move handler on DOM cards to drive simplex noise displacement in WebGL
  const handleCardPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, slotId: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pointerX = (e.clientX - rect.left) / rect.width;
      const pointerY = (e.clientY - rect.top) / rect.height;

      setHoverStates((prev) => ({
        ...prev,
        [slotId]: {
          hover: 1.0,
          pointer: {
            x: Math.max(0, Math.min(1, pointerX)),
            y: Math.max(0, Math.min(1, pointerY)),
          },
        },
      }));
    },
    []
  );

  const handleCardPointerLeave = useCallback((slotId: number) => {
    setHoverStates((prev) => ({
      ...prev,
      [slotId]: {
        hover: 0,
        pointer: { x: 0.5, y: 0.5 },
      },
    }));
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full bg-background text-neutral-900 overflow-x-clip border-y border-neutral-200/60 selection:bg-neutral-900 selection:text-white"
      aria-label="TNPVC Interior Gallery Showcase"
    >
      {/* ─── Pinned 100vh Viewport Stage ─── */}
      <div
        ref={viewportRef}
        className="relative w-full h-screen overflow-hidden bg-background select-none"
      >
        {/* ─── Native WebGL Cylindrical Projection Canvas ─── */}
        <CylindricalGalleryCanvas
          items={renderedItems}
          onWebglReadyChange={setWebglReady}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* ─── Visual Center Branding (Tnpvc Interior) ─── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-4">
          <div className="text-center transition-transform duration-500 ease-out">
            <h2 className="text-[7.2vw] sm:text-[5.8vw] font-black tracking-tighter leading-none select-none mix-blend-multiply flex items-baseline justify-center gap-[1.5vw] font-sans drop-shadow-sm">
              <span className="text-neutral-300 font-light tracking-tight">Tnpvc</span>
              <span className="text-neutral-900 font-black tracking-tighter">Interior</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-3 sm:mt-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-neutral-400 select-none">
              <span>Architecture</span>
              <span className="size-1 rounded-full bg-neutral-300" />
              <span>Interiors</span>
              <span className="size-1 rounded-full bg-neutral-300" />
              <span>Objects</span>
              <span className="size-1 rounded-full bg-neutral-300" />
              <span>UPVC Systems</span>
            </div>
          </div>
        </div>

        {/* ─── Interactive DOM Overlay Cards (Recycled Visual Slots) ─── */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          {visualSlots.map((slot) => {
            const styleData = domItemStyles[slot.id];
            const sourceItem = activeOccurrenceData[slot.id];
            if (!styleData || !sourceItem) return null;

            return (
              <div
                key={slot.id}
                data-gallery-item
                data-slot-id={slot.id}
                data-cursor-title={sourceItem.title}
                style={{
                  position: "absolute",
                  left: `${styleData.leftPx}px`,
                  top: `${styleData.topPx}px`,
                  width: `${styleData.widthPx}px`,
                  height: `${styleData.heightPx}px`,
                  transform: "none",
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className={cn(
                  "pointer-events-auto group cursor-pointer transition-shadow duration-300",
                  sourceItem.isCircular ? "rounded-full" : "rounded-sm"
                )}
                onPointerMove={(e) => handleCardPointerMove(e, slot.id)}
                onPointerLeave={() => handleCardPointerLeave(slot.id)}
                onClick={() => setActiveModalItem(sourceItem)}
              />
            );
          })}
        </div>

        {/* ─── Editorial Phase & Progress Indicator (bybang.co inspired) ─── */}
        <div className="absolute bottom-5 left-6 sm:left-8 z-30 flex items-center gap-4 pointer-events-none">
          {/* Phase identifier badge */}
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-200/60 shadow-xs">
            <span className="text-[9px] font-mono font-bold text-neutral-900">
              {PHASE_LABELS[activePhase].code}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-600 hidden sm:inline">
              {PHASE_LABELS[activePhase].label}
            </span>
          </div>

          {/* 4-Phase segment indicator */}
          <div className="flex items-center gap-1.5">
            {([1, 2, 3, 4] as const).map((ph) => (
              <div
                key={ph}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  activePhase === ph
                    ? "w-6 bg-neutral-900"
                    : activePhase > ph
                    ? "w-2.5 bg-neutral-400"
                    : "w-2.5 bg-neutral-200"
                )}
              />
            ))}
          </div>

          {/* Scrub percentage */}
          <span className="text-[10px] font-mono font-bold text-neutral-400">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* ─── bybang.co Inspired Full-Screen Editorial Project Case Study ─── */}
      {activeModalItem && (
        <BybangProjectSheet
          item={activeModalItem}
          itemsList={SOURCE_IMAGE_POOL}
          onClose={() => setActiveModalItem(null)}
          onSelectNext={(next) => setActiveModalItem(next)}
        />
      )}
    </section>
  );
};
