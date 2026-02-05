import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'
import CustomCursor from '../ui/CustomCursor'
import ScrollProgress from '../ui/ScrollProgress'
import PageTransitionOverlay from '../ui/PageTransitionOverlay'
import useReveal from '../../hooks/useReveal'
import useParallax from '../../hooks/useParallax'

export default function Layout() {
  const location = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)
  const prevPathRef = useRef(location.pathname)

  useReveal(location.pathname)
  useParallax()

  // Detect route changes and show transition overlay
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setIsNavigating(true)
      prevPathRef.current = location.pathname

      // Hide overlay after animation completes (longer for message to be readable)
      const timer = setTimeout(() => {
        setIsNavigating(false)
      }, 650)

      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-sand text-ink">
      <PageTransitionOverlay isNavigating={isNavigating} targetPath={location.pathname} />
      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
