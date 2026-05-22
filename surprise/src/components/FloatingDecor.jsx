import { memo } from 'react'
import { sparkleDots } from '../data/siteContent'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

function FloatingDecor() {
  const { shouldReduceAmbientMotion } = usePerformanceMode()
  const visibleSparkles = shouldReduceAmbientMotion
    ? sparkleDots.slice(0, 3)
    : sparkleDots

  return (
    <>
      <div className="bg-texture bg-texture-one ambient-orb" />
      <div className="bg-texture bg-texture-two ambient-orb" />
      <div className="bg-texture bg-texture-three ambient-orb" />

      <div className="sparkle-field" aria-hidden="true">
        {visibleSparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              '--sparkle-delay': `${sparkle.delay}s`,
              '--sparkle-duration': shouldReduceAmbientMotion ? '4.8s' : '3.2s',
            }}
            data-ambient-motion={shouldReduceAmbientMotion ? 'soft' : 'full'}
          />
        ))}
      </div>
    </>
  )
}

export default memo(FloatingDecor)
