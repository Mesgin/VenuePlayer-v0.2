import {
  SEARCH_ARTIST,
  TOKEN_TO_STATE,
  SET_VENUES,
  SET_ALBUMS,
  ALBUM_PLAY,
  BACK_TO_ARTISTS,
  RESET_HOME,
  SHOW_INFOWINDOW,
  CLOSE_ALL_INFOWINDOW,
  ALBUM_BUTTON_CLICK
} from '../actions/types'

const initialState = {
  songs: [{}],
  venues: [],
  nowPlaying: '78C6B8XlWz91aOID7H6NBX',
  artists: [],
  artist: '',
  id: '',
  genres: [],
  img: null,
  albums: {},
  token: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TOKEN_TO_STATE:
      return {
        ...state,
        token: action.payload,
      }
    case SEARCH_ARTIST:
      return {
        ...state,
        artists: action.payload
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
        albums: action.payload.albums,
        img: action.payload.img,
        genres: action.payload.genres,
        nowPlaying: action.payload.albums[0].id,
        id: action.payload.id
      }
    case ALBUM_PLAY:
      return {
        ...state,
        nowPlaying: action.payload.id,
        img: action.payload.imageMedium
      }
    case BACK_TO_ARTISTS:
      return {
        ...state,
        albums: {},
        artist: ''
      }
    case RESET_HOME:
      return {
        ...state,
        albums: {},
        artist: '',
        artists: []
      }
    case SHOW_INFOWINDOW:
      return {
        ...state,
        venues: state.venues.map(venue =>
          venue.id === action.payload
            ?
            { ...venue, showInfo: !venue.showInfo }
            :
            venue
        )
      }
    case CLOSE_ALL_INFOWINDOW:
      return {
        ...state,
        venues: state.venues.map(venue =>
          venue.showInfo === true
            ?
            { ...venue, showInfo: false}
            :
            venue
        )
      }
    case ALBUM_BUTTON_CLICK:
      return {
        ...state,
        albums: action.payload.albums
      }
    default:
      return state
  }
}