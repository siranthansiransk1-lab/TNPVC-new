import { useRef, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Boxes,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Factory,
  Layers,
  Sparkles,
  Tv,
  Users,
  Wrench,
  X,
  ShieldCheck,
  Instagram,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

import { Seo } from "@/components/seo/Seo";
import { SiteLayout } from "@/components/site/SiteLayout";
import { seoByPath, companyLinks } from "@/data/siteData";

import srinivasanFounder from "@/assets/srinivasan-founder.webp";
import siranthanFounder from "@/assets/siranthan-founder.png";
import anubrindhaFounder from "@/assets/anubrindha.png";
import sanjayRithikPortrait from "@/assets/sanjay-rithik-portrait.png";
import warehouseSuppliers from "@/assets/warehouse-suppliers.jpg";
import dealersHandshake from "@/assets/dealers-handshake.jpg";
import tnPvcLogo from "@/assets/tn-pvc-logo.webp";
import wallPanelImg from "@/assets/wall-panel.jpg";
import wallStickersImg from "@/assets/wall-stickers.jpg";
import capboardImg from "@/assets/capboard.jpg";
import tvUnitsImg from "@/assets/tv-units.jpg";
import priyankaImg from "@/assets/Priyanka.png";
import kalpanaImg from "@/assets/kalpana-LIC.png";
import jeoImg from "@/assets/jeo.jpeg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

/* ═══════════════════════════════════════════════════════════════════
   CLOUDINARY ASSET MANIFEST (Optimized with auto-format & quality)
   ═══════════════════════════════════════════════════════════════════ */
const cloudinaryAssets = {
  heroInterior: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1600/v1791963207/tn-pvc/about-us/hero-luxury-interior.jpg",
    alt: "Contemporary living room with premium interior finishes and architectural lighting",
  },
  wallPanels: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963240/tn-pvc/about-us/wall-panel-living-room.jpg",
    alt: "Modern bedroom with architectural fluted wood wall panels",
  },
  decorativeWalls: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963246/tn-pvc/about-us/decorative-wall-interior.jpg",
    alt: "Living space with designer decorative floral wall finishes",
  },
  cupboards: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963251/tn-pvc/about-us/cupboard-interior.jpg",
    alt: "Contemporary fitted storage cupboards and wardrobe systems",
  },
  tvConsole: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963308/tn-pvc/about-us/tv-console-detail.jpg",
    alt: "Minimalist luxury TV console with marble back panel",
  },
  interiorDetails: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963262/tn-pvc/about-us/modern-interior-details.jpg",
    alt: "Modern interior details and precision material finishes",
  },
  projectExecution: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963266/tn-pvc/about-us/interior-project-work.jpg",
    alt: "Contractors and engineers collaborating on interior blueprint execution",
  },
  manufacturingReference: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963272/tn-pvc/about-us/industrial-workshop.jpg",
    alt: "High-precision PVC board manufacturing and extrusion workshop",
  },
  teamReference: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1000/v1791963277/tn-pvc/about-us/team-collaboration.jpg",
    alt: "Skilled installation workforce team in safety gear",
  },
  futureArchitecture: {
    url: "https://res.cloudinary.com/fwral0nf/image/upload/f_auto,q_auto,w_1600/v1791963283/tn-pvc/about-us/architectural-future-vision.jpg",
    alt: "Contemporary residential architecture at twilight overlooking calm water",
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════
   SCENE DATA DEFINITIONS
   ═══════════════════════════════════════════════════════════════════ */
const interiorCards = [
  {
    id: "wall-panels",
    label: "WALL PANELS",
    subtitle: "Acoustic & Decorative Panels",
    image: wallPanelImg,
    alt: "Modern PVC Wall Panels",
    link: "/clients#wall-panels",
  },
  {
    id: "wall-stickers",
    label: "WALL STICKERS",
    subtitle: "Seamless Wallpaper & Films",
    image: wallStickersImg,
    alt: "Seamless Wall Stickers & Decorative Films",
    link: "/clients#wall-stickers",
  },
  {
    id: "cupboards",
    label: "CUPBOARDS",
    subtitle: "Custom Storage & Wardrobes",
    image: capboardImg,
    alt: "Custom PVC Cupboards & Wardrobes",
    link: "/clients#cupboards",
  },
  {
    id: "tv-units",
    label: "TV UNITS",
    subtitle: "Floating Consoles & Wall Units",
    image: tvUnitsImg,
    alt: "Modern PVC Floating TV Units & Consoles",
    link: "/clients#tv-units",
  },
];

const processSteps = [
  {
    id: "mfg",
    label: "Manufacturing",
    tag: "Extrusion",
    icon: Factory,
    desc: "Precision extrusion & high-density PVC formulations",
    image: cloudinaryAssets.manufacturingReference.url,
    alt: "High Precision Industrial Fabrication Workshop",
  },
  {
    id: "supply",
    label: "Product Supply",
    tag: "Logistics",
    icon: Boxes,
    desc: "Rigorous quality control and organized logistics dispatch",
    image: warehouseSuppliers,
    alt: "PVC Material Warehouse Logistics Hub",
  },
  {
    id: "dealers",
    label: "Dealers",
    tag: "38 Districts",
    icon: Building2,
    desc: "Direct-to-trade showroom and stockist network across Tamil Nadu",
    image: dealersHandshake,
    alt: "Regional Dealer and Wholesale Network",
  },
  {
    id: "contractors",
    label: "Contractors",
    tag: "500+ Active",
    icon: Wrench,
    desc: "Certified contractor training & execution guidelines",
    image: cloudinaryAssets.projectExecution.url,
    alt: "Professional Contractor Execution On-Site",
  },
  {
    id: "workforce",
    label: "Workforce Support",
    tag: "2000+ Skilled",
    icon: Users,
    desc: "Skilled carpenters, installers & technical assistance",
    image: cloudinaryAssets.teamReference.url,
    alt: "Skilled Installation Workforce Team",
  },
];

const leadershipMembers = [
  {
    id: "founder",
    name: "Srinivasan",
    role: "SRINIVASAN / FOUNDER",
    fullTitle: "Founder & Managing Director",
    image: srinivasanFounder,
    bio: "Pioneering the modern PVC interior landscape in Tamil Nadu with an unwavering commitment to architectural quality, trade empowerment, and lasting customer value.",
    quote: "Every journey begins with a decision to build with purpose and integrity.",
    link: "/srinivasan",
    linkLabel: "View Founder Story",
  },
  {
    id: "siranthan",
    name: "Siranthan",
    role: "SIRANTHAN / CO-FOUNDER",
    fullTitle: "Co-Founder & Operations Lead",
    image: siranthanFounder,
    bio: "Spearheading state-wide operations, supplier syndication, and digital trade networks to bring modern living solutions to thousands of families across 38 districts.",
    quote: "True innovation lives at the intersection of craftsmanship and scalable systems.",
    link: "/siranthan-siran",
    instagram: companyLinks.siranthanInstagram,
    linkLabel: "View Co-Founder Profile",
  },
  {
    id: "anubrindha",
    name: "Anu Brindha",
    role: "ANU BRINDHA / LEAD DIRECTOR",
    fullTitle: "Lead Director & Design Strategist",
    image: anubrindhaFounder,
    bio: "Driving aesthetic excellence, interior design standards, and partner relations with an eye for modern luxury, durability, and contemporary spatial harmony.",
    quote: "Design is not just what spaces look like — it is how they make people feel every day.",
    link: "#scene-01",
    linkLabel: "View Design Portfolio",
  },
  {
    id: "sanjay",
    name: "Sanjay Rithik",
    role: "SANJAY RITHIK / TECHNOLOGY & MARKETING DIRECTOR",
    fullTitle: "Technology & Marketing Director",
    image: sanjayRithikPortrait,
    bio: "Architecting digital-first trade experiences, omnichannel dealer portals, and high-impact marketing initiatives that position TN-PVC as a modern market leader.",
    quote: "Connecting every craftsman, dealer, and homeowner through seamless digital trade.",
    link: "/network",
    linkLabel: "Explore Ecosystem",
  },
];

const teamMembers = [
  {
    id: "kalpana",
    name: "Kalpana",
    role: "LIC Corporate Advisor",
    dept: "Employee Welfare & Social Security",
    badge: "LIC Corporate Advisor",
    bio: "Kalpana serves as the dedicated Life Insurance Corporation (LIC) advisor and employee welfare coordinator for TN-PVC, securing comprehensive life, health, and group protection policies for all company personnel and plant artisans.",
    bio2: "Her work ensures that every member of the TN-PVC family operates with financial security and future peace of mind, managing retirement provisions, policy assistance, and welfare benefits tailored to our dedicated workforce.",
    quote: "Empowering and safeguarding our hardworking workforce builds the strongest foundation for our company's future.",
    image: kalpanaImg,
  },
  {
    id: "priyanka",
    name: "Priyanka",
    role: "Telephony Head",
    dept: "Customer Desk & Inbound Telephony",
    badge: "Telephony Lead",
    bio: "Priyanka heads the central telephony and customer communications desk at TN-PVC, managing all direct client calls, architect inquiries, and regional dealer desk requests across Tamil Nadu with promptness and clarity.",
    bio2: "She coordinates seamless communication between prospective buyers, interior contractors, and our technical design team, ensuring inquiries are routed without delay and customer satisfaction is prioritized at every touchpoint.",
    quote: "Clear, responsive communication is the first step toward building trust and flawless interiors.",
    image: priyankaImg,
  },
  {
    id: "jeo",
    name: "Jeo",
    role: "Field Manager",
    dept: "Field Operations & Site Execution",
    badge: "Field Operations Lead",
    bio: "Jeo leads TN-PVC's field operations, overseeing on-site interior installations, measurements, contractor supervision, and project timelines across sites in Tamil Nadu.",
    bio2: "From preliminary site assessments to final handover inspections, Jeo bridges client visions with on-ground technical execution, ensuring all PVC wall panels, cabinetry, and designer fixtures are installed to zero-defect standards.",
    quote: "True architectural precision isn't just planned on blueprints — it is delivered through diligent field execution.",
    image: jeoImg,
  },
];



/* ═══════════════════════════════════════════════════════════════════
   MAIN ABOUT COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export const About = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Interactive state
  const [expandedLeaderId, setExpandedLeaderId] = useState<string | null>(null);
  const activeLeader = leadershipMembers.find((m) => m.id === expandedLeaderId) || null;
  const leadershipContainerRef = useRef<HTMLDivElement>(null);

  // Scene 01 Interactive Mobile Carousel State
  const scene1CarouselRef = useRef<HTMLDivElement>(null);
  const [activeScene1Index, setActiveScene1Index] = useState(0);

  const handleScene1Scroll = () => {
    if (!scene1CarouselRef.current) return;
    const container = scene1CarouselRef.current;
    const scrollLeft = container.scrollLeft;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 14 : 280;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < interiorCards.length && newIndex !== activeScene1Index) {
      setActiveScene1Index(newIndex);
    }
  };

  const scrollScene1ToIndex = (index: number) => {
    if (!scene1CarouselRef.current) return;
    const container = scene1CarouselRef.current;
    const targetCard = container.children[index] as HTMLElement | undefined;
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveScene1Index(index);
    }
  };

  // Close active leader card when clicking outside or pressing Escape
  useEffect(() => {
    if (!expandedLeaderId) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        leadershipContainerRef.current &&
        !leadershipContainerRef.current.contains(e.target as Node)
      ) {
        setExpandedLeaderId(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedLeaderId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedLeaderId]);

  // Scene 04 List/Grid View, Accordion, Custom Cursor & Hover Preview State
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<(typeof teamMembers)[0] | null>(null);
  const [hoveredGridId, setHoveredGridId] = useState<string | null>(null);
  const [floatingPos, setFloatingPos] = useState({ x: -300, y: -300 });
  const flipContainerRef = useRef<HTMLDivElement>(null);

  // Responsive column tracking for accurate inline row expansion in Grid View
  const [gridCols, setGridCols] = useState(3);

  useEffect(() => {
    const updateGridCols = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setGridCols(3);
        } else if (window.innerWidth >= 640) {
          setGridCols(2);
        } else {
          setGridCols(1);
        }
      }
    };
    updateGridCols();
    window.addEventListener("resize", updateGridCols);
    return () => window.removeEventListener("resize", updateGridCols);
  }, []);

  const toggleView = () => {
    const nextMode = viewMode === "list" ? "grid" : "list";
    const container = flipContainerRef.current;
    if (!container) {
      setViewMode(nextMode);
      return;
    }

    // Capture previous DOM geometry using GSAP Flip
    const state = Flip.getState(container.querySelectorAll("[data-flip-id]"));

    setViewMode(nextMode);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power4.inOut",
        stagger: 0.02,
        absolute: false,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    });
  };

  const handleMemberToggle = (id: string) => {
    const nextId = expandedMemberId === id ? null : id;
    setExpandedMemberId(nextId);
  };

  const handleRowMouseEnter = (
    member: (typeof teamMembers)[0],
    e: React.MouseEvent
  ) => {
    setHoveredMember(member);
    setFloatingPos({ x: e.clientX, y: e.clientY });
  };

  const handleRowMouseMove = (
    _member: (typeof teamMembers)[0],
    e: React.MouseEvent
  ) => {
    setFloatingPos({ x: e.clientX, y: e.clientY });
  };

  const handleRowMouseLeave = () => {
    setHoveredMember(null);
  };

  const handleCardMouseEnter = (
    member: (typeof teamMembers)[0],
    _e: React.MouseEvent
  ) => {
    setHoveredGridId(member.id);
  };

  const handleCardMouseMove = (
    _member: (typeof teamMembers)[0],
    _e: React.MouseEvent
  ) => { };

  const handleCardMouseLeave = () => {
    setHoveredGridId(null);
  };

  const seo = seoByPath["/about"] || {
    title: "About Us | TN-PVC Interiors",
    description:
      "At TN-PVC, we don't just create interiors, we create experiences. Discover our connected ecosystem across manufacturing, leadership, and partner networks.",
    keywords: ["About TN-PVC", "Luxury PVC Interiors", "Tamil Nadu PVC Trade"],
  };

  /* ═══════════════════════════════════════════════════════════════════
     GSAP CINEMATIC SCROLLTRIGGER SUITE ($5000 Agency Quality)
     ═══════════════════════════════════════════════════════════════════ */
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      /* ─── DESKTOP CINEMATIC TIMELINES ─── */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // 1. Hero Pinned Unfold & Zoom Parallax
          if (heroImageRef.current && heroContentRef.current) {
            gsap.set(heroImageRef.current, {
              scale: 1.08,
              transformOrigin: "center center",
            });

            const heroTl = gsap.timeline({
              scrollTrigger: {
                trigger: "[data-scene='hero']",
                start: "top top",
                end: "+=50%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
              },
            });

            heroTl
              .to(
                heroImageRef.current,
                {
                  scale: 1.0,
                  ease: "none",
                },
                0
              )
              .to(
                heroContentRef.current,
                {
                  yPercent: -18,
                  autoAlpha: 0.1,
                  ease: "none",
                },
                0.2
              );
          }

          // 2. Section Rule Expand Lines (01 ──────)
          const ruleLines = gsap.utils.toArray<HTMLElement>("[data-scene-line]");
          ruleLines.forEach((line) => {
            gsap.fromTo(
              line,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: line,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          // 3. Editorial Headlines Stagger Mask Reveals
          const headlineWraps =
            gsap.utils.toArray<HTMLElement>("[data-reveal-text]");
          headlineWraps.forEach((wrap) => {
            gsap.fromTo(
              wrap,
              { y: 35, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: wrap,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          // 4. Scene 01 Image Cards Staggered Curtain Reveal
          const interiorCardEls =
            gsap.utils.toArray<HTMLElement>("[data-card-scene-1]");
          if (interiorCardEls.length) {
            gsap.fromTo(
              interiorCardEls,
              { y: 45, autoAlpha: 0, scale: 0.96 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: "[data-scene='01']",
                  start: "top 72%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // 5. Scene 02 Manufacturing Panoramic & Process Reveal
          const mfgPanels =
            gsap.utils.toArray<HTMLElement>("[data-mfg-panel]");
          if (mfgPanels.length) {
            gsap.fromTo(
              mfgPanels,
              { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 0.4 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                duration: 1.1,
                stagger: 0.14,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: "[data-scene='02']",
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // 6. Scene 03 Leadership Portraits Reveal
          const leaderCardEls =
            gsap.utils.toArray<HTMLElement>("[data-leader-card]");
          if (leaderCardEls.length) {
            gsap.fromTo(
              leaderCardEls,
              { y: 50, autoAlpha: 0, scale: 0.95 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 1.0,
                stagger: 0.14,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: "[data-scene='03']",
                  start: "top 72%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // 7. Scene 04 Team Entrance Reveal
          const teamSectionEl = root.querySelector<HTMLElement>("[data-scene='04']");
          if (teamSectionEl) {
            gsap.fromTo(
              teamSectionEl.querySelectorAll("[data-reveal-text]"),
              { y: 35, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: "[data-scene='04']",
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // 8. Scene 05 Closing Vision Parallax & Logo Flare
          const closingEl = root.querySelector<HTMLElement>("[data-scene='05']");
          if (closingEl) {
            const bgImg = closingEl.querySelector<HTMLElement>("[data-closing-bg]");
            if (bgImg) {
              gsap.fromTo(
                bgImg,
                { scale: 1.12, yPercent: -4 },
                {
                  scale: 1.0,
                  yPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: closingEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                }
              );
            }

            const logoEl = closingEl.querySelector<HTMLElement>("[data-closing-logo]");
            if (logoEl) {
              gsap.fromTo(
                logoEl,
                { scale: 0.9, autoAlpha: 0 },
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 1.2,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: closingEl,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          }
        }
      );

      /* ─── MOBILE EXPERIENCE ─── */
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const mobileItems = gsap.utils.toArray<HTMLElement>(
            "[data-mobile-stagger]"
          );
          mobileItems.forEach((item) => {
            gsap.fromTo(
              item,
              { y: 25, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.65,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      );

      /* ─── PREFERS-REDUCED-MOTION (Full Accessibility) ─── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          root.querySelectorAll(
            "[data-scene-line], [data-reveal-text], [data-card-scene-1], [data-mfg-panel], [data-leader-card], [data-team-card], [data-closing-logo]"
          ),
          { autoAlpha: 1, y: 0, scale: 1, scaleX: 1, clipPath: "none" }
        );
        if (heroImageRef.current) {
          gsap.set(heroImageRef.current, { scale: 1, clipPath: "none" });
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const expandedMember = teamMembers.find((m) => m.id === expandedMemberId);
  const expandedIndex = teamMembers.findIndex((m) => m.id === expandedMemberId);
  const insertAfterIndex =
    expandedIndex !== -1
      ? Math.min(
        (Math.floor(expandedIndex / gridCols) + 1) * gridCols - 1,
        teamMembers.length - 1
      )
      : -1;

  return (
    <SiteLayout>
      <Seo
        {...seo}
        path="/about"
        image={cloudinaryAssets.heroInterior.url}
      />

      <main
        id="main-content"
        role="main"
        ref={rootRef}
        className="relative overflow-x-clip w-full max-w-full bg-neutral-950 text-foreground selection:bg-primary selection:text-white"
      >


        {/* ═══════════════════════════════════════════════════════════════
            SCENE 00 — CINEMATIC HERO
            "SPACES THAT TELL A STORY."
            Matches user's reference screenshot hero composition
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="scene-00"
          data-scene="00"
          className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden bg-luxury-dark scroll-mt-0"
        >
          {/* Full-bleed Luxury Interior Background with Parallax Scrub */}
          <div
            ref={heroImageRef}
            className="absolute inset-0 z-0 origin-center will-change-transform"
          >
            <img
              src={cloudinaryAssets.heroInterior.url}
              alt={cloudinaryAssets.heroInterior.alt}
              className="h-full w-full object-cover object-center filter brightness-[0.52] contrast-[1.08]"
              loading="eager"
              fetchPriority="high"
            />
            {/* Cinematic Studio Vignette & Gradients (Zero hardcoded colors) */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/30 to-luxury-dark/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/80 via-luxury-dark/30 to-transparent" />
          </div>

          {/* Left-Aligned Editorial Hero Content (Strictly matching reference screenshot) */}
          <div
            ref={heroContentRef}
            className="container relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 pb-20 text-left"
          >
            <div className="max-w-2xl space-y-5 sm:space-y-6">


              {/* Headline: SPACES THAT TELL A STORY. */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05] uppercase">
                SPACES THAT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-primary inline-block">
                  TELL A STORY.
                </span>
              </h1>

              {/* Subtext */}
              <p className="max-w-xl text-sm sm:text-base lg:text-lg xl:text-xl font-normal leading-relaxed text-white/80">
                At TN-PVC, we don't just create interiors,
                <br className="hidden sm:inline" />
                we create experiences.
              </p>
            </div>


          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SCENE 01 — INTERIOR SOLUTIONS
            "01 BEYOND WALLS. BEYOND EXPECTATIONS."
            Light Alabaster/Cream background matching reference screenshot
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="scene-01"
          data-scene="01"
          className="relative py-12 sm:py-20 lg:py-28 bg-luxury-light text-luxury-charcoal transition-colors duration-500 scroll-mt-16 sm:scroll-mt-20 overflow-hidden w-full max-w-full"
        >
          <div className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Number, Line, Headline, Subtext, CTA */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-6 min-w-0" data-reveal-text>

                {/* Editorial Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-luxury-charcoal uppercase leading-[1.08] break-words">
                  BEYOND WALLS.
                  <br />
                  BEYOND EXPECTATIONS.
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base font-normal leading-relaxed text-luxury-stone max-w-md">
                  From stylish wall panels to elegant wall stickers, custom
                  cupboards to modern TV units — we bring your vision to life
                  with premium TN-PVC solutions.
                </p>

                {/* Dark Luxury Pill CTA Button */}
                <div className="pt-1 sm:pt-2">
                  <Link
                    to="/clients"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-luxury-charcoal px-5 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-luxury-light transition-all duration-300 hover:bg-primary hover:text-white shadow-lg hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
                  >
                    <span>Explore Our Interiors</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 4 Interactive Cards (Snap Carousel on Mobile & Tablet / Expand Accordion on Desktop lg+) */}
              <div className="lg:col-span-8 w-full max-w-full min-w-0">
                <div
                  ref={scene1CarouselRef}
                  onScroll={handleScene1Scroll}
                  className="flex flex-row overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-3.5 sm:gap-4 pb-2 lg:pb-0 scrollbar-none scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
                >
                  {interiorCards.map((card, idx) => (
                    <Link
                      key={card.id}
                      to={card.link}
                      data-card-scene-1
                      data-mobile-stagger
                      className="group relative w-[76vw] max-w-[300px] sm:w-[310px] lg:w-auto lg:max-w-none lg:flex-1 snap-start h-[360px] sm:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 ease-out lg:hover:flex-[1.7] border border-luxury-light-border/70 bg-luxury-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer shrink-0 lg:shrink"
                    >
                      {/* Image with zoom on hover */}
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.88] group-hover:brightness-100"
                        loading="lazy"
                      />

                      {/* Dark Vignette Bottom Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

                      {/* Hover Specular Shimmer Line */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                      </div>

                      {/* Bottom Label Bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end z-10 pointer-events-none">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm sm:text-base font-black tracking-wider uppercase text-white group-hover:text-primary transition-colors duration-300">
                            {card.label}
                          </p>
                          <ChevronRight className="size-4 text-white/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                        </div>
                        <p className="text-[11px] sm:text-xs font-medium text-white/75 line-clamp-1 mt-1 opacity-100 sm:opacity-90 transition-opacity duration-300">
                          {card.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mobile / Tablet Carousel Interactive Controls (< lg screens) */}
                <div className="flex items-center justify-between mt-4 px-1 lg:hidden">
                  {/* Active Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {interiorCards.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        data-carousel-dot="true"
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => scrollScene1ToIndex(idx)}
                        className={`!min-h-0 !min-w-0 h-2 rounded-full transition-all duration-300 ${activeScene1Index === idx
                          ? "w-7 bg-luxury-charcoal"
                          : "w-2 bg-luxury-charcoal/25 hover:bg-luxury-charcoal/50"
                          }`}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SCENE 03 — LEADERSHIP
            "03 THE PEOPLE BEHIND THE VISION."
            Tailwind Neutral-950 Dark theme + Right-side details drawer
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="scene-03"
          data-scene="03"
          className="relative py-16 sm:py-20 lg:py-28 bg-neutral-950 text-white overflow-hidden scroll-mt-16 sm:scroll-mt-20 w-full max-w-full"
        >
          {/* Subtle Ambient Brand Glow in background */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 size-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          <div className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="space-y-3 mb-10 sm:mb-14">
              {/* Editorial Headline */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-100 uppercase leading-[1.08]">
                THE PEOPLE
                <br />
                BEHIND THE VISION.
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base font-normal leading-relaxed text-neutral-400">
                A strong team. A shared passion. A bigger tomorrow.
              </p>
            </div>

            {/* Interactive Layout: Team Cards with Smooth CSS Grid Inline Details Expansion */}
            <div
              ref={leadershipContainerRef}
              className="flex flex-col md:flex-row gap-4 sm:gap-5 items-stretch w-full max-w-full"
            >
              {leadershipMembers.map((leader) => {
                const isSelected = expandedLeaderId === leader.id;
                const isInactive = activeLeader !== null && !isSelected;

                return (
                  <div
                    key={leader.id}
                    data-leader-card
                    data-mobile-stagger
                    onMouseEnter={() => {
                      // Only auto-switch on hover if a card is ALREADY opened (first card opened by click)
                      if (
                        expandedLeaderId !== null &&
                        typeof window !== "undefined" &&
                        window.innerWidth >= 768
                      ) {
                        setExpandedLeaderId(leader.id);
                      }
                    }}
                    className={`transition-[flex,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-w-0 ${isSelected
                      ? "md:flex-[2.8] lg:flex-[3]"
                      : isInactive
                        ? "md:flex-1 opacity-75 hover:opacity-100"
                        : "md:flex-1 opacity-100"
                      }`}
                  >
                    <div className="flex flex-col md:flex-row items-stretch w-full h-full min-w-0">
                      {/* Portrait Card / Image */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${leader.name}`}
                        aria-expanded={isSelected}
                        onClick={() => {
                          if (isSelected) {
                            setExpandedLeaderId(null);
                          } else {
                            setExpandedLeaderId(leader.id);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (isSelected) {
                              setExpandedLeaderId(null);
                            } else {
                              setExpandedLeaderId(leader.id);
                            }
                          }
                        }}
                        className={`group relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSelected
                          ? "w-full md:w-[240px] lg:w-[260px] shrink-0 border-primary/50 bg-neutral-900 cursor-pointer"
                          : "w-full md:w-full border-neutral-800 bg-neutral-900 hover:border-primary/50 cursor-pointer"
                          } h-[380px] sm:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden border shadow-xl select-none focus:outline-none`}
                      >
                        {/* Portrait Image */}
                        <img
                          src={leader.image}
                          alt={leader.fullTitle}
                          className={`h-full w-full object-cover object-top filter contrast-[1.05] transition-all duration-500 ease-out ${isSelected
                            ? "brightness-100 scale-105"
                            : "brightness-90 group-hover:brightness-100 group-hover:scale-105"
                            }`}
                          loading="lazy"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/35 to-transparent pointer-events-none" />

                        {/* Minimal Active Indicator Dot */}
                        {isSelected && (
                          <span className="absolute top-3.5 left-3.5 z-20 size-2.5 rounded-full bg-primary animate-pulse" />
                        )}

                        {/* Bottom Role Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between z-10 pointer-events-none">
                          <div className="space-y-0.5">
                            <p className="text-sm font-black tracking-wide text-neutral-100 uppercase">
                              {leader.name}
                            </p>
                            <p
                              className={`text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 leading-tight ${isSelected
                                ? "text-primary"
                                : "text-neutral-400 group-hover:text-primary"
                                }`}
                            >
                              {leader.fullTitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Inline Details Accordion: CSS Grid 0fr -> 1fr (Horizontal on md+, Vertical on mobile) */}
                      <div
                        className={`leader-details-accordion min-w-0 ${isSelected ? "is-expanded" : ""
                          }`}
                      >
                        <div className="overflow-hidden min-w-0 min-h-0 h-full">
                          <div
                            className={`w-full md:w-[320px] lg:w-[350px] md:min-w-[320px] lg:min-w-[350px] shrink-0 h-full flex flex-col justify-center space-y-4 py-3 md:py-2 md:pl-6 md:pr-2 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${isSelected
                              ? "opacity-100 visible translate-x-0 duration-400 delay-[100ms] pointer-events-auto"
                              : "opacity-0 invisible -translate-x-3 duration-200 delay-0 pointer-events-none"
                              }`}
                          >
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                  {leader.fullTitle}
                                </p>
                                <h3 className="text-xl sm:text-2xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                                  {leader.name}
                                </h3>
                              </div>

                              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                                {leader.bio}
                              </p>

                              <blockquote className="border-l-2 border-primary pl-3.5 py-1 text-xs sm:text-sm italic text-neutral-200 font-medium bg-transparent">
                                "{leader.quote}"
                              </blockquote>
                            </div>

                            {/* Actions: Clean Editorial View Link (No background, No shadow, No close button) */}
                            <div className="pt-2 flex items-center gap-4">
                              <Link
                                to={leader.link}
                                className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors shrink-0 py-1"
                              >
                                <span className="border-b border-primary/50 group-hover/btn:border-white pb-0.5 transition-colors">
                                  {leader.linkLabel}
                                </span>
                                <ExternalLink className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                              </Link>

                              {leader.instagram && (
                                <a
                                  href={leader.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="Instagram Profile"
                                  className="size-7 rounded-full border border-neutral-800 text-neutral-400 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-colors shrink-0"
                                >
                                  <Instagram className="size-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SCENE 04 — OUR TEAM (300FEETOUT LIST/GRID TOGGLE + GSAP FLIP)
            "04 OUR TEAM. THE MINDS & CRAFTSMEN BEHIND THE SYSTEM."
            Crisp Canvas, Bold Typography, Brand Primary Accents
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="scene-04"
          data-scene="04"
          className="relative py-20 lg:py-28 bg-white text-black transition-colors duration-500 scroll-mt-16 sm:scroll-mt-20 border-t border-b border-black/10 overflow-hidden"
        >
          {/* Floating Image Preview on Hover (Smooth lag/damping following pointer with cubic-bezier) */}
          <div
            className={`pointer-events-none fixed z-40 hidden md:block overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-black select-none ${hoveredMember && viewMode === "list" && expandedMemberId !== hoveredMember.id
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
              }`}
            style={{
              left: 0,
              top: 0,
              transform: `translate3d(${floatingPos.x + 36}px, ${floatingPos.y - 140}px, 0)`,
              width: "240px",
              height: "285px",
              transition:
                "opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)",
              willChange: "transform, opacity",
            }}
          >
            {hoveredMember && (
              <img
                src={hoveredMember.image}
                alt={hoveredMember.name}
                className="w-full h-full object-cover object-top"
              />
            )}
          </div>

          <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
            {/* Header: Section number, clean OUR TEAM headline, and View Toggle Switch */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
              <div className="space-y-3 max-w-2xl" data-reveal-text>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black uppercase leading-[1.04]">
                  OUR TEAM.
                </h2>
              </div>

              {/* 300FeetOut Signature Pill Toggle Switch */}
              <div className="flex items-center gap-3.5 select-none self-start md:self-end pt-2">
                <button
                  type="button"
                  role="switch"
                  aria-label="Toggle List or Grid View"
                  aria-checked={viewMode === "grid"}
                  onClick={toggleView}
                  className="group relative flex items-center w-[4.6rem] h-[2.5rem] rounded-full border-[1.5px] border-black p-1 bg-white hover:border-black cursor-pointer shadow-sm transition-all"
                >
                  {/* List Icon (3 horizontal bars) */}
                  <div className="w-1/2 flex items-center justify-center z-10 pointer-events-none">
                    <div className="flex flex-col gap-1 w-3.5">
                      <span
                        className={`h-[1.5px] w-full rounded-full transition-colors duration-300 ${viewMode === "list" ? "bg-white" : "bg-black"
                          }`}
                      />
                      <span
                        className={`h-[1.5px] w-full rounded-full transition-colors duration-300 ${viewMode === "list" ? "bg-white" : "bg-black"
                          }`}
                      />
                      <span
                        className={`h-[1.5px] w-full rounded-full transition-colors duration-300 ${viewMode === "list" ? "bg-white" : "bg-black"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Grid Icon (4 dots) */}
                  <div className="w-1/2 flex items-center justify-center z-10 pointer-events-none">
                    <div className="grid grid-cols-2 gap-1 w-3.5">
                      <span
                        className={`size-1 rounded-[1px] transition-colors duration-300 ${viewMode === "grid" ? "bg-white" : "bg-black"
                          }`}
                      />
                      <span
                        className={`size-1 rounded-[1px] transition-colors duration-300 ${viewMode === "grid" ? "bg-white" : "bg-black"
                          }`}
                      />
                      <span
                        className={`size-1 rounded-[1px] transition-colors duration-300 ${viewMode === "grid" ? "bg-white" : "bg-black"
                          }`}
                      />
                      <span
                        className={`size-1 rounded-[1px] transition-colors duration-300 ${viewMode === "grid" ? "bg-white" : "bg-black"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Sliding black circular knob */}
                  <div
                    className={`absolute top-[3px] bottom-[3px] w-[1.95rem] rounded-full bg-black transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 ${viewMode === "list"
                      ? "left-[3px]"
                      : "left-[calc(100%-1.95rem-3px)]"
                      }`}
                  />
                </button>

                <span
                  onClick={toggleView}
                  className="font-bold text-xl sm:text-2xl text-black tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {viewMode === "list" ? "list view" : "grid view"}
                </span>
              </div>
            </div>

            {/* Container for Morphing Items (List or Grid) */}
            <div
              ref={flipContainerRef}
              className={
                viewMode === "list"
                  ? "flex flex-col divide-y divide-black/15 border-t border-b border-black/15"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
              }
            >
              {teamMembers.map((member, index) => {
                const isExpanded = expandedMemberId === member.id;

                if (viewMode === "list") {
                  return (
                    <div
                      key={member.id}
                      data-flip-id={`team-flip-${member.id}`}
                      className="transition-colors"
                    >
                      {/* Clickable Member Row */}
                      <div
                        onClick={() => handleMemberToggle(member.id)}
                        onMouseEnter={(e) => handleRowMouseEnter(member, e)}
                        onMouseMove={(e) => handleRowMouseMove(member, e)}
                        onMouseLeave={handleRowMouseLeave}
                        className={`group relative flex items-center justify-between py-6 sm:py-7 cursor-pointer transition-colors duration-250 ease-in-out select-none ${isExpanded ? "text-primary" : "hover:text-primary"
                          }`}
                      >
                        {/* Member Name (Slide-in on hover: translateX(14px), cubic-bezier(0.16,1,0.3,1), primary) */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                          <h3
                            className={`member-name text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-[transform,color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded
                              ? "translate-x-[14px] text-primary"
                              : "text-black group-hover:translate-x-[14px] group-hover:text-primary"
                              }`}
                            style={{
                              transition:
                                "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                            }}
                          >
                            {member.name}
                          </h3>
                        </div>

                        {/* Role & Dual-Arrow Slot Swap Travel Animation */}
                        <div className="flex items-center gap-3 sm:gap-6 shrink-0 pl-4">
                          <p
                            className={`member-role text-sm sm:text-base md:text-lg font-normal transition-[transform,color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-right ${isExpanded
                              ? "-translate-x-[14px] text-primary"
                              : "text-black/80 group-hover:-translate-x-[14px] group-hover:text-primary"
                              }`}
                            style={{
                              transition:
                                "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                            }}
                          >
                            {member.role}
                          </p>

                          {/* Dual-arrow slot swap container (w-6 h-6, overflow-hidden) */}
                          <div className="overflow-hidden relative inline-block w-6 h-6 shrink-0 pointer-events-none">
                            {/* 1. Default Arrow (Slides out to bottom-right: translate(100%, 100%) opacity-0) */}
                            <div
                              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded
                                ? "translate-x-full translate-y-full opacity-0"
                                : "translate-x-0 translate-y-0 opacity-100 group-hover:translate-x-full group-hover:translate-y-full group-hover:opacity-0"
                                }`}
                            >
                              <ArrowDownLeft className="size-5 sm:size-6 stroke-[2.5] text-black" />
                            </div>

                            {/* 2. Incoming Arrow (Waits at top-left, slides into center on hover: primary) */}
                            <div
                              className={`absolute inset-0 flex items-center justify-center text-primary transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms] ${isExpanded
                                ? "translate-x-0 translate-y-0 opacity-100"
                                : "-translate-x-full -translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                                }`}
                            >
                              <ArrowDownLeft className="size-5 sm:size-6 stroke-[2.5]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Detail Expansion (Inline directly below list row) */}
                      <div
                        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded
                          ? "max-h-[1400px] opacity-100 pb-12 pt-2"
                          : "max-h-0 opacity-0 pb-0 pt-0 pointer-events-none"
                          }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-6 border-t border-black/10">
                          {/* Left Column: Rich editorial bio paragraphs */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-base sm:text-lg leading-relaxed text-black/85 font-normal">
                              {member.bio}
                            </p>
                            {member.bio2 && (
                              <p className="text-base sm:text-lg leading-relaxed text-black/85 font-normal">
                                {member.bio2}
                              </p>
                            )}
                            <blockquote className="border-l-4 border-primary pl-4 py-2 mt-4 text-sm sm:text-base italic font-medium text-black/80 bg-black/[0.02]">
                              "{member.quote}"
                            </blockquote>
                            <div className="pt-2 flex items-center gap-3">
                              <span className="px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                                {member.dept}
                              </span>
                              <span className="px-3.5 py-1 rounded-full border border-black/20 text-black text-xs font-bold uppercase tracking-wider">
                                {member.badge}
                              </span>
                            </div>
                          </div>

                          {/* Right Column: Square/Portrait Image with Top-Left Primary Dot */}
                          <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-gray-100">
                              {/* Signature Primary Dot at Top-Left */}
                              <div className="absolute top-4 left-4 z-20 size-3.5 rounded-full bg-primary shadow-md ring-4 ring-white" />
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Grid View Card (Matches Image 1: Frameless, clean rectangular photo, no card borders or category badges)
                const isAnyHovered = hoveredGridId !== null;
                const isCardTargeted =
                  hoveredGridId === member.id ||
                  (hoveredGridId === null && isExpanded);
                const shouldDim = isAnyHovered
                  ? hoveredGridId !== member.id
                  : expandedMemberId !== null && !isExpanded;

                const isCurrentRowEnd =
                  index === insertAfterIndex && expandedMember;

                return (
                  <Fragment key={member.id}>
                    <div
                      data-flip-id={`team-flip-${member.id}`}
                      onClick={() => handleMemberToggle(member.id)}
                      onMouseEnter={(e) => handleCardMouseEnter(member, e)}
                      onMouseMove={(e) => handleCardMouseMove(member, e)}
                      onMouseLeave={handleCardMouseLeave}
                      className="group relative flex flex-col cursor-pointer select-none"
                    >
                      {/* Clean Rectangular Photo Container without card box or enclosing border */}
                      <div
                        className={`relative aspect-square w-full overflow-hidden bg-neutral-100 transition-all duration-300 ${shouldDim
                          ? "opacity-35 filter contrast-[0.95] brightness-[1.05]"
                          : "opacity-100"
                          }`}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`w-full h-full object-cover object-top transition-transform duration-500 ${isCardTargeted ? "scale-105" : "scale-100"
                            }`}
                          loading="lazy"
                        />

                        {/* Semi-transparent white-wash overlay when dimmed */}
                        {shouldDim && (
                          <div className="absolute inset-0 bg-white/40 pointer-events-none transition-opacity duration-300" />
                        )}
                      </div>

                      {/* Name and Role directly below photo (No department labels, no card wrapper) */}
                      <div className="pt-3.5 sm:pt-4 space-y-0.5">
                        <h3
                          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-250 ease-in-out ${isExpanded || isCardTargeted
                            ? "text-primary"
                            : "text-black group-hover:text-primary"
                            }`}
                        >
                          {member.name}
                        </h3>
                        <p
                          className={`text-sm sm:text-base font-normal transition-colors duration-250 ease-in-out ${isExpanded || isCardTargeted
                            ? "text-primary"
                            : "text-black/60 group-hover:text-primary"
                            }`}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Grid Inline Accordion Detail: Expands full-width right below the row of the clicked member */}
                    {isCurrentRowEnd && (
                      <div
                        key={`grid-expanded-row-${expandedMember.id}`}
                        className="col-span-1 sm:col-span-2 md:col-span-3 w-full py-8 sm:py-14 my-4 border-t border-b border-black/15 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-reveal"
                      >
                        {/* Header: Name on left in primary, Role & Slanted Arrow on right in primary */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-black/10">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
                            {expandedMember.name}
                          </h3>
                          <div className="flex items-center gap-3 text-primary">
                            <span className="text-base sm:text-xl font-bold tracking-tight">
                              {expandedMember.role}
                            </span>
                            <ArrowUpRight className="size-5 sm:size-6 stroke-[2.5]" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedMemberId(null);
                              }}
                              className="ml-3 sm:ml-5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/5 hover:bg-primary hover:text-white text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              <span>Close</span>
                              <X className="size-3" />
                            </button>
                          </div>
                        </div>

                        {/* 2-Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8">
                          {/* Left Column: Rich editorial bio paragraphs + quote + tags + signature dot */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-base sm:text-lg leading-relaxed text-black/85 font-normal">
                              {expandedMember.bio}
                            </p>
                            {expandedMember.bio2 && (
                              <p className="text-base sm:text-lg leading-relaxed text-black/85 font-normal">
                                {expandedMember.bio2}
                              </p>
                            )}
                            <blockquote className="border-l-4 border-primary pl-4 py-2 mt-4 text-sm sm:text-base italic font-medium text-black/80 bg-black/[0.02]">
                              "{expandedMember.quote}"
                            </blockquote>
                            <div className="pt-2 flex items-center gap-3 flex-wrap">
                              <span className="px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                                {expandedMember.dept}
                              </span>
                              <span className="px-3.5 py-1 rounded-full border border-black/20 text-black text-xs font-bold uppercase tracking-wider">
                                {expandedMember.badge}
                              </span>
                              <div className="size-3.5 rounded-full bg-primary ml-2 shadow-sm" />
                            </div>
                          </div>

                          {/* Right Column: Square/Portrait Image with Top-Left Primary Dot */}
                          <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-sm aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-gray-100">
                              <div className="absolute top-4 left-4 z-20 size-3.5 rounded-full bg-primary shadow-md ring-4 ring-white" />
                              <img
                                src={expandedMember.image}
                                alt={expandedMember.name}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SCENE 05 — FUTURE VISION & CLOSING
            "05 BUILT WITH VISION. MADE FOR WHAT'S NEXT."
            Twilight Lake Villa background + Glowing TN-PVC Logo
            Strictly matches user's reference screenshot composition
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="scene-05"
          data-scene="05"
          className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-luxury-dark text-white border-t border-white/10 scroll-mt-16 sm:scroll-mt-20"
        >
          {/* Full-bleed Twilight Villa Lakefront Architectural Background */}
          <div className="absolute inset-0 z-0 origin-center will-change-transform">
            <img
              data-closing-bg
              src={cloudinaryAssets.futureArchitecture.url}
              alt={cloudinaryAssets.futureArchitecture.alt}
              className="h-full w-full object-cover object-center filter brightness-[0.48] contrast-[1.12]"
              loading="lazy"
            />
            {/* Ambient Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-luxury-dark/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/70 via-transparent to-luxury-dark/70" />
          </div>

          <div className="container relative z-10 mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Column: Number, Line, Headline, Subtext, Triple CTAs */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6" data-reveal-text>

                {/* Editorial Headline */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.06]">
                  BUILT WITH VISION.
                  <br />
                  MADE FOR WHAT'S NEXT.
                </h2>

                {/* Subtext */}
                <p className="text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-white/80 max-w-lg">
                  Expanding possibilities. Creating better spaces.
                  <br />
                  Growing together.
                </p>

                {/* Action Buttons matching screenshot & WhatsApp first */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-3 sm:pt-4">
                  {/* Primary Pill CTA */}
                  <Link
                    to="/clients"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 sm:px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer text-center"
                  >
                    <span>Explore Our Work</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Prominent Glowing TN-PVC Logo matching screenshot */}
              <div
                data-closing-logo
                className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md shadow-2xl relative"
              >
                {/* Ambient Behind Glow */}
                <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl pointer-events-none" />

                {/* Logo & Subtitle */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="size-24 sm:size-28 flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-md">
                    <img
                      src={tnPvcLogo}
                      alt="TN-PVC Brand Logo"
                      className="size-16 sm:size-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                      TN-PVC
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary">
                      INTERIORS &nbsp;|&nbsp; MANUFACTURING &nbsp;|&nbsp; SOLUTIONS
                    </p>
                  </div>

                  <p className="text-xs text-white/50 max-w-xs pt-2">
                    Tamil Nadu's Comprehensive PVC Trade & Interior Ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout >
  );
};

export default About;
