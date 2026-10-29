import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Mail, ChevronDown, Globe, ArrowRight } from 'lucide-react'

// Assets
import logo from '../assets/images/logo.png'
import ghImg from '../assets/images/gh.png'
import mbImg from '../assets/images/mb.png'
import mpImg from '../assets/images/mp.png'
import tsImg from '../assets/images/ts.png'

import './Navbar.css'

const FLAVORS_CATALOG = [
  {
    id: '01',
    name: 'Golden Hour',
    notes: 'Citrus, Peach Sparkle & Botanical Extracts',
    image: ghImg,
    intensity: '3 / 5',
    path: '/flavors/golden-hour',
  },
  {
    id: '02',
    name: 'Midnight Berry',
    notes: 'Dark Cherry, Wild Blackberry & Mint',
    image: mbImg,
    intensity: '4 / 5',
    path: '/flavors/midnight-berry',
  },
  {
    id: '03',
    name: 'Matcha Blossom',
    notes: 'Ceremonial Matcha, Jasmine & Honey',
    image: mpImg,
    intensity: '2 / 5',
    path: '/flavors/matcha-blossom',
  },
  {
    id: '04',
    name: 'Tropical Sunshine',
    notes: 'Mango, Passionfruit & Key Lime',
    image: tsImg,
    intensity: '5 / 5',
    path: '/flavors/tropical-sunshine',
  },
]

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeFlavor, setActiveFlavor] = useState(FLAVORS_CATALOG[0])
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  const closeAll = () => {
    document.body.style.overflow = ''
    setMobileOpen(false)
    setMegaOpen(false)
  }

  return (
    <motion.header
      className="site-header"
      initial={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Main Navigation Bar */}
      <div className="nav-container">
        {/* Brand Logo */}
        <NavLink to="/" className="nav-logo-link" onClick={closeAll}>
          <img src={logo} alt="LUCID" className="nav-logo-img" />
        </NavLink>

        {/* Center Main Links (3 Items Kept) */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            {/* 01 Flavors - Mega Menu Trigger with Chevron Dropdown Icon */}
            <li
              className="nav-item"
              onMouseEnter={() => setMegaOpen(true)}
            >
              <NavLink
                to="/flavors"
                className={`nav-link ${megaOpen || location.pathname.startsWith('/flavors') ? 'active' : ''}`}
              >
                <span className="nav-num">01</span>
                <span>Flavors</span>
                <ChevronDown size={14} className={`nav-chevron ${megaOpen ? 'rotated' : ''}`} />
              </NavLink>
            </li>

            {/* 02 Story */}
            <li className="nav-item" onMouseEnter={() => setMegaOpen(false)}>
              <NavLink to="/story" className="nav-link" onClick={closeAll}>
                <span className="nav-num">02</span>
                <span>Story</span>
              </NavLink>
            </li>

            {/* 03 Contact (Ingredients removed) */}
            <li className="nav-item" onMouseEnter={() => setMegaOpen(false)}>
              <NavLink to="/contact" className="nav-link" onClick={closeAll}>
                <span className="nav-num">03</span>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Mobile Menu Toggle */}
        <div className="nav-actions">
          <button className="mobile-toggle" onClick={toggleMobile} aria-label="Toggle Navigation">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Single Editorial Mega Menu Container with Smooth Opening/Closing */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            className="mega-panel-wrapper"
            initial={{ opacity: 0, height: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="mega-panel-inner">
              {/* First Column: Brand Statement & Social Icons */}
              <motion.div
                className="mega-col mega-brand-col"
                initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="brand-statement">
                  <h4>LUCID Elixirs</h4>
                  <p>Botanical sparkling waters engineered for clarity, elevated focus, and refined taste.</p>
                </div>

                <div className="social-links-group">
                  <span className="social-title">CONNECT</span>
                  <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      <span>Instagram</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                      <span>Twitter</span>
                    </a>
                    <a href="https://lucid.com" target="_blank" rel="noreferrer" className="social-link-item">
                      <Globe size={16} />
                      <span>Journal</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Second Column: Staggered Catalog List */}
              <motion.div
                className="mega-col mega-catalog"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <ul className="catalog-list">
                  {FLAVORS_CATALOG.map((flavor, index) => {
                    const isHovered = activeFlavor.id === flavor.id
                    return (
                      <motion.li
                        key={flavor.id}
                        className={`catalog-item ${isHovered ? 'selected' : ''}`}
                        onMouseEnter={() => setActiveFlavor(flavor)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.06 }}
                      >
                        <NavLink to={flavor.path} className="catalog-item-link" onClick={closeAll}>
                          <span className="catalog-id">{flavor.id}</span>
                          <span className="catalog-name">{flavor.name}</span>
                        </NavLink>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>

              {/* Third Column: Enhanced Entrance Dynamic Item Spotlight */}
              <motion.div
                className="mega-col mega-spotlight"
                initial={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="spotlight-content">
                  <motion.h3
                    key={activeFlavor.name}
                    className="spotlight-title"
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {activeFlavor.name}
                  </motion.h3>
                  <motion.p
                    key={activeFlavor.notes}
                    className="spotlight-desc"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {activeFlavor.notes}
                  </motion.p>

                  <div className="spotlight-meta">
                    <span className="meta-label">INTENSITY RATING</span>
                    <div className="intensity-bar">
                      <motion.span
                        key={activeFlavor.intensity}
                        initial={{ width: 0 }}
                        animate={{ width: `${(parseInt(activeFlavor.intensity) / 5) * 100}%` }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>

                  <NavLink to={activeFlavor.path} className="spotlight-cta" onClick={closeAll}>
                    <span>DISCOVER FLAVOR</span>
                    <ArrowRight size={14} />
                  </NavLink>
                </div>

                {/* Bottle Showcase & Watermark Number */}
                <div className="spotlight-visual">
                  <motion.span
                    className="watermark-num"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    {activeFlavor.id}
                  </motion.span>
                  <motion.img
                    key={activeFlavor.id}
                    src={activeFlavor.image}
                    alt={activeFlavor.name}
                    className="spotlight-image"
                    initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (3 Items Kept) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-nav">
              <NavLink to="/flavors" className="mobile-link" onClick={closeAll}>
                <span>01</span> Flavors
              </NavLink>
              <NavLink to="/story" className="mobile-link" onClick={closeAll}>
                <span>02</span> Story
              </NavLink>
              <NavLink to="/contact" className="mobile-link" onClick={closeAll}>
                <span>03</span> Contact
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}