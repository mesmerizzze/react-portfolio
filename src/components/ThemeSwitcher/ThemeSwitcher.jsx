import React, { useState, useEffect, useCallback } from 'react'

import './ThemeSwitcher.scss'

function ThemeSwitcher() {
  const [isLightTheme, setTheme] = useState(() => localStorage.getItem('isLightTheme') === 'false' ? false : true)
  const clickHandler = useCallback(() => setTheme(prevIsLightTheme => !prevIsLightTheme), [])

  useEffect(() => {
    const rootElement = document.documentElement

    if (!isLightTheme) {
      rootElement.classList.add('dark-mode')
      localStorage.setItem('isLightTheme', 'false')
    } else if (isLightTheme && rootElement.classList.contains('dark-mode')) {
      rootElement.classList.remove('dark-mode')
      localStorage.setItem('isLightTheme', 'true')
    }
  }, [isLightTheme])

  return (
    <button 
      className={`theme-switcher ${isLightTheme ? 'moon' : 'sun'}`} 
      onClick={clickHandler} aria-hidden="true" />
  )
}

export default ThemeSwitcher
