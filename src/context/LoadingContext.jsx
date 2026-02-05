import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LoadingContext = createContext({
  isLoading: true,
  isFirstVisit: true,
  setLoadingComplete: () => {},
})

const STORAGE_KEY = 'ecofresh-visited'

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem(STORAGE_KEY)

    if (hasVisited) {
      // Skip loading screen for returning visitors in same session
      setIsFirstVisit(false)
      setIsLoading(false)
    }
  }, [])

  const setLoadingComplete = useCallback(() => {
    // Mark session as visited
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setIsLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, isFirstVisit, setLoadingComplete }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export default LoadingContext
