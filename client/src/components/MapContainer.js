import React, { Component } from 'react'
import { InfoWindow, Map, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }

        this.onMarkerClick = this.onMarkerClick.bind(this)
        this.onMapClicked = this.onMapClicked.bind(this)
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {

        let venuesJSX = this.props.venues.map((venue, i) => {
            return <Marker
                key={i}
                onClick={this.onMarkerClick}
                name={`${this.props.artist} : ${venue.venue.name}, ${venue.venue.city}, ${venue.venue.region} / ${venue.datetime}`}
                position={{
                    lat: venue.venue.latitude,
                    lng: venue.venue.longitude
                }} />
        })

        return (
            <Map
                onClick={this.onMapClicked}
                google={this.props.google}
                initialCenter={{
                    lat: 49.2193,
                    lng: -122.5984
                }}
                zoom={2}
            >
                {venuesJSX}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h6>{this.state.selectedPlace.name}</h6>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBueuJmNRip2MkzMbQUwjQlHB0OwvelP0'
})(MapContainer)