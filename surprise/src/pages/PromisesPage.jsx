import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import PageShell from '../components/PageShell'
import { futureDreams, giftMoments, pageGifts } from '../data/siteContent'

function PromisesPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <PageShell
      eyebrow="Promises"
      title="The kind of tomorrow I keep imagining with you."
      description="Some promises are loud. Mine for you are softer: showing up, choosing you gently, protecting your peace, and loving you with honesty every day."
      actions={
        <Link className="romance-button primary" to="/">
          Return Home
        </Link>
      }
    >
      <PageGift gift={pageGifts.promises} />

      <section className="content-section content-section--heart">
        <div className="content-section__heading">
          <p className="eyebrow">A promise sealed in paper</p>
          <h2>Open this heart and let tomorrow feel a little closer to us.</h2>
        </div>
        <PaperHeartReveal
          helperText="A paper heart carrying the quiet promises I want to keep for you."
          photoCopy="If the future has one shape I trust, it is the shape of a life where I keep choosing you with tenderness and honesty."
          regionLabel="A heart reveal for future promises"
          closedLabel="Tap to open our future"
          openLabel="Hold the promise"
        />
      </section>

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">Wrapped feelings</p>
          <h2>Small glowing gifts for the woman I adore.</h2>
        </div>

        <div className="gifts-grid">
          {giftMoments.map((gift, index) => (
            <motion.article
              className="gift-card"
              key={gift.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 48, scale: 0.95 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.85,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -12,
                      rotateX: -5,
                      rotateY: index % 2 === 0 ? 4 : -4,
                      transition: { duration: 0.28 },
                    }
              }
            >
              <div className="gift-top">
                <span className="gift-ribbon" aria-hidden="true" />
                <span className="gift-count">{`0${index + 1}`}</span>
              </div>
              <h3>{gift.title}</h3>
              <p>{gift.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">Dreams with you</p>
          <h2>The future feels more beautiful when your name is inside it.</h2>
        </div>

        <div className="dream-grid">
          {futureDreams.map((dream, index) => (
            <motion.article
              className="dream-card"
              key={dream.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.72,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3>{dream.title}</h3>
              <p>{dream.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <motion.article
          className="final-letter"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">From Azrab</p>
          <h2>I hope this whole little website feels like a warm hug from me.</h2>
          <p>
            If I could, I would keep building tiny beautiful worlds just to show
            you how loved you are. Until then, let this be one soft reminder:
            my heart is happiest when it is loving you.
          </p>
        </motion.article>
      </section>
    </PageShell>
  )
}

export default PromisesPage
