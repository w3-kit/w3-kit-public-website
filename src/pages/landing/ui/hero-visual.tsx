import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Animated gradient orb background for the hero section.
 * Renders soft, pulsing gradients that shift slowly.
 */
export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const orbs = containerRef.current!.querySelectorAll("[data-orb]");

        // Entrance: scale up and fade in
        gsap.fromTo(
          orbs,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power2.out", stagger: 0.3 },
        );

        // Continuous slow drift
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: `random(-40, 40)`,
            y: `random(-30, 30)`,
            duration: `random(6, 10)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary accent orb */}
      <div
        data-orb
        className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full opacity-0 blur-[120px] md:h-[800px] md:w-[800px]"
        style={{ background: "var(--w3-glow-accent)" }}
      />
      {/* Secondary orb - softer */}
      <div
        data-orb
        className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full opacity-0 blur-[100px] md:h-[600px] md:w-[600px]"
        style={{ background: "var(--w3-accent-subtle)" }}
      />
      {/* Subtle top gradient overlay */}
      <div className="absolute inset-0" style={{ background: "var(--w3-hero-gradient)" }} />
    </div>
  );
}
