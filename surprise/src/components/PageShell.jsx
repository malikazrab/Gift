import { motion, useReducedMotion } from 'framer-motion'

function PageShell({ eyebrow, title, description, actions, children }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="page-shell">
      <motion.div
        className="page-hero"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </motion.div>

      <div className="page-content">{children}</div>
    </section>
  )
}

export default PageShell
