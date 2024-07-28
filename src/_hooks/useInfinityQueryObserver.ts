import { InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

interface useInfinityQueryObserverProps {
  threshold: number
  hasNextPage?: boolean
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}
export const useInfinityQueryObserver = ({
  threshold,
  hasNextPage = true,
  fetchNextPage,
}: useInfinityQueryObserverProps) => {
  const target = useRef<HTMLDivElement | null>(null)

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
  }

  useEffect(() => {
    if (!target) {
      return
    }
    if (!target.current) {
      return
    }
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    })
    observer.observe(target.current)

    return () => observer.disconnect()
  }, [target, target.current, hasNextPage, fetchNextPage])

  return {
    target,
  }
}
