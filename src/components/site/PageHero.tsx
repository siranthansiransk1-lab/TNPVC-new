import type { ReactNode } from "react";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/site/SiteLayout";
import { cn } from "@/lib/utils";
import { useWhatsApp } from "@/context/WhatsAppContext";

type Action = {
  label: string;
  to: string;
  secondary?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

export type BentoItem = {
  image: string;
  title: string;
  description: string;
  className?: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: Action[];
  aside?: ReactNode;
  compact?: boolean;
  centered?: boolean;
  image?: string;
  bentoItems?: BentoItem[]; // New prop for bento gallery
  titleClassName?: string;
  topContent?: ReactNode;
};

export const PageHero = ({ 
  eyebrow, 
  title, 
  description, 
  actions = [], 
  aside, 
  compact = false,
  centered = false,
  image,
  bentoItems,
  titleClassName,
  topContent
}: PageHeroProps) => {
  const { openWhatsAppModal } = useWhatsApp();

  if (centered) {
    return (
      <section className="relative overflow-hidden bg-mesh pt-6 pb-16 lg:pt-16 lg:pb-24">
        <div className="container relative z-10 flex flex-col items-center text-center">
          {topContent && (
            <div className="animate-reveal mb-6">
              {topContent}
            </div>
          )}
          {/* Social + Dexaz badge */}
          <div className="animate-reveal mb-6 flex flex-col items-center w-full">
            <p className="mb-4 text-[11px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-green-600" />
              Secured by Dexaz Group
            </p>
            <SocialLinks onWhatsAppClick={openWhatsAppModal} />
          </div>

          {/* Eyebrow */}
          <div className="animate-reveal mb-6">
            <Link to="/ai-pvc-groups" className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-4 py-1.5 text-xs font-bold tracking-wide text-foreground backdrop-blur-md shadow-sm transition-all hover:border-primary/40 hover:bg-white hover:shadow">
              {eyebrow}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        <header className="max-w-4xl space-y-4">
            <h1 className={cn(
              "animate-reveal delay-1 text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl lg:text-6xl lg:leading-[1.2]",
              titleClassName
            )}>
              {title}
            </h1>
            <p className="animate-reveal delay-2 mx-auto max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </header>

          {/* CTAs */}
          {actions.length > 0 && (
            <div className="animate-reveal delay-3 mt-8 flex flex-wrap justify-center gap-3">
              {actions.map((action) => {
                const Icon = action.icon;
                const isHash = action.to.startsWith("#") || action.to.startsWith("/#");
                return action.secondary ? (
                  isHash ? (
                    <a
                      key={action.to}
                      href={action.to}
                      className="secondary-btn h-14 px-10 text-base group"
                    >
                      {action.label}
                      {Icon && <Icon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                    </a>
                  ) : (
                    <Button
                      asChild
                      key={action.to}
                      variant="outline"
                      className="secondary-btn h-14 px-10 text-base group"
                    >
                      <Link to={action.to}>
                        {action.label}
                        {Icon && <Icon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                      </Link>
                    </Button>
                  )
                ) : (
                  isHash ? (
                    <a
                      key={action.to}
                      href={action.to}
                      className="primary-btn h-14 px-10 text-base group"
                    >
                      {action.label}
                      {Icon && <Icon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                    </a>
                  ) : (
                    <Link
                      key={action.to}
                      to={action.to}
                      className="primary-btn h-14 px-10 text-base group"
                    >
                      {action.label}
                      {Icon && <Icon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                    </Link>
                  )
                );
              })}
            </div>
          )}

          {/* Bento Gallery */}
          {bentoItems && bentoItems.length > 0 ? (
            <div className="animate-reveal delay-3 mt-12 grid w-full max-w-5xl gap-4 grid-cols-1 md:grid-cols-4 md:grid-rows-2">
              {bentoItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "float-card group relative flex flex-col overflow-hidden p-0 transition-all hover:shadow-2xl hover:-translate-y-1",
                    item.className
                  )}
                >
                  <figure className="relative h-full w-full">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-left">
                      <h3 className="text-lg font-black text-white">{item.title}</h3>
                      <p className="mt-1 text-xs font-medium text-white/70 line-clamp-2">{item.description}</p>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          ) : image ? (
            <div className="animate-reveal delay-3 relative mt-16 w-full max-w-5xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                <img 
                  src={image} 
                  alt="" 
                  className="w-full object-cover aspect-[21/9]" 
                />
              </div>
            </div>
          ) : null}

          {aside}
        </div>

        {/* Background "V" or geometric shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <svg className="absolute left-1/2 top-0 h-full w-[200%] -translate-x-1/2 fill-surface/30 opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L50 40 L100 0 V100 H0 Z" />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-mesh border-b border-border/40">
      <div
        className={cn(
          "container relative grid gap-10 pt-6 pb-16 lg:gap-16 lg:py-24 lg:items-center",
          compact && "py-12 lg:py-16",
        )}
      >
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="animate-reveal flex flex-col items-start">
              <p className="mb-[30px] text-[11px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-border/50 backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-green-600" /> 
                Secured by Dexaz Group
              </p>
              <SocialLinks onWhatsAppClick={openWhatsAppModal} />
            </div>
            
            <div className="animate-reveal">
              <Link to="/ai-pvc-groups" className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-5 py-2 text-xs font-bold tracking-wide text-foreground backdrop-blur-md shadow-sm transition-all hover:border-primary/40 hover:bg-white hover:shadow">
                {eyebrow}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <header className="space-y-6">
            <h1 className={cn(
              "animate-reveal delay-1 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.2]",
              titleClassName
            )}>
              {title}
            </h1>
            <p className="animate-reveal delay-2 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          </header>

          {actions.length > 0 ? (
            <div className="animate-reveal delay-3 flex flex-wrap gap-4">
              {actions.map((action) => {
                const Icon = action.icon;
                return action.secondary ? (
                  <Button
                    asChild
                    key={action.to}
                    variant="outline"
                    className="secondary-btn h-12 px-8 group"
                  >
                    <Link to={action.to}>
                      {action.label}
                      {Icon && <Icon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                    </Link>
                  </Button>
                ) : (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="primary-btn h-12 px-8 group"
                  >
                    {action.label}
                    {Icon && <Icon className="size-4 transition-transform group-hover:translate-x-1 ml-2" />}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="animate-reveal delay-3 lg:ml-auto w-full max-w-lg">
          {bentoItems && bentoItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 w-full">
              {bentoItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "float-card group relative flex flex-col overflow-hidden p-0 transition-all hover:shadow-xl hover:-translate-y-1",
                    item.className
                  )}
                >
                  <div className="relative h-full w-full aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-left">
                      <h3 className="text-sm font-black text-white leading-tight">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : image ? (
            <div className="relative overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl">
              <img src={image} alt="" className="w-full object-cover aspect-video" />
            </div>
          ) : null}
          {aside && <div className="mt-6">{aside}</div>}
        </div>
      </div>
    </section>
  );
};

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: "left" | "center";
};

export const SectionIntro = ({ eyebrow, title, description, align = "left" }: SectionIntroProps) => {
  return (
    <div className={cn("space-y-3", align === "center" && "mx-auto max-w-2xl text-center")}>
      <p className="text-[10px] font-black tracking-widest uppercase text-primary">{eyebrow}</p>
      <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">{title}</h2>
      <p className="text-sm font-medium leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};
