import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Factory,
  Layers,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
  Wrench,
  X,
} from "lucide-react";

import { Seo } from "@/components/seo/Seo";
import { SiteLayout } from "@/components/site/SiteLayout";
import { marqueeCities, seoByPath } from "@/data/siteData";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════════════
   DESIGN SYSTEM CONSTANTS & TOKENS ($30k Bespoke B2B Standard)
   Palette: #F7F6F3 (page), #FFFFFF (surface), #1B1923 (ink),
            #716B7D (muted ink), #6A39E9 (brand violet),
            #352078 (brand deep), #EEE8FF (brand soft),
            #19A979 (verified success), #1D172B (dark section),
            #E5E1E9 (hairline)
   Corners: Sharp or near-sharp (0-4px radius)
   ═══════════════════════════════════════════════════════════════════ */

// Topological trade hubs in Tamil Nadu for the geometric network schematic
interface TradeHub {
  id: string;
  name: string;
  district: string;
  x: number;
  y: number;
  type: "manufacturing" | "logistics" | "commercial" | "port";
  metric: string;
  role: string;
  keyConnectors: string[];
}

const TAMIL_NADU_HUBS: TradeHub[] = [
  {
    id: "chennai",
    name: "Chennai",
    district: "Chennai",
    x: 430,
    y: 85,
    type: "commercial",
    metric: "320+ Trade Partners",
    role: "State Capital Commercial Headquarters & Export Gate",
    keyConnectors: ["vellore", "salem"],
  },
  {
    id: "vellore",
    name: "Vellore",
    district: "Vellore",
    x: 345,
    y: 110,
    type: "logistics",
    metric: "45+ Contractors",
    role: "Northern Transit & Hardware Distribution Corridor",
    keyConnectors: ["chennai", "salem"],
  },
  {
    id: "salem",
    name: "Salem",
    district: "Salem",
    x: 275,
    y: 220,
    type: "logistics",
    metric: "90+ Contractors",
    role: "Central Heavy Material Rail & Freight Depot Hub",
    keyConnectors: ["vellore", "erode", "trichy"],
  },
  {
    id: "erode",
    name: "Erode",
    district: "Erode",
    x: 215,
    y: 260,
    type: "manufacturing",
    metric: "65+ Trade Firms",
    role: "Western Sheet Supply & Edge-Banding Plant Belt",
    keyConnectors: ["salem", "coimbatore", "tiruppur"],
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    district: "Coimbatore",
    x: 135,
    y: 295,
    type: "manufacturing",
    metric: "180+ Contractors",
    role: "Western Extrusion Manufacturing & Precision Tooling Center",
    keyConnectors: ["erode", "tiruppur", "dindigul"],
  },
  {
    id: "tiruppur",
    name: "Tiruppur",
    district: "Tiruppur",
    x: 180,
    y: 305,
    type: "commercial",
    metric: "110+ Contractors",
    role: "Rapid Commercial Fitment & Industrial Interior Hub",
    keyConnectors: ["erode", "coimbatore", "karur"],
  },
  {
    id: "karur",
    name: "Karur",
    district: "Karur",
    x: 245,
    y: 320,
    type: "logistics",
    metric: "35+ Depot Units",
    role: "Central Transit Warehousing & Hardware Links",
    keyConnectors: ["tiruppur", "trichy", "dindigul"],
  },
  {
    id: "trichy",
    name: "Trichy",
    district: "Trichy",
    x: 310,
    y: 335,
    type: "logistics",
    metric: "125+ Contractors",
    role: "Geographic Center & Strategic Regional Dispatch Depot",
    keyConnectors: ["salem", "karur", "thanjavur", "madurai"],
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    district: "Thanjavur",
    x: 380,
    y: 350,
    type: "commercial",
    metric: "50+ Interior Teams",
    role: "Cauvery Delta Architectural & Residential Supply",
    keyConnectors: ["trichy"],
  },
  {
    id: "dindigul",
    name: "Dindigul",
    district: "Dindigul",
    x: 225,
    y: 395,
    type: "logistics",
    metric: "55+ Trade Units",
    role: "South-Central Lock & Structural Hardware Depot",
    keyConnectors: ["karur", "coimbatore", "madurai"],
  },
  {
    id: "madurai",
    name: "Madurai",
    district: "Madurai",
    x: 250,
    y: 450,
    type: "commercial",
    metric: "160+ Contractors",
    role: "Southern Commercial Core & Distribution Crossroads",
    keyConnectors: ["dindigul", "trichy", "virudhunagar", "thoothukudi"],
  },
  {
    id: "virudhunagar",
    name: "Virudhunagar",
    district: "Virudhunagar",
    x: 240,
    y: 495,
    type: "commercial",
    metric: "40+ Trade Units",
    role: "Southern Trade Depot & Wholesale Procurement",
    keyConnectors: ["madurai", "tirunelveli"],
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    district: "Tirunelveli",
    x: 215,
    y: 550,
    type: "commercial",
    metric: "75+ Interior Teams",
    role: "Deep South Regional Hub & Workforce Mobilization",
    keyConnectors: ["virudhunagar", "thoothukudi", "kanniyakumari"],
  },
  {
    id: "thoothukudi",
    name: "Thoothukudi",
    district: "Thoothukudi",
    x: 275,
    y: 550,
    type: "port",
    metric: "Port Inflow Hub",
    role: "Raw Polymer Maritime Inflow & Coastal Depot",
    keyConnectors: ["madurai", "tirunelveli"],
  },
  {
    id: "kanniyakumari",
    name: "Nagercoil",
    district: "Kanniyakumari",
    x: 195,
    y: 600,
    type: "commercial",
    metric: "35+ Active Teams",
    role: "Southernmost Peninsula Fitment Operations",
    keyConnectors: ["tirunelveli"],
  },
];

