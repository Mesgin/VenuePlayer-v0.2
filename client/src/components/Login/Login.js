import React, { Component } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'
import PropTypes from 'prop-types'
// import SpotifyWebApi from 'spotify-web-api-js'

class Login extends Component {
  // constructor(){
  //   super()

  //   const spotifyApi = new SpotifyWebApi()
  //   const params = this.getHashParams()
  //   const token = params.access_token
  //   if (token) {
  //     spotifyApi.setAccessToken(token)
  //     this.props.loginUser()
  //   }
  //   this.state = {
  //     loggedIn: token ? true : false
  //   }
  // }

  // componentDidMount(){
  //   if(this.state.loggedIn){
  //     this.props.loginUser()
  //   }
  // }

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

  // componentDidMount(){
  //   this.props.loginUser()
  // }

  // loginHandler = () => {
  //   axios.get('http://localhost:8888/login')
  //   .then(console.log('success'))
  // }
  render() {

    
    return (
      <div>
        {/* <button type="button" onClick={this.props.loginUser} > Login to Spotify </button> */}
        <a href='http://localhost:8888/login'>login</a>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
}


export default connect()(Login)