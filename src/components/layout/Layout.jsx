import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'
import CustomCursor from '../ui/CustomCursor'
import ScrollProgress from '../ui/ScrollProgress'
import useReveal from '../../hooks/useReveal'
import useParallax from '../../hooks/useParallax'

export default function Layout() {
  const location = useLocation()
  useReveal(location.pathname)
  useParallax()

  return (
    <div className="min-h-screen bg-sand text-ink">
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
