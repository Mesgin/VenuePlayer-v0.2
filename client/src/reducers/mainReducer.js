import {
  SEARCH_ARTIST,
  TOKEN_TO_STATE,
  SET_VENUES,
  SET_ALBUMS,
  ALBUM_PLAY,
  BACK_TO_ARTIST,
  SHOW_INFOWINDOW,
  CLOSE_ALL_INFOWINDOW,
  ALBUM_BUTTON_CLICK
} from '../actions/types'
//BQAlooE91Vetkf80FUIg9vTIylbGq_R32qkbnnS52zGbBHqiLwWKMc30WlS_PE0Aog0Z6Ej5Cn9TXflfuo8
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
  showArtist: false,
  showInfo: false
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
        artist: action.payload.artist,
        showInfo: true
      }
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload.albums,
        img: action.payload.img,
        nowPlaying: action.payload.albums[0].id
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
        showInfo: true,
        showAlbums: false
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
        albums: action.payload.albums,
        showAlbums: true,
        showArtist: false,
        showInfo: false
      }
    default:
      return state
  }
}