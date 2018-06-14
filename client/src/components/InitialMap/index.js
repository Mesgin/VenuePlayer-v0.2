import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import aubergineMode from '../../assets/aubergine-theme.json'
// import darkMode from '../../assets/dark-theme.json'
// import nightMode from '../../assets/night-theme.json'

export const InitialMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 49.2193, lng: -122.5984 }}
    onClick={props.onMapClick}
    defaultOptions={{ styles: aubergineMode }}
  >
    {props.markers.map((marker) => {
      let venue = {
        lat: Number(marker.venue.latitude),
        lng: Number(marker.venue.longitude)
      }

      return (<Marker
        key={marker.id}
        position={venue}
        onClick={() => props.onMarkerClick(marker.id)}
      >
        {marker.showInfo &&
          <InfoWindow
            onCloseClick={() => props.onMarkerClose(marker.id)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}

          >
            <div style={{  color: 'black', opacity: 0.85, margin: '1px', backgroundColor: 'white' }}>
              <div style={{ height: '100%', width: '100%', fontSize: `16px`, fontColor: `#08233B`}}>
                <h3>{marker.lineup[0]}</h3>
                <p><strong>Location:</strong> {marker.venue.country} - {marker.venue.city}</p>
                <p><strong>Venue:</strong> {marker.venue.name}</p>
                <p><strong>Date:</strong> {marker.datetime}</p>
              </div>
            </div>
          </InfoWindow>
        }
      </Marker>
      )
    })}
    <InfoWindow
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            // position={{ lat: 25.03, lng: 121.6 }}
            defaultPosition={{lat: 49.2193, lng: -122.5984}}

            >
                        <div style={{  color: 'black', opacity: 0.85, margin: '1px', backgroundColor: 'white' }}>
              <div style={{ height: '100%', width: '100%', fontSize: `16px`, fontColor: `#08233B`}}>
                <h3>Hello</h3>
                {/* <p><strong>Location:</strong> {marker.venue.country} - {marker.venue.city}</p>
                <p><strong>Venue:</strong> {marker.venue.name}</p>
                <p><strong>Date:</strong> {marker.datetime}</p> */}
              </div>
            </div>

    </InfoWindow>
  </GoogleMap>
))