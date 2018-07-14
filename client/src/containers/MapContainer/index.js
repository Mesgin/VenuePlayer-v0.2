import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../../components/InitialMap'
import { showInfowindow, closeAllInfowindow } from '../../actions/mainActions'
//'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
// AIzaSyBEqx4bSzvD2bcHquhlFAJ5c5KHIVybI9o

class MapContainer extends React.Component {
  onToggleOpen = (markerId) => {
    this.props.showInfowindow(markerId)
  }
  handleMapClick = () => {
    this.props.closeAllInfowindow()
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <InitialMap
          containerElement={
            <div style={{ height: 'auto', width: 'auto' }} />
          }
          mapElement={
            <div style={{ height: '60vh' }} />
          }
          markers={this.props.main.venues}
          onMapClick={this.handleMapClick}
          onMarkerClick={this.onToggleOpen}
          onMarkerClose={this.onToggleOpen}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyACbcbCWUrYd3lW1W7cHAGGWWcyTQU39zw&v=3.32&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  showInfowindow,
  closeAllInfowindow
}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)