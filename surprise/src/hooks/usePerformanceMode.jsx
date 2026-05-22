/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const defaultPerformanceState = {
  canHover: true,
  isTouchDevice: false,
  isLowPowerMode: false,
  prefersReducedMotion: false,
  shouldReduceAmbientMotion: false,
  shouldSimplifyMotion: false,
}

const PerformanceModeContext = createContext(defaultPerformanceState)

function getPerformanceState() {
  if (typeof window === 'undefined') {
    return defaultPerformanceState
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const deviceMemory = navigator.deviceMemory ?? 8
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8
  const saveData = navigator.connection?.saveData ?? false
  const isSmallScreen = window.innerWidth <= 900
  const isLowPowerMode =
    prefersReducedMotion ||
    saveData ||
    deviceMemory <= 4 ||
    hardwareConcurrency <= 4 ||
    (isTouchDevice && isSmallScreen && hardwareConcurrency <= 6)

  return {
    canHover,
    isTouchDevice,
    isLowPowerMode,
    prefersReducedMotion,
    shouldReduceAmbientMotion: prefersReducedMotion || isLowPowerMode || isTouchDevice,
    shouldSimplifyMotion: prefersReducedMotion || isLowPowerMode,
  }
}

export function PerformanceModeProvider({ children }) {
  const [performanceState, setPerformanceState] = useState(getPerformanceState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(hover: hover) and (pointer: fine)'),
    ]

    const updatePerformanceState = () => {
      setPerformanceState(getPerformanceState())
    }

    updatePerformanceState()
    window.addEventListener('resize', updatePerformanceState)
    mediaQueries.forEach((query) => {
      query.addEventListener('change', updatePerformanceState)
    })

    return () => {
      window.removeEventListener('resize', updatePerformanceState)
      mediaQueries.forEach((query) => {
        query.removeEventListener('change', updatePerformanceState)
      })
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.classList.toggle(
      'low-power-mode',
      performanceState.isLowPowerMode,
    )
    document.documentElement.classList.toggle(
      'touch-device',
      performanceState.isTouchDevice,
    )
  }, [performanceState.isLowPowerMode, performanceState.isTouchDevice])

  const value = useMemo(() => performanceState, [performanceState])

  return (
    <PerformanceModeContext.Provider value={value}>
      {children}
    </PerformanceModeContext.Provider>
  )
}

export function usePerformanceMode() {
  return useContext(PerformanceModeContext)
}
