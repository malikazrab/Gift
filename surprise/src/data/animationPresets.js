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

export const DEFAULT_EASE = [0.22, 1, 0.36, 1]

// Fade in variants
export const fadeInVariants = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: { opacity: 1 },
}

// Slide up variants
export const slideUpVariants = {
  hidden: { opacity: 0, y: 24, willChange: 'transform, opacity' },
  visible: { opacity: 1, y: 0 },
}

// Scale fade variants
export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.92, willChange: 'transform, opacity' },
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
  transition: { duration: 0.75, ease: DEFAULT_EASE },
}

export function getViewportConfig(amount = 0.3, isLowPowerMode = false) {
  return {
    once: true,
    amount: isLowPowerMode ? Math.min(amount, 0.2) : amount,
  }
}

export function getRevealAnimation({
  prefersReducedMotion,
  isLowPowerMode = false,
  amount = 0.3,
  delay = 0,
  duration = 0.75,
  x = 0,
  y = 28,
  scale,
  rotateX,
}) {
  if (prefersReducedMotion) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: getViewportConfig(amount, isLowPowerMode),
      transition: undefined,
    }
  }

  const distanceMultiplier = isLowPowerMode ? 0.65 : 1
  const hidden = { opacity: 0 }
  const visible = { opacity: 1 }

  if (x) {
    hidden.x = x * distanceMultiplier
    visible.x = 0
  }

  if (y) {
    hidden.y = y * distanceMultiplier
    visible.y = 0
  }

  if (typeof scale === 'number') {
    hidden.scale = isLowPowerMode ? Math.max(scale, 0.985) : scale
    visible.scale = 1
  }

  if (typeof rotateX === 'number' && !isLowPowerMode) {
    hidden.rotateX = rotateX
    visible.rotateX = 0
  }

  return {
    initial: hidden,
    whileInView: visible,
    viewport: getViewportConfig(amount, isLowPowerMode),
    transition: {
      duration: Math.max(0.24, duration * (isLowPowerMode ? 0.82 : 1)),
      delay: isLowPowerMode ? Math.min(delay, 0.12) : delay,
      ease: DEFAULT_EASE,
    },
  }
}

export function getEntranceAnimation({
  prefersReducedMotion,
  isLowPowerMode = false,
  delay = 0,
  duration = 0.75,
  x = 0,
  y = 24,
  scale,
  rotateX,
}) {
  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: undefined,
      transition: undefined,
    }
  }

  const distanceMultiplier = isLowPowerMode ? 0.65 : 1
  const initial = { opacity: 0 }
  const animate = { opacity: 1 }

  if (x) {
    initial.x = x * distanceMultiplier
    animate.x = 0
  }

  if (y) {
    initial.y = y * distanceMultiplier
    animate.y = 0
  }

  if (typeof scale === 'number') {
    initial.scale = isLowPowerMode ? Math.max(scale, 0.985) : scale
    animate.scale = 1
  }

  if (typeof rotateX === 'number' && !isLowPowerMode) {
    initial.rotateX = rotateX
    animate.rotateX = 0
  }

  return {
    initial,
    animate,
    transition: {
      duration: Math.max(0.22, duration * (isLowPowerMode ? 0.82 : 1)),
      delay: isLowPowerMode ? Math.min(delay, 0.12) : delay,
      ease: DEFAULT_EASE,
    },
  }
}

export function getHoverAnimation({
  canHover,
  isLowPowerMode = false,
  y = -8,
  scale,
  rotate,
  rotateX,
  rotateY,
  duration = 0.25,
}) {
  if (!canHover || isLowPowerMode) {
    return undefined
  }

  const hoverAnimation = {
    y,
    transition: {
      duration,
      ease: 'easeOut',
    },
  }

  if (typeof scale === 'number') {
    hoverAnimation.scale = scale
  }

  if (typeof rotate === 'number') {
    hoverAnimation.rotate = rotate
  }

  if (typeof rotateX === 'number') {
    hoverAnimation.rotateX = rotateX
  }

  if (typeof rotateY === 'number') {
    hoverAnimation.rotateY = rotateY
  }

  return hoverAnimation
}
