import React from 'react'
import developer from '../../assets/Mo.jpg'

const Header = (props) => {
  return (
    <header >
    <h1 >VenuePlayer</h1>
    <div className="developer">
      <a href="https://github.com/mesgin" target="_blank" >
        <img src={developer} alt="mo mesgin" />
      </a>
        <h4>Mo Mesgin</h4>
    </div>
    <div >
      <input
        placeholder="Artist..."
        type="text"
        onChange={props.textHandler}
        className="search-input"
      />
    </div>
    {/* {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>} */}
  </header>
  )
}

export default Header
