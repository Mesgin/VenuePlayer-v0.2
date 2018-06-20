import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MapContainer from '../MapContainer/index'
import { albumButtonClick } from '../../actions/mainActions'

class Artist extends Component {
  render() {
    // let genres = this.props.main.genres.slice(0, 3).map(genre => <div><h5>{genre}</h5></div>)

    return (
      <div>
        <div className="single-artist-container">
          <div className="single-artist">
            <div className="left">
              <Link to='/'><i className="fa fa-chevron-left"></i></Link>
            </div>
            <div className="between">
              <div >
                <img src={this.props.main.img} alt="artist" className="single-artist-img" />
              </div>
            </div>
            <div className="right">
              <div>
                <h1>{this.props.main.artist}</h1>
              </div>
              <Link to={`/albums/${this.props.main.artist}`}>
                <button
                  type="button"
                  className="artist-buttons-albums"
                  onClick={() => this.props.albumButtonClick(this.props.main.artistId)}>
                  Albums
            </button>
              </Link>
              {/* <div className="genres">
                  <h4>Genres:</h4>
                  {genres}
                </div> */}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps,{ albumButtonClick })(Artist)