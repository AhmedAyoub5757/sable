import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  usePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { PRODUCTS } from '../../data/products.js'
import './Hero.css'

const AUTO_ADVANCE_MS = 5500

// Reveal easing — used for text/UI elements
const EASE_SMOOTH = [0.22, 1, 0.36, 1]
// Motion easing — used for the arc path & blob fill (symmetric, feels "physical")
const ARC_EASE = [0.65, 0, 0.35, 1]
const ARC_DURATION = 1.25

// Increase this to make ALL floating props bigger at once
const PROP_SCALE_FACTOR = 1.8

// Arc control points, as percentages of .hero-stage (p0 = start, p1 = curve control, p2 = end)
const ENTER_ARC = {
  p0: { x: 86, y: 84 },
  p1: { x: 56, y: 4 },
  p2: { x: 50, y: 50 },
}
const EXIT_ARC = {
  p0: { x: 50, y: 50 },
  p1: { x: 26, y: 92 },
  p2: { x: 6, y: 98 },
}

function quad(v, p0, p1, p2) {
  const u = 1 - v
  return u * u * p0 + 2 * u * v * p1 + v * v * p2
}

/* ---------- Cup travelling along a true quadratic-bezier arc ---------- */
function ArcCup({ product }) {
  const [isPresent, safeToRemove] = usePresence()
  const t = useMotionValue(0)

  useEffect(() => {
    if (isPresent) {
      t.set(0)
      const controls = animate(t, 1, { duration: ARC_DURATION, ease: ARC_EASE })
      return () => controls.stop()
    } else {
      t.set(0)
      const controls = animate(t, 1, {
        duration: ARC_DURATION * 0.85,
        ease: ARC_EASE,
        onComplete: safeToRemove,
      })
      return () => controls.stop()
    }
  }, [isPresent])

  const arc = isPresent ? ENTER_ARC : EXIT_ARC

  const left = useTransform(t, (v) => `${quad(v, arc.p0.x, arc.p1.x, arc.p2.x)}%`)
  const top = useTransform(t, (v) => `${quad(v, arc.p0.y, arc.p1.y, arc.p2.y)}%`)

  const scale = useTransform(
    t,
    isPresent ? [0, 0.55, 1] : [0, 1],
    isPresent ? [0.25, 1.08, 1] : [1, 0.2]
  )
  const rotate = useTransform(
    t,
    [0, 1],
    isPresent ? [14, -30] : [-30, -62]
  )
  const opacity = useTransform(
    t,
    isPresent ? [0, 0.12, 1] : [0, 0.75, 1],
    isPresent ? [0, 1, 1] : [1, 1, 0]
  )

  return (
    <motion.div className="hero-cup-outer" style={{ left, top }}>
      <motion.div className="hero-cup-inner" style={{ scale, rotate, opacity }}>
        <img src={product.cup} alt={product.name} className="hero-cup-img" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [baseColor, setBaseColor] = useState(PRODUCTS[0].colorDark)
  const timerRef = useRef(null)
  const product = PRODUCTS[index]

  const goTo = useCallback((i) => setIndex(i), [])

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % PRODUCTS.length)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(timerRef.current)
  }, [index])

  return (
    <motion.section
      className="hero"
      animate={{
        background: `linear-gradient(135deg, ${product.colorLight} 0%, ${product.colorDark} 100%)`,
      }}
      transition={{ duration: 1.2, ease: ARC_EASE }}
    >
      {/* ============ Arch blob with fill-wipe animation ============ */}
      <div className="hero-blob-wrap">
        <div className="hero-blob-base" style={{ background: baseColor }} />
        <motion.div
          key={product.id}
          className="hero-blob-fill"
          style={{ background: product.colorDark }}
          initial={{ clipPath: 'circle(0% at 100% 100%)' }}
          animate={{ clipPath: 'circle(150% at 100% 100%)' }}
          transition={{ duration: ARC_DURATION + 0.2, ease: ARC_EASE }}
          onAnimationComplete={() => setBaseColor(product.colorDark)}
        />
      </div>

      <div className="hero-inner">
        {/* ============ LHS — TEXT ============ */}
        <div className="hero-lhs">
          <AnimatePresence mode="wait">
            <motion.div key={product.id} className="hero-text-block">
              <motion.h1
                className="hero-heading"
                initial={{ y: -48, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -48, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.85, ease: EASE_SMOOTH, delay: 0.1 }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className="hero-tagline"
                initial={{ y: -32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -32, opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE_SMOOTH, delay: 0.22 }}
              >
                {product.tagline}
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE_SMOOTH, delay: 0.34 }}
              >
                {product.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Switcher — sliding pill indicator, spring physics */}
          <motion.div
            className="hero-switcher"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.6 }}
          >
            <span className="hero-switcher-label">More flavors</span>
            <div className="hero-switcher-row">
              {PRODUCTS.map((p, i) => {
                const isActive = p.id === product.id
                return (
                  <motion.button
                    key={p.id}
                    className="hero-switcher-icon"
                    onClick={() => goTo(i)}
                    animate={{
                      scale: isActive ? 1.18 : 0.86,
                      opacity: isActive ? 1 : 0.45,
                      y: isActive ? -8 : 0,
                    }}
                    whileHover={{
                      scale: isActive ? 1.18 : 0.98,
                      opacity: isActive ? 1 : 0.8,
                      rotate: isActive ? 0 : -4,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    aria-label={`Switch to ${p.name}`}
                  >
                    {/* {isActive && (
                      <motion.span
                        className="hero-switcher-pill"
                        layoutId="switcher-pill"
                        style={{ background: p.colorLight }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )} */}
                    <img src={p.cup} alt={p.name} />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ============ RHS — VISUAL ============ */}
        <div className="hero-rhs">
          <div className="hero-stage">
            {/* Floating props */}
            <AnimatePresence mode="popLayout">
              {product.props.map((prop, i) => {
                const scaledSize =
                  typeof prop.size === 'number'
                    ? prop.size * PROP_SCALE_FACTOR
                    : `calc(${prop.size} * ${PROP_SCALE_FACTOR})`

                return (
                  <motion.div
                    key={product.id + i}
                    className="hero-prop-outer"
                    style={{
                      top: prop.top,
                      left: prop.left,
                      width: scaledSize,
                      height: scaledSize,
                    }}
                    initial={{ opacity: 0, scale: 0.2, rotate: prop.rotate - 30 }}
                    animate={{ opacity: 1, scale: 1, rotate: prop.rotate }}
                    exit={{ opacity: 0, scale: 0.2, rotate: prop.rotate + 30 }}
                    transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.14 * i }}
                  >
                    <motion.img
                      src={prop.src}
                      alt=""
                      className="hero-prop-img"
                      animate={{ y: [0, -18, 0] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: prop.floatDelay || 0,
                      }}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Cup — true arc path */}
            <AnimatePresence mode="sync">
              <ArcCup key={product.id} product={product} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  )
}