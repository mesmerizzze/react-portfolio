import React from 'react'
import { useSplittingAnimation } from '../../hooks/hooks'

import './PageTitle.scss'

function PageTitle({ children }) {
  useSplittingAnimation()

  return (
    <div className="pageTitle">
      {children}
    </div>
  )
}

export default PageTitle
