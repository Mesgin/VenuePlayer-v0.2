import React from 'react'
import { InitialMap } from '../InitialMap'

export default class MapContainer extends React.Component {
  render() {
    return (
        <div style={{height:"100%"}}>
          <InitialMap
            containerElement={
              <div style={{height:'100vh',width:'auto'}} />
            }
            mapElement={
              <div style={{height:'100vh',width:'100vw'}} />
            }
            markers={this.props.markers}
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