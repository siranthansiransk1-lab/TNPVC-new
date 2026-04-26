import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, ChevronDown, Facebook, Instagram, Menu, MessageCircleMore, Phone, Twitter, Youtube, X, LayoutGrid, MapPin, ChevronsUpDown, Globe, Sparkles, HardHat, Users, Wrench, ShieldCheck, UserPlus, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brandAssets, navItems, siteName, siteTagline } from "@/data/siteData";
import { cn } from "@/lib/utils";

type SiteLayoutProps = {
  children: ReactNode;
};

export const SocialLinks = ({ className, vertical = false }: { className?: string, vertical?: boolean }) => (
  <div className={cn(
    "flex gap-3 md:gap-4",
    vertical ? "flex-col" : "flex-row",
    className
  )}>
    {[
      { icon: Instagram, href: "https://www.instagram.com/siranthan_siran?igsh=aDZ4dGx4cHdtdmZr", label: "Instagram", bg: "bg-pink-600", delay: "delay-1" },
      { icon: Youtube, href: "https://youtube.com", label: "YouTube", bg: "bg-red-600", delay: "delay-2" },
      { icon: Facebook, href: "https://www.facebook.com/srinivasan.x", label: "Facebook", bg: "bg-blue-700", delay: "delay-3" },
      { 
        icon: () => (
          <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.002 12.048c0 2.12.54 4.19 1.566 6.02L0 24l6.105-1.602a11.832 11.832 0 005.937 1.597h.005c6.634 0 12.043-5.411 12.046-12.048a11.804 11.804 0 00-3.489-8.452z"/>
          </svg>
        ), 
        href: "https://wa.me/918870826404", 
        label: "WhatsApp", 
        bg: "bg-green-600", 
        delay: "delay-4" 
      },
    ].map((item) => (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={item.label}
        className={cn(
          "group relative flex size-10 md:size-11 items-center justify-center rounded-xl text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
          item.bg
        )}
      >
        <item.icon className="size-4 md:size-5 relative z-10" />

        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 rounded-lg bg-foreground px-2 py-1 text-[10px] font-bold tracking-wide text-background opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none">
          {item.label}
        </span>
      </a>
    ))}
  </div>
);

const PageLoader = ({ isNavigating }: { isNavigating: boolean }) => (
  <div className={cn(
    "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-700 ease-in-out",
    isNavigating ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
  )}>
    <div className="relative flex flex-col items-center gap-8 p-12 text-center">
      {/* Logo with pulse */}
      <div className="relative">
        <div className="absolute inset-0 size-32 rounded-[2.5rem] bg-primary/10 animate-ping opacity-20" />
        <div className="relative size-32 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center border border-border/40">
          <img src={brandAssets.tnPvcLogo} alt="" className="size-20 object-contain animate-float" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-foreground">
          TN-PVC <span className="text-primary">Interiors</span>
        </h2>
        <p className="text-sm font-bold text-muted-foreground tracking-wide max-w-[240px]">
          Connecting Tamil Nadu's PVC Trade Ecosystem...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-primary animate-loader-progress rounded-full" />
      </div>
    </div>
  </div>
);

