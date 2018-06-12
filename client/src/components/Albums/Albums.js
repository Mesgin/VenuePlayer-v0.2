import React, { Component } from 'react'
import { connect } from 'react-redux'
import { albumPlay } from '../../actions/mainActions'

class Albums extends Component {
  render() {
    let albums = this.props.main.albums ? this.props.main.albums.map(album => {
      return (
        <div className="album" key={album.id}>
          <div className="album-play-icon">
            <img src={album.image} className="image" alt={album.name} />
            <div className="middle" onClick={() => this.props.albumPlay(album.id)}>
              <i className="play-icon fa fa-play-circle"></i>
            </div>
          </div>
          <h5>{album.name.length > 20 ? `${album.name.substring(0, 20).trim()}...` : album.name}</h5>
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