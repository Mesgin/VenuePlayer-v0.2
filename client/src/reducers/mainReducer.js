import {
  SEARCH_ARTIST,
  TOKEN_TO_STATE,
  SET_VENUES,
  SET_ALBUMS,
  ALBUM_PLAY,
  BACK_TO_ARTIST,
  SHOW_INFO
} from '../actions/types'


const initialState = {
  songs: [{}],
  venues: [],
  nowPlaying: '78C6B8XlWz91aOID7H6NBX',
  artists: [],
  artist: '',
  img: null,
  albums: null,
  token: '',
  showAlbums: false,
  showArtist: true,
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
        artists: action.payload,
        showAlbums: false,
        showArtist: true
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
        showArtist: false,
        showAlbums: true
      }
    case ALBUM_PLAY:
      return {
        ...state,
        nowPlaying: action.payload.id,
        img: action.payload.imageMedium
      }
    case BACK_TO_ARTIST:
      return {
        ...state,
        showArtist: true,
        showAlbums: false
      }
    case SHOW_INFO:
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
    default:
      return state
  }
}
