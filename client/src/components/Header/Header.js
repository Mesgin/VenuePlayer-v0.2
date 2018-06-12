import React from 'react'
import developer from '../../assets/Mo.jpg'

const Header = (props) => {
  return (
    <header >
      <div className="header">
        <div className="header-icons">
          <a href="https://www.linkedin.com/in/mo-mesgin/" target="_blank">
            <i className="fa fa-linkedin-square"></i>
          </a>
          <a href="https://www.github.com/mesgin/" target="_blank">
            <i className="fa fa-github"></i>
          </a>
          <a href="mailto:mo.mesgin@gmail.com" className="email">
            <i className="fa fa-envelope"></i>
          </a>
          778-872-7663
        </div>
        <div className="header-head">
          <h1 >VenuePlayer</h1>
        </div>
        <div className="developer">
          <a href="https://github.com/mesgin" target="_blank" >
            <img src={developer} alt="mo mesgin" />
          </a>
          <h4>Mo Mesgin</h4>
        </div>
      </div>
      <div>
      </div>
      {/* {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>} */}
    </header>
  )
}

export default Header
