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
import NotFound from './components/NotFound/NotFound'
import {
  searchArtist,
  artistClick,
  albumPlay,
  albumButtonClick,
  backToArtists,
  resetHome,
  tokenToState
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
    document.querySelector('.main-middle').classList.toggle('main-middle-shrink')
    document.querySelector('.chevron').classList.toggle('left')
    document.querySelector('.sidebar').classList.toggle('sidebar-show')
    document.body.classList.toggle('hidden-overflow')
  }

  menuClick = () => {
    document.querySelector('.nav-toggle-label').classList.toggle('open')
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
        <div >
          <Header artists={artists} resetHome={this.props.resetHome} menuClick={this.menuClick} />
          <div className="main-container" >
          <div className="player-toggle" onClick={this.playerToggle}>
            <span className="chevron right"></span>
          </div>
          <Sidebar img={img} nowPlaying={nowPlaying} />
          <div className="main" >
            <div className="main-middle" >            
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
                      backToArtists={this.props.backToArtists}
                      albumButtonClick={this.props.albumButtonClick} />
                  }} />
                <Route
                  exact path='/albums/:name'
                  render={props => {
                    return <Albums
                      {...props}
                      albums={albums}
                      backToArtists={this.props.backToArtists}
                      albumPlay={this.props.albumPlay}
                    />
                  }} />
                <Route component={NotFound} />
              </Switch>
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
  backToArtists,
  resetHome
}

const mapStateToProps = state => ({
  main: state.main
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))