import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Navbar from "./components/navbar/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Flavors from "./pages/Flavors.jsx";
import FlavorDetail from "./pages/FlavorDetail.jsx";
import TheCraft from "./pages/TheCraft.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      {/* Navbar lives outside AnimatePresence — it should persist,
          not transition in/out with page changes */}
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/flavors" element={<PageTransition><Flavors /></PageTransition>} />
          <Route path="/flavors/:slug" element={<PageTransition><FlavorDetail /></PageTransition>} />
          <Route path="/the-craft" element={<PageTransition><TheCraft /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}