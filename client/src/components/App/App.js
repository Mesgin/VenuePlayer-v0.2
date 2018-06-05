import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import MapContainer from '../MapContainer'
import AudioPlayer from '../AudioPlayer/AudioPlayer.jsx'
import Navbar from '../Navbar/Navbar'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super()

    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      spotifyApi.setAccessToken(token)
    }

    this.state = {
      songs: [{}],
      venues: [],
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  getHashParams() {
    let hashParams = {}
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState({})
      .then((response) => {
        console.log(response);
        
        // this.setState({
        //   nowPlaying: {
        //     name: response.item.name,
        //     albumArt: response.item.album.images[0].url
        //   }
        // })
      })
  }

  updateSong = (id) => {
    // axios.post('http://localhost:8888/', { artist: this.state.songs[id].artist })
    //   .then((response) => {
    //     let venues = response.data.map((item) => {
    //       return item
    //     })
    //     this.setState({
    //       venues
    //     })
    //   })
  }

  componentDidMount() {
    // axios.get('http://localhost:8888/')
    //   .then((response) => {
    //     this.setState({
    //       songs: response.data,
    //     })
    //   })
  }

  render() {
    return (
      <Router>
        <div className="container text-center">
          <Navbar />
          <header className="jumbotron">
            <h1 className="display-4">VenuePlayer</h1>
            <div className="mt-4">
              <input type="text" className="mr-2" />
              <button className="btn btn-danger">Search</button>
              <a href='http://localhost:8888/login' > Login to Spotify </a>
              {this.state.loggedIn &&
                <button onClick={() => this.getNowPlaying()}>
                  Check Now Playing
          </button>
              }
            </div>
            <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt='hi'/>
        </div>
          </header>
          <AudioPlayer updateSong={this.updateSong} songs={this.state.songs} />
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="map">
              <MapContainer venues={this.state.venues} dateTime={this.state.dateTime} />
            </div>
          </div>
        </div>
      </Router >
    )
  }
}

export default App