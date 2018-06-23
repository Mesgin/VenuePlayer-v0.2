import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../InitialMap'
import { showInfowindow, closeAllInfowindow } from '../../actions/mainActions'
const key = process.env.NODE_ENV === 'production' 
? require('../../config/keys').googleKey
: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'


class MapContainer extends React.Component {
  onToggleOpen = (markerId) => {
    this.props.showInfowindow(markerId)
  }
  handleMapClick = () => {
    this.props.closeAllInfowindow()
  }

  render() {
    return (
      <div style={{ height: "50vmin" }}>
        <InitialMap
          containerElement={
            <div style={{ height: 'auto', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '50vmin' }} />
          }
          markers={this.props.main.venues}
          onMapClick={this.handleMapClick}
          onMarkerClick={this.onToggleOpen}
          onMarkerClose={this.onToggleOpen}
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