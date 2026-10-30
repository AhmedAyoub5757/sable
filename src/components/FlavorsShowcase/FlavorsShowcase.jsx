import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../../data/products.js'
import './FlavorsShowcase.css'

const EASE = [0.22, 1, 0.36, 1]

function FlavorCard({ product, index, suppressed, slotRef, sectionRef }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(imgRef, { once: false, amount: 0.3 })
  const showReal = inView && !suppressed

  // Subtle parallax — alternating columns drift at slightly different rates
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [40, -40] : [60, -20]
  )

  return (
    <motion.div
      ref={cardRef}
      className="fcard"
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 60, scale: 0.92, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
    >
      <div className="fcard-glow" style={{ background: product.colorLight }} />

      <div
        className="fcard-slot"
        ref={(node) => {
          slotRef(node)
          imgRef.current = node
        }}
      >
        <motion.img
          src={product.cup}
          alt={product.name}
          className="fcard-img"
          animate={{
            opacity: showReal ? 1 : 0,
            y: showReal ? 0 : 36,
            scale: showReal ? 1 : 0.88,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      <div className="fcard-body">
        <span className="fcard-index">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="fcard-name">{product.name}</h3>
        <p className="fcard-tagline">{product.tagline}</p>
        <NavLink to={`/flavors/${product.id}`} className="fcard-link">
          <span>View Flavor</span>
          <ArrowRight size={13} />
        </NavLink>
      </div>
    </motion.div>
  )
}

export default function FlavorsShowcase({ suppressId, registerSlotRef }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [PRODUCTS[0].colorDark, PRODUCTS[2].colorDark, PRODUCTS[3].colorDark]
  )

  return (
    <motion.section className="fshow" ref={sectionRef} style={{ background }}>
      <div className="fshow-intro">
        <motion.span
          className="fshow-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Lineup
        </motion.span>
        <motion.h2
          className="fshow-heading"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Four shakes. One standard.
        </motion.h2>
      </div>

      <div className="fshow-grid">
        {PRODUCTS.map((p, i) => (
          <FlavorCard
            key={p.id}
            product={p}
            index={i}
            suppressed={p.id === suppressId}
            slotRef={(node) => registerSlotRef(p.id, node)}
            sectionRef={sectionRef}
          />
        ))}
      </div>
    </motion.section>
  )
}