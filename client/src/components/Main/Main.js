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
          spotifyApi.setAccessToken(this.props.main.token)
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          window.location.reload(true)
        }, 3000)
      }
      )
  }

  textHandler = (e) => {
    this.props.searchArtist(e.target.value)
    this.setState({
      textValue: e.target.value
    })
  }

  playerToggle = () => {
    document.querySelector('.main-container').classList.toggle('main-container-shrink')
    document.querySelector('.chevron').classList.toggle('left')
    document.querySelector('.sidebar').classList.toggle('sidebar-toggle')
  }

  render() {
    let {
      showArtist,
      showAlbums,
      venues,
      img,
      nowPlaying,
      showInfo
    } = this.props.main

    let concertInfo = venues.length > 0
      ?
      `Concerts Found: ${venues.length}`
      :
      'No Concert Information'

    if (this.state.tokenError) {
      return <div className="loading" >Loading..</div>
    } else {
      return (
        <div className="main-container" >
          <div className="player-toggle" onClick={this.playerToggle}>
            <span className="chevron right"></span>
          </div>
          <Sidebar img={img} nowPlaying={nowPlaying} />
          <Header />
          <div className="main" >
            <input
              placeholder="Search Artist"
              type="text"
              onChange={this.textHandler}
              className="search-input"
            />
            <div className="main-middle" >
              {this.state.textValue === null && (
                <div className="welcome" >
                  Simply type your favorite artists name to know more about their next upcoming concert, and also you can preview their albums :)
              
                </div>
              )}
              {showArtist && (
                <div >
                  {showInfo && <p className="result" >
                    {concertInfo}
                  </p>}
                  <Artist />
                </div>
              )}
              {showAlbums &&
                (<div>
                  <div className="back-to-artist" onClick={this.props.backToArtist}>
                    <i className="fa fa-chevron-left"></i> back
                  </div>
                  <Albums />
                </div>)}
            </div>
            <div className="map">
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