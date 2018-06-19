import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MapContainer from '../MapContainer/index'

class Artist extends Component {
  render() {
    let countries = this.props.main.venues.reduce((obj, venue) => {
      if (!obj[venue.venue.country]) {
        obj[venue.venue.country] = 0
      }
      obj[venue.venue.country]++
      return obj
    }, {})
    let countriesJSX = Object.keys(countries).map((key) => {
      return (
        <div>
          <p>{key}: {countries[key]}</p>
        </div>
      )
    })
    // console.log(this.props.main.artists);
    
    // let art = this.props.main.artists.find(artist => artist.name === this.props.main.artist)


    // console.warn(art);
    let genres = this.props.main.genres.map(genre => <p>{genre}</p>)
    

    return (
      <div>
        <div>
          <img src={this.props.main.img} />
          <p>{this.props.main.artist}</p>
        </div>
        <div><p>Genres: {genres}</p></div>
        <div>
          <p>Total Concerts Found: {this.props.main.venues.length}</p>
        </div>
        <div>
          {countriesJSX}
        </div>
        <button>Albums</button>
        <Link to='/'> Back </Link>
        <div className="map">
          <MapContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps)(Artist)