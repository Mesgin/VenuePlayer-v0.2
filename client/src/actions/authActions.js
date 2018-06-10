import SpotifyWebApi from 'spotify-web-api-js'
import { AUTHENTICATE } from './types'
import axios from 'axios'
const getHashParams = function() {
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

export const loginUser = () => {
  const spotifyApi = new SpotifyWebApi()
  const params = getHashParams()
  const token = params.access_token
  if (token) {
    spotifyApi.setAccessToken(token)
  }
}