import React, { Component } from 'react'
import { connect } from 'react-redux'
import { artistClick, albumButtonClick } from '../../actions/mainActions'

class Artist extends Component {
  render() {
    let artistsContent = this.props.main.artists.map(artist => {
      let imageSmall =
        artist.images.length > 1
          ?
          artist.images[artist.images.length - 1].url
          :
          'http://via.placeholder.com/64x64'

      let imageMedium =
        artist.images.length > 1
          ?
          artist.images[artist.images.length - 2].url
          :
          'http://via.placeholder.com/260x260'

      return (
        <div key={artist.id} className="artist">
          <div
            className="artist-icon"
            onClick={() => this.props.artistClick(artist.id, imageMedium, artist.name)}
          >
            <img className="image"
              src={imageSmall}
              alt={artist.name} />
            <div className="middle">
              <i className="map-icon fa fa-map-marker"></i>
            </div>
          </div>
          <div
            className="artist-text"
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.artistClick(artist.id, imageMedium, artist.name)} >
            <p>{artist.name}</p>
          </div>
          <div className="artist-buttons">
            <button
              type="button"
              className="artist-buttons-albums"
              onClick={() => this.props.albumButtonClick(artist.id)}>
              Albums
            </button>
          </div>
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

export default connect(mapStateToProps, { artistClick, albumButtonClick })(Artist)