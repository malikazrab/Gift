import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import PageShell from '../components/PageShell'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import {
  getEntranceAnimation,
  getHoverAnimation,
  getRevealAnimation,
} from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'
import {
  floatingHearts,
  loveNotes,
  pageGifts,
  promiseCards,
} from '../data/siteContent'

function HomePage() {
  const prefersReducedMotion = useReducedMotion()
  const { canHover, isLowPowerMode, shouldReduceAmbientMotion } = usePerformanceMode()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { amount: 0.2 })
  const visibleHearts = shouldReduceAmbientMotion
    ? floatingHearts.slice(0, 5)
    : floatingHearts
  const heroBadgeAnimation = getEntranceAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    y: 24,
    delay: 0.15,
    duration: 0.7,
  })
  const heroTitleAnimation = getEntranceAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    y: 36,
    delay: 0.28,
    duration: 0.95,
  })
  const heroTextAnimation = getEntranceAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    y: 28,
    delay: 0.42,
    duration: 0.8,
  })
  const heroSignatureAnimation = getEntranceAnimation({
    prefersReducedMotion,
    isLowPowerMode,
    y: 16,
    delay: 0.58,
    duration: 0.65,
  })

  return (
    <PageShell
      eyebrow="Home Sweet Love"
      title="A little world built only to remind you how deeply you are loved."
      description="This surprise is not just a website. It is a slow walk through the feelings, memories, and promises I carry for you every day."
      actions={
        <>
          <Link className="romance-button primary" to="/story">
            Read Our Story
          </Link>
          <Link className="romance-button secondary" to="/reasons">
            Why I Love You
          </Link>
        </>
      }
    >
      <section className="hero-section hero-section--inner" ref={heroRef}>
        <div className="floating-hearts" aria-hidden="true">
          {visibleHearts.map((heart) => (
            <span
              className="floating-heart"
              key={heart.id}
              style={{
                '--heart-top': heart.top,
                '--heart-left': heart.left,
                '--heart-top-mobile': heart.mobileTop,
                '--heart-left-mobile': heart.mobileLeft,
                '--heart-size': heart.size,
                '--heart-size-mobile': heart.mobileSize,
                '--heart-drift-x': `${heart.driftX}px`,
                '--heart-drift-y': `${heart.driftY}px`,
                '--heart-rotate': `${heart.rotate}deg`,
                '--heart-duration': `${shouldReduceAmbientMotion ? heart.duration + 1.2 : heart.duration}s`,
                '--heart-delay': `${heart.delay}s`,
              }}
              data-ambient-motion={
                prefersReducedMotion || !heroInView
                  ? 'paused'
                  : shouldReduceAmbientMotion
                    ? 'soft'
                    : 'full'
              }
            >
              ♥
            </span>
          ))}
        </div>

        <motion.p
          className="hero-badge"
          initial={heroBadgeAnimation.initial}
          animate={heroBadgeAnimation.animate}
          transition={heroBadgeAnimation.transition}
        >
          Made with love for Maria
        </motion.p>
        <motion.h2
          className="hero-title hero-title--compact"
          initial={heroTitleAnimation.initial}
          animate={heroTitleAnimation.animate}
          transition={heroTitleAnimation.transition}
        >
          To Maria, who makes my whole world softer, brighter, and alive.
        </motion.h2>
        <motion.p
          className="hero-text"
          initial={heroTextAnimation.initial}
          animate={heroTextAnimation.animate}
          transition={heroTextAnimation.transition}
        >
          You are my peace, my favorite smile, and the most beautiful part of my
          story.
        </motion.p>
        <motion.p
          className="hero-signature"
          initial={heroSignatureAnimation.initial}
          animate={heroSignatureAnimation.animate}
          transition={heroSignatureAnimation.transition}
        >
          Created by Azrab
        </motion.p>
      </section>

      <PageGift gift={pageGifts.home} />

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">Little wishes</p>
          <h2>Small lines of love that belong only to you.</h2>
        </div>
        <div className="note-grid">
          {loveNotes.map((note, index) => (
            <motion.article
              className="love-note"
              key={note.id}
              {...getRevealAnimation({
                prefersReducedMotion,
                isLowPowerMode,
                amount: 0.28,
                delay: index * 0.08,
                duration: 0.75,
                y: 28,
                rotateX: -8,
              })}
              whileHover={getHoverAnimation({
                canHover,
                isLowPowerMode,
                y: -8,
                scale: 1.015,
                duration: 0.25,
              })}
            >
              <span className="note-heart">♥</span>
              <p>{note.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section content-section--heart">
        <div className="content-section__heading">
          <p className="eyebrow">Touch my heart</p>
          <h2>Swipe the little heart and let our memory bloom.</h2>
        </div>
        <PaperHeartReveal />
      </section>

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">A few truths</p>
          <h2>What loving you feels like in the quietest language.</h2>
        </div>
        <div className="promise-grid">
          {promiseCards.map((card, index) => (
            <motion.article
              className="promise-card"
              key={card.id}
              {...getRevealAnimation({
                prefersReducedMotion,
                isLowPowerMode,
                amount: 0.3,
                delay: index * 0.1,
                duration: 0.8,
                y: 42,
                scale: 0.96,
              })}
              whileHover={getHoverAnimation({
                canHover,
                isLowPowerMode,
                y: -10,
                rotateX: -4,
                rotateY: index % 2 === 0 ? -3 : 3,
                duration: 0.28,
              })}
            >
              <span className="promise-glow" aria-hidden="true" />
              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="journey-grid">
          <article className="journey-card">
            <h3>Our Story</h3>
            <p>
              Walk through the soft chapters of how my heart learned to stay
              with you.
            </p>
            <Link className="text-link" to="/story">
              Open the story
            </Link>
          </article>

          <article className="journey-card">
            <h3>Why You</h3>
            <p>
              A page full of all the reasons your soul feels like my favorite
              place.
            </p>
            <Link className="text-link" to="/reasons">
              See the reasons
            </Link>
          </article>

          <article className="journey-card">
            <h3>Promises</h3>
            <p>
              Tiny promises, future dreams, and the parts of tomorrow I want
              only with you.
            </p>
            <Link className="text-link" to="/promises">
              Read the promises
            </Link>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default HomePage
