import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'


import Home from './pages/Home.jsx'
import Story from './pages/Story.jsx'
import Flavors from './pages/Flavors.jsx'
import FlavorDetail from './pages/FlavorDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
// import Hero from './components/Hero/Hero.jsx'

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <Navbar />
      {/* <Hero /> */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/flavors/:id" element={<FlavorDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  )
}