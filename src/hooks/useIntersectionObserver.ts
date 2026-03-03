"use client"

import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverOptions {
  threshold?: number
  freezeOnceVisible?: boolean
  rootMargin?: string
}

export default function useIntersectionObserver({
  threshold = 0,
  freezeOnceVisible = false,
  rootMargin = "0px",
}: UseIntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsVisible(isIntersecting)

        if (isIntersecting && freezeOnceVisible) {
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, freezeOnceVisible, rootMargin])

  return [ref, isVisible] as const
}
