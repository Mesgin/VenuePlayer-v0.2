import React, { Component } from 'react'
import { connect } from 'react-redux'
import { artistClick } from '../../actions/mainActions'

class Artist extends Component {
  render() {
    let artistsContent = this.props.main.artists.map(artist => {
        let imageSmall = 
        artist.images.length > 0 
        ? 
        artist.images[2].url 
        : 
        'http://via.placeholder.com/64x64'

        let imageMedium = 
        artist.images.length > 0 
        ? 
        artist.images[1].url 
        : 
        'http://via.placeholder.com/260x260'
        
        return (
          <div key={artist.id} className="artist">
            <div 
            className="artist-icon"
            onClick={() => this.props.artistClick(imageMedium, artist.id, artist.name)}
            >
              <img className="image"
                src={imageSmall}
                alt={artist.name} />
              <div className="middle">
                <i className="map-icon fa fa-map-marker"></i>
              </div>
            </div>
            <h4>{artist.name}</h4>
          </div>
        )
      })
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