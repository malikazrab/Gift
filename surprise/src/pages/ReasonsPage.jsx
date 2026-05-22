import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import PageShell from '../components/PageShell'
import { constellationNotes, pageGifts, reasonsList } from '../data/siteContent'

function ReasonsPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <PageShell
      eyebrow="Why You"
      title="A page full of reasons, and somehow still not enough to explain you."
      description="There are endless reasons I love you, but even these are only a soft beginning. You are more beautiful than any list can fully hold."
      actions={
        <Link className="romance-button secondary" to="/story">
          Revisit Our Story
        </Link>
      }
    >
      <PageGift gift={pageGifts.reasons} />

      <section className="content-section content-section--heart">
        <div className="content-section__heading">
          <p className="eyebrow">A heart full of reasons</p>
          <h2>Open this heart and see how beautifully you stay on my mind.</h2>
        </div>
        <PaperHeartReveal
          helperText="A heart for the reasons that keep choosing you, over and over."
          photoCopy="No list is ever enough for you, but my heart keeps trying because loving you deserves to be said in every possible way."
          regionLabel="A heart reveal for reasons I love Maria"
          closedLabel="Tap to reveal why"
          openLabel="Keep it close"
        />
      </section>

      <section className="content-section">
        <div className="reason-grid">
          {reasonsList.map((reason, index) => (
            <motion.article
              className="reason-card"
              key={reason.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.97 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.78,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -10, rotate: index % 2 === 0 ? -1 : 1 }
              }
            >
              <span className="reason-index">{`0${index + 1}`}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">Your constellation</p>
          <h2>The little qualities that light up your name in my heart.</h2>
        </div>

        <div className="constellation-wrap">
          {constellationNotes.map((note, index) => (
            <motion.span
              className="constellation-pill"
              key={note}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              whileHover={
                prefersReducedMotion ? undefined : { y: -6, scale: 1.04 }
              }
            >
              {note}
            </motion.span>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

export default ReasonsPage
