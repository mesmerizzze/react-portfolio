import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { NavLink, useHistory } from 'react-router-dom'

import './Menu.scss'

const animateMenu = (isClosed) => {
  const tl = gsap.timeline()

  if (isClosed) {
    tl.to('.nav__list a', { y: '110%', duration: 0.6, stagger: 0.1 })
      .to('.menu', { bottom: 'auto', duration: 0.8, ease: 'expo.inOut' })
      .to('.nav', { scaleY: 0, duration: 0.5 }, '<')
      .set('.nav__list a', { y: 0 })
  } else {
    tl.to('.nav', { scaleY: 1, duration: 0.5 })
      .to('.menu', { bottom: 0, duration: 0.8, ease: 'expo.inOut' }, '<')
      .from('.nav__list a', { y: '-110%', duration: 0.6, stagger: 0.1 })
  }
}

const navItemsData = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Works',
    href: '/works',
  },
  // {
  //   title: 'Blog',
  //   href: '/blog',
  // },
  {
    title: 'Contacts',
    href: '/contacts',
  },
]

function Menu({ mouseoverHandler, mouseleaveHandler }) {
  const [isClosed, setClosed] = useState(true)
  const history = useHistory()
  const rootRefContainer = useRef()

  const navButtonHandler = () => {
    setClosed(prevIsClosed => !prevIsClosed)
  }

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
  }, [mouseoverHandler, mouseleaveHandler])

  useEffect(() => {
    animateMenu(isClosed)
  }, [isClosed])

  const clickHandler = (e, href) => {
    e.preventDefault()
    setClosed(true)
    history.push(href)
  }

  return (
    <div className="menu" ref={rootRefContainer}>
      <nav className="nav">
        <ul className="nav__list">
          {navItemsData.map(el => {
            return (
              <li key={el.title}>
                <NavLink to={el.href} onClick={(e) => clickHandler(e, el.href)}>
                  <span className="front">{el.title}</span>
                  <span className="back">{el.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      <button className="nav-button" onClick={navButtonHandler}>
        {isClosed ? 'Menu' : 'Close'}
      </button>
    </div>
  )
}

export default Menu
