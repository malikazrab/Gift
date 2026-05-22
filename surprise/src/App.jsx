import { useEffect, lazy, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import FloatingDecor from './components/FloatingDecor'
import SiteNav from './components/SiteNav'
import WelcomeOverlay from './components/WelcomeOverlay'
import HomePage from './pages/HomePage'
const PromisesPage = lazy(() => import('./pages/PromisesPage'))
const ReasonsPage = lazy(() => import('./pages/ReasonsPage'))
const StoryPage = lazy(() => import('./pages/StoryPage'))
import './App.css'

// Optimize animations for better performance
const ROUTE_TRANSITION = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    // Use requestAnimationFrame for smooth scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [location.pathname])

  return null
}

function App() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const [welcomeActive, setWelcomeActive] = useState(true)

  return (
    <div className={`app-shell ${welcomeActive ? 'welcome-active' : ''}`}>
      <ScrollManager />
      {welcomeActive ? <WelcomeOverlay onDismiss={() => setWelcomeActive(false)} /> : null}
      <div className="app-stage">
        <FloatingDecor />
        <SiteNav />

        <main className="app-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="route-stage"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
              transition={ROUTE_TRANSITION}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/reasons" element={<ReasonsPage />} />
                <Route path="/promises" element={<PromisesPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <footer className="footer-note">
            <p>Forever yours, Azrab.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
