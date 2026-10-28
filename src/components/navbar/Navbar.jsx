import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "../../lib/libs.js";
import MegaMenu from "./MegaMenu.jsx";
import MobileMenu from "./MobileMenu.jsx";
import "./navbar.css";

export default function Navbar() {
  const barRef = useRef(null); // renamed: this is what gets the wipe animation now
  const [flavorsOpen, setFlavorsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef(null);

  // Entrance: diagonal wipe reveal — now on the inner bar, not the header
  useEffect(() => {
    if (!gsap || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { clipPath: "polygon(0 0, 0 0, 0% 100%, 0% 100%)", y: -12 },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        y: 0,
        duration: 1.3,
        delay: 0.4,
        ease: "power4.inOut",
      }
    );
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const openFlavors = () => {
    clearTimeout(closeTimeout.current);
    setFlavorsOpen(true);
  };

  const scheduleCloseFlavors = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setFlavorsOpen(false), 150);
  };

  return (
    <div className="navbar-group">
      <header className="navbar">
        {/* everything visual that should wipe-in lives in this inner bar */}
        <div ref={barRef} className="navbar__bar">
          <Link to="/" className="navbar__logo" onClick={() => setFlavorsOpen(false)}>
            FORGE
          </Link>

          <nav className="navbar__links">
            <NavLink to="/" className="navbar__link" end>
              Home
            </NavLink>

            <div
              className="navbar__link-wrap"
              onMouseEnter={openFlavors}
              onMouseLeave={scheduleCloseFlavors}
            >
              <NavLink
                to="/flavors"
                className={`navbar__link ${flavorsOpen ? "is-active-hover" : ""}`}
              >
                Flavors
                <i className="ph-bold ph-caret-down navbar__link-caret" />
              </NavLink>
            </div>

            <NavLink to="/the-craft" className="navbar__link">
              The Craft
            </NavLink>
            <NavLink to="/contact" className="navbar__link">
              Contact
            </NavLink>
          </nav>

          <div className="navbar__right">
            <Link to="/flavors" className="navbar__cta">
              Order Now
            </Link>

            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <i className="ph-bold ph-list" />
            </button>
          </div>
        </div>

        {/* MegaMenu sits OUTSIDE the clipped .navbar__bar, directly in .navbar (no clip-path), so it isn't clipped */}
        <div
          className="navbar__megawrap"
          onMouseEnter={openFlavors}
          onMouseLeave={scheduleCloseFlavors}
        >
          <MegaMenu open={flavorsOpen} onClose={() => setFlavorsOpen(false)} />
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}