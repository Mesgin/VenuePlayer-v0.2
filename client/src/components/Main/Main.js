import React, { Component } from 'react'
import { connect } from 'react-redux'
// import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from '../Sidebar/Sidebar'
import MapContainer from '../MapContainer'
import axios from 'axios'
import { loginUser } from '../../actions/authActions'
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
  searchInput: {
    padding: '10px',
    color: 'white',
    backgroundColor: '#000',
    borderRadius: '5px',
    width: '250px',
    height: '20px',
    border: 0,
    fontSize: '16px',
    margin: '5px'
  }
}

// const spotifyApi = new SpotifyWebApi()

class Main extends Component {
  constructor(){
    super()

    const spotifyApi = new SpotifyWebApi()
    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      spotifyApi.setAccessToken(token)
    }
    this.state = {
      loggedIn: token ? true : false
    }
  }
  componentDidMount(){
    if(!this.state.loggedIn){
      window.history.back()
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
  // constructor() {
  //   super()

  //   // const params = this.getHashParams()
  //   // const token = params.access_token
  //   // if (token) {
  //   //   spotifyApi.setAccessToken(token)
  //   // }

  //   this.state = {
  //     songs: [{}],
  //     venues: [],
  //     // loggedIn: token ? true : false,
  //     nowPlaying: '1t4hf9yHMQBoTz2CxTBJKj',
  //     artists: [],
  //     textInput: '',
  //     artistClicked: '',
  //     imgUrl: null,
  //     albums: null
  //   }
  // }

  // getHashParams() {
  //   let hashParams = {}
  //   let e, r = /([^&=]+)=?([^&]*)/g,
  //     q = window.location.hash.substring(1)
  //   e = r.exec(q)
  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2])
  //     e = r.exec(q)
  //   }
  //   return hashParams
  // }

  // textHandler = (e) => {
  //   spotifyApi.searchArtists(e.target.value, { "limit": 4 })
  //     .then((data) => {
  //       this.setState({
  //         artists: data.artists.items
  //       })
  //     }, (err) => {
  //       console.error(err)
  //     })
  //   this.setState({
  //     textInput: e.target.value
  //   })
  // }

  // artistClick = (img, id, artist) => {
  //   axios.post('http://localhost:8888/', { artist })
  //     .then((response) => {
  //       let venues = response.data.map((item) => {
  //         return item
  //       })
  //       this.setState({
  //         venues,
  //         artistClicked: artist
  //       })
  //       axios.get('http://localhost:8888/')
  //         .then((response) => {
  //           this.setState({
  //             songs: response.data,
  //           })
  //         })
  //     })
  //   spotifyApi.getArtistAlbums(id).then((data) => {
  //     let artistAlbums = data.items.map(item => {
  //       if (item.images.length > 0) {
  //         return {
  //           name: item.name,
  //           image: item.images[2].url,
  //           id: item.id
  //         }
  //       } else {
  //         return {
  //           name: item.name,
  //           id: item.id
  //         }
  //       }
  //     }
  //     )
  //     this.setState({
  //       albums: artistAlbums,
  //       imgUrl: img
  //     })
  //   },
  //     (err) => {
  //       console.error(err);
  //     }
  //   )
  // }

  // albumPlay = (id) => {
  //   this.setState({
  //     nowPlaying: id
  //   })
  // }

  render() {
  //   let artistsContent = this.state.artists.length > 0 ?
  //   this.state.artists.map(artist => {
  //     return (
  //       <div key={artist.id} className="artist">
  //         <a onClick={() => this.artistClick(artist.images[1].url, artist.id, artist.name)} href="#">
  //           <img src={artist.images.length > 0 && artist.images[2].url || 'http://via.placeholder.com/64x64'} style={{ width: 64, height: 64 }} alt={artist.name} />
  //         </a>
  //         <h5>{artist.name}</h5>
  //         {/* <a><button type="button" onClick={() => this.albumClick(artist.id)} >Albums</button></a> */}
  //         <a href="#" onClick={() => this.updateSong(artist.name)}><i className="fa fa-map-marker" aria-hidden="true"></i></a>
  //       </div>
  //     )
  //   }) : null

  // let albums = this.state.albums ? this.state.albums.map(album => {
  //   return (
  //     <div className="album" key={album.id}>
  //       <div className="container">
  //         <img src={album.image} className="image" />
  //         <div className="middle" onClick={() => this.albumPlay(album.id)}>
  //           <i className="play-icon fa fa-play-circle"></i>
  //         </div>
  //       </div>
  //       <h5>{album.name.length > 20 ? `${album.name.substring(0, 20).trim()}...` : album.name}</h5>
  //     </div>
  //   )
  // }) : null
  if(!this.state.loggedIn){
    return <div>Redirect..</div>
  } else {
    return (
      // <div >
      //   <Sidebar
      //     style={styles.sidebar}
      //     imgUrl={this.state.imgUrl}
      //     nowPlaying={this.state.nowPlaying}
      //   />
      //   <div style={styles.main} >
      //     <header >
      //       <h1 >VenuePlayer</h1>
      //       <div >
      //         <input placeholder="Artist..." type="text" onChange={this.textHandler} style={styles.searchInput} />
      //       </div>
      //       {!this.state.loggedIn && <a href='http://localhost:8888/login' > Login to Spotify </a>}
      //     </header>
      //     <div className="artist-container">
      //       {artistsContent}
      //     </div>
      //     <div className="album-container" >
      //       {this.state.albums && albums}
      //     </div>

      //   </div>
      //   <div style={styles.map} id="map">
      //     <MapContainer
      //       venues={this.state.venues}
      //       dateTime={this.state.dateTime}
      //       artist={this.state.artistClicked}
      //     />
      //   </div>
      // </div>
      <div>Main</div>
    )
  }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,{loginUser})(Main)