// District regions with verified geographic distribution across Tamil Nadu
type RegionZone = "all" | "north" | "west" | "central" | "south";

interface DistrictInfo {
  name: string;
  region: RegionZone;
  regionLabel: string;
  hub: string;
  depotStatus: "Active Regional Depot" | "Direct Link Hub" | "Express Sourcing Point";
  activePartners: string;
}

const DISTRICT_DATABASE: DistrictInfo[] = [
  // North Hub
  { name: "Chennai", region: "north", regionLabel: "Northern Corridor", hub: "State HQ Depot", depotStatus: "Active Regional Depot", activePartners: "320+ Members" },
  { name: "Chengalpattu", region: "north", regionLabel: "Northern Corridor", hub: "Chennai South Depot", depotStatus: "Active Regional Depot", activePartners: "85+ Members" },
  { name: "Kanchipuram", region: "north", regionLabel: "Northern Corridor", hub: "Kanchi Industrial Hub", depotStatus: "Active Regional Depot", activePartners: "60+ Members" },
  { name: "Tiruvallur", region: "north", regionLabel: "Northern Corridor", hub: "North Coastal Corridor", depotStatus: "Direct Link Hub", activePartners: "55+ Members" },
  { name: "Vellore", region: "north", regionLabel: "Northern Corridor", hub: "Vellore Regional Hub", depotStatus: "Active Regional Depot", activePartners: "70+ Members" },
  { name: "Ranipet", region: "north", regionLabel: "Northern Corridor", hub: "Arcot Belt Depot", depotStatus: "Direct Link Hub", activePartners: "40+ Members" },
  { name: "Tirupathur", region: "north", regionLabel: "Northern Corridor", hub: "Vellore Sub-Hub", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Tiruvannamalai", region: "north", regionLabel: "Northern Corridor", hub: "Temple City Depot", depotStatus: "Direct Link Hub", activePartners: "45+ Members" },

  // West Corridor
  { name: "Coimbatore", region: "west", regionLabel: "Western Corridor", hub: "Kongu Extrusion Center", depotStatus: "Active Regional Depot", activePartners: "180+ Members" },
  { name: "Tiruppur", region: "west", regionLabel: "Western Corridor", hub: "Apparel City Hub", depotStatus: "Active Regional Depot", activePartners: "110+ Members" },
  { name: "Erode", region: "west", regionLabel: "Western Corridor", hub: "Perundurai Plant Depot", depotStatus: "Active Regional Depot", activePartners: "80+ Members" },
  { name: "Salem", region: "west", regionLabel: "Western Corridor", hub: "Salem Rail & Road Hub", depotStatus: "Active Regional Depot", activePartners: "95+ Members" },
  { name: "Namakkal", region: "west", regionLabel: "Western Corridor", hub: "Transport City Depot", depotStatus: "Direct Link Hub", activePartners: "50+ Members" },
  { name: "Dharmapuri", region: "west", regionLabel: "Western Corridor", hub: "North-West Transit Point", depotStatus: "Express Sourcing Point", activePartners: "35+ Members" },
  { name: "Krishnagiri", region: "west", regionLabel: "Western Corridor", hub: "Hosur Border Corridor", depotStatus: "Active Regional Depot", activePartners: "65+ Members" },
  { name: "Nilgiris", region: "west", regionLabel: "Western Corridor", hub: "Ooty Mountain Link", depotStatus: "Express Sourcing Point", activePartners: "25+ Members" },

  // Central & Delta
  { name: "Trichy", region: "central", regionLabel: "Central & Delta", hub: "State Central Dispatch", depotStatus: "Active Regional Depot", activePartners: "130+ Members" },
  { name: "Thanjavur", region: "central", regionLabel: "Central & Delta", hub: "Delta Central Depot", depotStatus: "Active Regional Depot", activePartners: "65+ Members" },
  { name: "Karur", region: "central", regionLabel: "Central & Delta", hub: "Textile Corridor Hub", depotStatus: "Direct Link Hub", activePartners: "45+ Members" },
  { name: "Dindigul", region: "central", regionLabel: "Central & Delta", hub: "Lock City Supply Point", depotStatus: "Active Regional Depot", activePartners: "60+ Members" },
  { name: "Perambalur", region: "central", regionLabel: "Central & Delta", hub: "NH-45 Express Link", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Ariyalur", region: "central", regionLabel: "Central & Delta", hub: "Cement Belt Link", depotStatus: "Express Sourcing Point", activePartners: "25+ Members" },
  { name: "Pudukkottai", region: "central", regionLabel: "Central & Delta", hub: "Delta South Depot", depotStatus: "Direct Link Hub", activePartners: "40+ Members" },
  { name: "Tiruvarur", region: "central", regionLabel: "Central & Delta", hub: "East Delta Point", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Nagapattinam", region: "central", regionLabel: "Central & Delta", hub: "Coastal Transit Depot", depotStatus: "Direct Link Hub", activePartners: "35+ Members" },
  { name: "Mayiladuthurai", region: "central", regionLabel: "Central & Delta", hub: "North Delta Depot", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },

  // Southern Belt
  { name: "Madurai", region: "south", regionLabel: "Southern Belt", hub: "Pandyan Commercial Hub", depotStatus: "Active Regional Depot", activePartners: "165+ Members" },
  { name: "Virudhunagar", region: "south", regionLabel: "Southern Belt", hub: "Southern Trade Hub", depotStatus: "Direct Link Hub", activePartners: "50+ Members" },
  { name: "Theni", region: "south", regionLabel: "Southern Belt", hub: "Valley Transit Point", depotStatus: "Express Sourcing Point", activePartners: "35+ Members" },
  { name: "Sivaganga", region: "south", regionLabel: "Southern Belt", hub: "Chettinad Link Hub", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Ramanathapuram", region: "south", regionLabel: "Southern Belt", hub: "Coastal South Point", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Tirunelveli", region: "south", regionLabel: "Southern Belt", hub: "Deep South Regional Depot", depotStatus: "Active Regional Depot", activePartners: "80+ Members" },
  { name: "Tenkasi", region: "south", regionLabel: "Southern Belt", hub: "Foot-Hill Supply Hub", depotStatus: "Express Sourcing Point", activePartners: "35+ Members" },
  { name: "Thoothukudi", region: "south", regionLabel: "Southern Belt", hub: "Maritime Port Depot", depotStatus: "Active Regional Depot", activePartners: "75+ Members" },
  { name: "Kanniyakumari", region: "south", regionLabel: "Southern Belt", hub: "Nagercoil District Hub", depotStatus: "Direct Link Hub", activePartners: "45+ Members" },
  { name: "Kallakurichi", region: "south", regionLabel: "Southern Belt", hub: "Mid-South Link Depot", depotStatus: "Express Sourcing Point", activePartners: "30+ Members" },
  { name: "Cuddalore", region: "south", regionLabel: "Southern Belt", hub: "Coastal Mid-Point", depotStatus: "Direct Link Hub", activePartners: "50+ Members" },
  { name: "Villupuram", region: "south", regionLabel: "Southern Belt", hub: "Grand Southern Gateway", depotStatus: "Active Regional Depot", activePartners: "60+ Members" },
];

/* ═══════════════════════════════════════════════════════════════════
   PIPELINE STAGES DATA
   ═══════════════════════════════════════════════════════════════════ */
const SUPPLY_STAGES = [
  {
    step: "01",
    title: "Extrusion & Sheet Manufacturing",
    metric: "24+ Partner Plants",
    detail:
      "Direct industrial extrusion of lead-free, eco-friendly PVC & UPVC panels, fluted profiles, and laminated sheets.",
    icon: Factory,
  },
  {
    step: "02",
    title: "South India Transit Freight",
    metric: "Dedicated Logistics Fleet",
    detail:
      "Bulk palletized freight movement from regional production mills directly into regional Tamil Nadu holding yards.",
    icon: Truck,
  },
  {
    step: "03",
    title: "Strategic District Depots",
    metric: "85+ Wholesale Hubs",
    detail:
      "Zero-stockout local warehousing across 38 districts ensuring contractor orders are staged within 24 hours.",
    icon: Warehouse,
  },
  {
    step: "04",
    title: "Contractor Planning & Quoting",
    metric: "520+ Active Teams",
    detail:
      "Precision laser site measurement, square-foot quotation transparency, and engineering blueprint sign-off.",
    icon: Compass,
  },
  {
    step: "05",
    title: "Master Guild Installation",
    metric: "1,850+ Verified Carpenters",
    detail:
      "Standardized joinery, invisible fastener fitment, and verified digital ID accountability on customer premises.",
    icon: Wrench,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN NETWORK PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export const Network = () => {
  const seo = seoByPath["/network"] || {
    title: "Network Registry | TN-PVC Interiors — 38 Districts, 2,500+ Members",
    description:
      "Official B2B PVC & UPVC trade ecosystem across Tamil Nadu connecting contractors, carpenters, dealers, and manufacturers.",
    keywords: ["TN-PVC Network", "Tamil Nadu PVC Trade", "B2B PVC Interiors"],
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<TradeHub>(TAMIL_NADU_HUBS[4]); // Default to Coimbatore (Manufacturing Core)
  const [activeRegion, setActiveRegion] = useState<RegionZone>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDistrict, setActiveDistrict] = useState<DistrictInfo>(DISTRICT_DATABASE[0]);

  // GSAP Cinematic ScrollTrigger Suite (Award-calibre, strictly restrained)
  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // 1. Hero Content Mask Reveal
          gsap.fromTo(
            "[data-hero-reveal]",
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            }
          );

          // 2. Map Vector Drawing Line Transition
          gsap.fromTo(
            "[data-map-route]",
            { strokeDashoffset: 400, opacity: 0.2 },
            {
              strokeDashoffset: 0,
              opacity: 0.8,
              duration: 1.6,
              ease: "power2.inOut",
              stagger: 0.08,
            }
          );

          // 3. Section Headers & Metrics Stagger
          const revealSections = gsap.utils.toArray<HTMLElement>("[data-section-reveal]");
          revealSections.forEach((sec) => {
            gsap.fromTo(
              sec,
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: sec,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          });

          // 4. Five-Stage Supply Line Drawing
          gsap.fromTo(
            "[data-supply-track]",
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "[data-supply-section]",
                start: "top 75%",
                once: true,
              },
            }
          );
        }
      );

      // Reduced motion fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-reveal], [data-section-reveal], [data-supply-track]", {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Filtered districts list based on region tab and search string
  const filteredDistricts = useMemo(() => {
    return DISTRICT_DATABASE.filter((item) => {
      const matchesRegion = activeRegion === "all" || item.region === activeRegion;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.hub.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesRegion && matchesSearch;
    });
  }, [activeRegion, searchQuery]);

  return (
    <SiteLayout>
      <Seo
        {...seo}
        path="/network"
        title="Network Registry | TN-PVC Interiors — 38 Districts, 2,500+ Members"
      />

      <div
        ref={containerRef}
        className="min-h-screen bg-[#F7F6F3] text-[#1B1923] selection:bg-[#EEE8FF] selection:text-[#352078] antialiased"
      >
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 02 — HERO: THE STATEWIDE NETWORK
            Bespoke editorial composition with interactive Tamil Nadu
            topological network schematic.
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E5E1E9] overflow-hidden bg-[#F7F6F3]">
          {/* Subtle Precision Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#1B1923 1px, transparent 1px), linear-gradient(90deg, #1B1923 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl relative z-10">
            {/* Top Index & Verification Eyebrow */}
            <div data-hero-reveal className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-sm border border-[#E5E1E9] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6A39E9]">
                <span className="size-2 rounded-full bg-[#19A979] animate-pulse" />
                Verified B2B Trade Grid
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold tracking-wider text-[#716B7D] uppercase">
                38 Districts · 2,500+ Active Members
              </span>
            </div>

            {/* Split Hero Layout: Left Editorial Typography, Right Precision Schematic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column (7 cols): Editorial Typography & Direct CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <h1
                  data-hero-reveal
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1B1923] uppercase leading-[1.04]"
                >
                  THE STATEWIDE
                  <br />
                  <span className="text-[#6A39E9]">CONNECTION</span> SYSTEM
                  <br />
                  FOR PVC INTERIORS.
                </h1>

                <p
                  data-hero-reveal
                  className="text-base sm:text-lg font-normal leading-relaxed text-[#716B7D] max-w-xl"
                >
                  TN-PVC is not a static directory. It is the operating infrastructure
                  uniting Tamil Nadu’s extrusion plants, 85+ strategic regional depots,
                  520+ verified interior contractors, and 1,850+ master carpentry technicians.
                </p>

                {/* Primary & Secondary Action Pair */}
                <div data-hero-reveal className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/register#register-section"
                    className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#6A39E9] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#352078] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A39E9]"
                  >
                    <span>Join the Network</span>
                    <ArrowRight className="size-3.5" />
                  </Link>

                  <a
                    href="#district-explorer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#E5E1E9] bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-all duration-200 hover:border-[#6A39E9] hover:text-[#6A39E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A39E9]"
                  >
                    <span>Explore 38 Districts</span>
                    <MapPin className="size-3.5" />
                  </a>
                </div>

                {/* Compact Verified Metrics Band */}
                <div
                  data-hero-reveal
                  className="pt-8 border-t border-[#E5E1E9] grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Active Members", value: "2,500+", sub: "Verified Census" },
                    { label: "District Reach", value: "38 / 38", sub: "100% Coverage" },
                    { label: "Delivered Units", value: "4,200+", sub: "Verified Sites" },
                    { label: "Field Helpdesk", value: "24/7", sub: "Direct Desk" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-0.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#716B7D]">
                        {stat.label}
                      </p>
                      <p className="text-2xl lg:text-3xl font-black font-mono tracking-tight text-[#1B1923]">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-semibold text-[#6A39E9]">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (5 cols): Interactive Topological Vector Schematic */}
              <div className="lg:col-span-5">
                <div className="relative rounded-sm border border-[#E5E1E9] bg-white p-5 sm:p-6 shadow-sm">
                  {/* Schematic Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E1E9]">
                    <div className="flex items-center gap-2">
                      <Compass className="size-4 text-[#6A39E9]" />
                      <span className="text-xs font-black uppercase tracking-wider text-[#1B1923]">
                        Tamil Nadu Grid Topological Schematic
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#716B7D] uppercase">
                      Live Transit Nodes
                    </span>
                  </div>

                  {/* SVG Node & Route Canvas */}
                  <div className="relative mt-4 h-72 sm:h-80 w-full overflow-hidden bg-[#F7F6F3]/60 rounded-xs flex items-center justify-center">
                    <svg
                      viewBox="0 0 540 680"
                      className="h-full w-full max-h-full object-contain p-2"
                      aria-label="Schematic vector map of Tamil Nadu PVC trade network hubs"
                    >
                      <defs>
                        {/* Linear route gradient */}
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6A39E9" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#352078" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* State Geographic Contour Outline (Architectural Abstract Polyline) */}
                      <path
                        d="M 330 60 L 460 75 L 460 140 L 410 200 L 430 330 L 410 390 L 320 540 L 290 610 L 210 650 L 170 590 L 180 500 L 140 380 L 100 310 L 130 260 L 240 180 L 270 120 Z"
                        fill="none"
                        stroke="#E5E1E9"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Network Transit Route Lines */}
                      {TAMIL_NADU_HUBS.map((hub) => {
                        return hub.keyConnectors.map((targetId) => {
                          const targetHub = TAMIL_NADU_HUBS.find((h) => h.id === targetId);
                          if (!targetHub) return null;
                          const isHighlighted =
                            selectedHub.id === hub.id || selectedHub.id === targetId;

                          return (
                            <line
                              key={`${hub.id}-${targetId}`}
                              data-map-route
                              x1={hub.x}
                              y1={hub.y}
                              x2={targetHub.x}
                              y2={targetHub.y}
                              stroke={isHighlighted ? "#6A39E9" : "#E5E1E9"}
                              strokeWidth={isHighlighted ? 2.5 : 1.25}
                              strokeOpacity={isHighlighted ? 1 : 0.6}
                              strokeDasharray={isHighlighted ? "none" : "3 3"}
                              className="transition-colors duration-300"
                            />
                          );
                        });
                      })}

                      {/* Hub Circles and Interactive Markers */}
                      {TAMIL_NADU_HUBS.map((hub) => {
                        const isSelected = selectedHub.id === hub.id;
                        return (
                          <g
                            key={hub.id}
                            className="cursor-pointer focus:outline-none"
                            tabIndex={0}
                            role="button"
                            aria-label={`Select ${hub.name} node`}
                            onClick={() => setSelectedHub(hub)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setSelectedHub(hub);
                              }
                            }}
                          >
                            {/* Pulse Aura for active/selected node */}
                            {isSelected && (
                              <circle
                                cx={hub.x}
                                cy={hub.y}
                                r={16}
                                fill="#6A39E9"
                                fillOpacity={0.15}
                                className="animate-ping"
                              />
                            )}

                            {/* Base Outer Ring */}
                            <circle
                              cx={hub.x}
                              cy={hub.y}
                              r={isSelected ? 9 : 6}
                              fill={isSelected ? "#6A39E9" : "#FFFFFF"}
                              stroke={isSelected ? "#352078" : "#6A39E9"}
                              strokeWidth={isSelected ? 2.5 : 1.5}
                              className="transition-all duration-200"
                            />

                            {/* Inner Core */}
                            <circle
                              cx={hub.x}
                              cy={hub.y}
                              r={isSelected ? 3.5 : 2}
                              fill={isSelected ? "#FFFFFF" : "#6A39E9"}
                            />

                            {/* Node Label Text */}
                            <text
                              x={hub.x + 12}
                              y={hub.y + 4}
                              fontSize={isSelected ? "12" : "10"}
                              fontWeight={isSelected ? "bold" : "600"}
                              fill={isSelected ? "#1B1923" : "#716B7D"}
                              className="select-none transition-colors"
                            >
                              {hub.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Active Selected Hub Inspector Card */}
                  <div className="mt-4 pt-3.5 border-t border-[#E5E1E9] flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#19A979]" />
                        <h4 className="text-sm font-black uppercase tracking-tight text-[#1B1923]">
                          {selectedHub.name} Node
                        </h4>
                        <span className="rounded-xs bg-[#EEE8FF] px-2 py-0.5 text-[10px] font-bold text-[#6A39E9] uppercase">
                          {selectedHub.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#716B7D] leading-snug">
                        {selectedHub.role}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#716B7D]">
                        Active Load
                      </p>
                      <p className="text-xs font-black font-mono text-[#6A39E9]">
                        {selectedHub.metric}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 03 — VERIFIED NETWORK METRICS
            Truthful, evidenced metrics structure with hairlines & no fluff.
            ═══════════════════════════════════════════════════════════════ */}
        <section
          data-section-reveal
          className="py-14 sm:py-16 bg-white border-b border-[#E5E1E9]"
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E1E9]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6A39E9]">
                  03 // Network Registry Census
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1B1923] uppercase mt-1">
                  Verified Stakeholder Totals Across Tamil Nadu
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#716B7D] max-w-md font-normal leading-relaxed">
                Ground-checked registry figures compiled directly from verified trade accounts,
                material depot dispatches, and WhatsApp coordination groups.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E1E9]">
              {[
                {
                  title: "Active Trade Members",
                  number: "2,500+",
                  verifiedTag: "Statewide Certified",
                  desc: "Combined roster of verified interior contractors, master fitters, dealers, and extrusion plants.",
                },
                {
                  title: "District Coverage",
                  number: "38 / 38",
                  verifiedTag: "All Revenue Districts",
                  desc: "Direct delivery links and verified field coordinators active in every district of Tamil Nadu.",
                },
                {
                  title: "Completed Installations",
                  number: "4,200+",
                  verifiedTag: "Finished Projects",
                  desc: "Turnkey residential and commercial modular PVC interior fitments executed with zero material delay.",
                },
                {
                  title: "Daily Coordination Desk",
                  number: "24/7",
                  verifiedTag: "Direct WhatsApp Desk",
                  desc: "Instant live matching of skilled carpentry squads to urgent contractor project deadlines.",
                },
              ].map((metric, i) => (
                <div
                  key={metric.title}
                  className={cn("p-6 sm:p-7 space-y-2", i !== 0 && "sm:pl-8")}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#716B7D]">
                    {metric.title}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#1B1923]">
                    {metric.number}
                  </p>
                  <div className="inline-flex items-center gap-1.5 pt-1 text-[11px] font-bold text-[#19A979]">
                    <CheckCircle2 className="size-3.5" />
                    <span>{metric.verifiedTag}</span>
                  </div>
                  <p className="text-xs text-[#716B7D] leading-relaxed pt-1">
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 04 — STAKEHOLDER ECOSYSTEM
            4 Distinct Groups with connected flow relationships.
            (Contractors, Labour/Carpenters, Dealers, Manufacturers)
            ═══════════════════════════════════════════════════════════════ */}
        <section
          data-section-reveal
          className="py-16 lg:py-24 bg-[#F7F6F3] border-b border-[#E5E1E9]"
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E1E9]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6A39E9]">
                  04 // Ecosystem Architecture
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1B1923] uppercase mt-1">
                  Four Interlocking Trade Pillars
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#716B7D] max-w-md font-normal leading-relaxed">
                Rather than treating stakeholders as isolated directory cards, TN-PVC integrates
                them into a singular, mutually dependent supply and execution loop.
              </p>
            </div>

            {/* Asymmetrical Connected Architectural Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Group 1: Contractors (Project Coordinators) */}
              <div className="rounded-sm border border-[#E5E1E9] bg-white p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#6A39E9]/60 hover:shadow-xs group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#6A39E9] bg-[#EEE8FF] px-2.5 py-1 rounded-xs">
                      520+ TEAMS
                    </span>
                    <Compass className="size-5 text-[#716B7D] group-hover:text-[#6A39E9] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1B1923]">
                      Contractors
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A39E9] mt-0.5">
                      Execution & Site Estimation
                    </p>
                  </div>

                  <p className="text-xs text-[#716B7D] leading-relaxed">
                    Verified turnkey interior contractors managing square-foot measurement, 3D
                    drawings, material requisition, and customer handover.
                  </p>

                  <div className="pt-2 space-y-2 border-t border-[#E5E1E9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Verified Business KYC</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Direct Customer Site Leads</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Wholesale Pricing Access</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register?role=contractor"
                  className="mt-6 inline-flex items-center justify-between w-full rounded-xs border border-[#E5E1E9] bg-[#F7F6F3] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-colors hover:bg-[#6A39E9] hover:text-white"
                >
                  <span>Register Contractor</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              {/* Group 2: Labour & Carpenters (The Craftsmen) */}
              <div className="rounded-sm border border-[#E5E1E9] bg-white p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#6A39E9]/60 hover:shadow-xs group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#6A39E9] bg-[#EEE8FF] px-2.5 py-1 rounded-xs">
                      1,850+ FITTERS
                    </span>
                    <Wrench className="size-5 text-[#716B7D] group-hover:text-[#6A39E9] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1B1923]">
                      Labour & Carpenters
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A39E9] mt-0.5">
                      Master Fitment & Joinery
                    </p>
                  </div>

                  <p className="text-xs text-[#716B7D] leading-relaxed">
                    Field-tested carpentry craftsmen trained in seamless PVC edge-banding, modular
                    cupboard joints, and hardware calibration.
                  </p>

                  <div className="pt-2 space-y-2 border-t border-[#E5E1E9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Digital ID Verification</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Daily Work Dispatch Queue</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Fair Wage Transparency</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register?role=labour"
                  className="mt-6 inline-flex items-center justify-between w-full rounded-xs border border-[#E5E1E9] bg-[#F7F6F3] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-colors hover:bg-[#6A39E9] hover:text-white"
                >
                  <span>Register Craftsman</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              {/* Group 3: Dealers & Showrooms (The Stockist Nodes) */}
              <div className="rounded-sm border border-[#E5E1E9] bg-white p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#6A39E9]/60 hover:shadow-xs group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#6A39E9] bg-[#EEE8FF] px-2.5 py-1 rounded-xs">
                      85+ DEPOTS
                    </span>
                    <Warehouse className="size-5 text-[#716B7D] group-hover:text-[#6A39E9] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1B1923]">
                      Dealers & Showrooms
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A39E9] mt-0.5">
                      District Material Hubs
                    </p>
                  </div>

                  <p className="text-xs text-[#716B7D] leading-relaxed">
                    Regional material showrooms and warehouse depots keeping ready inventory of
                    boards, hardware, adhesives, and trims.
                  </p>

                  <div className="pt-2 space-y-2 border-t border-[#E5E1E9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Zero Stockout Buffer</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Direct Mill-Rate Inflow</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Contractor B2B Wholesale</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register?role=dealer"
                  className="mt-6 inline-flex items-center justify-between w-full rounded-xs border border-[#E5E1E9] bg-[#F7F6F3] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-colors hover:bg-[#6A39E9] hover:text-white"
                >
                  <span>Register Showroom</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              {/* Group 4: Manufacturers (The Extrusion Mills) */}
              <div className="rounded-sm border border-[#E5E1E9] bg-white p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#6A39E9]/60 hover:shadow-xs group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#6A39E9] bg-[#EEE8FF] px-2.5 py-1 rounded-xs">
                      24+ PLANTS
                    </span>
                    <Factory className="size-5 text-[#716B7D] group-hover:text-[#6A39E9] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1B1923]">
                      Manufacturers
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A39E9] mt-0.5">
                      Raw Polymer Extrusion
                    </p>
                  </div>

                  <p className="text-xs text-[#716B7D] leading-relaxed">
                    Heavy industrial plants producing certified UV-resistant, fire-retardant,
                    termite-proof PVC sheets and precision UPVC profiles.
                  </p>

                  <div className="pt-2 space-y-2 border-t border-[#E5E1E9]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Standard Extrusion Specs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Statewide Distribution Links</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1923]">
                      <CheckCircle2 className="size-3.5 text-[#19A979]" />
                      <span>Bulk Contract Procurement</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register?role=manufacturer"
                  className="mt-6 inline-flex items-center justify-between w-full rounded-xs border border-[#E5E1E9] bg-[#F7F6F3] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-colors hover:bg-[#6A39E9] hover:text-white"
                >
                  <span>Partner as Maker</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 05 — FIVE-LAYER SUPPLY CHAIN
            Connected process route with horizontal desktop track and
            clean vertical progression on mobile.
            ═══════════════════════════════════════════════════════════════ */}
        <section
          data-supply-section
          className="py-16 lg:py-24 bg-white border-b border-[#E5E1E9]"
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl space-y-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E1E9]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6A39E9]">
                  05 // Supply Chain Operating Model
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1B1923] uppercase mt-1">
                  Five-Layer Direct Production Pipeline
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#716B7D] max-w-md font-normal leading-relaxed">
                By bypassing unauthorized middle brokers and linking extruders directly to site
                contractors, TN-PVC guarantees material purity and punctuality.
              </p>
            </div>

            {/* Desktop Horizontal Line + 5 Stages / Mobile Vertical Stack */}
            <div className="relative">
              {/* Continuous Horizontal Route Line (Desktop) */}
              <div
                data-supply-track
                className="hidden lg:block absolute top-7 left-8 right-8 h-1 bg-[#6A39E9] z-0 origin-left"
              />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                {SUPPLY_STAGES.map((stage) => {
                  const StageIcon = stage.icon;
                  return (
                    <div
                      key={stage.step}
                      className="rounded-sm border border-[#E5E1E9] bg-white p-6 flex flex-col justify-between shadow-2xs transition-all duration-200 hover:border-[#6A39E9]/40"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="size-8 rounded-full bg-[#1B1923] text-white flex items-center justify-center font-mono text-xs font-black shadow-xs">
                            {stage.step}
                          </span>
                          <StageIcon className="size-5 text-[#6A39E9]" />
                        </div>

                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight text-[#1B1923] leading-tight">
                            {stage.title}
                          </h4>
                          <p className="text-[11px] font-bold text-[#6A39E9] font-mono mt-0.5">
                            {stage.metric}
                          </p>
                        </div>

                        <p className="text-xs text-[#716B7D] leading-relaxed">
                          {stage.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 06 — DISTRICT EXPLORER
            Comprehensive 38-district search and regional dossiers.
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="district-explorer"
          data-section-reveal
          className="py-16 lg:py-24 bg-[#F7F6F3] border-b border-[#E5E1E9] scroll-mt-12"
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl space-y-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E1E9]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6A39E9]">
                  06 // Geographic Operations
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1B1923] uppercase mt-1">
                  All 38 Districts in Tamil Nadu
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#716B7D] max-w-md font-normal leading-relaxed">
                Filter and inspect individual district logistics, active regional depots,
                and direct contractor coordination desks.
              </p>
            </div>

            {/* Filter Bar & Search Input */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Regional Zone Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-sm border border-[#E5E1E9] bg-white">
                {[
                  { id: "all", label: "All 38 Districts" },
                  { id: "north", label: "North Corridor" },
                  { id: "west", label: "Western Corridor" },
                  { id: "central", label: "Central & Delta" },
                  { id: "south", label: "Southern Belt" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveRegion(tab.id as RegionZone)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer",
                      activeRegion === tab.id
                        ? "bg-[#1B1923] text-white"
                        : "text-[#716B7D] hover:text-[#1B1923] hover:bg-[#F7F6F3]"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* District Search Input */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#716B7D]" />
                <input
                  type="text"
                  placeholder="Filter by district name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-[#E5E1E9] bg-white py-2 pl-9 pr-8 text-xs font-medium text-[#1B1923] placeholder:text-[#716B7D] focus:border-[#6A39E9] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#716B7D] hover:text-[#1B1923]"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Main District Grid & Selected District Dossier Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (8 cols): Responsive Grid of Districts */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {filteredDistricts.map((item) => {
                    const isSelected = activeDistrict.name === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveDistrict(item)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-sm border text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A39E9]",
                          isSelected
                            ? "border-[#6A39E9] bg-white shadow-sm ring-1 ring-[#6A39E9]"
                            : "border-[#E5E1E9] bg-white hover:border-[#6A39E9]/40"
                        )}
                      >
                        <div className="truncate pr-1">
                          <p className="text-xs font-black uppercase tracking-tight text-[#1B1923] truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-semibold text-[#716B7D] truncate">
                            {item.hub}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0",
                            isSelected ? "bg-[#6A39E9]" : "bg-[#19A979]"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                {filteredDistricts.length === 0 && (
                  <div className="p-8 text-center border border-[#E5E1E9] bg-white rounded-sm">
                    <p className="text-sm font-semibold text-[#716B7D]">
                      No district matched your search "{searchQuery}".
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveRegion("all");
                      }}
                      className="mt-3 text-xs font-bold text-[#6A39E9] underline cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column (4 cols): Selected District Dossier Inspector */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="rounded-sm border border-[#E5E1E9] bg-white p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E1E9]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6A39E9]">
                      District Dossier
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#19A979]">
                      <span className="size-1.5 rounded-full bg-[#19A979]" />
                      Verified Active
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#1B1923]">
                      {activeDistrict.name}
                    </h3>
                    <p className="text-xs font-bold text-[#716B7D] uppercase tracking-wider mt-0.5">
                      {activeDistrict.regionLabel}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-xs border-t border-[#E5E1E9]">
                    <div className="flex justify-between py-1 border-b border-[#E5E1E9]/60">
                      <span className="text-[#716B7D]">Regional Sourcing:</span>
                      <span className="font-bold text-[#1B1923]">{activeDistrict.hub}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#E5E1E9]/60">
                      <span className="text-[#716B7D]">Depot Status:</span>
                      <span className="font-bold text-[#6A39E9]">{activeDistrict.depotStatus}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#E5E1E9]/60">
                      <span className="text-[#716B7D]">Active Network Strength:</span>
                      <span className="font-bold font-mono text-[#1B1923]">
                        {activeDistrict.activePartners}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-[#716B7D]">Dispatch Window:</span>
                      <span className="font-bold text-[#19A979]">Same-Day Staging</span>
                    </div>
                  </div>

                  {/* Direct Contact Actions for Selected District */}
                  <div className="pt-2 space-y-2">
                    <a
                      href="tel:+918870826404"
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xs bg-[#1B1923] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6A39E9]"
                    >
                      <PhoneCall className="size-3.5" />
                      <span>Contact {activeDistrict.name} Desk</span>
                    </a>

                    <Link
                      to={`/register?district=${encodeURIComponent(activeDistrict.name)}`}
                      className="inline-flex items-center justify-center w-full rounded-xs border border-[#E5E1E9] bg-[#F7F6F3] py-2 text-xs font-bold uppercase tracking-wider text-[#1B1923] transition-colors hover:bg-white hover:border-[#6A39E9]"
                    >
                      <span>Register in {activeDistrict.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 07 — CONVERSION
            Deep dark high-contrast section (#1D172B) with sharp
            editorial hierarchy and direct trade actions.
            ═══════════════════════════════════════════════════════════════ */}
        <section
          data-section-reveal
          className="py-20 lg:py-28 bg-[#1D172B] text-white border-t border-white/10"
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-5xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-xs border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#EEE8FF]">
              <ShieldCheck className="size-3.5 text-[#19A979]" />
              Trade Verification Program
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.08]">
                STAND BEHIND TAMIL NADU'S
                <br />
                <span className="text-[#EEE8FF]">FASTEST-GROWING</span> PVC TRADE NETWORK.
              </h2>
              <p className="text-sm sm:text-base font-normal text-white/70 leading-relaxed max-w-2xl mx-auto">
                Whether you operate an industrial extrusion mill, manage a district supply depot,
                or execute precision interiors on site — verify your business with TN-PVC today.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/register#register-section"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#6A39E9] px-8 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#352078] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Apply for Trade Verification</span>
                <ArrowRight className="size-4" />
              </Link>

              <a
                href="tel:+918870826404"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/10 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-white hover:text-[#1D172B] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <PhoneCall className="size-4" />
                <span>Direct Trade Helpline</span>
              </a>
            </div>

            <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 pt-4">
              Direct verification desk: +91 8870826404 &nbsp;|&nbsp; +91 8489143405
            </p>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
};

export default Network;
