import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { flavors } from "../../data/navigation.js";
import "./megamenu.css";

const panelVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const colVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const spotlightVariants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

const accentMap = {
  crimson: "var(--color-crimson)",
  forest: "#1c5c3f",
};

export default function MegaMenu({ open, onClose }) {
  const [active, setActive] = useState(flavors[0]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="megamenu"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ "--spotlight-color": accentMap[active.accent] }}
        >
          {/* drifting ambient blob, pure CSS/Framer, no GSAP */}
          <motion.div
            className="megamenu__blob"
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="megamenu__noise" />

          <div className="megamenu__grid">
            {/* COLUMN 1 — story */}
            <motion.div
              className="megamenu__col megamenu__col--intro"
              variants={colVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={itemVariants} className="megamenu__eyebrow">
                The Lineup
              </motion.span>
              <motion.h3 variants={itemVariants} className="megamenu__heading">
                Four flavors.
                <br />
                Zero shortcuts.
              </motion.h3>
              <motion.p variants={itemVariants} className="megamenu__sub">
                Small-batch, slow-built, and made to actually taste like something.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link to="/flavors" onClick={onClose} className="megamenu__viewall">
                  <span>View All Flavors</span>
                  <i className="ph-bold ph-arrow-right" />
                </Link>
              </motion.div>
            </motion.div>

            {/* COLUMN 2 — 2x2 flavor grid */}
            <motion.div
              className="megamenu__col megamenu__col--grid"
              variants={colVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="megamenu__flavorgrid">
                {flavors.map((f) => (
                  <motion.div key={f.slug} variants={itemVariants}>
                    <Link
                      to={`/flavors/${f.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActive(f)}
                      className={`megamenu__flavorcard ${active.slug === f.slug ? "is-active" : ""}`}
                    >
                      <span className="megamenu__flavorcard-dot" style={{ background: accentMap[f.accent] }} />
                      <div className="megamenu__flavorcard-thumb">
                        <img src={f.image} alt={f.name} />
                      </div>
                      <div className="megamenu__flavorcard-text">
                        <span className="megamenu__flavorcard-note">{f.note}</span>
                        <span className="megamenu__flavorcard-name">{f.name}</span>
                      </div>
                      <i className="ph-bold ph-arrow-up-right megamenu__flavorcard-arrow" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* COLUMN 3 — live spotlight */}
            <div className="megamenu__col megamenu__col--spotlight">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  className="megamenu__spotlight"
                  variants={spotlightVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="megamenu__spotlight-imgwrap">
                    <img src={active.image} alt={active.name} className="megamenu__spotlight-img" />
                  </div>
                  <span className="megamenu__spotlight-note">{active.note}</span>
                  <h4 className="megamenu__spotlight-name">{active.name}</h4>
                  <p className="megamenu__spotlight-desc">{active.desc}</p>
                  <Link
                    to={`/flavors/${active.slug}`}
                    onClick={onClose}
                    className="megamenu__spotlight-cta"
                  >
                    Explore Flavor <i className="ph-bold ph-arrow-right" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}