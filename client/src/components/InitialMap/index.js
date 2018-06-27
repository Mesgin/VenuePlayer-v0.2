import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import aubergineMode from '../../assets/aubergine-theme.json'
// import darkMode from '../../assets/dark-theme.json'
// import nightMode from '../../assets/night-theme.json'

export const InitialMap = withScriptjs(withGoogleMap((props) => {

  let countries = props.markers.reduce((obj, venue) => {
    if (!obj[venue.venue.country]) {
      obj[venue.venue.country] = 0
    }
    obj[venue.venue.country]++
    return obj
  }, {})

  let countriesJSX = Object.keys(countries).map((key, i) => {
    return <div className="country" key={i}><h4>{key}: {countries[key]}</h4></div>
  })

  return (
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
            position={venue}
              onCloseClick={() => props.onMarkerClose(marker.id)}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div
                id="infowindow"
                style={{
                  color: 'black',
                  opacity: 0.9,
                  margin: '1px',
                  backgroundColor: 'white'
                }}>
                <div style={{height: '100%',width:'100%',fontSize:`1.1rem`,fontColor:`#08233B`}}>
                  <h3>{marker.lineup[0]}</h3>
                  <p><strong>Location:</strong> {marker.venue.country} - {marker.venue.city}</p>
                  <p><strong>Venue:</strong> {marker.venue.name}</p>
                  <p><strong>Date:</strong> {marker.datetime}</p>
                  <a
                    href={marker.url}
                    target="_blank"
                    style={{
                      textDecoration: 'none',
                      padding: '5px',
                      backgroundColor: 'rgba(50, 167, 112)',
                      color: 'white',
                      borderRadius: '5px',
                      border: 0,
                      margin: '15px auto 0 auto',
                      fontFamily: '"Source Sans Pro", sans-serif',
                      fontSize: '1.1rem',
                      display: 'block',
                      width: "10vw"
                    }}
                  >Buy Ticket</a></div>
              </div>
            </InfoWindow>
          }
        </Marker>
        )
      })}

      <InfoWindow
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
        position={{ lat: 25.848105, lng: -137.104127 }}
      >
        <div style={{ color: 'black', opacity: 0.85, margin: '1px', backgroundColor: 'white' }}>
          <div style={{ height: '50%', width: '100%', fontSize: `16px`, fontColor: `#08233B` }}>
            <div>
              <h3 style={{ color: '#015970' }}>Concerts Found: {props.markers.length}</h3>
            </div>
            {countriesJSX}
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  )
}
))