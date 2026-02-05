import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ChevronRight, Menu, X } from 'lucide-react'
import { siteCopy } from '../../content/siteCopy'
import { cn } from '../ui/utils'
import { shouldShowBreadcrumbs, getPageLabel } from '../../lib/routes'
import useScrollDirection from '../../hooks/useScrollDirection'

// Navigation items - linking to separate pages
const navItems = [
  { label: 'Problem', path: '/problem' },
  { label: 'Impact', path: '/impact' },
  { label: 'Credibility', path: '/credibility' },
  { label: 'Team', path: '/team' },
]

// Enhanced NavLink component with character animation
const NavLink = ({ to, children, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const chars = String(children).split('')

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 overflow-hidden',
        isActive ? 'text-eco' : 'text-ink'
      )}
    >
      {/* Background pill on hover */}
      <motion.span
        className="absolute inset-0 rounded-full bg-mist/50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Text with character animation */}
      <span className="relative z-10 flex">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            animate={{
              y: isHovered ? -2 : 0,
              color: isHovered || isActive ? '#148A3A' : '#0E1C17',
            }}
            transition={{
              delay: i * 0.02,
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="navActiveIndicator"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-eco rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Underline on hover (non-active) */}
      {!isActive && (
        <motion.span
          className="absolute bottom-1.5 left-4 right-4 h-px bg-eco"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </Link>
  )
}

// Breadcrumbs component
const Breadcrumbs = ({ pathname }) => {
  const label = getPageLabel(pathname)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center gap-2 text-sm"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-ink/30" />
      <motion.span
        key={pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-medium text-eco"
      >
        {label}
      </motion.span>
    </motion.nav>
  )
}

// Smooth navbar animation variants - always centered
const navbarVariants = {
  top: {
    top: 0,
    left: '50%',
    x: '-50%',
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    backgroundColor: 'rgba(250, 251, 248, 0)',
    borderColor: 'rgba(14, 28, 23, 0)',
    boxShadow: '0 0 0 0 rgba(14, 28, 23, 0)',
  },
  scrolled: {
    top: 16,
    left: '50%',
    x: '-50%',
    width: 'calc(100% - 2rem)',
    maxWidth: 900,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(14, 28, 23, 0.1)',
    boxShadow: '0 10px 40px -10px rgba(14, 28, 23, 0.15)',
  },
  hidden: {
    top: -100,
    left: '50%',
    x: '-50%',
    width: 'calc(100% - 2rem)',
    maxWidth: 900,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(14, 28, 23, 0.1)',
    boxShadow: '0 10px 40px -10px rgba(14, 28, 23, 0.15)',
  },
}

const navbarTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
}

// Mobile menu item variants for stagger
const mobileMenuVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const mobileItemVariants = {
  closed: { opacity: 0, x: 30, filter: 'blur(4px)' },
  open: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isInvestors = location.pathname === '/investors'
  const showBreadcrumbs = shouldShowBreadcrumbs(location.pathname)

  // Use scroll direction hook for smart navbar visibility
  const { scrollDirection, scrollY, isAtTop } = useScrollDirection({ threshold: 10 })

  // Determine navbar state
  const getNavbarState = () => {
    if (isAtTop) return 'top'
    if (scrollDirection === 'down' && scrollY > 100) return 'hidden'
    return 'scrolled'
  }

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const investorLinks = [
    { label: 'Positioning', id: 'positioning' },
    { label: 'Revenue', id: 'revenue' },
    { label: 'Conversion', id: 'conversion' },
    { label: 'Economics', id: 'economics' },
    { label: 'Deployment', id: 'deployment' },
  ]

  const navbarState = getNavbarState()

  // Investor page navbar
  if (isInvestors) {
    return (
      <motion.header
        initial="top"
        animate={navbarState}
        variants={navbarVariants}
        transition={navbarTransition}
        className="fixed z-50 backdrop-blur-md"
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3 w-full">
          <Link to="/" className="flex items-center gap-3 group" aria-label="EcoFresh home" data-cursor="Home">
            <motion.img
              src="/assets/brand/credibility/ECofresh-logo-main.png"
              alt="EcoFresh"
              className="h-8 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-ink-muted">
            {investorLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-eco transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <motion.a
              className="btn-outline text-xs px-4 py-2"
              href={siteCopy.links.partnerEmail}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              data-cursor="Email"
            >
              Partner
            </motion.a>
            <motion.a
              className="btn-primary text-xs px-4 py-2"
              href={siteCopy.links.deck}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(20, 138, 58, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              data-cursor="Open"
            >
              Investor Deck
            </motion.a>
          </div>
        </div>

        {/* Breadcrumbs for investor page */}
        <AnimatePresence>
          {showBreadcrumbs && isAtTop && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-[1200px] px-4 pb-3"
            >
              <Breadcrumbs pathname={location.pathname} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    )
  }

  // Main site navbar
  return (
    <>
      <motion.header
        initial="top"
        animate={navbarState}
        variants={navbarVariants}
        transition={navbarTransition}
        className={cn('fixed z-50', !open && 'backdrop-blur-md')}
        style={{
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 w-full">
          <Link to="/" className="flex items-center gap-3 group" aria-label="EcoFresh home" data-cursor="Home">
            <motion.img
              src="/assets/brand/credibility/ECofresh-logo-main.png"
              alt="EcoFresh"
              className="h-9 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                isActive={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/investors"
              isActive={location.pathname === '/investors'}
            >
              Investors
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              className="btn-outline"
              href={siteCopy.links.partnerEmail}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              data-cursor="Email"
            >
              Partner
            </motion.a>
            <motion.a
              className="btn-primary"
              href={siteCopy.links.deck}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(20, 138, 58, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              data-cursor="Open"
            >
              Investor Deck
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            type="button"
            className="lg:hidden relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/80 backdrop-blur"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
            data-cursor="Menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-ink" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-ink" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Breadcrumbs (below navbar on subpages when at top) */}
        <AnimatePresence>
          {showBreadcrumbs && isAtTop && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-[1200px] px-4 pb-3"
            >
              <Breadcrumbs pathname={location.pathname} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-sand shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Mobile breadcrumbs */}
                {showBreadcrumbs && (
                  <div className="mb-6 pb-4 border-b border-ink/10">
                    <Breadcrumbs pathname={location.pathname} />
                  </div>
                )}

                <motion.nav
                  className="flex flex-col gap-1"
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                >
                  {navItems.map((item) => (
                    <motion.div key={item.path} variants={mobileItemVariants}>
                      <Link
                        to={item.path}
                        className={cn(
                          'py-3 text-lg font-medium transition-colors block',
                          location.pathname === item.path
                            ? 'text-eco'
                            : 'text-ink hover:text-eco'
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/investors"
                      className={cn(
                        'py-3 text-lg font-medium transition-colors block',
                        location.pathname === '/investors'
                          ? 'text-eco'
                          : 'text-ink hover:text-eco'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      Investors
                    </Link>
                  </motion.div>
                </motion.nav>

                <motion.div
                  className="mt-auto space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    className="btn-outline w-full justify-center"
                    href={siteCopy.links.partnerEmail}
                  >
                    Partner with Us
                  </a>
                  <a
                    className="btn-primary w-full justify-center"
                    href={siteCopy.links.deck}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Investor Deck
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
