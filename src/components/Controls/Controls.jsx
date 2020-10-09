import React, { useEffect, useRef } from 'react'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

function Controls({ mouseoverHandler, mouseleaveHandler }) {
  const rootRefContainer = useRef()

  useEffect(() => {
    const rootRef = rootRefContainer.current
    const clickableElements = rootRef.querySelectorAll('a, button')

    clickableElements.forEach(el => {
      el.addEventListener('mouseover', mouseoverHandler)
      el.addEventListener('mouseleave', mouseleaveHandler)
    })
    return () => clickableElements.forEach(el => {
      el.removeEventListener('mouseover', mouseoverHandler)
      el.removeEventListener('mouseleave', mouseleaveHandler)
    })
  })

  return (
    <div className="controls" ref={rootRefContainer}>
      <ThemeSwitcher />
    </div>
  )
}

export default Controls
