import React, { useEffect, useRef } from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'

import './Contacts.scss'

function Contacts({ mouseoverHandler, mouseleaveHandler }) {
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
    <div className="contacts" ref={rootRefContainer}>
      <div className="container">
        <PageTitle>
          <h2 className="splitted">Get in touch</h2>
        </PageTitle>
        <ul className="contacts-list">
          <li><span>Telegram</span>
            <a href="https://t.me/mesmerizzze">t.me/mesmerizzze</a>
          </li>
          <li><span>Email</span>
            <a href="mailto:shuptaroks@gmail.com">shuptaroks@gmail.com</a>
          </li>
          <li><span>Github</span>
            <a href="https://github.com/mesmeri">github.com/mesmeri</a>
          </li>
          <li><span>Skype</span>
            <a href="https://join.skype.com/invite/b6dJ09Bvyfik">live:.cid.22b13fcc705797f3</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Contacts
