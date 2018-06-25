import React from 'react'
import { Link } from 'react-router-dom'
import MapContainer from '../../containers/MapContainer'

export default function Artist(props) {
  return (
    <div>
      <div className="single-artist-container">
        <div className="single-artist">
          <div className="left">
            <Link to='/'><i className="fa fa-chevron-left"></i></Link>
          </div>
          <div className="between">
            <div >
              <img src={props.img} alt="artist" className="single-artist-img" />
            </div>
          </div>
          <div className="right">
            <div>
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
      </div>
      <div className="map">
        <MapContainer
          showInfowindow={props.showInfowindow}
          closeAllInfowindow={props.closeAllInfowindow} />
      </div>
    </div>
  )
}