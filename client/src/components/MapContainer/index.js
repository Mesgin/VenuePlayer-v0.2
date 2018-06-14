import React from 'react'
import { connect } from 'react-redux'
import { InitialMap } from '../InitialMap'
import { showInfowindow } from '../../actions/mainActions'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMarkerShown: false
    }
  }

  onToggleOpen = (markerId) => {
    console.log('hio',markerId);
    // this.setState({
    //   isMarkerShown: !this.props.main.venues.filter(venue => venue.id === markerId)[0].showInfo
    // })

    // let shi = this.props.main.venues.filter(venue => venue.id === markerId)[0].showInfo
    // this.props.main.venues.filter(venue => venue.id === markerId)[0].showInfo = !shi
    this.props.showInfo(markerId)
    console.log();
    
    // this.setState({
    //   isMarkerShown: !this.state.isMarkerShown
    // })
  }

  // onMarkerClick = (markerId) => {
  //   this.setState({
  //     markers: 
  //   })
  //   this.props.showInfo(markerId)
  // }
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