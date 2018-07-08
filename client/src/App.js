import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import Artist from './components/Artist/Artist'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Artists from './containers/Artists/Artists'
import Albums from './components/Albums/Albums'
import Welcome from './components/Welcome/Welcome'
import NotFound from './components/NotFound/NotFound'
import {
  searchArtist,
  artistClick,
  albumPlay,
  albumButtonClick,
  backToArtist,
  tokenToState,
} from './actions/mainActions'
const endPoint = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/api'
  : 'https://venueplayer.herokuapp.com/api'
const spotifyApi = new SpotifyWebApi()

class App extends Component {
  constructor() {
    super()

    this.state = {
      tokenError: true
    }
  }

  componentDidMount() {
    axios.get(endPoint)
      .then(res => {
        spotifyApi.setAccessToken(res.data)
        this.setState({
          tokenError: false
        })
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          window.location.reload(true)
        }, 3000)
      }
      )
  }

  playerToggle = () => {
    document.querySelector('.main-container').classList.toggle('main-container-shrink')
    document.querySelector('.chevron').classList.toggle('left')
    document.querySelector('.sidebar').classList.toggle('sidebar-show')
    document.querySelector('.header').classList.toggle('header-shrink')
  }

  render() {
    let {
      id,
      artist,
      artists,
      albums,
      img,
      nowPlaying,
    } = this.props.main

    if (this.state.tokenError) {
      return <div className="loading" >Loading...</div>
    } else {
      return (
        <div className="main-container" >
          <Header artists={artists} />
          <div className="player-toggle" onClick={this.playerToggle}>
            <span className="chevron right"></span>
          </div>
          <Sidebar img={img} nowPlaying={nowPlaying} />
          <div className="main" >
            <div className="main-middle" >
              {artists.length === 0 && <h1 className="main-middle-title">VenuePlayer</h1>}
              <Switch>
                <Route exact path='/' component={Artists} />
                <Route
                  exact path='/artist/:name'
                  render={props => {
                    return <Artist
                      {...props}
                      artist={artist}
                      id={id}
                      img={img}
                      albumButtonClick={this.props.albumButtonClick} />
                  }} />
                <Route
                  exact path='/albums/:name'
                  render={props => {
                    return <Albums
                      {...props}
                      albums={albums}
                      albumPlay={this.props.albumPlay}
                    />
                  }} />
                <Route component={NotFound} />
              </Switch>
              <div className="welcome" >
                {artists.length === 0 && <Welcome />}
              </div>
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
  albumButtonClick,
  backToArtist
}

const mapStateToProps = state => ({
  main: state.main
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))