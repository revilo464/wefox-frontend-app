import React from 'react'
import { GoogleMap } from '@react-google-maps/api'

type GoogleMapViewProps = {
  identifier: number | undefined,
  lat: number,
  long: number,
}

const GoogleMapView = ({identifier, lat, long}: GoogleMapViewProps) => (
  
    <GoogleMap
      id={(identifier ? identifier : 'default') + '-map'}
      mapContainerStyle={{
        height: "400px",
        width: "500px",
        display: "inline-block"
      }}
      zoom={9}
      center={{
        lat: lat,
        lng: long
      }}
    >
    </GoogleMap>
);

export default GoogleMapView;
