import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Artist from '../Artist/Artist'
import Albums from '../Albums/Albums'
import axios from 'axios'
import MapContainer from '../MapContainer/index'
import SpotifyWebApi from 'spotify-web-api-js'
import {
  searchArtist,
  artistClick,
  albumPlay,
  backToArtist,
  tokenToState
} from '../../actions/mainActions'

const spotifyApi = new SpotifyWebApi()

class Main extends Component {
  constructor() {
    super()

    this.state = {
      tokenError: true,
      textValue: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8888/')
      .then(res => {
        this.props.tokenToState(res.data)
        this.setState({
          tokenError: false
        })
      })
      .then(() => {
        let token = this.props.main.token
        if (token) {
          spotifyApi.setAccessToken(token)
        }
      })
      .catch(err => console.log(err)
      )
  }

  textHandler = (e) => {
    this.props.searchArtist(e.target.value)
    this.setState({
      textValue: e.target.value
    })
  }

  render() {
    let {
      showArtist,
      showAlbums,
      venues,
      img,
      nowPlaying,
      artist
    } = this.props.main,
      concertInfo = venues.length > 0
        ?
        `${venues.length} Concert(s) Found `
        :
        'No Concert Information'

    if (this.state.tokenError) {
      return <div className="loading" >Loading..</div>
    } else {
      return (
        <div className="main-container" >
          <Sidebar img={img} nowPlaying={nowPlaying} />
          <div className="main" >
            <Header />
            <div className="main-middle" >
              <input
                placeholder="Search Artist"
                type="text"
                onChange={this.textHandler}
                className="search-input"
              />
              {this.state.textValue === null && <h1>Simply type your favorite artist's name to know more about his/her next upcoming concert</h1>}
              {showArtist && this.state.textValue && <Artist />}
              {showAlbums && this.state.textValue &&
                (<div>
                  <h2 className="album-title" >
                    {`${concertInfo} - ${artist}'s Albums : `}
                  </h2>
                  <div className="back-to-artist" onClick={this.props.backToArtist}>
                    <i className="fa fa-chevron-left"></i> back
                  </div>
                  <Albums />
                </div>)}
            </div>
            <div id="map">
              <MapContainer />
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  tokenToState,
  searchArtist,
  artistClick,
  albumPlay,
  backToArtist
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)