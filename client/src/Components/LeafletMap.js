import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LeafletMap = () => {
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const MapClickHandler = () => {
    useMapEvent('click', (event) => {
      setMarkerPosition([event.latlng.lat, event.latlng.lng]);
    });
    return null;
  };

  const SetViewOnClick = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition}>
          <Popup>
            Your location
          </Popup>
        </Marker>
        <MapClickHandler />
        <SetViewOnClick coords={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
