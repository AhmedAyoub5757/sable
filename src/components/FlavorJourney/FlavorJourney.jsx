import { useRef, useState, useEffect, useCallback } from 'react'
import { PRODUCTS } from '../../data/products.js'
import Hero from '../Hero/Hero.jsx'
import FlavorsShowcase from '../FlavorsShowcase/FlavorsShowcase.jsx'
import './FlavorJourney.css'

const JOURNEY_DISTANCE = 900
const ARC_HEIGHT = 170

export default function FlavorJourney() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [suppressId, setSuppressId] = useState(null)
  const [cloneSrc, setCloneSrc] = useState(null)

  const heroWrapRef = useRef(null)
  const cupImgRef = useRef(null)
  const cloneRef = useRef(null)
  const slotRefs = useRef({})
  const activeIndexRef = useRef(0)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const registerSlotRef = useCallback((id, node) => {
    if (node) slotRefs.current[id] = node
  }, [])

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      let sourceRect = null
      let destRect = null
      let journeyId = null

      // quickSetters avoid style-string parsing overhead on every tick
      let setLeft, setTop, setWidth, setHeight, setRotate, setOpacity

      function primeSetters() {
        const el = cloneRef.current
        setLeft = gsap.quickSetter(el, 'left', 'px')
        setTop = gsap.quickSetter(el, 'top', 'px')
        setWidth = gsap.quickSetter(el, 'width', 'px')
        setHeight = gsap.quickSetter(el, 'height', 'px')
        setRotate = gsap.quickSetter(el, 'rotate', 'deg')
        setOpacity = gsap.quickSetter(el, 'opacity')
      }

      function startJourney() {
        const imgNode = cupImgRef.current
        if (!imgNode) return
        const prod = PRODUCTS[activeIndexRef.current]
        const slotEl = slotRefs.current[prod.id]
        if (!slotEl) return

        // Measure both ends ONCE — nothing moves while pinned, so this stays valid
        sourceRect = imgNode.getBoundingClientRect()
        destRect = slotEl.getBoundingClientRect()
        journeyId = prod.id

        setAutoplay(false)
        setCloneSrc(prod.cup)
        setSuppressId(prod.id)

        primeSetters()
        setLeft(sourceRect.left)
        setTop(sourceRect.top)
        setWidth(sourceRect.width)
        setHeight(sourceRect.height)
        setRotate(-30)
        setOpacity(1)
      }

      function updateJourney(self) {
        if (!sourceRect || !destRect) return
        const p = self.progress
        const arcLift = -ARC_HEIGHT * Math.sin(p * Math.PI)

        setLeft(gsap.utils.interpolate(sourceRect.left, destRect.left, p))
        setTop(gsap.utils.interpolate(sourceRect.top, destRect.top, p) + arcLift)
        setWidth(gsap.utils.interpolate(sourceRect.width, destRect.width, p))
        setHeight(gsap.utils.interpolate(sourceRect.height, destRect.height, p))
        setRotate(gsap.utils.interpolate(-30, 0, p))
      }

      function endJourney(goingForward) {
        if (goingForward) {
          // Crossfade: reveal the real card image, THEN fade the clone out
          setSuppressId(null)
          gsap.to(cloneRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => setCloneSrc(null),
          })
        } else {
          gsap.set(cloneRef.current, { opacity: 0 })
          setCloneSrc(null)
          setSuppressId(null)
          setAutoplay(true)
        }
        sourceRect = null
        destRect = null
        journeyId = null
      }

      const st = ScrollTrigger.create({
        trigger: heroWrapRef.current,
        start: 'bottom bottom',
        end: `+=${JOURNEY_DISTANCE}`,
        pin: true,
        pinSpacing: true,
        scrub: true,        // directly tied to scroll — eliminates the lag/overshoot
        anticipatePin: 1,   // removes the startup snap/jump
        onEnter: startJourney,
        onEnterBack: startJourney,
        onUpdate: updateJourney,
        onLeave: () => endJourney(true),
        onLeaveBack: () => endJourney(false),
      })

      return () => st.kill()
    })

    // Recalculate trigger positions once images/fonts have settled
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(refreshId)
      mm.revert()
    }
  }, [])

  return (
    <div className="flavor-journey">
      <div ref={heroWrapRef}>
        <Hero
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          autoplay={autoplay}
          cupImgRef={cupImgRef}
        />
      </div>

      <FlavorsShowcase suppressId={suppressId} registerSlotRef={registerSlotRef} />

      <img
        ref={cloneRef}
        src={cloneSrc || undefined}
        alt=""
        className="journey-clone"
        style={{ opacity: 0 }}
      />
    </div>
  )
}