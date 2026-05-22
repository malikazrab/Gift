import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navItems } from '../data/siteContent'
import { usePerformanceMode } from '../hooks/usePerformanceMode'

function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLowPowerMode } = usePerformanceMode()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="site-nav-shell">
      <motion.header
        className="site-nav"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: isLowPowerMode ? 0.42 : 0.7,
          ease: 'easeOut',
        }}
      >
        <div className="site-nav__top">
          <div className="site-nav__brand">
            <span className="site-nav__eyebrow">Made for Maria</span>
            <span className="site-nav__title">Azrab&apos;s Love Letter</span>
          </div>

          <button
            type="button"
            className={`site-nav__toggle ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav-links"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          className={`site-nav__links ${menuOpen ? 'is-open' : ''}`}
          id="site-nav-links"
          aria-label="Romantic pages"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `site-nav__link ${isActive ? 'active' : ''}`
              }
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.header>
    </div>
  )
}

export default SiteNav
