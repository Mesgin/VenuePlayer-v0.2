import React, { Component } from 'react'
// import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Artist from '../Artist/Artist'
import Albums from '../Albums/Albums'
// import MapContainer from '../MapContainer'
import axios from 'axios'
import MapContainer from '../MapContainer/index'
import SpotifyWebApi from 'spotify-web-api-js'
import { searchArtist, artistClick, albumPlay, backToArtist, tokenToState } from '../../actions/mainActions'

const styles = {
  mainContainer: {
    paddingRight: '5px'
  },
  main: {
    marginLeft: '260px',
    textAlign: 'center',
    // height: '60%'
  },
  middle: {
    height: '50%'
  },
  map: {
    padding: 0,
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%'

  },
  albumTitle: {
    margin: 0
  }
}

const spotifyApi = new SpotifyWebApi()

class Main extends Component {
  constructor() {
    super()

    this.state = {
      tokenError: true,
      textInput: ''
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
      .catch(err => console.log('errrr', err)
      )
  }

  textHandler = (e) => {
    this.props.searchArtist(e.target.value)
    this.setState({
      textInput: e.target.value
    })
  }

  render() {
    let concertInfo = this.props.main.venues.length > 0 ? `${this.props.main.venues.length} Concert(s) Found ` : 'No Concert Information'
    if (this.state.tokenError) {
      return <div className="loading" >Loading..</div>
    } else {
      return (
        <div style={styles.mainContainer} >
          <Sidebar
            style={styles.sidebar}
            img={this.props.main.img}
            nowPlaying={this.props.main.nowPlaying}
          />
          <div style={styles.main} >
            <Header />
            <div style={styles.middle}>
              <input
                placeholder="Search Artist"
                type="text"
                onChange={this.textHandler}
                className="search-input"
              />
              {this.props.main.showArtist && <Artist />}
              {this.props.main.showAlbums &&
                (<div>
                  <h2 style={styles.albumTitle}>
                    {`${concertInfo} - ${this.props.main.artist}'s Albums : `}
                  </h2>
                  <div className="back-to-artist" onClick={this.props.backToArtist}>
                    <i className="fa fa-chevron-left"></i> back
                  </div>
                  <Albums />
                </div>)
              }
            </div>
            <div style={styles.map} id="map">
              {/* <MapContainer
              venues={this.props.main.venues}
              dateTime={this.state.dateTime}
              artist={this.props.main.artist}
            /> */}
              <MapContainer markers={this.state.markers} />
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