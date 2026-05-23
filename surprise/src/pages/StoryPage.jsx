import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageGift from '../components/PageGift'
import PaperHeartReveal from '../components/PaperHeartReveal'
import PageShell from '../components/PageShell'
import { getRevealAnimation } from '../data/animationPresets'
import { usePerformanceMode } from '../hooks/usePerformanceMode'
import { pageGifts, storyMoments } from '../data/siteContent'

function StoryPage() {
  const prefersReducedMotion = useReducedMotion()
  const { isLowPowerMode } = usePerformanceMode()

  return (
    <PageShell
      eyebrow="Our Story"
      title="The gentle little timeline of how my heart became yours."
      description="Not every love story needs noise. Ours lives beautifully in quiet moments, soft glances, and feelings that keep growing without asking permission."
      actions={
        <Link className="romance-button primary" to="/promises">
          Keep Walking Forward
        </Link>
      }
    >
      <PageGift gift={pageGifts.story} />

      <section className="content-section content-section--heart">
        <div className="content-section__heading">
          <p className="eyebrow">A memory heart</p>
          <h2>Open this heart and let one of our sweetest chapters glow.</h2>
        </div>
        <PaperHeartReveal
          helperText="A paper heart for the memories that made loving you feel inevitable."
          photoCopy="Every chapter of us feels softer, brighter, and more worth keeping because it has your name inside it."
          regionLabel="A heart reveal for our story page"
          closedLabel="Swipe up to open our chapter"
          openLabel="Close this chapter"
        />
      </section>

      <section className="content-section">
        <div className="timeline">
          {storyMoments.map((moment, index) => (
            <motion.article
              className={`timeline-card ${index % 2 === 0 ? 'left' : 'right'}`}
              key={moment.id}
              {...getRevealAnimation({
                prefersReducedMotion,
                isLowPowerMode,
                amount: 0.35,
                delay: index * 0.06,
                duration: 0.78,
                y: 36,
              })}
            >
              <span className="timeline-number">{`0${index + 1}`}</span>
              <h3>{moment.title}</h3>
              <p>{moment.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="content-section__heading">
          <p className="eyebrow">What I learned</p>
          <h2>Love became softer, deeper, and more honest because of you.</h2>
        </div>

        <div className="insight-grid">
          <motion.article
            className="insight-card"
            {...getRevealAnimation({
              prefersReducedMotion,
              isLowPowerMode,
              amount: 0.4,
              duration: 0.7,
              x: -24,
              y: 0,
            })}
          >
            <h3>Your love feels safe.</h3>
            <p>
              You bring peace into places that used to feel uncertain, and that
              is one of the rarest gifts anyone can give.
            </p>
          </motion.article>

          <motion.article
            className="insight-card"
            {...getRevealAnimation({
              prefersReducedMotion,
              isLowPowerMode,
              amount: 0.4,
              delay: 0.08,
              duration: 0.7,
              x: 24,
              y: 0,
            })}
          >
            <h3>Your presence feels like home.</h3>
            <p>
              Even ordinary hours become memorable when they hold your laughter,
              your calm, and your warmth.
            </p>
          </motion.article>
        </div>
      </section>
    </PageShell>
  )
}

export default StoryPage
