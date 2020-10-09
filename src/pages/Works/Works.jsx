import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageTitle from '../../components/PageTitle/PageTitle'
import worksItemsData from '../../data/works-items-data.json'

import './Works.scss'

gsap.registerPlugin(ScrollTrigger)

function Works({ mouseoverHandler, mouseleaveHandler }) {
  const rootRefContainer = useRef()

  const worksItems = worksItemsData.map(data => {
    return (
      <li className="works__item" key={data.imgName}>
        <a href={data.deployLink} className={`works__img-link ${data.isWideImg ? 'wide' : ''}`}>
          <img src={require(`../../images/${data.imgName}`)} alt="Website screenshot" className="inverted" />
        </a>
        <div className="works__descr">
          <a href={data.deployLink} className="btn">Visit website</a>
          <ul className="works__details">
            {data.details.map(detail => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
      </li>
    )
  })

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

  useEffect(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 800px)': function () {
        ScrollTrigger.saveStyles('.works__item')

        ScrollTrigger.batch('.works__item', {
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.inOut' }),
          onLeave: batch => gsap.to(batch, { opacity: 0, y: 40, duration: 1.3, ease: 'expo.inOut' }),
          onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.inOut' }),
          onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 40, duration: 1.3, ease: 'expo.inOut' }),
          start: '100px bottom',
          end: '90% 20%',
        })
      }
    })
  })

  return (
    <div className="page works" ref={rootRefContainer}>
      <div className="container">
        <PageTitle>
          <h2 className="splitted">Works</h2>
          <p>You can find some of my recent projects here.</p>
        </PageTitle>
        <ul className="works__list">
          {worksItems}
          <li className="works__item about-portfolio" key="about-portfolio">
            <p>By the way...</p>
            <p className="about-portfolio__descr">This one Portfolio website is also built by me, using React.js and GSAP</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Works
