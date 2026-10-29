import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (!window.Lenis || !window.gsap || !window.ScrollTrigger) {
      console.warn('Lenis/GSAP not loaded yet — check index.html CDN script tags')
      return
    }

    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', window.ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    window.gsap.ticker.add(raf)
    window.gsap.ticker.lagSmoothing(0)

    return () => {
      window.gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}