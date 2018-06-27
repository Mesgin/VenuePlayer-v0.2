import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(function Albums(props) {
  let albums = props.albums.length > 0
    ? props.albums.map(album => {
      return (
        <div className="album"
          key={album.id}
          onClick={() => props.albumPlay(album.id, album.imageMedium)}
        >
          <div className="album-play-icon">
            <img src={album.image || 'https://via.placeholder.com/64x64'}
              className="image"
              alt={album.name}
            />
            <div className="middle">
              <i className="play-icon fa fa-play-circle"></i>
            </div>
          </div>
          <p>{album.name.length > 20
            ? `${album.name.substring(0, 20).trim()}.. (${parseInt(album.release, 10)})`
            : `${album.name} (${parseInt(album.release, 10)})`}
          </p>
        </div>
      )
    })
    : null

  return (
    <div>
      <div className="albums-back-link">
        <a onClick={props.history.goBack} ><i className="fa fa-chevron-left"></i></a>
      </div>
      <div className="album-container">
        {albums}
      </div>
    </div>
  )
})