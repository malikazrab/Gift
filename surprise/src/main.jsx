import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Enable optimizations in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Prevent layout thrashing from animations
  window.requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
