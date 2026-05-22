import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'

function WelcomeOverlay() {
  const prefersReducedMotion = useReducedMotion()
  const welcomeCardRef = useRef(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [welcomeClosing, setWelcomeClosing] = useState(false)

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setWelcomeClosing(true)
    }, 6500)

    const removeTimer = window.setTimeout(() => {
      setShowWelcome(false)
    }, 7600)

    return () => {
      window.clearTimeout(closeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  useEffect(() => {
    if (!showWelcome || !welcomeCardRef.current) {
      return undefined
    }

    if (prefersReducedMotion) {
      gsap.set(welcomeCardRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      })
      return undefined
    }

    const tween = gsap.fromTo(
      welcomeCardRef.current,
      { autoAlpha: 0, y: 48, scale: 0.9, rotateX: -8 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
      },
    )

    return () => tween.kill()
  }, [prefersReducedMotion, showWelcome])

  if (!showWelcome) {
    return null
  }

  return (
    <div className={`welcome-overlay ${welcomeClosing ? 'closing' : ''}`}>
      <div className="welcome-card" ref={welcomeCardRef}>
        <p className="welcome-label">For Maria</p>
        <h2>My sweetest surprise begins with you.</h2>
        <p>
          This little world was made with love, soft light, and a heart full of
          us.
        </p>
      </div>
    </div>
  )
}

export default WelcomeOverlay
