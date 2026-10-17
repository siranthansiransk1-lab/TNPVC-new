import { ReactNode, useRef } from "react";
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
import { useWhatsApp } from "@/context/WhatsAppContext";

type SiteLayoutProps = {
  children: ReactNode;
};

export const SocialLinks = ({ className, vertical = false, onWhatsAppClick }: { className?: string, vertical?: boolean, onWhatsAppClick?: () => void }) => (
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.002 12.048c0 2.12.54 4.19 1.566 6.02L0 24l6.105-1.602a11.832 11.832 0 005.937 1.597h.005c6.634 0 12.043-5.411 12.046-12.048a11.804 11.804 0 00-3.489-8.452z" />
          </svg>
        ),
        href: "https://wa.me/918870826404",
        label: "WhatsApp",
        bg: "bg-green-600",
        delay: "delay-4"
      },
    ].map((item) => {
      const isWhatsApp = item.label === "WhatsApp";
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onClick={isWhatsApp ? (e) => { e.preventDefault(); onWhatsAppClick?.(); } : undefined}
          aria-label={item.label}
          className={cn(
            "group relative flex size-10 md:size-11 items-center justify-center rounded-xl text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
            item.bg
          )}
        >
          <item.icon className="size-4 md:size-5 relative z-10" />

          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 rounded-lg bg-foreground px-2 py-1 text-[10px] font-bold tracking-wide text-background opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </a>
      );
    })}
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
  const { openWhatsAppModal } = useWhatsApp();
  const location = useLocation();
  const isDarkHeroPage = ["/", "/about", "/network"].includes(location.pathname);
  const isTransparentOverDark = !scrolled && isDarkHeroPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only trigger page loader on pathname change (not on in-page hash changes)
  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Smooth scroll to hash or top without triggering PageLoader
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <PageLoader isNavigating={isNavigating} />

      {/* ─── Header ─── */}
      <header
        className={cn(
          "fixed left-0 w-full z-50 transition-all duration-300 flex items-center px-4 sm:px-6 lg:px-8",
          scrolled ? "top-2.5 sm:top-3 h-16" : "top-0 h-20"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between transition-all duration-300 rounded-2xl border",
            scrolled
              ? "bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md border-border/50 py-1.5 px-3 sm:px-5"
              : "bg-transparent border-transparent shadow-none py-2 px-0"
          )}
        >

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-85 focus-visible:ring-offset-4 group select-none"
            aria-label="Home - TN-PVC Interiors"
          >
            <img
              src={brandAssets.tnPvcLogo}
              alt="TN-PVC"
              className={cn(
                "size-8 sm:size-9 rounded-xl object-contain transition-all duration-300",
                isTransparentOverDark ? "group-hover:scale-105" : "group-hover:scale-105"
              )}
              loading="eager"
            />
            <div className="flex flex-col">
              <p className={cn(
                "text-sm sm:text-base font-black tracking-tight leading-none transition-colors duration-300",
                isTransparentOverDark ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" : "text-foreground"
              )}>
                TN-PVC
              </p>
              <p className={cn(
                "text-[9px] sm:text-[10px] font-bold tracking-widest uppercase leading-none mt-0.5 transition-colors duration-300",
                isTransparentOverDark ? "text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]" : "text-muted-foreground"
              )}>
                Interiors
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              if (item.subItems) {
                const isDropdownActive = item.subItems.some((subItem) => location.pathname === subItem.path) || location.pathname === item.path;
                return (
                  <DropdownMenu key={item.label} modal={false}>
                    <DropdownMenuTrigger
                      data-text-link
                      className={cn(
                        "group relative min-h-0 rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-semibold tracking-normal transition-all duration-150 outline-none flex items-center gap-1 select-none",
                        isTransparentOverDark
                          ? isDropdownActive
                            ? "text-white bg-white/20 font-bold backdrop-blur-md border border-white/20"
                            : "text-white/85"
                          : isDropdownActive
                            ? "text-primary bg-primary/10 font-bold"
                            : "text-muted-foreground",
                        "hover:text-white"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 rounded-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0",
                          isTransparentOverDark
                            ? "border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
                            : "bg-[rgb(130,117,255)]"
                        )}
                      />
                      <span className="relative z-10 transition-colors duration-150">{item.shortLabel ?? item.label}</span>
                      <ChevronDown className={cn(
                        "relative z-10 size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 group-hover:text-white",
                        isTransparentOverDark ? "text-white/80" : "text-muted-foreground"
                      )} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-52 rounded-2xl p-2 shadow-xl border-border/50 bg-white/95 backdrop-blur-xl">
                      <div className="flex flex-col gap-1">
                        {item.subItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.path} asChild>
                            <NavLink
                              to={subItem.path}
                              data-text-link
                              className="group relative flex items-center justify-start text-left px-3 py-2 text-xs font-medium rounded-xl transition-all duration-150 cursor-pointer w-full text-foreground hover:text-white outline-none"
                              activeClassName="bg-primary/10 text-primary font-bold"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-xl bg-[rgb(130,117,255)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0"
                              />
                              <span className="relative z-10 transition-colors duration-150">{subItem.label}</span>
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
                    data-text-link
                    className={cn(
                      "group relative min-h-0 rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-semibold tracking-normal transition-all duration-150 outline-none select-none",
                      isTransparentOverDark ? "text-white/85" : "text-muted-foreground",
                      "hover:text-white"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 rounded-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0",
                        isTransparentOverDark
                          ? "border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
                          : "bg-[rgb(130,117,255)]"
                      )}
                    />
                    <span className="relative z-10 transition-colors duration-150">{item.shortLabel ?? item.label}</span>
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.path}
                  to={item.path!}
                  data-text-link
                  className={cn(
                    "group relative min-h-0 rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-semibold tracking-normal transition-all duration-150 outline-none select-none",
                    isTransparentOverDark
                      ? "text-white/85"
                      : "text-muted-foreground",
                    "hover:text-white"
                  )}
                  activeClassName={isTransparentOverDark ? "text-white bg-white/20 font-bold backdrop-blur-md border border-white/20" : "text-primary bg-primary/10 font-bold"}
                  end={item.path === "/"}
                >
                  {/* Selected Hover Background Pill */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0",
                      isTransparentOverDark
                        ? "border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
                        : "bg-[rgb(130,117,255)]"
                    )}
                  />
                  <span className="relative z-10 transition-colors duration-150">{item.shortLabel ?? item.label}</span>
                  {/* Subtle indicator for active state */}
                  <span className={cn(
                    "absolute bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-[.active]:w-4 z-10",
                    isTransparentOverDark ? "bg-white" : "bg-primary"
                  )} />
                </NavLink>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2.5 sm:gap-3">
            <LanguageSwitcher isTransparent={isTransparentOverDark} />
            <Link
              to="/register"
              className={cn(
                "min-h-0 h-9 px-4 text-xs font-bold sm:text-sm shadow-sm inline-flex items-center rounded-xl transition-all",
                isTransparentOverDark
                  ? "bg-primary text-white hover:bg-primary/90 border border-white/20 shadow-md hover:scale-[1.02]"
                  : "primary-btn"
              )}
            >
              <UserPlus className="mr-1.5 size-3.5" aria-hidden="true" />
              Register
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "size-9 lg:hidden min-h-0 transition-colors",
                  isTransparentOverDark ? "text-white hover:bg-white/15 hover:text-white" : "text-foreground"
                )}
                aria-label="Open menu"
              >
                <Menu className={cn("size-5", isTransparentOverDark ? "text-white" : "text-foreground")} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85vw] max-w-[320px] bg-transparent p-0 flex flex-col border-none shadow-none sm:max-w-[320px] [&>button]:hidden"
            >
              <SheetTitle className="sr-only">TN-PVC Navigation</SheetTitle>
              <SheetDescription className="sr-only">Mobile Navigation Drawer</SheetDescription>

              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col h-full bg-luxury-light/75 backdrop-blur-2xl rounded-r-3xl border-r border-black/[0.08] shadow-[20px_0_40px_-15px_rgba(0,0,0,0.15)] relative z-40 text-luxury-charcoal select-none">
                {/* Header */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/[0.08] relative z-10">
                  <Link
                    to="/"
                    className="flex items-center gap-3 transition-opacity hover:opacity-85 focus-visible:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={brandAssets.tnPvcLogo}
                      alt="TN-PVC"
                      className="size-9 rounded-xl object-contain ring-1 ring-black/10 bg-white p-1"
                    />
                    <div>
                      <p className="text-sm font-black tracking-tight text-luxury-charcoal leading-none">
                        TN-PVC
                      </p>
                      <p className="text-[9px] font-bold tracking-widest uppercase text-luxury-stone leading-none mt-1">
                        Interiors
                      </p>
                    </div>
                  </Link>

                  {/* Clean Minimalist Close Button Inside */}
                  <SheetClose className="size-8 rounded-lg bg-black/5 border border-black/10 text-neutral-600 hover:text-black hover:bg-black/10 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <X className="size-4" />
                    <span className="sr-only">Close menu</span>
                  </SheetClose>
                </div>

                {/* Nav Links (Icons Removed as requested) */}
                <nav className="flex flex-col gap-1 mb-6 relative z-10" aria-label="Mobile navigation">
                  {navItems.map((item) => {
                    if (item.subItems) {
                      return (
                        <div key={item.label} className="flex flex-col gap-1 my-1.5">
                          <p className="px-4 py-1 text-[11px] font-bold text-luxury-stone uppercase tracking-wider">
                            {item.label}
                          </p>
                          {item.subItems.map((subItem) => {
                            const isActive = location.pathname === subItem.path;
                            return (
                              <SheetClose asChild key={subItem.path}>
                                <NavLink
                                  to={subItem.path}
                                  className={cn(
                                    "!flex !justify-between !items-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                                    isActive
                                      ? "bg-black/[0.06] text-black font-bold"
                                      : "text-neutral-700 hover:text-black hover:bg-black/[0.03]"
                                  )}
                                >
                                  <span>{subItem.label}</span>
                                  {isActive && <span className="size-1.5 rounded-full bg-black shrink-0" />}
                                </NavLink>
                              </SheetClose>
                            );
                          })}
                        </div>
                      );
                    }

                    const isHash = item.path?.startsWith("/#");

                    if (isHash && item.path) {
                      return (
                        <SheetClose asChild key={item.path}>
                          <a
                            href={item.path}
                            className="!flex !justify-between !items-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:text-black hover:bg-black/[0.03] transition-all duration-150"
                          >
                            <span>{item.label}</span>
                          </a>
                        </SheetClose>
                      );
                    }

                    const isActive = location.pathname === item.path;

                    return (
                      <SheetClose asChild key={item.path}>
                        <NavLink
                          to={item.path!}
                          end={item.path === "/"}
                          className={cn(
                            "!flex !justify-between !items-center w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                            isActive
                              ? "bg-black/[0.06] text-black font-bold"
                              : "text-neutral-700 hover:text-black hover:bg-black/[0.03]"
                          )}
                        >
                          <span>{item.label}</span>
                          {isActive && <span className="size-1.5 rounded-full bg-black shrink-0" />}
                        </NavLink>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Minimalist Bottom Actions */}
                <div className="mt-auto pt-4 border-t border-black/[0.08] flex flex-col gap-3 relative z-10">
                  {/* Register Text Only (Black text as requested) */}
                  <SheetClose asChild>
                    <Link
                      to="/register"
                      className="text-black font-black text-sm tracking-wider uppercase hover:opacity-70 transition-opacity py-2 px-4 rounded-lg hover:bg-black/[0.04] text-center"
                    >
                      Register
                    </Link>
                  </SheetClose>

                  {/* Utility Row: Language & Support */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/[0.06]">
                    <LanguageSwitcher
                      className="h-8 text-xs bg-white/70 border-black/10 text-neutral-700 hover:text-black"
                    />

                    <a
                      href="tel:+918870826404"
                      className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-white/70 border border-black/10 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                      aria-label="Call support"
                    >
                      <Phone className="size-3 text-primary" />
                      <span>Support</span>
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
      <main id="main-content" className={cn("relative", !isDarkHeroPage && "pt-16")}>
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/40 bg-surface">
        <div className="container grid gap-12 lg:gap-16 py-12 lg:py-16 lg:grid-cols-[1fr_0.8fr]">
          {/* Brand block */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={brandAssets.tnPvcLogo} alt="" className="size-10" loading="lazy" />
              <img src={brandAssets.aiPvcLogo} alt="" className="size-10" loading="lazy" />
            </div>
            <div className="space-y-3">
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
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.002 12.048c0 2.12.54 4.19 1.566 6.02L0 24l6.105-1.602a11.832 11.832 0 005.937 1.597h.005c6.634 0 12.043-5.411 12.046-12.048a11.804 11.804 0 00-3.489-8.452z" /></svg>
                  )
                },
              ].map((social) => {
                const isWhatsApp = social.label === "WhatsApp";
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={isWhatsApp ? (e) => { e.preventDefault(); openWhatsAppModal(); } : undefined}
                    className="flex size-11 items-center justify-center rounded-xl bg-background text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Contact support */}
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-wide text-primary uppercase">Contact support</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { href: "tel:+918870826404", label: "Srinivasan · +91 8870826404" },
                  { href: "tel:+918489143405", label: "Siranthan Siran · +91 8489143405" },
                  { href: "mailto:siranthan.siran.sk.1@gmail.com", label: "siranthan.siran.sk.1@gmail.com", isMail: true },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    data-text-link
                    className="group relative inline-flex items-center w-fit px-2.5 py-1 -mx-2.5 rounded-lg text-sm font-semibold text-muted-foreground transition-all duration-150 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-[rgb(130,117,255)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0"
                    />
                    <span className={cn("relative z-10 transition-colors duration-150", c.isMail && "break-all")}>{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Quick links */}
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-wide text-primary uppercase">Quick links</p>
              <nav className="flex flex-col gap-1.5" aria-label="Footer links">
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/network", label: "Network & Members" },
                  { to: "/benefits", label: "Business Benefits" },
                  { to: "/ai-pvc-groups", label: "Partnership Transparency" },
                  { to: "/register", label: "Register as Member" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    data-text-link
                    className="group relative inline-flex items-center w-fit px-2.5 py-1 -mx-2.5 rounded-lg text-sm font-semibold text-muted-foreground transition-all duration-150 hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-[rgb(130,117,255)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0"
                    />
                    <span className="relative z-10 transition-colors duration-150">{l.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-border/20">
          <div className="container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="text-xs font-bold text-muted-foreground">
              © {new Date().getFullYear()} TN-PVC Interiors.
            </p>
            <p className="text-xs font-bold text-muted-foreground">
              Built by{" "}
              <a
                href="https://www.rimio.in/"
                target="_blank"
                rel="noreferrer"
                data-text-link
                className="group relative inline-flex items-center px-1.5 py-0.5 -mx-1.5 rounded-md text-primary font-bold transition-all duration-150 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md bg-[rgb(130,117,255)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-out pointer-events-none z-0"
                />
                <span className="relative z-10 transition-colors duration-150">Rimio</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
