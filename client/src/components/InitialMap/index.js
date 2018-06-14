import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"
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
      console.log('ini', marker.id);

      return (<Marker
        key={marker.id}
        position={venue}
        onClick={() => props.onMarkerClick(marker.id)}
      >
        {marker.showInfo &&
          <InfoBox
            onCloseClick={() => props.onMarkerClose(marker.id)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}

          >
            <div style={{ height: '100px', width: '150px', color: 'black', opacity: 0.85, padding: `12px`, backgroundColor: 'white' }}>
              <div style={{ height: '100%', width: '100%', fontSize: `16px`, fontColor: `#08233B` }}>
                <h2>{marker.lineup[0]}</h2>
                <p><strong>Location:</strong> {marker.venue.country} - {marker.venue.city}</p>
                <p><strong>Venue:</strong> {marker.venue.name}</p>
                <p><strong>Date:</strong> {marker.datetime}</p>
              </div>
            </div>
          </InfoBox>
        }
      </Marker>
      )
    })}
  </GoogleMap>
))