import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEventListener } from '../../hooks/hooks'
import gsap from 'gsap'

import './Cursor.scss'

function Cursor({ isHover }) {
  const cursorRef = useRef()
  const [isVisible, setIsVisible] = useState(true)
  const mouseenterHandler = useCallback(() => setIsVisible(true), [])
  const mouseleaveHandler = useCallback(() => setIsVisible(false), [])
  useEventListener('mouseenter', mouseenterHandler, document)
  useEventListener('mouseleave', mouseleaveHandler, document)

  useEffect(() => {
    const cursorElement = cursorRef.current
    const pos = { x: window.innerWidth * 1.5, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    const speed = 0.1
    const xSet = gsap.quickSetter(cursorElement, "x", "px")
    const ySet = gsap.quickSetter(cursorElement, "y", "px")
    const mousemoveHandler = e => {
      mouse.x = e.x
      mouse.y = e.y
    }

    window.addEventListener("mousemove", mousemoveHandler)

    gsap.set(cursorElement, { xPercent: -50, yPercent: -50, rotate: 45 })
    gsap.ticker.add(() => {
      var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())
      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      xSet(pos.x)
      ySet(pos.y)
    })

    return () => window.removeEventListener("mousemove", mousemoveHandler)
  }, [])

  useEffect(() => {
    isHover
      ? gsap.to(cursorRef.current, { borderRadius: "50%" })
      : gsap.to(cursorRef.current, { borderRadius: "0" })
  }, [isHover])

  useEffect(() => {
    isVisible
      ? gsap.set(cursorRef.current, { opacity: 1 })
      : gsap.set(cursorRef.current, { opacity: 0 })
  }, [isVisible])
  return (

    <div className="cursor" ref={cursorRef}></div>
  )
}

export default Cursor