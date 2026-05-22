import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import PageShell from '../components/PageShell'
import { getHoverAnimation, getRevealAnimation } from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'
import { constellationNotes, pageGifts, reasonsList } from '../data/siteContent'

function ReasonsPage() {
  const prefersReducedMotion = useReducedMotion()
  const { canHover, isLowPowerMode } = usePerformanceMode()

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
              {...getRevealAnimation({
                prefersReducedMotion,
                isLowPowerMode,
                amount: 0.28,
                delay: index * 0.08,
                duration: 0.78,
                y: 36,
                scale: 0.97,
              })}
              whileHover={getHoverAnimation({
                canHover,
                isLowPowerMode,
                y: -10,
                rotate: index % 2 === 0 ? -1 : 1,
              })}
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
              {...getRevealAnimation({
                prefersReducedMotion,
                isLowPowerMode,
                amount: 0.35,
                delay: index * 0.05,
                duration: 0.45,
                y: 0,
                scale: 0.88,
              })}
              whileHover={getHoverAnimation({
                canHover,
                isLowPowerMode,
                y: -6,
                scale: 1.04,
                duration: 0.2,
              })}
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
