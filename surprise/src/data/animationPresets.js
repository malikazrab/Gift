// Animation presets for performance optimization
// These are reusable animation configurations to avoid inline definitions

export const ANIMATION_PRESET = {
  // Fast, snappy animations
  quick: {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1],
  },
  // Standard animation timing
  standard: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  },
  // Smooth, slower animations
  smooth: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  },
  // Very smooth, for in-view transitions
  smooth_long: {
    duration: 0.95,
    ease: [0.22, 1, 0.36, 1],
  },
}

// Fade in variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Slide up variants
export const slideUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

// Scale fade variants
export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

// Hover effects
export const hoverScale = {
  whileHover: { scale: 1.02, y: -4 },
  whileTap: { scale: 0.98 },
}

export const hoverGlow = {
  whileHover: { boxShadow: '0 20px 40px rgba(193, 69, 114, 0.25)' },
}

// Container animations for staggering children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Optimized scroll trigger animation
export const scrollAnimationConfig = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
}
