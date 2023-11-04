import React, { useEffect } from 'react'
import pdf_link from './important_data/feedback'

const Feedback = () => {

  useEffect(() => {
    window.location.replace(pdf_link);
  }, [])

  return (
    // <div className='home'>
    //   <div className="container">
    //     <h2>Guest Room Booking Portal</h2>
    //     <h3>HALL OF RESIDENCE III</h3>
    //     <hr />
    //   </div>
    // </div>
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

export default Feedback
