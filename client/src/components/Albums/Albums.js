import React, { Component } from 'react'
import { connect } from 'react-redux'
import { albumPlay } from '../../actions/mainActions'

class Albums extends Component {
  render() {
    let albums = this.props.main.albums ? this.props.main.albums.map(album => {
      return (
        <div className="album"
          key={album.id}
          onClick={() => this.props.albumPlay(album.id, album.imageMedium)}
        >
          <div className="album-play-icon">
            <img src={album.image || 'http://via.placeholder.com/64x64'} className="image" alt={album.name} />
            <div className="middle">
              <i className="play-icon fa fa-play-circle"></i>
            </div>
          </div>
          <h4>{album.name.length > 20 ? `${album.name.substring(0, 20).trim()}...` : album.name}</h4>
        </div>
      )
    }) : null
    return (
      <div className="album-container" >
        {this.props.main.albums && albums}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { albumPlay })(Albums)