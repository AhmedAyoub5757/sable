// Thin wrapper so the rest of the app never touches `window` directly.
export const gsap = window.gsap;
export const ScrollTrigger = window.ScrollTrigger;
export const ScrollToPlugin = window.ScrollToPlugin;
export const Lenis = window.Lenis;
export const THREE = window.THREE;

if (gsap && ScrollTrigger && ScrollToPlugin) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}