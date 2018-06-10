import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
import {
  SEARCH_ARTIST,
  SET_VENUES,
  SET_ARTIST,
  SET_ALBUMS,
  SET_IMG_URL,
  ALBUM_PLAY
} from '../actions/types'

const spotifyApi = new SpotifyWebApi()

export const searchArtist = (artist) => dispatch => {
  spotifyApi.searchArtists(artist, { "limit": 4 })
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
    })

  spotifyApi.getArtistAlbums(id).then((data) => {
    let albums = data.items.map(item => {
      if (item.images.length > 0) {
        return {
          name: item.name,
          image: item.images[2].url,
          id: item.id
        }
      } else {
        return {
          name: item.name,
          id: item.id
        }
      }
    })
    dispatch({
      type: SET_ALBUMS,
      payload: {albums,img}
    })
  },
    (err) => { console.error(err) })
}

export const albumPlay = id => dispatch => {
  dispatch({
    type: ALBUM_PLAY,
    payload: id
  })
}