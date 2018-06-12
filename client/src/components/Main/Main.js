import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from '../Sidebar/Sidebar'
import Artist from '../Artist/Artist'
import Albums from '../Albums/Albums'
import MapContainer from '../MapContainer'
// import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { searchArtist, artistClick, albumPlay, tokenToState } from '../../actions/mainActions'
import developer from '../../assets/Mo.jpg'
const styles = {
  main: {
    marginLeft: '260px',
    textAlign: 'center',
    height: '60%'
  },
  // sidebar: {
  //   borderRightColor: 'green',
  //   borderRightWidth: '2px',
  // },
  map: {
    padding: 0,
    position: 'relative',
    bottom: 0,
    height: '400px',
    marginLeft: '260px'
  },
  searchInput: {
    padding: '10px',
    color: 'white',
    backgroundColor: '#000',
    borderRadius: '5px',
    width: '250px',
    height: '20px',
    border: 0,
    fontSize: '16px',
    marginBottom: '10px'
  }
}

// const spotifyApi = new SpotifyWebApi()
const spotifyApi = new SpotifyWebApi()

class Main extends Component {
  constructor() {
    super()

    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      spotifyApi.setAccessToken(token)
      // this.props.tokenToState(token)
    }
    this.state = {
      loggedIn: token ? true : false,
      textInput: ''
    }
  }
  componentDidMount() {
    if (!this.state.loggedIn) {
      window.history.back()
    }
  }
  getHashParams() {
    let hashParams = {}
    let e, r = /([^&=]+)=?([^&]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  textHandler = (e) => {
    this.props.searchArtist(e.target.value)
    this.setState({
      textInput: e.target.value
    })
  }

  render() {
    if (!this.state.loggedIn) {
      return <div>Redirect..</div>
    } else {
      return (
        <div >
          <Sidebar
            style={styles.sidebar}
            img={this.props.main.img}
            nowPlaying={this.props.main.nowPlaying}
          />
          <div style={styles.main} >
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
                  onChange={this.textHandler}
                  style={styles.searchInput}
                />
              </div>
              {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>}
            </header>
            {this.props.main.showArtist && <Artist />}
            {this.props.main.showAlbums && (<div><h4>Albums: </h4><Albums /></div>)}
          </div>
          <div style={styles.map} id="map">
            <MapContainer
              venues={this.props.main.venues}
              dateTime={this.state.dateTime}
              artist={this.props.main.artist}
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { tokenToState, searchArtist, artistClick, albumPlay })(Main)