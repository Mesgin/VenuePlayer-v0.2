import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
// import Login from './components/Login/Login'
import Artist from './components/Artist/Artist'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Artists from './components/Artists/Artists'
import Albums from './components/Albums/Albums'
import NotFound from './components/NotFound/NotFound'
import {
  searchArtist,
  artistClick,
  albumPlay,
  backToArtist,
  tokenToState
} from './actions/mainActions'
const endPoint = process.env.NODE_ENV === 'development' ? 'http://localhost:8888/api' : 'https://venueplayer.herokuapp.com/api'

const spotifyApi = new SpotifyWebApi()

class App extends Component {
  constructor() {
    super()

    this.state = {
      tokenError: true
    }
  }

  componentDidMount() {
    console.log(process.env.NODE_ENV);

    axios.get(endPoint)
      .then(res => {
        console.log(res);
        spotifyApi.setAccessToken(res.data)
        this.setState({
          tokenError: false
        })


        // this.props.tokenToState(res.data)
        // console.log(this.props.main.token);

        // this.setState({
        //   tokenError: false
        // })
      })
      // .then(() => {
      //   let token = this.props.main.token
      //   if (token) {
      //     spotifyApi.setAccessToken(token)
      //   }
      // })
      .catch(err => {
        console.log(err)
        // setTimeout(() => {
        //   window.location.reload(true)
        // }, 3000)
      }
      )
  }

  playerToggle = () => {
    document.querySelector('.main-container').classList.toggle('main-container-shrink')
    document.querySelector('.chevron').classList.toggle('left')
    document.querySelector('.sidebar').classList.toggle('sidebar-toggle')
    document.querySelector('.header').classList.toggle('header-shrink')
  }

  render() {
    let {
      artists,
      img,
      nowPlaying,
    } = this.props.main

    // let concertInfo = venues.length > 0
    //   ?
    //   `Concerts Found: ${venues.length}`
    //   :
    //   'No Concert Information'

    if (this.state.tokenError) {
      return <div className="loading" >Loading..</div>
    } else {
      return (
        <div className="main-container" >
          <div className="player-toggle" onClick={this.playerToggle}>
            <span className="chevron right"></span>
          </div>
          <Sidebar img={img} nowPlaying={nowPlaying} />
          <Header artists={artists} />
          <div className="main" >
            <div className="main-middle" >
              <Switch>
                <Route exact path='/' component={Artists} />
                <Route exact path='/artist/:name' component={Artist} />
                <Route exact path='/albums/:name' component={Albums} />
                <Route component={NotFound} />
              </Switch>
              {this.props.main.artists.length === 0 && (
                <div className="welcome" >
                  Simply type your favourite artists name to know more about their next upcoming concert, and preview their albums :)
                </div>
              )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))