import React from 'react'
import { Link } from 'react-router-dom'
import mo from '../../assets/Mo.jpg'

export default function Header(props) {
  return (
    <header className="header" >
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <nav>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/mo-mesgin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-linkedin-square"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mesgin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a
              href="mailto:mo.mesgin@gmail.com"
              className="email"
            >
              <i className="fa fa-envelope"></i>
            </a>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={props.menuClick}>
        <span></span>
      </label>
      <div className="logo">
        <Link to='/'
          onClick={props.resetHome}
          className={props.artists.length > 0
            ? "heading-show"
            : "heading-hidden"} >
          VenuePlayer
          </Link>
      </div>
      <div className="mo">
        <img src={mo} alt="mo mesgin" />
      </div>
    </header>
  )
}