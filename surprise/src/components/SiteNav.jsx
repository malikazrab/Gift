import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from '../data/siteContent'

function SiteNav() {
  return (
    <motion.header
      className="site-nav"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="site-nav__brand">
        <span className="site-nav__eyebrow">Made for Maria</span>
        <span className="site-nav__title">Azrab&apos;s Love Letter</span>
      </div>

      <nav className="site-nav__links" aria-label="Romantic pages">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              `site-nav__link ${isActive ? 'active' : ''}`
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  )
}

export default SiteNav
