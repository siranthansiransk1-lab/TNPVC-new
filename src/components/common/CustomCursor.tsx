import { useEffect, useRef, useState } from "react";

/**
 * Global Solid Follower Cursor
 * - 100% solid rgb(130, 117, 255) background (no transparency)
 * - Expands on hover over all clickable/interactive elements (<a>, <button>, clickable cards)
 * - Displays centered solid white text "OPEN" (#ffffff) with smooth transition
 * - Smoothly collapses back to the normal dot state when moving away
 */
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position tracking using requestAnimationFrame lerp
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);
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

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    // Detect clickable / interactive elements across the entire page
    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      const interactive = targetEl.closest(
        'a, button, [role="button"], input, select, textarea, [data-interactive="true"], .cursor-pointer, [data-leader-card], [data-card-scene-1], [data-flip-id]'
      );

      setIsHovered(Boolean(interactive));
    };

    // Smooth render loop with linear interpolation (lerp)
    const render = () => {
      const ease = 0.22;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

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
        Solid Follower Element:
        - Normal State: 16px x 16px solid circular dot
        - Hover State: Horizontal pill/capsule badge (rounded-full, px-4 py-1, compact height)
        - Clean solid rgb(130, 117, 255) fill (Zero glow, zero drop-shadow, zero blur)
        - Centered bold white text "OPEN" (#ffffff)
      */}
      <div
        className={`rounded-full flex items-center justify-center text-center overflow-hidden will-change-transform transition-all duration-200 ease-out ${
          isHovered
            ? "h-7 px-4 py-1 min-w-[62px]"
            : "size-4 p-0"
        }`}
        style={{
          backgroundColor: "rgb(130, 117, 255)",
          boxShadow: "none",
          filter: "none",
          transform: isHovered
            ? isClicking
              ? "scale(0.94)"
              : "scale(1)"
            : isClicking
            ? "scale(0.85)"
            : "scale(1)",
        }}
      >
        <span
          className={`font-bold tracking-wider text-[11px] uppercase text-white whitespace-nowrap select-none leading-none pointer-events-none transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"
          }`}
          style={{
            color: "#ffffff",
          }}
        >
          OPEN
        </span>
      </div>
    </div>
  );
};

export default CustomCursor;
