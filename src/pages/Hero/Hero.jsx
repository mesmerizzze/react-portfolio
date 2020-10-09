import React, { useEffect, useRef } from 'react'
import CvLink from '../../components/CvLink/CvLink'

import './Hero.scss'

function Hero({ mouseoverHandler, mouseleaveHandler }) {
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
    <div className="hero page" ref={rootRefContainer}>
      <CvLink />
      <div className="container">
        <div className="info">
          <h1 className="info__title">
            <span className="info__name">Oksana Shuptar</span>
            <span className="info__position">Front-end developer</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
