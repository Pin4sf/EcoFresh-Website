import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CustomCursor from '../ui/CustomCursor'
import useReveal from '../../hooks/useReveal'
import useParallax from '../../hooks/useParallax'

export default function Layout() {
  const location = useLocation()
  useReveal(location.pathname)
  useParallax()

  return (
    <div className="min-h-screen bg-sand text-ink">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
