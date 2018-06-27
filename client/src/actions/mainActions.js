import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
import {
  SEARCH_ARTIST,
  SET_VENUES,
  SET_ALBUMS,
  ALBUM_PLAY,
  TOKEN_TO_STATE,
  BACK_TO_ARTIST,
  SHOW_INFOWINDOW,
  CLOSE_ALL_INFOWINDOW,
  ALBUM_BUTTON_CLICK
} from '../actions/types'
const endPoint =  process.env.NODE_ENV === 'development' ? 'http://localhost:8888/api' : 'https://venueplayer.herokuapp.com/api'

const spotifyApi = new SpotifyWebApi()

export const tokenToState = token => dispatch => {
  dispatch({
    type: TOKEN_TO_STATE,
    payload: token
  })
}

export const searchArtist = (artist) => dispatch => {
  spotifyApi.searchArtists(artist, { 'limit': 15 })
    .then((data) => {
      dispatch({
        type: SEARCH_ARTIST,
        payload: data.artists.items
      })
    }, (err) => {
      if (err.status === 401) {
        axios.get(endPoint)
          .then(res => {
            spotifyApi.setAccessToken(res.data)
            dispatch({
              type: TOKEN_TO_STATE,
              payload: res.data
            })
          }).catch(err => console.error(err))
      }
    })
}

export const artistClick = (id, img, artist) => dispatch => {
   axios.post(endPoint, { artist })
    .then((response) => {
      let venues = response.data.map((item) => {
        item.showInfo = false
        return item
      })
      dispatch({
        type: SET_VENUES,
        payload: { venues, artist }
      })
    }).catch(err => console.log('errror : ', err))

  spotifyApi.getArtistAlbums(id, { limit: 50, market: 'CA' }).then((data) => {
    // console.log('albums', data.items)
    let albums = data.items.map(item => {
      if (item.images.length > 1) {
        return {
          name: item.name,
          image: item.images[item.images.length - 1].url,
          imageMedium: item.images[item.images.length - 2].url,
          release: item.release_date,
          id: item.id
        }
      } else {
        return {
          name: item.name,
          release: item.release_date,
          id: item.id
        }
      }
    })
    console.log(albums,img,id);
    
    dispatch({
      type: SET_ALBUMS,
      payload: { albums, img, id }
    })
  },
    (err) => {     
      if (err.status === 401) {
        axios.get(endPoint)
          .then(res => {
            spotifyApi.setAccessToken(res.data)
            dispatch({
              type: TOKEN_TO_STATE,
              payload: res.data
            })
          }).catch(err => console.error(err))
      }
    })
}

export const albumButtonClick = id => dispatch => { 
  spotifyApi.getArtistAlbums(id, { limit: 50, market: 'CA' }).then((data) => {
    let albums = data.items.map(item => {
      if (item.images.length > 1) {
        return {
          name: item.name,
          image: item.images[item.images.length - 1].url,
          imageMedium: item.images[item.images.length - 2].url,
          release: item.release_date,
          id: item.id
        }
      } else {
        return {
          name: item.name,
          release: item.release_date,
          id: item.id
        }
      }
    })
    dispatch({
      type: ALBUM_BUTTON_CLICK,
      payload: { albums }
    })
  },
    (err) => {
      if (err.status === 401) {
        axios.get(endPoint)
          .then(res => {
            spotifyApi.setAccessToken(res.data)
            dispatch({
              type: TOKEN_TO_STATE,
              payload: res.data
            })
          })
          .catch(err => console.error(err))
      }
    })
}

export const albumPlay = (id, imageMedium) => dispatch => {
  let visible = document.querySelector('.sidebar').classList.contains('sidebar-toggle')
  if (!visible) {
    document.querySelector('.sidebar').classList.toggle('sidebar-toggle')
    document.querySelector('.main-container').classList.toggle('main-container-shrink')
    document.querySelector('.chevron').classList.toggle('left')
  }
  dispatch({
    type: ALBUM_PLAY,
    payload: { id, imageMedium }
  })
}

export const backToArtist = () => dispatch => {
  dispatch({
    type: BACK_TO_ARTIST
  })
}

export const showInfowindow = changedVenues => dispatch => {
  dispatch({
    type: SHOW_INFOWINDOW,
    payload: changedVenues
  })
}

export const closeAllInfowindow = changedVenues => dispatch => {
  dispatch({
    type: CLOSE_ALL_INFOWINDOW
  })
}