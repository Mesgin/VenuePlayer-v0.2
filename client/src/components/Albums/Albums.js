import React from 'react'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default function Albums(props) {
  let albums = props.albums.length > 0
    ? props.albums.map(album => {
      return (
        <div className="album"
          key={album.id}
          onClick={() => props.albumPlay(album.id, album.imageMedium)}
        >
          <div className="album-play-icon">
            <img src={album.image || 'https://via.placeholder.com/64x64'}
              className="icons-image"
              alt={album.name}
            />
            <div className="icons-middle">
              <i className="icons-play-icon fa fa-play-circle"></i>
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
      <div className="album-back-link">
        <Link to='/' onClick={props.backToArtists}><i className="fa fa-chevron-left"></i></Link>
      </div>
      <div className="album-container">
        <ReactCSSTransitionGroup
          transitionName="albums-fade"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={1}
          transitionAppear={true}
          transitionAppearTimeout={300}
        >
          {albums}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  )
}