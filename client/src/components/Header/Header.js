import React from 'react'
import { Link } from 'react-router-dom'
import mo from '../../assets/Mo.jpg'

export default function Header(props) {
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
          <Link to='/'
            onClick={props.resetHome}
            className={props.artists.length > 0
              ? "heading-show"
              : "heading-hidden"} >
            VenuePlayer
          </Link>
        </div>
        <div className="mo">
          <a
            href="https://github.com/mesgin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mo} alt="mo mesgin" />
          </a>
        </div>
      </div>
      <div>
      </div>
    </header>
  )
}