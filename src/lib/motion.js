// Reusable animation variants for framer-motion
// Inspired by zerocircle.in - minimal, smooth, purposeful animations

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
}

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
}

// For scroll-triggered animations with whileInView
export const scrollReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
}

export const scrollRevealLeft = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
}

export const scrollRevealRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
}

// Blur reveal (great for hero text)
export const blurReveal = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

// For hover animations on cards
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.3 } }
}

// Button press effect
export const buttonPress = {
  tap: { scale: 0.98 }
}

// Custom easing values
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],      // cubic-bezier
  bounce: [0.34, 1.56, 0.64, 1],     // back.out equivalent
  swift: [0.4, 0, 0.2, 1]            // material design standard
}

// Duration tokens
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.6,
  hero: 0.8
}

// Navbar-specific animations
export const navbarTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
}

// Nav link hover animation
export const navLinkHover = {
  rest: {
    scale: 1,
    backgroundColor: "transparent"
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(238, 246, 241, 0.5)",
    transition: { duration: 0.2 }
  }
}

// Breadcrumb animations
export const breadcrumbReveal = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
}

// Magnetic hover effect (for buttons and interactive elements)
export const magneticHover = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

// Logo scale reveal
export const logoReveal = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
}

// ============================================
// New variants for enhanced UX (Sprint 1+)
// ============================================

// Word reveal with 3D rotation (for TextReveal component)
export const wordReveal = {
  initial: { opacity: 0, y: 20, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Character stagger animation
export const charStagger = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.02, duration: 0.3 }
  })
}

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Loading screen variants
export const loadingVariants = {
  logo: {
    initial: { scale: 0.8, filter: 'blur(10px)', opacity: 0 },
    animate: { scale: 1, filter: 'blur(0px)', opacity: 1 }
  },
  exit: {
    y: '-100vh',
    transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] }
  }
}

// Magnetic spring config (for useMagnetic hook)
export const magneticSpring = {
  damping: 15,
  stiffness: 150,
  mass: 0.5
}

// Underline slide animation (for nav links)
export const underlineSlide = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  }
}

// Social icon hover
export const socialIconHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
}

// Back to top button variants
export const backToTopVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
}

// Footer stagger container
export const footerStagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
}

// ============================================
// Award-Winning UX Enhancement Variants
// ============================================

// Split-screen exit for loading screen
export const splitReveal = {
  top: {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] }
    }
  },
  bottom: {
    initial: { y: 0 },
    exit: {
      y: '100%',
      transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] }
    }
  }
}

// Letter-by-letter stagger for brand animations
export const letterStagger = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    }
  },
  letter: {
    initial: {
      y: 50,
      opacity: 0,
      rotateX: -60
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
}

// Clip-path page transition (upward wipe reveal)
export const clipPathReveal = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)'
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      clipPath: { duration: 0.5 }
    }
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Footer brand reveal - character by character with 3D rotation
export const footerBrandReveal = {
  container: {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    },
    viewport: { once: true, margin: '-100px' }
  },
  char: {
    initial: {
      y: 120,
      opacity: 0,
      rotateX: -90,
      scale: 0.8
    },
    whileInView: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
}

// Circular progress ring animation
export const circularProgress = {
  initial: {
    strokeDashoffset: 283 // 2 * PI * 45 (circumference)
  },
  animate: (progress) => ({
    strokeDashoffset: 283 - (283 * progress / 100),
    transition: {
      duration: 0.1,
      ease: 'linear'
    }
  })
}

// Interactive orb hover response
export const orbHover = {
  rest: {
    scale: 1,
    filter: 'blur(60px)'
  },
  hover: {
    scale: 1.05,
    filter: 'blur(50px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
}

// Sticky scroll panel transitions
export const stickyPanelVariants = {
  enter: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)'
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(5px)',
    transition: {
      duration: 0.3
    }
  }
}

// Magnetic link character shuffle effect
export const charShuffle = {
  initial: {
    y: 0
  },
  hover: {
    y: [-2, 2, -1, 0],
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}
