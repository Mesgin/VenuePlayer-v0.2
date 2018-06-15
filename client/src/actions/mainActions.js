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
  ALBUM_BUTTON_CLICK
} from '../actions/types'

const spotifyApi = new SpotifyWebApi()

export const tokenToState = (token) => dispatch => {
  dispatch({
    type: TOKEN_TO_STATE,
    payload: token
  })
}

export const searchArtist = (artist) => dispatch => {
  document.querySelector('.heading').classList.add('heading-shrink')
  document.querySelector('.search-input').classList.add('search-input-shrink')
  document.querySelector('.map').classList.add('map-show')
  spotifyApi.searchArtists(artist, { 'limit': 9 })
    .then((data) => {
      dispatch({
        type: SEARCH_ARTIST,
        payload: data.artists.items
      })
    }, (err) => {
      console.error(err)
    })
}

export const artistClick = (id, img, artist) => dispatch => {
  axios.post('http://localhost:8888/', { artist })
    .then((response) => {
      let venues = response.data.map((item) => {
        item.showInfo = false
        return item
      })
      console.log(venues);

      dispatch({
        type: SET_VENUES,
        payload: { venues, artist }
      })
    }).catch(err => console.log('error : ', err))

  spotifyApi.getArtistAlbums(id, { limit: 50, market: 'CA' }).then((data) => {
    let albums = data.items.map(item => {
      if (item.images.length > 0) {
        return {
          name: item.name,
          image: item.images[2].url,
          imageMedium: item.images[1].url,
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
      type: SET_ALBUMS,
      payload: { albums, img }
    })
  },
    (err) => { console.error(err) })
}

export const albumButtonClick = id => dispatch => {
  spotifyApi.getArtistAlbums(id, { limit: 50, market: 'CA' }).then((data) => {
    let albums = data.items.map(item => {
      if (item.images.length > 0) {
        return {
          name: item.name,
          image: item.images[2].url,
          imageMedium: item.images[1].url,
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
    (err) => { console.error(err) })
}

export const albumPlay = (id, imageMedium) => dispatch => {
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