export const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top and trigger loader on route change
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setIsNavigating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <PageLoader isNavigating={isNavigating} />
      
      {/* ─── Header ─── */}
      <header
        className={cn(
          "fixed left-0 w-full z-50 h-20 transition-all duration-500 flex items-center px-4",
          scrolled ? "top-5" : "top-0"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between transition-all duration-500 rounded-2xl border border-transparent",
            scrolled
              ? "bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl border-border/50 py-3 px-3"
              : "bg-transparent py-0 px-0"
          )}
        >

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:ring-offset-4"
            aria-label="Home - TN-PVC Interiors"
          >
            <img
              src={brandAssets.tnPvcLogo}
              alt=""
              className="size-10 rounded-xl object-contain"
              loading="eager"
            />
            <div className="hidden sm:block">
              <p className="text-base font-black tracking-tight text-foreground">
                TN-PVC
              </p>
              <p className="text-[10px] font-bold tracking-wide text-muted-foreground">
                Interiors
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <DropdownMenu key={item.label} modal={false}>
                    <DropdownMenuTrigger className="group relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all hover:text-primary outline-none flex items-center gap-1">
                      <span className="relative z-10">{item.shortLabel ?? item.label}</span>
                      <ChevronDown className="relative z-10 size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 rounded-2xl p-2 shadow-xl border-border/50 bg-white/95 backdrop-blur-xl">
                      <div className="flex flex-col gap-1">
                        {item.subItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.path} asChild>
                            <NavLink
                              to={subItem.path}
                              className="flex items-center justify-start text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer w-full text-foreground hover:bg-muted/80 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-bold outline-none"
                              activeClassName="bg-primary/10 text-primary font-bold"
                            >
                              {subItem.label}
                            </NavLink>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              const isHash = item.path?.startsWith("/#");
              if (isHash && item.path) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    className="group relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all hover:text-primary"
                  >
                    <span className="relative z-10">{item.shortLabel ?? item.label}</span>
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  className="group relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all hover:text-primary"
                  activeClassName="text-primary bg-primary/5"
                  end={item.path === "/"}
                >
                  <span className="relative z-10">{item.shortLabel ?? item.label}</span>
                  {/* Subtle indicator for active state */}
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-[.active]:w-4" />
                </NavLink>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="tel:+918870826404"
              className="primary-btn h-14 px-6 text-sm" // 56px height
            >
              <Phone className="mr-2 size-3.5" aria-hidden="true" />
              Contact us
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 lg:hidden" // 44px (WCAG)
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[85vw] max-w-[340px] bg-transparent p-0 flex flex-col border-none shadow-none sm:max-w-[340px] [&>button]:hidden"
            >
              {/* Close Button Outside */}
              <div className="absolute -right-14 top-4 z-50">
                <SheetClose className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <X className="size-5" />
                  <span className="sr-only">Close menu</span>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col h-full bg-white rounded-r-[20px] shadow-[20px_0_40px_-15px_rgba(0,0,0,0.1)] relative z-40">
                {/* Header (Logo & Close Button) */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to="/"
                    className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:ring-offset-4"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={brandAssets.tnPvcLogo}
                      alt=""
                      className="size-10 rounded-xl object-contain"
                    />
                    <div>
                      <p className="text-base font-black tracking-tight text-foreground">
                        TN-PVC
                      </p>
                      <p className="text-[10px] font-bold tracking-wide text-muted-foreground">
                        Interiors
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5 mb-8" aria-label="Mobile navigation">
                  {navItems.map((item) => {
                    const navIcons: Record<string, React.ElementType> = {
                      "/network": Globe,
                      "/benefits": Sparkles,
                      "/contractors": HardHat,
                      "/clients": Users,
                      "/labour": Wrench,
                      "/ai-pvc-groups": ShieldCheck,
                      "/#register": UserPlus,
                    };
                    
                    if (item.subItems) {
                      return (
                        <div key={item.label} className="flex flex-col gap-1.5 mt-2 mb-2">
                          <p className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          {item.subItems.map((subItem) => {
                            const SubIcon = navIcons[subItem.path] || LayoutGrid;
                            return (
                              <SheetClose asChild key={subItem.path}>
                                <NavLink
                                  to={subItem.path}
                                  className={cn(
                                    "flex items-center justify-start text-left gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all",
                                    location.pathname === subItem.path
                                      ? "bg-primary/10 text-primary"
                                      : "text-foreground hover:bg-muted/50"
                                  )}
                                >
                                  <SubIcon className={cn("size-5", location.pathname === subItem.path ? "text-primary" : "text-muted-foreground")} />
                                  {subItem.label}
                                </NavLink>
                              </SheetClose>
                            );
                          })}
                        </div>
                      );
                    }

                    const Icon = item.path ? navIcons[item.path] || LayoutGrid : LayoutGrid;
                    const isHash = item.path?.startsWith("/#");
                    
                    if (isHash && item.path) {
                      return (
                        <SheetClose asChild key={item.path}>
                          <a
                            href={item.path}
                            className={cn(
                              "flex items-center justify-start text-left gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all",
                              "text-foreground hover:bg-muted/50"
                            )}
                          >
                            <Icon className="size-5 text-muted-foreground" />
                            {item.label}
                          </a>
                        </SheetClose>
                      );
                    }

                    return (
                      <SheetClose asChild key={item.path}>
                        <NavLink
                          to={item.path!}
                          end={item.path === "/"}
                          className={cn(
                            "flex items-center justify-start text-left gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all",
                            location.pathname === item.path
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Icon className={cn("size-5", location.pathname === item.path ? "text-primary" : "text-muted-foreground")} />
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Bottom Profile */}
                <div className="mt-6 pt-6 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-3 px-1">Language</p>
                    <div className="flex px-1">
                      <LanguageSwitcher />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-3 px-1">Need help?</p>
                    <a href="tel:+918870826404" className="flex items-center gap-3 px-4 py-3 rounded-[1.25rem] border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black shrink-0">
                        TN
                      </div>
                      <span className="text-sm font-bold text-foreground">TN-PVC Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Social Island removed — now rendered inline in Hero */}

      {/* ─── Main ─── */}
      <main id="main-content" className="relative pt-20">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/40 bg-surface">
        <div className="container grid gap-16 py-20 lg:grid-cols-[1fr_0.8fr]">
          {/* Brand block */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img src={brandAssets.tnPvcLogo} alt="" className="size-12" loading="lazy" />
              <img src={brandAssets.aiPvcLogo} alt="" className="size-12" loading="lazy" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black tracking-tight">TN-PVC Interiors</h2>
              <p className="max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
                The leading PVC and UPVC trade community for Tamil Nadu. Connecting manufacturers, contractors, and labour teams through digital-first coordination.
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook", href: "https://www.facebook.com/srinivasan.x", icon: (
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )
                },
                {
                  label: "Instagram", href: "https://www.instagram.com/siranthan_siran", icon: (
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  )
                },
                {
                  label: "YouTube", href: "https://youtube.com", icon: (
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  )
                },
                {
                  label: "WhatsApp", href: "https://wa.me/918870826404", icon: (
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.002 12.048c0 2.12.54 4.19 1.566 6.02L0 24l6.105-1.602a11.832 11.832 0 005.937 1.597h.005c6.634 0 12.043-5.411 12.046-12.048a11.804 11.804 0 00-3.489-8.452z"/></svg>
                  )
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-11 items-center justify-center rounded-xl bg-background text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid gap-12 sm:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-bold tracking-wide text-primary uppercase">Contact support</p>
              <div className="space-y-3">
                <a className="block text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" href="tel:+918870826404">
                  Srinivasan · +91 8870826404
                </a>
                <a className="block text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" href="tel:+918489143405">
                  Siranthan Siran · +91 8489143405
                </a>
                <a className="block break-all text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" href="mailto:siranthan.siran.sk.1@gmail.com">
                  siranthan.siran.sk.1@gmail.com
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-sm font-bold tracking-wide text-primary uppercase">Quick links</p>
              <nav className="space-y-3 flex flex-col items-start text-left" aria-label="Footer links">
                <Link className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/network">Our network</Link>
                <Link className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/benefits">Business benefits</Link>
                <Link className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/contractors">For contractors</Link>
                <Link className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/clients">For clients</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-border/20">
          <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
            <p className="text-xs font-bold text-muted-foreground">
              © {new Date().getFullYear()} TN-PVC Interiors.
            </p>
            <p className="text-xs font-bold text-muted-foreground">
              Built by{" "}
              <a href="https://www.dexaz.in" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                Dexaz Groups
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
