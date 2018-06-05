const express = require('express')
const app = express()
const fs = require('fs')
const mm = require('musicmetadata')
const request = require('request')
// const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')


const scope = 'user-read-private user-read-email',
  redirect_uri = 'http://localhost:8888/callback',
  client_id = 'd773cbd567e4473394863ffacc1a7409',
  state = 'some-state-of-my-choice',
  client_secret = '6fb8f632cb444cafaf1fc49ca99c6bd3'

// const spotifyApi = new SpotifyWebApi({
//   clientId: 'd773cbd567e4473394863ffacc1a7409',
//   clientSecret: '6fb8f632cb444cafaf1fc49ca99c6bd3',
//   redirectUri: redirectUri
// })

// const authorizeURL = spotifyApi.createAuthorizeURL(scope, state)

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */




/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

// var app = express()

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser())

app.get('/login', function(req, res) {

  let state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    }))
})

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null
  let state = req.query.state || null
  let storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(stateKey)
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        let access_token = body.access_token,
            refresh_token = body.refresh_token

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }))
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    })
  }
})

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      res.send({
        'access_token': access_token
      })
    }
  })
})

// app.get('/search',(req,res)=>{
//     spotifyApi.searchArtists('Love')
//     .then((data)=> {
//         res.JSON(data)
//     console.log('Search artists by "Love"', data.body)
//   }, (err) => {
//     console.error(err)
// })
// })


// app.use(bodyParser.json())

// function Song(source, title, artist, description, img, id) {
//     this.source = source
//     this.title = title
//     this.artist = artist
//     this.description = description
//     this.img = img
//     this.id = id
// }

// const songs = [
//     new Song('/upstep.mp3', 'Under The Sun', 'Bryan Adams', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm','./bryan-adams.jpg' ,0),
//     new Song('/upstep.mp3', 'Uptown Funk', 'Bruno Mars', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', './bruno-mars.jpg', 1),
//     new Song('/olympian.mp3', 'Irreplaceable', 'Beyonce', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm','./beyonce.png' ,2),
//     new Song('/transmission.mp3', 'Raise Your Glass', 'Pink', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', './pink.jpeg', 3),
//     new Song('/olympian.mp3', 'Someone Like You', 'Adele', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm','./adele.jpg' ,4),
//     new Song('/transmission.mp3', 'Dream of You', 'Schiller', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', './schiller.png', 5)
// ]

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
//     next()
// })

// app.get('/',(req,res)=>{
//     res.json(songs)
// })

// app.post('/',(req,res)=>{
//     const {artist} = req.body
//     request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=c74a852c1481cfb7e5cda8c42adc7ff0`, (err, response, data) => {
//         const dataObject = JSON.parse(data)
//         if (err) console.log(err)
//         res.json(dataObject)
//     })
// })

app.listen(8888,()=>{
    console.log(8888)
})