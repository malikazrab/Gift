import { useLayoutEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

const COMPLETE_THRESHOLD = 0.82
const VELOCITY_THRESHOLD = 950
const COMPACT_COMPLETE_THRESHOLD = 0.74
const COMPACT_VELOCITY_THRESHOLD = 720

function WelcomeOverlay({ onDismiss }) {
  const prefersReducedMotion = useReducedMotion()
  const { isLowPowerMode } = usePerformanceMode()
  const swipeTrackRef = useRef(null)
  const swipeHandleRef = useRef(null)
  const [welcomeClosing, setWelcomeClosing] = useState(false)
  const [swipeHandleWidth, setSwipeHandleWidth] = useState(70)
  const [maxSwipeDistance, setMaxSwipeDistance] = useState(0)
  const [swipeReady, setSwipeReady] = useState(false)
  const swipeX = useMotionValue(0)
  const swipeProgress = useTransform(() => {
    const totalDistance = maxSwipeDistance + swipeHandleWidth
    if (!totalDistance) {
      return 0
    }

    return (swipeX.get() + swipeHandleWidth) / totalDistance
  })

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateMaxSwipeDistance = () => {
      if (!swipeTrackRef.current) {
        return
      }

      const nextHandleWidth = swipeHandleRef.current?.offsetWidth || 70
      const nextDistance = Math.max(
        swipeTrackRef.current.offsetWidth - nextHandleWidth,
        0,
      )

      setSwipeHandleWidth((currentWidth) =>
        currentWidth === nextHandleWidth ? currentWidth : nextHandleWidth,
      )
      setMaxSwipeDistance((currentDistance) =>
        currentDistance === nextDistance ? currentDistance : nextDistance,
      )
      setSwipeReady(nextDistance > 0)
      swipeX.set(Math.min(swipeX.get(), nextDistance))
    }

    updateMaxSwipeDistance()
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            updateMaxSwipeDistance()
          })

    if (resizeObserver) {
      if (swipeTrackRef.current) {
        resizeObserver.observe(swipeTrackRef.current)
      }

      if (swipeHandleRef.current) {
        resizeObserver.observe(swipeHandleRef.current)
      }
    }

    window.addEventListener('resize', updateMaxSwipeDistance)

    return () => {
      window.removeEventListener('resize', updateMaxSwipeDistance)
      resizeObserver?.disconnect()
    }
  }, [swipeX])

  const swipeHintOpacity = useTransform(
    swipeX,
    [0, Math.max(maxSwipeDistance * 0.5, 1)],
    [1, 0.16],
  )
  const swipeTrackScale = useTransform(
    swipeX,
    [0, Math.max(maxSwipeDistance * 0.65, 1), Math.max(maxSwipeDistance, 1)],
    [1, 1.01, 1.02],
  )

  const finishDismiss = () => {
    setWelcomeClosing(true)
    const removalDelay = prefersReducedMotion ? 80 : isLowPowerMode ? 260 : 420
    window.setTimeout(() => {
      onDismiss?.()
    }, removalDelay)
  }

  const handleSwipeEnd = async (_, info) => {
    if (!maxSwipeDistance) {
      return
    }

    const currentX = swipeX.get()
    const swipeProgress = currentX / maxSwipeDistance
    const usesCompactThresholds = maxSwipeDistance < 240
    const completionThreshold = usesCompactThresholds
      ? COMPACT_COMPLETE_THRESHOLD
      : COMPLETE_THRESHOLD
    const velocityThreshold = usesCompactThresholds
      ? COMPACT_VELOCITY_THRESHOLD
      : VELOCITY_THRESHOLD
    const shouldComplete =
      swipeProgress >= completionThreshold ||
      (info.velocity.x >= velocityThreshold && swipeProgress > 0.4)

    if (shouldComplete) {
      await animate(swipeX, maxSwipeDistance, {
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: isLowPowerMode ? 220 : 260,
        damping: isLowPowerMode ? 28 : 24,
        mass: 0.9,
        duration: prefersReducedMotion ? 0.2 : isLowPowerMode ? 0.22 : undefined,
      })
      finishDismiss()
      return
    }

    await animate(swipeX, 0, {
      type: prefersReducedMotion ? 'tween' : 'spring',
      stiffness: isLowPowerMode ? 300 : 380,
      damping: isLowPowerMode ? 30 : 26,
      mass: 0.72,
      duration: prefersReducedMotion ? 0.18 : isLowPowerMode ? 0.2 : undefined,
    })
  }

  return (
    <motion.div
      className={`welcome-overlay ${welcomeClosing ? 'closing' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={welcomeClosing ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.16 : isLowPowerMode ? 0.26 : 0.38,
        ease: 'easeOut',
      }}
    >
      <motion.div
        className="welcome-card"
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: 48, scale: 0.92, rotateX: -8 }
        }
        animate={
          welcomeClosing
            ? {
                opacity: 0,
                y: prefersReducedMotion ? -10 : -24,
                scale: 0.95,
              }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }
        }
        transition={{
          duration: prefersReducedMotion ? 0.18 : isLowPowerMode ? 0.48 : 0.72,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="welcome-label">For Maria</p>
        <h2>My sweetest surprise begins with you.</h2>
        <p>
          This little world was made with love, soft light, and a heart full of
          us.
        </p>

        <motion.div
          className="welcome-swipe"
          ref={swipeTrackRef}
          style={{ scale: swipeTrackScale }}
        >
          <motion.div
            className="welcome-swipe__fill"
            style={{ scaleX: swipeProgress }}
          />
          <motion.p className="welcome-swipe__hint" style={{ opacity: swipeHintOpacity }}>
            Swipe to open
          </motion.p>
          <motion.div
            className="welcome-swipe__handle"
            ref={swipeHandleRef}
            drag={swipeReady ? 'x' : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: maxSwipeDistance }}
            dragElastic={0.08}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 900, bounceDamping: 36 }}
            style={{ x: swipeX }}
            onDragEnd={handleSwipeEnd}
            whileTap={prefersReducedMotion ? undefined : { scale: isLowPowerMode ? 0.99 : 0.98 }}
          >
            <span className="welcome-swipe__chevrons" aria-hidden="true">
              <span />
              <span />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeOverlay
