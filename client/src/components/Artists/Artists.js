import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { artistClick, albumButtonClick, searchArtist } from '../../actions/mainActions'

class Artists extends Component {
  constructor() {
    super()

    this.state = {
      textValue: null
    }
  }

  textHandler = (e) => {
    this.props.searchArtist(e.target.value)
    this.setState({
      textValue: e.target.value
    })
  }

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
          <Link to={`/artist/${artist.name}`}>
            <div
              className="artist-icon"
              onClick={() => this.props.artistClick(artist.id, imageMedium, artist.name, artist.genres)}
            >
              <img className="image"
                src={imageSmall}
                alt={artist.name} />
              <div className="middle">
                <i className="map-icon fa fa-map-marker"></i>
              </div>
            </div>
          </Link>
          <Link to={`/artist/${artist.name}`}>
            <div
              className="artist-text"
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.artistClick(artist.id, imageMedium, artist.name, artist.genres)} >
              <p>{artist.name}</p>
            </div>
          </Link>
          <div className="artist-buttons">
            <Link to={`/albums/${artist.name}`}>
              <button
                type="button"
                className="artist-buttons-albums"
                onClick={() => this.props.albumButtonClick(artist.id)}>
                Albums
            </button>
            </Link>
          </div>
        </div>
      )
    })
    return (
      <div>
        <input
          placeholder="Search Artist"
          type="text"
          onChange={this.textHandler}
          className="search-input"
        />
        <div className="artist-container">
          {artistsContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { artistClick, albumButtonClick, searchArtist })(Artists)