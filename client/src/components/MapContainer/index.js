import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../InitialMap'
import { showInfowindow } from '../../actions/mainActions'

class MapContainer extends React.Component {
  onToggleOpen = (markerId) => {
    this.props.showInfo(markerId)
  }

  render() {
    return (
      <div style={{ height: "21rem",bottom: 0 }}>
        <InitialMap
          containerElement={
            <div style={{ height: 'auto', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '21rem' }} />
          }
          markers={this.props.main.venues}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.onToggleOpen}
          onMarkerClose={this.onToggleOpen}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, { showInfowindow })(MapContainer)