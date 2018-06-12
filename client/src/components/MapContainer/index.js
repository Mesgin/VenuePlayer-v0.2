import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../InitialMap'

class MapContainer extends React.Component {
  render() {
    let venuesJSX = this.props.main.venues.map((venue) => {
      return {
        position: {
          lat: Number(venue.venue.latitude),
          lng: Number(venue.venue.longitude)
        }
      }
    })
    return (
      <div style={{ height: "100%" }}>
        <InitialMap
          containerElement={
            <div style={{ height: '100vh', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '100vh', width: '100vw' }} />
          }
          markers={venuesJSX}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
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

export default connect(mapStateToProps)(MapContainer)