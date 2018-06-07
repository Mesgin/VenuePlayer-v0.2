import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import MapContainer from '../MapContainer'
// import AudioPlayer from '../AudioPlayer/AudioPlayer.jsx'
// import Navbar from '../Navbar/Navbar'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

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
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      artists: [],
      textInput: '',
      artistClicked: ''
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

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState({})
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }

  updateSong = (artist) => {
    axios.post('http://localhost:8888/', { artist })
      .then((response) => {
        let venues = response.data.map((item) => {
          return item
        })
        this.setState({
          venues,
          artistClicked: artist
        })
        axios.get('http://localhost:8888/')
          .then((response) => {
            this.setState({
              songs: response.data,
            })
          })
      })
  }

  // componentDidMount() {
  //   axios.get('http://localhost:8888/')
  //     .then((response) => {
  //       this.setState({
  //         songs: response.data,
  //       })
  //     })
  // }

  textHandler = (e) => {
    spotifyApi.searchArtists(e.target.value,{"limit" : 4})
      .then((data) => {
        console.log(data.artists.items)
        this.setState({
          artists: data.artists.items
        })
      }, (err) => {
        console.error(err)
      })
    this.setState({
      textInput: e.target.value
    })
  }

  searchHandler = () => {
    spotifyApi.searchArtists(this.state.textInput)
      .then((data) => {
      }, (err) => {
        console.error(err)
      })
  }

  render() {
    let artistsContent = this.state.artists.length > 0 ?
      this.state.artists.map(artist => {
        return (
          <div className="col-3 col-md-3 col-lg-3">
            <div className="card" key={artist.id}>
              <img className="card-img-top" src={artist.images.length > 0 && artist.images[2].url} style={{ width: 64, height: 64 }} alt={artist.name} />
              <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                {/* <p className="card-text">Folowers: {artist.followers.total}</p> */}
                <a href="#" className="btn btn-danger" onClick={() => this.updateSong(artist.name)}><i className="fa fa-map-marker" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        )
      }) : null

    return (
      <Router>
        {/* <Navbar /> */}
        <div className="container text-center">
          <header className="jumbotron">
            <h1 className="display-4">VenuePlayer</h1>
            <div className="mt-4">
              <input type="text" className="mr-2" onChange={this.textHandler} />
              <button className="btn btn-danger" onClick={this.searchHandler} >Search</button>
              {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>}
              {this.state.loggedIn &&
                <button className="btn btn-success" onClick={this.getNowPlaying}>
                  Check Now Playing
          </button>
              }
            </div>
            <div>
              {this.state.nowPlaying.albumArt.length > 0
                &&
                <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt='cover'
                />}
            </div>
          </header>
          <div className="row">
            {artistsContent}
          </div>
          {/* <AudioPlayer updateSong={this.updateSong} songs={this.state.songs} /> */}
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="map">
              <MapContainer venues={this.state.venues} dateTime={this.state.dateTime} artist={this.state.artistClicked} />
            </div>
          </div>
        </div>
      </Router >
    )
  }
}

export default App