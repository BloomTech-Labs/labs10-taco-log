import React from 'react';
import map from './Components/map.js';

<Map
  id="tacoMap"
  options={{
    center: { lat: 41.0082, lng: 28.9784 },
    zoom: 8
  }}
  onMapLoad={map => {
    let marker = new window.google.maps.Marker({
      position: { lat: 41.0082, lng: 28.9784 },
      map: map,
      title: 'Testing map'
    });
  }}
/>

export default mapPage;
