import React, { useEffect } from 'react'
import pdf_link from './important_data/prices'

const Prices = () => {

  useEffect(() => {
    window.location.replace(pdf_link,'_blank');
  }, [])

  return (
    <div id="fountainG">
      <div id="fountainG_1" className="fountainG"></div>
      <div id="fountainG_2" className="fountainG"></div>
      <div id="fountainG_3" className="fountainG"></div>
      <div id="fountainG_4" className="fountainG"></div>
      <div id="fountainG_5" className="fountainG"></div>
      <div id="fountainG_6" className="fountainG"></div>
      <div id="fountainG_7" className="fountainG"></div>
      <div id="fountainG_8" className="fountainG"></div>
    </div>

  )
}

export default Prices
