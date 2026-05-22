import { motion, useReducedMotion } from 'framer-motion'

function PageGift({ gift }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className="page-gift"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -8, transition: { duration: 0.28, ease: 'easeOut' } }
      }
    >
      <div className="page-gift__top">
        <span className="page-gift__box" aria-hidden="true">
          <span className="page-gift__ribbon page-gift__ribbon--vertical" />
          <span className="page-gift__ribbon page-gift__ribbon--horizontal" />
        </span>
        <span className="page-gift__tag">For Maria</span>
      </div>

      <p className="eyebrow">{gift.eyebrow}</p>
      <h3>{gift.title}</h3>
      <p>{gift.text}</p>
    </motion.section>
  )
}

export default PageGift
