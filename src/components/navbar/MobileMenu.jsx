import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { navLinks, flavors } from "../../data/navigation.js";
import "./mobilemenu.css";

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
};

export default function MobileMenu({ open, onClose }) {
  const [flavorsExpanded, setFlavorsExpanded] = useState(false);

  const close = () => {
    setFlavorsExpanded(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobilemenu"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mobilemenu__top">
            <span className="mobilemenu__logo">FORGE</span>
            <button className="mobilemenu__close" onClick={close} aria-label="Close menu">
              <i className="ph-bold ph-x" />
            </button>
          </div>

          <nav className="mobilemenu__links">
            {navLinks.map((link) =>
              link.type === "flavors" ? (
                <div key={link.path} className="mobilemenu__group">
                  <button
                    className="mobilemenu__link mobilemenu__link--toggle"
                    onClick={() => setFlavorsExpanded((v) => !v)}
                  >
                    {link.label}
                    <i className={`ph-bold ph-caret-down ${flavorsExpanded ? "is-open" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {flavorsExpanded && (
                      <motion.div
                        className="mobilemenu__sublist"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {flavors.map((f) => (
                          <Link
                            key={f.slug}
                            to={`/flavors/${f.slug}`}
                            onClick={close}
                            className="mobilemenu__sublink"
                          >
                            {f.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.path} to={link.path} onClick={close} className="mobilemenu__link">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <Link to="/flavors" onClick={close} className="mobilemenu__cta">
            Order Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}