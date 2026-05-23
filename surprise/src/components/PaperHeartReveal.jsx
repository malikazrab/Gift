import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import gsap from 'gsap'
import couplePhoto from '../assets/maria-heart-photo.jpeg'
import {
  getHoverAnimation,
  getRevealAnimation,
} from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

const DEFAULT_HEART_SWIPE_DISTANCE = 88
const HEART_SWIPE_COMPLETE_THRESHOLD = 0.72
const HEART_SWIPE_VELOCITY_THRESHOLD = 760

function PaperHeartReveal({
  photo = couplePhoto,
  photoAlt = 'Azrab and Maria together',
  photoCopy = 'Maria, you are my favorite blessing and the most beautiful page in my story.',
  helperText = 'Swipe the little heart upward and let your favorite memory bloom.',
  closedLabel = 'Swipe up to unfold our heart',
  openLabel = 'Fold it back',
  regionLabel = 'A photo memory of Azrab and Maria',
}) {
  const prefersReducedMotion = useReducedMotion()
  const { canHover, isLowPowerMode } = usePerformanceMode()
  const heartShellRef = useRef(null)
  const heartBackdropRef = useRef(null)
  const heartLeftLobeRef = useRef(null)
  const heartRightLobeRef = useRef(null)
  const heartTailRef = useRef(null)
  const heartFoldRef = useRef(null)
  const heartSealRef = useRef(null)
  const photoRevealRef = useRef(null)
  const [heartOpen, setHeartOpen] = useState(false)
  const [swipeDistance, setSwipeDistance] = useState(DEFAULT_HEART_SWIPE_DISTANCE)
  const sealY = useMotionValue(0)
  const swipeProgress = useTransform(() => {
    if (!swipeDistance) {
      return 0
    }

    return Math.min(Math.abs(sealY.get()) / swipeDistance, 1)
  })

  useEffect(() => {
    if (
      !heartShellRef.current ||
      !heartBackdropRef.current ||
      !heartLeftLobeRef.current ||
      !heartRightLobeRef.current ||
      !heartTailRef.current ||
      !heartFoldRef.current ||
      !heartSealRef.current ||
      !photoRevealRef.current
    ) {
      return undefined
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const durationScale = prefersReducedMotion ? 0.01 : isLowPowerMode ? 0.82 : 1

    gsap.set(
      [
        heartShellRef.current,
        heartLeftLobeRef.current,
        heartRightLobeRef.current,
        heartTailRef.current,
        heartBackdropRef.current,
        heartSealRef.current,
        photoRevealRef.current,
      ],
      { force3D: true },
    )

    if (heartOpen) {
      tl.to(heartShellRef.current, {
        y: -10,
        duration: 0.45 * durationScale,
      })
        .to(
          heartSealRef.current,
          {
            autoAlpha: 0,
            scale: 0.82,
            y: 8,
            duration: 0.24 * durationScale,
          },
          0,
        )
        .to(
          heartLeftLobeRef.current,
          {
            rotate: -114,
            xPercent: -42,
            yPercent: -6,
            duration: 0.95 * durationScale,
            ease: 'power2.inOut',
          },
          0.08,
        )
        .to(
          heartRightLobeRef.current,
          {
            rotate: 114,
            xPercent: 42,
            yPercent: -6,
            duration: 0.95 * durationScale,
            ease: 'power2.inOut',
          },
          0.08,
        )
        .to(
          heartTailRef.current,
          {
            rotate: 45,
            yPercent: 36,
            scaleY: 0.86,
            duration: 0.88 * durationScale,
            ease: 'power2.inOut',
          },
          0.14,
        )
        .to(
          heartFoldRef.current,
          {
            scaleY: 0.22,
            autoAlpha: 0.28,
            duration: 0.65 * durationScale,
            ease: 'power2.out',
          },
          0.2,
        )
        .to(
          heartBackdropRef.current,
          {
            autoAlpha: 1,
            scale: 1.06,
            duration: 0.72 * durationScale,
            ease: 'power2.out',
          },
          0.22,
        )
        .fromTo(
          photoRevealRef.current,
          { autoAlpha: 0, y: 42, scale: 0.88 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.95 * durationScale,
            ease: 'power3.out',
          },
          0.72,
        )
    } else {
      tl.to(photoRevealRef.current, {
        autoAlpha: 0,
        y: 26,
        scale: 0.94,
        duration: 0.3 * durationScale,
      })
        .to(
          heartBackdropRef.current,
          {
            autoAlpha: 0.72,
            scale: 1,
            duration: 0.42 * durationScale,
          },
          0.02,
        )
        .to(
          heartLeftLobeRef.current,
          {
            rotate: -45,
            xPercent: 0,
            yPercent: 0,
            duration: 0.82 * durationScale,
            ease: 'power2.inOut',
          },
          0.04,
        )
        .to(
          heartRightLobeRef.current,
          {
            rotate: 45,
            xPercent: 0,
            yPercent: 0,
            duration: 0.82 * durationScale,
            ease: 'power2.inOut',
          },
          0.04,
        )
        .to(
          heartTailRef.current,
          {
            rotate: 45,
            yPercent: 0,
            scaleY: 1,
            duration: 0.76 * durationScale,
            ease: 'power2.inOut',
          },
          0.08,
        )
        .to(
          heartFoldRef.current,
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.55 * durationScale,
            ease: 'power2.out',
          },
          0.16,
        )
        .to(
          heartSealRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.26 * durationScale,
          },
          0.42,
        )
        .to(
          heartShellRef.current,
          {
            y: 0,
            duration: 0.35 * durationScale,
          },
          0.18,
        )
    }

    return () => tl.kill()
  }, [heartOpen, isLowPowerMode, prefersReducedMotion])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateSwipeDistance = () => {
      if (!heartShellRef.current) {
        return
      }

      const nextDistance = Math.max(
        Math.min(heartShellRef.current.offsetHeight * 0.22, 108),
        72,
      )

      setSwipeDistance(nextDistance)
      sealY.set(Math.max(sealY.get(), -nextDistance))
    }

    updateSwipeDistance()
    window.addEventListener('resize', updateSwipeDistance)

    return () => {
      window.removeEventListener('resize', updateSwipeDistance)
    }
  }, [sealY])

  useEffect(() => {
    if (!heartOpen) {
      sealY.set(0)
    }
  }, [heartOpen, sealY])

  const heartEntrance = getRevealAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    amount: 0.55,
    y: 30,
    scale: 0.9,
    duration: 0.9,
  })

  const handleHeartSwipeEnd = async (_, info) => {
    if (heartOpen || !swipeDistance) {
      return
    }

    const currentY = sealY.get()
    const progress = Math.abs(currentY) / swipeDistance
    const shouldOpen =
      progress >= HEART_SWIPE_COMPLETE_THRESHOLD ||
      (info.velocity.y <= -HEART_SWIPE_VELOCITY_THRESHOLD && progress > 0.28)

    if (shouldOpen) {
      await animate(sealY, -swipeDistance, {
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: isLowPowerMode ? 220 : 280,
        damping: isLowPowerMode ? 24 : 20,
        duration: prefersReducedMotion ? 0.18 : undefined,
      })
      setHeartOpen(true)
      return
    }

    await animate(sealY, 0, {
      type: prefersReducedMotion ? 'tween' : 'spring',
      stiffness: isLowPowerMode ? 280 : 360,
      damping: isLowPowerMode ? 28 : 24,
      duration: prefersReducedMotion ? 0.16 : undefined,
    })
  }

  const handleHeartShellClick = (event) => {
    if (heartOpen || event.detail === 0) {
      setHeartOpen((current) => !current)
    }
  }

  return (
    <div className={`heart-stage ${heartOpen ? 'is-open' : ''}`}>
      <motion.button
        type="button"
        className={`heart-shell paper-heart-shell ${heartOpen ? 'open' : ''}`}
        ref={heartShellRef}
        onClick={handleHeartShellClick}
        aria-expanded={heartOpen}
        aria-controls="heart-photo-reveal"
        aria-describedby="heart-help"
        initial={heartEntrance.initial}
        whileInView={heartEntrance.whileInView}
        viewport={heartEntrance.viewport}
        transition={heartEntrance.transition}
        whileHover={
          heartOpen
            ? undefined
            : getHoverAnimation({
                canHover,
                isLowPowerMode,
                scale: 1.03,
                y: -10,
                duration: 0.28,
              })
        }
        whileTap={prefersReducedMotion ? undefined : { scale: isLowPowerMode ? 0.99 : 0.98 }}
      >
        <span className="paper-heart-scene" aria-hidden="true">
          <span className="paper-heart-backdrop" ref={heartBackdropRef} />
          <span className="paper-heart-fold" ref={heartFoldRef} />
          <span className="paper-heart-swipe-track">
            <motion.span
              className="paper-heart-swipe-bar"
              style={{ scaleY: swipeProgress }}
            />
          </span>
          <span
            className="paper-heart-lobe paper-heart-lobe-left"
            ref={heartLeftLobeRef}
          />
          <span
            className="paper-heart-lobe paper-heart-lobe-right"
            ref={heartRightLobeRef}
          />
          <span className="paper-heart-tail" ref={heartTailRef} />
          <motion.span
            className="paper-heart-seal-wrap"
            drag={heartOpen ? false : 'y'}
            dragConstraints={{ top: -swipeDistance, bottom: 0 }}
            dragElastic={0.08}
            dragMomentum={false}
            style={{ y: sealY }}
            onDragEnd={handleHeartSwipeEnd}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            <span className="paper-heart-seal" ref={heartSealRef}>
              ♥
            </span>
          </motion.span>
          <span className="paper-heart-title">
            {heartOpen ? openLabel : closedLabel}
          </span>
        </span>
      </motion.button>

      <motion.p
        className="heart-help"
        id="heart-help"
        animate={heartOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: isLowPowerMode ? 0.2 : 0.28, ease: 'easeOut' }}
      >
        {helperText}
      </motion.p>

      <div
        className={`heart-photo-reveal ${heartOpen ? 'visible' : ''}`}
        id="heart-photo-reveal"
        ref={photoRevealRef}
        role="region"
        aria-label={regionLabel}
        aria-hidden={!heartOpen}
      >
        <span className="heart-photo-halo" aria-hidden="true" />
        <span className="heart-photo-card">
          <img src={photo} alt={photoAlt} />
          <span className="heart-photo-copy">{photoCopy}</span>
        </span>
      </div>
    </div>
  )
}

export default PaperHeartReveal
