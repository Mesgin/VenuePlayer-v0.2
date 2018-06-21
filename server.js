const express = require('express')
const app = express()
const request = require('request')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const key = require('./client/src/config/keys').bandKey
const secret = require('./client/src/config/keys').secret
const path = require('path')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const client_id = 'd773cbd567e4473394863ffacc1a7409',
  client_secret = secret

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

// app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// let tokenSaved;
app.get('/', (req, res) => {
  console.log('1');
  
  request.post(authOptions, function (error, response, body) {
    console.log('2');
    
    if (!error && response.statusCode === 200) {
      console.log('3');
      
      // use the access token to access the Spotify Web API
      let token = body.access_token
      // let options = {
      //   url: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
      //   headers: {
      //     'Authorization': 'Bearer ' + token
      //   },
      //   json: true
      // }
      console.log('4');
      
      res.send(token)
      // request.get(options, function (error, response, body) {
      // })
    }
    console.log('5');
    
    // res.send('no token received')
  })
})

app.post('/', (req, res) => {
  const { artist } = req.body
  request(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${key}`,
    (err, response, data) => {
      if (err) console.log(err)
      if (data.includes('error=Not Found') || data.includes('message=invalid parameter') || data.includes('warn=Not found')) {
        console.log(data)
        res.send([])
      } else {
        const dataObject = JSON.parse(data)
        res.send(dataObject)
      }
    })
})



const port = process.env.PORT || 8888
// var server = app.listen(8000, function () {
//   var host = server.address().address;
//   var port = server.address().port; // put your adress here :)

//   console.log('Example app listening at http://%s:%s', host, port);
// })

app.listen(port, () => {
  console.log(port)
})