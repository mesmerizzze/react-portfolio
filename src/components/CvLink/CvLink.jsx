import React from 'react'
import cv from '../../files/Oksana_Shuptar_resume_en.pdf'

import './CvLink.scss'

function CvLink() {

  return (
    <div className="cv-link">
      <a className="cv-link__link"  href={cv} download>
        <span className="cv-link__content">Download my cv</span>
        <span className="cv-link__top side"></span>
        <span className="cv-link__bottom side"></span>
      </a>
    </div>
  )
}

export default CvLink
