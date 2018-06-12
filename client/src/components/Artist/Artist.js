import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { artistClick } from '../../actions/mainActions'

class Artist extends Component {
  render() {
    let artistsContent = this.props.main.artists.length > 0 ?
      this.props.main.artists.map(artist => {
        return (
          <div key={artist.id} className="artist">
            <div 
            className="artist-icon"
            onClick={() => this.props.artistClick(artist.images[1].url, artist.id, artist.name)}
            >
              <img className="image"
                src={(artist.images.length > 0 && artist.images[2].url) || 'http://via.placeholder.com/64x64'}
                style={{ width: 64, height: 64 }}
                alt={artist.name} />
              <div className="middle">
                <i className="map-icon fa fa-map-marker"></i>
              </div>
            </div>
            <h4>{artist.name}</h4>
          </div>
        )
      }) : null
    return (
      <div className="artist-container">
        {artistsContent}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { artistClick })(Artist)