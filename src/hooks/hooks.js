import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import Splitting from 'splitting'

export const useEventListener = (eventName, handler, element = document) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export const useWindowSize = () => {
  const [currentSize, setCurrentSize] = useState(() => window.innerWidth)

  useEffect(() => {
    const resizeHandler = (e) => setCurrentSize(window.innerWidth)

    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return currentSize
}

export const useSplittingAnimation = (delay = 1.5) => {
  let tweenContainer = useRef()

  useEffect(() => {
    Splitting({ target: '.splitted' })
    tweenContainer.current = gsap.from('.splitted .char', {
      y: '120%', ease: 'expo.inOut',
      delay: delay,
      duration: 0.9,
      stagger: {
        from: "center",
        amount: 0.15
      }
    })
  }, [delay])

  return tweenContainer.current
}
