import { MapPin, Phone, Globe, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";

export const PromoSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const PartnerCard = ({ 
    name, 
    owner,
    phone, 
    location, 
    tags, 
    logo, 
    headerBg,
    headerAccent,
    isRealPlast = false
  }: any) => (
    <article className="h-full flex flex-col bg-white overflow-hidden rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all group">
      {/* Brand Header */}
      <header className={cn("relative p-6 flex flex-col items-center justify-center text-center text-white overflow-hidden", headerBg)}>
        <div className={cn("absolute top-0 right-0 w-24 h-full -skew-x-12 translate-x-12", headerAccent)} />
        <div className="relative z-10 space-y-3">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg inline-block border border-white/20">
             {isRealPlast ? (
               <div className="text-[#CC1E1E] font-black text-xl italic tracking-tighter flex items-center bg-yellow-400 px-2 py-1 rounded">
                 REAL<span className="text-black text-xs not-italic ml-1 border-2 border-black px-1 font-bold">PLAST</span>
               </div>
             ) : (
               <div className="size-10 rounded-full bg-white flex items-center justify-center text-primary shadow-xl mx-auto">
                 <span className="text-sm font-black italic">{logo}</span>
               </div>
             )}
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-black tracking-tight uppercase leading-none">{name}</h3>
            <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest">{owner}</p>
          </div>
        </div>
      </header>

      {/* Info Body */}
      <div className="p-5 lg:p-6 flex-1 space-y-4 bg-white">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 group/item">
            <div className="size-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <Phone className="size-3.5" />
            </div>
            <span className="text-xs font-black text-foreground">{phone}</span>
          </div>
          <div className="flex items-center gap-2.5 group/item">
            <div className="size-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
              <MapPin className="size-3.5" />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight truncate">{location}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
          {tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-muted rounded-lg text-[9px] font-bold text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  const partners = [
    {
      name: "Real Plast",
      owner: "Dinesh Kumar",
      phone: "+91 90922 90997",
      location: "Salem, Tamil Nadu",
      tags: ["UPVC", "Modular", "Profiles"],
      headerBg: "bg-[#2D5A6B]",
      headerAccent: "bg-yellow-400/10",
      isRealPlast: true
    },
    {
      name: "Ero Enterprises",
      owner: "Siva Sankar D",
      phone: "+91 99625 26199",
      location: "Arumbakkam, Chennai",
      tags: ["PVC Doors", "UPVC", "Panels"],
      logo: "ERO",
      headerBg: "bg-sky-600",
      headerAccent: "bg-white/10"
    },
    {
      name: "Ramdev Profiles",
      owner: "Sales Department",
      phone: "+91 90922 90998",
      location: "Gujarat, India",
      tags: ["Profiles", "Wholesale", "PVC"],
      logo: "RAM",
      headerBg: "bg-emerald-600",
      headerAccent: "bg-white/10"
    },
    {
      name: "Salem Interiors",
      owner: "Vignesh Kumar",
      phone: "+91 98765 43210",
      location: "Salem Main Road",
      tags: ["Installation", "Design", "PVC"],
      logo: "SI",
      headerBg: "bg-indigo-600",
      headerAccent: "bg-white/10"
    },
    {
      name: "Chennai PVC Hub",
      owner: "Prakash Raj",
      phone: "+91 91234 56789",
      location: "Ambattur, Chennai",
      tags: ["Supply", "Doors", "Panels"],
      logo: "CPH",
      headerBg: "bg-rose-600",
      headerAccent: "bg-white/10"
    }
  ];

  return (
    <div className="w-full relative group/carousel">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4 items-stretch">
          {partners.map((partner, idx) => (
            <CarouselItem key={idx} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <PartnerCard {...partner} />
            </CarouselItem>
          ))}
          <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="h-full bg-primary/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-primary/20 hover:bg-primary/10 transition-colors group">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="size-5 text-primary" />
              </div>
              <h3 className="text-sm font-black mb-1">Your Brand</h3>
              <p className="text-[9px] text-muted-foreground font-medium mb-4 leading-tight">
                Join the fastest growing PVC network.
              </p>
              <a href="/#register" className="primary-btn h-8 px-4 text-[10px]">
                Partner
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-4 -right-4 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity">
          <CarouselPrevious className="pointer-events-auto relative left-0 translate-x-0 size-10 rounded-full bg-white/90 backdrop-blur shadow-lg border-border/50 hover:bg-primary hover:text-white transition-all" />
          <CarouselNext className="pointer-events-auto relative right-0 translate-x-0 size-10 rounded-full bg-white/90 backdrop-blur shadow-lg border-border/50 hover:bg-primary hover:text-white transition-all" />
        </div>
      </Carousel>

      {/* Pagination Indicators (Dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "w-[10px] h-[10px] min-w-[10px] max-w-[10px] min-h-[10px] max-h-[10px] rounded-full transition-all duration-300",
              current === i + 1 
                ? "bg-primary shadow-sm" 
                : "bg-primary/20 hover:bg-primary/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
