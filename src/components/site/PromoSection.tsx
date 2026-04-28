import { MapPin, Phone, Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./PageHero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export const PromoSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const RealPlastAd = () => (
    <div className="h-full flex flex-col mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/50 shadow-2xl transition-all hover:shadow-primary/5">
      <div className="grid md:grid-cols-[1fr_0.8fr] flex-1">
        {/* Left Info Column */}
        <div className="p-8 lg:p-12 space-y-8 bg-white">
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="size-10 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
                <Phone className="size-5" />
              </div>
              <span className="text-lg font-black text-foreground">+91 90922 90997</span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="size-10 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
                <Mail className="size-5" />
              </div>
              <span className="text-lg font-black text-foreground">ramdevprofiles@gmail.com</span>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="size-10 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform">
                <Globe className="size-5" />
              </div>
              <span className="text-lg font-black text-foreground">www.realplast.in</span>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="size-10 rounded-full bg-yellow-400 flex items-center justify-center text-black shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-black text-foreground uppercase tracking-tight">Ramdev Profiles</p>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  At. & Po. Tajpur (Oran)<br />
                  Ta-Prantij, Dist-Sabarkantha,<br />
                  Nh8, Gujarat, INDIA-383205.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Branding Column */}
        <div className="relative bg-[#2D5A6B] p-12 flex flex-col items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-full bg-yellow-400/10 -skew-x-12 translate-x-16" />
          
          <div className="relative z-10 space-y-8">
            <div className="bg-yellow-400 p-4 rounded-lg inline-block shadow-lg">
              <div className="text-[#CC1E1E] font-black text-4xl italic tracking-tighter flex items-center">
                REAL<span className="text-black text-xl not-italic ml-1 border-2 border-black px-1 font-bold">PLAST</span>
                <span className="text-[10px] align-top">®</span>
              </div>
              <p className="text-black text-[10px] font-black tracking-[0.2em] mt-1 uppercase">UPVC Modular Furniture</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tight">Dinesh Kumar</h3>
              <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest">(South Regional Marketing Head)</p>
              <p className="text-sm font-medium text-white/80">(TN, PY, KL)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div className="bg-yellow-400 p-8 text-center border-t border-black/5">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center max-w-4xl mx-auto mb-8">
            <div className="text-[#CC1E1E] font-black text-2xl italic tracking-tighter">
              REAL<span className="text-black text-sm not-italic ml-1 border-2 border-black px-1 font-bold">GOLD</span>
              <span className="text-[8px] align-top">™</span>
            </div>
            <div className="text-[#CC1E1E] font-black text-2xl italic tracking-tighter">
              REAL<span className="text-black text-sm not-italic ml-1 border-2 border-black px-1 font-bold">PLAST</span>
              <span className="text-[8px] align-top">®</span>
            </div>
            <div className="bg-black text-white px-3 py-1 inline-flex flex-col leading-none rounded">
              <span className="font-black text-xl italic text-red-600">SAMAY</span>
              <span className="text-[8px] font-bold text-white tracking-widest uppercase">PVC Profiles</span>
            </div>
            <div className="relative inline-flex items-center">
               <span className="text-red-600 font-black text-4xl italic">eva</span>
               <div className="ml-1 flex flex-col items-start leading-none">
                 <span className="bg-red-600 text-white text-[10px] font-black px-1 rounded-sm">PVC</span>
                 <span className="text-[8px] font-bold text-black mt-0.5">®</span>
               </div>
            </div>
         </div>

         <div className="space-y-1">
           <p className="text-sm font-black text-black uppercase tracking-widest">South Regional Head Office & Showroom</p>
           <p className="text-sm font-bold text-black/70">
             No 2, Sankagiri Main Road, Opp to Aravind Eye Hospital,<br />
             Nethimedu, Salem - 636 002. Tamil Nadu, India.
           </p>
         </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container space-y-12">
        <SectionIntro
          eyebrow="Marketplace"
          title="Featured Partners & Brands"
          description="Connecting you with the most trusted manufacturers and suppliers in the PVC interior ecosystem."
          align="center"
        />

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="items-stretch">
            <CarouselItem className="h-full">
              <RealPlastAd />
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="h-full bg-primary/5 rounded-[2rem] p-12 lg:p-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-primary/20">
                <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Globe className="size-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-4">Want to Feature Your Brand?</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 font-medium">
                  Join the fastest growing PVC network in Tamil Nadu and get your brand in front of thousands of professionals.
                </p>
                <a href="/#register" className="primary-btn h-12 px-8">
                  Partner with Us
                </a>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious className="-left-16" />
            <CarouselNext className="-right-16" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
