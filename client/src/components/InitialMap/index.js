import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker , InfoWindow } from "react-google-maps"
// import aubergineMode from '../../assets/aubergine-theme.json'
// import darkMode from '../../assets/dark-theme.json'
import nightMode from '../../assets/night-theme.json'

export const InitialMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={2}
    defaultCenter={{ lat: 49.2193, lng: -122.5984 }}
    onClick={props.onMapClick}
    defaultOptions={{styles: nightMode}}
  >
    {props.markers.map((marker)=> {
      let venues = {
          lat: Number(marker.venue.latitude),
          lng: Number(marker.venue.longitude)
      }
      return (<Marker
            key={marker.id}
            position={venues}
            onClick={()=> props.onMarkerClick(marker)}
        >
            {marker.showInfo && (
                <InfoWindow onCloseClick={()=> props.onMarkerClose(marker)}>
                  {
                    <div>info</div>
                  }
                </InfoWindow>
            )}
        </Marker>
      )
    })}
  </GoogleMap>
))