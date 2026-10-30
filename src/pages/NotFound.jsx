import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Droplet } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import './NotFound.css'

const EASE = [0.16, 1, 0.3, 1]

const FLOATERS = [
  { size: 10, top: '15%', left: '12%', duration: 6, delay: 0 },
  { size: 6, top: '70%', left: '8%', duration: 7.5, delay: 0.5 },
  { size: 14, top: '25%', left: '85%', duration: 8, delay: 1 },
  { size: 8, top: '78%', left: '88%', duration: 6.5, delay: 1.5 },
  { size: 5, top: '45%', left: '5%', duration: 5.5, delay: 0.8 },
  { size: 9, top: '55%', left: '92%', duration: 7, delay: 0.3 },
  { size: 7, top: '10%', left: '50%', duration: 6.8, delay: 1.2 },
  { size: 11, top: '85%', left: '45%', duration: 7.2, delay: 0.6 },
]

export default function NotFound() {
  const blobRef = useRef(null)

  useEffect(() => {
    if (!window.gsap) return
    const ctx = window.gsap.context(() => {
      window.gsap.to(blobRef.current, {
        x: 60,
        y: -40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <section className="notfound">
        {/* Drifting ambient blob (GSAP) */}
        <div ref={blobRef} className="nf-blob" />

        {/* Floating particles */}
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className="nf-particle"
            style={{ width: f.size, height: f.size, top: f.top, left: f.left }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, -40, -70, -100] }}
            transition={{
              duration: f.duration,
              delay: f.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="nf-content">
          {/* Glitch 404 */}
          <motion.div
            className="nf-404-wrap"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE }}
          >
            <h1 className="nf-404" data-text="404">
              404
            </h1>
          </motion.div>

          {/* Floating cup icon */}
          <motion.div
            className="nf-cup-icon"
            initial={{ opacity: 0, y: -30, rotate: -15 }}
            animate={{
              opacity: 1,
              y: [0, -16, 0],
              rotate: [-6, 6, -6],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
              rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            }}
          >
            <Droplet size={34} strokeWidth={2} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="nf-heading"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            This flavor doesn't exist.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="nf-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            The page you poured has either spilled, evaporated, or was never
            crafted in the first place. Let's get you back to something real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="nf-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          >
            <Link to="/" className="nf-btn-primary">
              <Home size={16} strokeWidth={2.2} />
              <span>Back to Home</span>
            </Link>
            <button onClick={() => window.history.back()} className="nf-btn-ghost">
              <ArrowLeft size={16} strokeWidth={2.2} />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Bottom flavor index strip */}
          <motion.div
            className="nf-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <span>ERR_FLAVOR_NOT_FOUND</span>
            <span className="nf-dot">•</span>
            <span>LUCID / 2026</span>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}