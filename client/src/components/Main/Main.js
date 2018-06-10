import React, { Component } from 'react'
import { connect } from 'react-redux'
// import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from '../Sidebar/Sidebar'
import MapContainer from '../MapContainer'
// import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { searchArtist, artistClick, albumPlay } from '../../actions/mainActions'
const styles = {
  main: {
    marginLeft: '260px',
    textAlign: 'center',
    height: '60%'
  },
  sidebar: {
    borderRightColor: 'green',
    borderRightWidth: '2px',
  },
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
    margin: '5px'
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
    }
    this.state = {
      loggedIn: token ? true : false,
      textInput: '',
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
    let artistsContent = this.props.main.artists.length > 0 ?
      this.props.main.artists.map(artist => {
        return (
          <div key={artist.id} className="artist">
            <a onClick={() => this.props.artistClick(artist.images[1].url, artist.id, artist.name)}
              >
              <img
                src={(artist.images.length > 0 && artist.images[2].url) || 'http://via.placeholder.com/64x64'}
                style={{ width: 64, height: 64 }}
                alt={artist.name} />
            </a>
            <h5>{artist.name}</h5>
            {/* <a><button type="button" onClick={() => this.albumClick(artist.id)} >Albums</button></a> */}
          </div>
        )
      }) : null

    let albums = this.props.main.albums ? this.props.main.albums.map(album => {
      return (
        <div className="album" key={album.id}>
          <div className="container">
            <img src={album.image} className="image" alt={album.name} />
            <div className="middle" onClick={() => this.props.albumPlay(album.id)}>
              <i className="play-icon fa fa-play-circle"></i>
            </div>
          </div>
          <h5>{album.name.length > 20 ? `${album.name.substring(0, 20).trim()}...` : album.name}</h5>
        </div>
      )
    }) : null

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
            <div className="artist-container">
              {artistsContent}
            </div>
            <div className="album-container" >
              {this.props.main.albums && albums}
            </div>

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

export default connect(mapStateToProps, { searchArtist, artistClick, albumPlay })(Main)