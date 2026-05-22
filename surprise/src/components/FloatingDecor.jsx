import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { sparkleDots } from '../data/siteContent'

function FloatingDecor() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <div className="bg-texture bg-texture-one ambient-orb" />
      <div className="bg-texture bg-texture-two ambient-orb" />
      <div className="bg-texture bg-texture-three ambient-orb" />

      <div className="sparkle-field" aria-hidden="true">
        {sparkleDots.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              willChange: 'transform', // GPU acceleration
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                    scale: [1, 1.12, 1],
                  }
            }
            transition={{
              duration: 3.2,
              delay: sparkle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </>
  )
}

export default memo(FloatingDecor)
