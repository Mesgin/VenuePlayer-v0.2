import React from 'react'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MapContainer from '../../containers/MapContainer'

export default function Artist(props) {
  return (

    <div>
      <div className="single-artist-container">
        <ReactCSSTransitionGroup
          transitionName="artist-fade"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="single-artist">
            <div className="left">
              <Link to='/' onClick={props.backToArtists}><i className="fa fa-chevron-left"></i></Link>
            </div>
            <div className="between">
              <div >
                <img src={props.img || 'https://via.placeholder.com/200x200'} alt="artist" className="single-artist-img" />
              </div>
            </div>
            <div className="right">
              <div className="single-artist-title">
                <h1>{props.artist}</h1>
              </div>
              <Link to={`/albums/${props.artist}`}>
                <button
                  type="button"
                  className="artist-buttons-albums"
                  onClick={() => props.albumButtonClick(props.id)}>
                  Albums
            </button>
              </Link>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
      <div className="map">
        <MapContainer
          showInfowindow={props.showInfowindow}
          closeAllInfowindow={props.closeAllInfowindow} />
      </div>
    </div>
  )
}