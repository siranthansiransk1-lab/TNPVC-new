import { useEffect, useRef, useState } from "react";

/**
 * Global Refined Custom Follower Cursor
 * 
 * Features:
 * 1. Text Links & Navigation Items:
 *    - Cursor dot absorbs into the link (scales down to 0) while the link highlights with the selected background
 *    - Link text turns pure white with smooth, immediate transition
 *    - Zero "OPEN" tooltip or label
 * 2. Hero Section:
 *    - Cursor dot smoothly turns pure white (#ffffff) inside hero sections
 *    - Restores signature brand purple (rgb(130, 117, 255)) when outside
 *    - Smooth 250ms color transition without flickering
 * 3. Floating Gallery:
 *    - Displays active image title badge slightly above the cursor
 *    - Hides immediately on mouse leave; updates seamlessly between images
 *    - Zero "OPEN" label; pointer-events-none prevents blocking clicks
 * 4. Actual Buttons:
 *    - Preserves existing button styling, background, and hover states
 *    - No redundant cursor background or "OPEN" label
 * 5. Touch & Accessibility:
 *    - Automatically disabled on touch screens / mobile (< 768px or coarse pointer)
 */
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const [isTextLink, setIsTextLink] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Enable custom cursor only on desktop devices with a fine pointer (mouse)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    setIsEnabled(mql.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsEnabled(e.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handleMediaChange);
    } else {
      mql.addListener(handleMediaChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleMediaChange);
      } else {
        mql.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || typeof window === "undefined") {
      setIsVisible(false);
      return;
    }

    const getElementFromEvent = (e: MouseEvent): Element | null => {
      if (e.target instanceof Element) {
        return e.target;
      }
      if (typeof document !== "undefined" && document.elementFromPoint) {
        return document.elementFromPoint(e.clientX, e.clientY);
      }
      return null;
    };

    // Check if element is inside a hero section
    const checkHeroSection = (target: Element | null): boolean => {
      if (!target || typeof target.closest !== "function") return false;
      if (
        target.closest(
          '[data-hero="true"], [data-scene="00"], [aria-label*="Hero Showcase"], [data-hero-container]'
        )
      ) {
        return true;
      }
      // Top transparent header over dark hero pages
      const isDarkHeroPage = ["/", "/about", "/network"].includes(window.location.pathname);
      if (isDarkHeroPage && window.scrollY <= 20 && target.closest("header")) {
        return true;
      }
      return false;
    };

    const updateHoverState = (target: Element | null) => {
      if (!target || typeof target.closest !== "function") {
        setGalleryTitle(null);
        setIsTextLink(false);
        setIsButton(false);
        return;
      }

      // 1. Gallery image detection
      const galleryEl = target.closest("[data-gallery-item]");
      const title = galleryEl?.getAttribute("data-cursor-title");
      if (galleryEl && title && title.trim()) {
        setGalleryTitle(title.trim());
        setIsTextLink(false);
        setIsButton(false);
        return;
      } else {
        setGalleryTitle(null);
      }

      // 2. Text link detection (Navigation items, footer text links, etc.)
      const textLinkEl = target.closest("[data-text-link]");
      if (textLinkEl) {
        setIsTextLink(true);
        setIsButton(false);
        return;
      } else {
        setIsTextLink(false);
      }

      // 3. Actual button detection
      const buttonEl = target.closest(
        'button, [role="button"], .primary-btn, .secondary-btn, [data-button="true"], a.primary-btn, a.secondary-btn'
      );
      if (buttonEl) {
        setIsButton(true);
      } else {
        setIsButton(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);

      const target = getElementFromEvent(e);
      setIsOverHero(checkHeroSection(target));
      updateHoverState(target);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setIsVisible(true);
      const target = getElementFromEvent(e);
      setIsOverHero(checkHeroSection(target));
      updateHoverState(target);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsTextLink(false);
      setIsButton(false);
      setGalleryTitle(null);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = getElementFromEvent(e);
      setIsOverHero(checkHeroSection(target));
      updateHoverState(target);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  // Dot color logic:
  // - Pure white in hero section (#ffffff)
  // - Signature brand purple outside hero section (rgb(130, 117, 255))
  const dotColor = isOverHero ? "#ffffff" : "rgb(130, 117, 255)";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform"
      style={{
        transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
      }}
    >
      {/* 
        1. Floating Gallery Image Title:
        - Positioned above the follower cursor
        - Pure white bold typography with crisp text shadow (zero background box, zero border)
        - Highly legible, smooth entry & exit transition
      */}
      {galleryTitle && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-white text-xs sm:text-sm font-black tracking-widest uppercase whitespace-nowrap pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-all duration-150 ease-out animate-in fade-in zoom-in-95"
        >
          {galleryTitle}
        </div>
      )}

      {/* 
        2. Solid Follower Cursor Dot:
        - Normal State: 16px x 16px solid circular dot
        - Hero Section State: Smoothly turns pure white (#ffffff)
        - Non-Hero State: Signature purple rgb(130, 117, 255)
        - Text Link Hover: Smoothly scales down to 0 (absorbed into the text link's active selected background)
        - Button Hover: Clean normal dot with subtle scale(1.15) (no redundant background or OPEN label)
        - Gallery Hover: Clean normal dot with title badge floating above
      */}
      <div
        className="rounded-full will-change-transform pointer-events-none"
        style={{
          width: isTextLink ? "0px" : galleryTitle ? "18px" : "16px",
          height: isTextLink ? "0px" : galleryTitle ? "18px" : "16px",
          backgroundColor: dotColor,
          opacity: isTextLink ? 0 : 1,
          transform: isTextLink
            ? "scale(0)"
            : isClicking
              ? "scale(0.85)"
              : isButton
                ? "scale(1.15)"
                : "scale(1)",
          transition:
            "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease-out, background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isOverHero ? "0 2px 10px rgba(0,0,0,0.4)" : "none",
        }}
      />
    </div>
  );
};

export default CustomCursor;
