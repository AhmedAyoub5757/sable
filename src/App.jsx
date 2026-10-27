import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "./animations/useSmoothScroll";

import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import ProductDetail from "./pages/ProductDetail";
// import Story from "./pages/Story";
// import Visit from "./pages/Visit";

export default function App() {
  const location = useLocation();
  useSmoothScroll();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/story" element={<Story />} />
        <Route path="/visit" element={<Visit />} />
      </Routes>
    </AnimatePresence>
  );
}