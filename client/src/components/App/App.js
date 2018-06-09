import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import MapContainer from '../MapContainer'
// import AudioPlayer from '../AudioPlayer/AudioPlayer.jsx'
// import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import SpotifyWebApi from 'spotify-web-api-js'
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

}

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
      artistClicked: '',
      imgUrl: null,
      albums: null
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

  // getNowPlaying = () => {
  //   spotifyApi.getMyCurrentPlaybackState({})
  //     .then((response) => {
  //       this.setState({
  //         nowPlaying: {
  //           name: response.item.name,
  //           albumArt: response.item.album.images[0].url
  //         }
  //       })
  //     })
  // }

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
    spotifyApi.searchArtists(e.target.value, { "limit": 4 })
      .then((data) => {
        console.log(data.artists)
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

  artistClick = (url) => {
    this.setState({
      imgUrl: url
    })
  }

  albumClick = (id) => {
    spotifyApi.getArtistAlbums(id).then((data) => {
      console.log(data)
      let artistAlbums = data.items.map(item => {
        return { name: item.name, image: item.images[2].url }
      }
      )
      this.setState({
        albums: artistAlbums
      })

    },
      (err) => {
        console.error(err);
      }
    );
  }

  searchHandler = () => {
    // spotifyApi.searchArtists(this.state.textInput)
    //   .then((data) => {
    //   }, (err) => {
    //     console.error(err)
    //   })
    spotifyApi.searchTracks('artist:enigma', { "limit": 50 })
      .then((data) => {
        console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data)
      }, (err) => {
        console.log('Something went wrong!', err)
      })
  }

  render() {
    let artistsContent = this.state.artists.length > 0 ?
      this.state.artists.map(artist => {
        return (
          <div key={artist.id} className="artist">
            <a onClick={() => this.artistClick(artist.images[1].url)} href="#">
              <img src={artist.images[2].url} style={{ width: 64, height: 64 }} alt={artist.name} />
            </a>
            <h5>{artist.name}</h5>
            <a><button type="button" onClick={() => this.albumClick(artist.id)} >Albums</button></a>
            <a href="#" onClick={() => this.updateSong(artist.name)}><i className="fa fa-map-marker" aria-hidden="true"></i></a>
          </div>
        )
      }) : null

    let albums = this.state.albums ? this.state.albums.map(album => {
      return (
        <div className="album" key={Math.random()}>
          <a href="#" onClick={this.albumPlay}><img src={album.image} /></a>
          <h5>{album.name.length > 20 ? `${album.name.substring(0, 20).trim()}...` : album.name}</h5>
        </div>
      )
    }) : null

    return (
      // <Router>

      <div >
        <Sidebar style={styles.sidebar} imgUrl={this.state.imgUrl} />
        <div style={styles.main} >
          <header >
            <h1 >VenuePlayer</h1>
            <div >
              <input placeholder="Artist..." type="text" onChange={this.textHandler} />
              <button onClick={this.searchHandler} >Search</button>
              {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>}
            </div>
            <div>
              {this.state.nowPlaying.albumArt.length > 0
                &&
                <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt='cover'
                />}
            </div>
          </header>
          <div className="artist-container">
            {artistsContent}
          </div>
          {/* <AudioPlayer updateSong={this.updateSong} songs={this.state.songs} /> */}
          <div className="album-container" >
            {this.state.albums && albums}
          </div>

        </div>
        <div style={styles.map} id="map">
          <MapContainer venues={this.state.venues} dateTime={this.state.dateTime} artist={this.state.artistClicked} />
        </div>
      </div>
      // </Router >
    )
  }
}

export default App