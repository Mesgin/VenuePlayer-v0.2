const express = require('express')
const app = express()
const fs = require('fs')
const mm = require('musicmetadata')
const request = require('request')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const key = require('./client/src/config/keys').bandKey


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})
const redirect_uri = 'http://localhost:8888/callback',
  client_id = 'd773cbd567e4473394863ffacc1a7409',
  state = 'some-state-of-my-choice',
  client_secret = '6fb8f632cb444cafaf1fc49ca99c6bd3'

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization':
      'Basic ' +
      (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

app.get('/', (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token
      var options = {
        url: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      }
      res.send(token)
      request.get(options, function (error, response, body) {
      })
    }
  })
})

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const { artist } = req.body
  request(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${key}`,
    (err, response, data) => {
      const dataObject = JSON.parse(data)
      if (err) console.log(err)
      res.json(dataObject)
    })
})

app.listen(8888, () => {
  console.log(8888)
})