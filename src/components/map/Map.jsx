import React from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import s from './Map.module.css';
import { defaultTheme } from './theme'

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};


const Map = ({ center }) => {

  const [markers, setMarkers] = React.useState([]);

  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={(event) =>
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ])
        }
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            title="yo man!"
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {setSelected(null)}}>
            <div>
              <h2>your point</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};
 export default Map;