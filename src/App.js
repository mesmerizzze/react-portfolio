import React, { useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { Route, useLocation } from 'react-router-dom'
import { useWindowSize } from './hooks/hooks'
import Menu from './components/Menu/Menu'
import Controls from './components/Controls/Controls'
import Hero from './pages/Hero/Hero'
import Works from './pages/Works/Works'
import Blog from './pages/Blog/Blog'
import Contacts from './pages/Contacts/Contacts'
import Cursor from './components/Cursor/Cursor'

import './App.scss'

function App() {
  const windowSize = useWindowSize()
  const location = useLocation()
  const [wasAnimated, setWasAnimated] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const mouseoverHandler = useCallback(() => setIsHover(true), [])
  const mouseleaveHandler = useCallback(() => setIsHover(false), [])

  useEffect(() => {
    gsap.set('body', { css: { visibility: 'visible' } })
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && !wasAnimated) {
      const tl = gsap.timeline({
        onStart: () => gsap.set('.cv-link .side', { transition: 'none' }),
        onComplete: () => {
          gsap.set('.cv-link .side', { transition: .6 })
          setWasAnimated(true)
        }
      })
      
      tl.from('.cv-link__top', { opacity: 0, x: () => -1.1 * windowSize, duration: 1.8, ease: 'expo.out' })
        .from('.cv-link__bottom', { opacity: 0, x: () => 1.1 * windowSize, duration: 1.8, ease: 'expo.out' }, '<')
        .from('.cv-link__content', { opacity: 0, duration: .4 })
        .from('.info__title span', { opacity: 0, y: 100, duration: 0.6, stagger: 0.1 })
        .from('.menu .nav-button', { y: '-100%', duration: 0.4 }, '<')
        .fromTo('.theme-switcher', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, '<')
    }
  }, [location.pathname, wasAnimated, windowSize])

  return (
    <div className="App">
      <Menu mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
      <Controls mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
      <main>
        <Route path='/' exact>
          <Hero mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
        </Route>
        <Route path='/works'>
          <Works mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
        </Route>
        <Route path='/blog'>
          <Blog mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
        </Route>
        <Route path='/contacts'>
          <Contacts mouseoverHandler={mouseoverHandler} mouseleaveHandler={mouseleaveHandler} />
        </Route>
      </main>
      {windowSize >= 992 ? <Cursor isHover={isHover} /> : null}
    </div>
  );
}

export default App
