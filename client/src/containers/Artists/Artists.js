import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  artistClick,
  albumButtonClick,
  searchArtist
} from '../../actions/mainActions'

class Artists extends Component {

  textHandler = e => {
    this.props.searchArtist(e.target.value)
  }

  render() {
    let artistsContent = this.props.main.artists.map(artist => {
      let imageSmall =
        artist.images.length > 1
          ? artist.images[artist.images.length - 1].url
          : 'https://via.placeholder.com/64x64'

      let imageMedium =
        artist.images.length > 1
          ? artist.images[artist.images.length - 2].url
          : 'https://via.placeholder.com/260x260'

      return (
        <div key={artist.id} className="artist">
          <Link to={`/artist/${artist.name}`}>
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
          </Link>
          <Link to={`/artist/${artist.name}`}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => this.props.artistClick(artist.id, imageMedium, artist.name)} >
              <p>{artist.name.length > 20
                ? `${artist.name.substring(0, 20).trim()}..`
                : `${artist.name}`}
              </p>
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
          className={this.props.main.artists.length > 0
            ? "search-input-shrink"
            : "search-input"
          }
        />
        <div className="artist-container">
          <ReactCSSTransitionGroup
          transitionName="artists-fade"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={1}
          transitionAppear={true}
          transitionAppearTimeout={300}
          >
            {artistsContent}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  artistClick,
  albumButtonClick,
  searchArtist
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(Artists)