import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../InitialMap'
import { showInfowindow, closeAllInfowindow } from '../../actions/mainActions'
const key = require('../../config/keys').googleKey

class MapContainer extends React.Component {
  onToggleOpen = (markerId) => {
    this.props.showInfowindow(markerId)
  }
  handleMapClick = () => {
    this.props.closeAllInfowindow()
  }

  render() {
    return (
      <div style={{ height: "43vmin" }}>
        <InitialMap
          containerElement={
            <div style={{ height: 'auto', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '43vmin' }} />
          }
          markers={this.props.main.venues}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.onToggleOpen}
          onMarkerClose={this.onToggleOpen}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { showInfowindow, closeAllInfowindow })(MapContainer)