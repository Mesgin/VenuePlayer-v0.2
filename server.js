const express = require('express')
const app = express()
const fs = require('fs')
const mm = require('musicmetadata')
const request = require('request')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

function Song(source, title, artist, description, img, id) {
    this.source = source
    this.title = title
    this.artist = artist
    this.description = description
    this.img = img
    this.id = id
}

const songs = [
    new Song('/upstep.mp3', 'Under The Sun', 'Bryan Adams', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm','./bryan-adams.jpg' ,0),
    new Song('/upstep.mp3', 'Uptown Funk', 'Bruno Mars', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', './bruno-mars.jpg', 1),
    new Song('/olympian.mp3', 'Irreplaceable', 'Beyonce', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm','./beyonce.png' ,2),
    new Song('/transmission.mp3', 'Raise Your Glass', 'Pink', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', './pink.jpeg', 3),
    new Song('/olympian.mp3', 'Someone Like You', 'Adele', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm','./adele.jpg' ,4),
    new Song('/transmission.mp3', 'Dream of You', 'Schiller', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', './schiller.png', 5)
]

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.get('/',(req,res)=>{
    res.json(songs)
})

app.post('/',(req,res)=>{
    const {artist} = req.body
    request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=c74a852c1481cfb7e5cda8c42adc7ff0`, (err, response, data) => {
        const dataObject = JSON.parse(data)
        if (err) console.log(err)
        res.json(dataObject)
    })
})

app.listen(8080,()=>{
    console.log(8080)
})