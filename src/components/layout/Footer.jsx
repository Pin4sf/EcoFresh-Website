import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { siteCopy } from '../../content/siteCopy'
import { staggerContainer, staggerItem } from '../../lib/motion'
import BackToTop from '../ui/BackToTop'
import SocialIcon from '../ui/SocialIcon'
import useMagnetic from '../../hooks/useMagnetic'

/**
 * Footer - Award-Winning Design
 *
 * Features:
 * - Character-animated brand reveal on scroll
 * - Magnetic contact links with hover effects
 * - Interactive social grid
 * - Peak-end UX principle
 */

// Social links configuration
const socialLinks = [
  { platform: 'linkedin', url: 'https://linkedin.com/company/ecofresh-greensync' },
  { platform: 'twitter', url: 'https://twitter.com/ecofresh' },
  { platform: 'instagram', url: 'https://instagram.com/ecofresh.greensync' },
]

// Animated footer link component with hover underline effect
function FooterLink({ to, href, children, external }) {
  const linkClasses = "group relative text-sand/60 hover:text-sand transition-colors duration-300 text-sm inline-block"

  const underline = (
    <span
      className="absolute -bottom-0.5 left-0 w-full h-px bg-eco origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      aria-hidden="true"
    />
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkClasses} inline-flex items-center gap-1`}
      >
        <span className="relative">
          {children}
          {underline}
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={linkClasses}>
        <span className="relative">
          {children}
          {underline}
        </span>
      </Link>
    )
  }

  return (
    <a href={href} className={linkClasses}>
      <span className="relative">
        {children}
        {underline}
      </span>
    </a>
  )
}

// Magnetic contact link with icon
function MagneticContactLink({ href, icon: Icon, children }) {
  const { ref, style, isHovered } = useMagnetic({ strength: 0.15 })

  return (
    <motion.a
      ref={ref}
      href={href}
      style={style}
      className="group flex items-center gap-3 text-sand/60 hover:text-sand transition-colors duration-300"
    >
      <motion.span
        className="p-2 rounded-xl bg-sand/5 border border-sand/10 transition-all duration-300 group-hover:bg-eco/10 group-hover:border-eco/20"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Icon className="w-4 h-4 text-sand/40 group-hover:text-eco transition-colors duration-300" />
      </motion.span>
      <span className="relative text-sm">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-full h-px bg-eco origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      </span>
    </motion.a>
  )
}

// Character-animated brand component
function AnimatedBrand({ scrollProgress }) {
  const brandText = useMemo(() => 'EcoFresh', [])

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Transform values for the brand reveal
  const brandOpacity = useTransform(scrollProgress, [0, 0.4], [0, 1])
  const brandY = useTransform(scrollProgress, [0, 0.4], [60, 0])
  const brandScale = useTransform(scrollProgress, [0, 0.4], [0.9, 1])

  if (prefersReducedMotion) {
    return (
      <div className="text-center mb-16 px-4 overflow-hidden">
        <h2
          className="text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] font-display font-bold tracking-[-0.04em]
            bg-gradient-to-b from-sand/80 via-sand/50 to-sand/20 bg-clip-text text-transparent
            select-none"
          style={{ WebkitBackgroundClip: 'text' }}
        >
          {brandText}
        </h2>
      </div>
    )
  }

  return (
    <motion.div
      style={{
        opacity: brandOpacity,
        y: brandY,
        scale: brandScale,
      }}
      className="text-center mb-16 px-4 overflow-hidden"
    >
      <div
        className="flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {brandText.split('').map((char, index) => {
          // Stagger delay based on character position
          const isGreen = index >= 3 // "Fresh" part

          return (
            <motion.span
              key={index}
              className={`text-[18vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] font-display font-bold tracking-[-0.04em]
                inline-block select-none
                ${isGreen
                  ? 'bg-gradient-to-b from-eco/80 via-eco/50 to-eco/20'
                  : 'bg-gradient-to-b from-sand/80 via-sand/50 to-sand/20'
                } bg-clip-text text-transparent`}
              style={{
                WebkitBackgroundClip: 'text',
                transformStyle: 'preserve-3d',
              }}
              initial={{
                y: 120,
                opacity: 0,
                rotateX: -90,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                rotateX: 0,
              }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                delay: index * 0.04,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {char}
            </motion.span>
          )
        })}
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 text-sand/40 text-sm md:text-base tracking-widest uppercase"
      >
        Waste to value. At scale.
      </motion.p>
    </motion.div>
  )
}

export default function Footer() {
  const footerRef = useRef(null)

  // Track scroll progress for the footer reveal
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'start center'],
  })

  return (
    <footer
      ref={footerRef}
      className="bg-ink text-sand relative overflow-hidden"
    >
      {/* BackToTop button */}
      <BackToTop />

      {/* Subtle top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eco/30 to-transparent"
        aria-hidden="true"
      />

      {/* Very subtle ambient gradient */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-eco/[0.03] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 py-20 md:py-24">
        {/* Character-animated brand reveal */}
        <AnimatedBrand scrollProgress={scrollYProgress} />

        {/* Main content grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          className="container-default"
        >
          {/* Links Grid */}
          <motion.div
            variants={staggerItem}
            className="grid gap-10 md:gap-8 md:grid-cols-4 pb-12 border-b border-sand/10"
          >
            {/* About Column */}
            <div className="md:col-span-1">
              <p className="text-xs uppercase tracking-[0.15em] text-sand/40 mb-4 font-medium">
                About
              </p>
              <p className="text-sand/60 text-sm leading-relaxed body-elegant">
                Decentralized, segregation-agnostic waste-to-value systems for Indian cities and institutions.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sand/40 mb-4 font-medium">
                Navigate
              </p>
              <nav className="flex flex-col gap-2.5">
                <FooterLink to="/problem">Problem</FooterLink>
                <FooterLink to="/impact">Impact</FooterLink>
                <FooterLink to="/credibility">Credibility</FooterLink>
                <FooterLink to="/team">Team</FooterLink>
                <FooterLink to="/investors">Investors</FooterLink>
              </nav>
            </div>

            {/* Contact Column - Magnetic Links */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sand/40 mb-4 font-medium">
                Contact
              </p>
              <div className="flex flex-col gap-4">
                <MagneticContactLink
                  href={siteCopy.links.partnerEmail}
                  icon={Mail}
                >
                  ecofreshgreensync@gmail.com
                </MagneticContactLink>
                <MagneticContactLink
                  href={siteCopy.links.phone}
                  icon={Phone}
                >
                  +91 96654 37830
                </MagneticContactLink>
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-sand/40 mb-4 font-medium">
                Resources
              </p>
              <div className="flex flex-col gap-2.5">
                <FooterLink href={siteCopy.links.deck} external>
                  Investor Deck
                </FooterLink>
              </div>

              {/* Social links - Interactive Grid */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.15em] text-sand/40 mb-4 font-medium">
                  Connect
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <SocialIcon
                      key={link.platform}
                      platform={link.platform}
                      href={link.url}
                      size="md"
                      className="text-sand/40 hover:text-sand"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust chips - minimal */}
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap gap-2 justify-center"
          >
            {siteCopy.trustBar.items.slice(0, 4).map((item, index) => (
              <motion.span
                key={item}
                className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-sand/40 border border-sand/10 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-sand/10 py-5">
        <div className="container-default flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sand/40">
          <span>© {new Date().getFullYear()} EcoFresh GreenSync Pvt. Ltd.</span>
          <span className="text-sand/30">Designed for impact, engineered for scale.</span>
        </div>
      </div>
    </footer>
  )
}
