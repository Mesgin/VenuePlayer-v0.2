import { 
  SEARCH_ARTIST, 
  SET_VENUES, 
  SET_ARTIST, 
  SET_ALBUMS, 
  SET_IMG_URL,
  ALBUM_PLAY } from '../actions/types'


const initialState = {
  songs: [{}],
  venues: [],
  nowPlaying: '1t4hf9yHMQBoTz2CxTBJKj',
  artists: [],
  artist: '',
  imgUrl: null,
  albums: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ARTIST:
      return {
        ...state,
        artists: action.payload,
      }
    case SET_VENUES:
      return {
        ...state,
        venues: action.payload.venues,
        artist: action.payload.artist
      }
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      }
    case SET_IMG_URL:
      return {
        ...state,
        imgUrl: action.payload
      }
    case ALBUM_PLAY:
      return {
        ...state,
        nowPlaying: action.payload
      }
    default:
      return state
  }
}
