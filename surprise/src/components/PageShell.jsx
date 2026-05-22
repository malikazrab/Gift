import { motion, useReducedMotion } from 'framer-motion'
import { getEntranceAnimation } from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

function PageShell({ eyebrow, title, description, actions, children }) {
  const prefersReducedMotion = useReducedMotion()
  const { isLowPowerMode } = usePerformanceMode()
  const heroEntrance = getEntranceAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    y: 30,
    duration: 0.8,
  })

  return (
    <section className="page-shell">
      <motion.div
        className="page-hero"
        initial={heroEntrance.initial}
        animate={heroEntrance.animate}
        transition={heroEntrance.transition}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </motion.div>

      <div className="page-content">{children}</div>
    </section>
  )
}

export default PageShell
