import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
import {
  SEARCH_ARTIST,
  SET_VENUES,
  SET_ALBUMS,
  ALBUM_PLAY,
  TOKEN_TO_STATE,
  BACK_TO_ARTIST
} from '../actions/types'

const spotifyApi = new SpotifyWebApi()

export const tokenToState = (token) => dispatch => {
  dispatch({
    type: TOKEN_TO_STATE,
    payload: token
  })
}

export const searchArtist = (artist) => dispatch => {
  spotifyApi.searchArtists(artist, { 'limit': 8 })
    .then((data) => {      
      dispatch({
        type: SEARCH_ARTIST,
        payload: data.artists.items
      })
    }, (err) => {
      console.error(err)
    })
}

export const artistClick = (img, id, artist) => dispatch => {
  axios.post('http://localhost:8888/', { artist })
    .then((response) => {
      let venues = response.data.map((item) => {
        return item
      })
      dispatch({
        type: SET_VENUES,
        payload: { venues, artist }
      })
    }).catch(err => console.log('error : ', err))

  spotifyApi.getArtistAlbums(id).then((data) => {
    console.log(data)
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