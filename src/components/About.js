import React from 'react'
// import React, { useContext, useEffect } from 'react'
// import noteContext from '../context/notes/NoteContext'

const About = () => {

  return (
    <div className='container my-5'>
      <h1 className='display-4 my-4' style={{ "borderBottom": "3px solid #a8bff3", "display": "inline-block" }} >About DailyNotes </h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              The simplest way to keep notes
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Its simple to keep notes .</strong> Just Write what you want to add and hit the button that's it.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Use it everywhere
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>You can use it everywhere whether on laptop,desktop or mobile.</strong> Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              provides security
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Truly private notes .</strong> with more secure encryption.No second party can access your notes .So you can trust us and start  adding your notes. Cheers!
            </div>
          </div>
        </div>
      </div>    </div>
  )
}

export default About
