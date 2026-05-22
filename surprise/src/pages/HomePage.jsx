import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import {
  floatingHearts,
  loveNotes,
  pageGifts,
  promiseCards,
} from '../data/siteContent'

function HomePage() {
  const prefersReducedMotion = useReducedMotion()

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
      <section className="hero-section hero-section--inner">
        <div className="floating-hearts" aria-hidden="true">
          {floatingHearts.map((heart) => (
            <motion.span
              className="floating-heart"
              key={heart.id}
              style={{ top: heart.top, left: heart.left }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.2 }}
            >
              ♥
            </motion.span>
          ))}
        </div>

        <motion.p
          className="hero-badge"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          Made with love for Maria
        </motion.p>
        <motion.h2
          className="hero-title hero-title--compact"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          To the woman who makes my whole world softer, brighter, and alive.
        </motion.h2>
        <motion.p
          className="hero-text"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
        >
          You are my peace, my favorite smile, and the most beautiful part of my
          story.
        </motion.p>
        <motion.p
          className="hero-signature"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.58, ease: 'easeOut' }}
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28, rotateX: -8 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
              }
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -8, scale: 1.015, transition: { duration: 0.25 } }
              }
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
          <h2>Tap the heart and let our memory bloom.</h2>
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 42, scale: 0.96 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -10,
                      rotateX: -4,
                      rotateY: index % 2 === 0 ? -3 : 3,
                      transition: { duration: 0.28 },
                    }
              }
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
            <p className="eyebrow">Page One</p>
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
            <p className="eyebrow">Page Two</p>
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
            <p className="eyebrow">Page Three</p>
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
