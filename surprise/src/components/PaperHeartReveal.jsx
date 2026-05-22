import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import couplePhoto from '../assets/maria-heart-photo.jpeg'

function PaperHeartReveal({
  photo = couplePhoto,
  photoAlt = 'Azrab and Maria together',
  photoCopy = 'Maria, you are my favorite blessing and the most beautiful page in my story.',
  helperText = 'A soft little paper heart that opens into your favorite memory.',
  closedLabel = 'Tap to unfold our heart',
  openLabel = 'Fold it back',
  regionLabel = 'A photo memory of Azrab and Maria',
}) {
  const prefersReducedMotion = useReducedMotion()
  const heartShellRef = useRef(null)
  const heartBackdropRef = useRef(null)
  const heartLeftLobeRef = useRef(null)
  const heartRightLobeRef = useRef(null)
  const heartTailRef = useRef(null)
  const heartFoldRef = useRef(null)
  const heartSealRef = useRef(null)
  const photoRevealRef = useRef(null)
  const [heartOpen, setHeartOpen] = useState(false)

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
    const durationScale = prefersReducedMotion ? 0.01 : 1

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
            filter: 'drop-shadow(0 18px 34px rgba(255, 124, 165, 0.22))',
            duration: 0.72 * durationScale,
            ease: 'power2.out',
          },
          0.22,
        )
        .fromTo(
          photoRevealRef.current,
          { autoAlpha: 0, y: 42, scale: 0.88, filter: 'blur(14px)' },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
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
        filter: 'blur(10px)',
        duration: 0.3 * durationScale,
      })
        .to(
          heartBackdropRef.current,
          {
            autoAlpha: 0.72,
            scale: 1,
            filter: 'drop-shadow(0 0 0 rgba(255, 124, 165, 0))',
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
  }, [heartOpen, prefersReducedMotion])

  return (
    <div className={`heart-stage ${heartOpen ? 'is-open' : ''}`}>
      <motion.button
        type="button"
        className={`heart-shell paper-heart-shell ${heartOpen ? 'open' : ''}`}
        ref={heartShellRef}
        onClick={() => setHeartOpen((current) => !current)}
        aria-expanded={heartOpen}
        aria-controls="heart-photo-reveal"
        aria-describedby="heart-help"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={
          prefersReducedMotion || heartOpen
            ? undefined
            : { scale: 1.03, y: -10, transition: { duration: 0.28 } }
        }
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      >
        <span className="paper-heart-scene" aria-hidden="true">
          <span className="paper-heart-backdrop" ref={heartBackdropRef} />
          <span className="paper-heart-fold" ref={heartFoldRef} />
          <span
            className="paper-heart-lobe paper-heart-lobe-left"
            ref={heartLeftLobeRef}
          />
          <span
            className="paper-heart-lobe paper-heart-lobe-right"
            ref={heartRightLobeRef}
          />
          <span className="paper-heart-tail" ref={heartTailRef} />
          <span className="paper-heart-seal" ref={heartSealRef}>
            ♥
          </span>
          <span className="paper-heart-title">
            {heartOpen ? openLabel : closedLabel}
          </span>
        </span>
      </motion.button>

      <motion.p
        className="heart-help"
        id="heart-help"
        animate={heartOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
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
