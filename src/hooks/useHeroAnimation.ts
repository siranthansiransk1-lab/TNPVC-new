import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Shared Hero Animation Engine across Home, About, and Network pages.
 * 
 * Features:
 * - Staggered entrance reveal (badge, headline, subtext, actions, bottom stats bar)
 * - Cinematic background settle and scroll parallax scrub
 * - Smooth content exit fade and translation on scroll
 * - Proper GSAP context cleanup on unmount / route changes
 * - Full `prefers-reduced-motion` accessibility support
 */
export function useHeroAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bgEl = container.querySelector<HTMLElement>("[data-hero-bg]");
    const badgeEl = container.querySelector<HTMLElement>("[data-hero-badge]");
    const headlineEl = container.querySelector<HTMLElement>("[data-hero-headline]");
    const subtextEl = container.querySelector<HTMLElement>("[data-hero-subtext]");
    const actionsEl = container.querySelector<HTMLElement>("[data-hero-actions]");
    const bottomEl = container.querySelector<HTMLElement>("[data-hero-bottom]");

    if (prefersReducedMotion) {
      [bgEl, badgeEl, headlineEl, subtextEl, actionsEl, bottomEl].forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State
      if (bgEl) {
        gsap.set(bgEl, { scale: 1.08, transformOrigin: "center center" });
      }
      if (badgeEl) gsap.set(badgeEl, { autoAlpha: 0, y: 20 });
      if (headlineEl) gsap.set(headlineEl, { autoAlpha: 0, y: 35 });
      if (subtextEl) gsap.set(subtextEl, { autoAlpha: 0, y: 25 });
      if (actionsEl) gsap.set(actionsEl, { autoAlpha: 0, y: 20 });
      if (bottomEl) gsap.set(bottomEl, { autoAlpha: 0, y: 25 });

      // 2. Entrance Animation Timeline
      const entranceTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      // Background gentle scale settle
      if (bgEl) {
        entranceTl.to(
          bgEl,
          {
            scale: 1.04,
            duration: 1.8,
            ease: "power2.out",
          },
          0
        );
      }

      // Sequential Content Stagger
      if (badgeEl) {
        entranceTl.to(
          badgeEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
          },
          0.1
        );
      }

      if (headlineEl) {
        entranceTl.to(
          headlineEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
          },
          0.22
        );
      }

      if (subtextEl) {
        entranceTl.to(
          subtextEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.0,
          },
          0.38
        );
      }

      if (actionsEl) {
        entranceTl.to(
          actionsEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
          },
          0.5
        );
      }

      if (bottomEl) {
        entranceTl.to(
          bottomEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.0,
          },
          0.6
        );
      }

      // 3. Scroll-triggered Parallax & Departure (Desktop / Tablet lg+)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        if (bgEl) {
          scrollTl.to(
            bgEl,
            {
              scale: 1.0,
              yPercent: 8,
              ease: "none",
            },
            0
          );
        }

        const contentElements = [badgeEl, headlineEl, subtextEl, actionsEl].filter(Boolean);
        if (contentElements.length) {
          scrollTl.to(
            contentElements,
            {
              yPercent: -18,
              autoAlpha: 0.1,
              ease: "none",
            },
            0
          );
        }

        if (bottomEl) {
          scrollTl.to(
            bottomEl,
            {
              yPercent: -10,
              autoAlpha: 0.15,
              ease: "none",
            },
            0.05
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, deps);
}
