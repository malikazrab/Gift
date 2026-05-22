import { motion, useReducedMotion } from 'framer-motion'
import { getHoverAnimation, getRevealAnimation } from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

function PageGift({ gift }) {
  const prefersReducedMotion = useReducedMotion()
  const { canHover, isLowPowerMode } = usePerformanceMode()
  const revealAnimation = getRevealAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    amount: 0.35,
    y: 30,
    scale: 0.98,
    duration: 0.75,
  })

  return (
    <motion.section
      className="page-gift"
      initial={revealAnimation.initial}
      whileInView={revealAnimation.whileInView}
      viewport={revealAnimation.viewport}
      transition={revealAnimation.transition}
      whileHover={getHoverAnimation({ canHover, isLowPowerMode, y: -8, duration: 0.28 })}
    >
      <div className="page-gift__top">
        <span className="page-gift__box" aria-hidden="true">
          <span className="page-gift__ribbon page-gift__ribbon--vertical" />
          <span className="page-gift__ribbon page-gift__ribbon--horizontal" />
        </span>
        <span className="page-gift__tag">For Maria</span>
      </div>

      <p className="eyebrow">{gift.eyebrow}</p>
      <h3>{gift.title}</h3>
      <p>{gift.text}</p>
    </motion.section>
  )
}

export default PageGift
