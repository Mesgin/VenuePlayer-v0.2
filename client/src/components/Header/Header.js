import React from 'react'
import developer from '../../assets/Mo.jpg'

const Header = (props) => {
  return (
    <header >
      <div className="header">
        <div className="header-icons">
          <a
            href="https://www.linkedin.com/in/mo-mesgin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin-square"></i>
          </a>
          <a
            href="https://github.com/mesgin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github"></i>
          </a>
          <a
            href="mailto:mo.mesgin@gmail.com"
            className="email"
          >
            <i className="fa fa-envelope"></i>
          </a>
        </div>
        <div className="header-head">
          <h1 >VenuePlayer</h1>
        </div>
        <div className="developer">
          <a
            href="https://github.com/mesgin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={developer} alt="mo mesgin" />
          </a>
        </div>
      </div>
      <div>
      </div>
    </header>
  )
}

export default Header