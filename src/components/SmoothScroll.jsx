import { useEffect } from "react";
import { Lenis, gsap, ScrollTrigger } from "../lib/libs.js";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (!Lenis) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis; // exposed for Navbar/MegaMenu scroll-lock

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.__lenis = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return children;
}