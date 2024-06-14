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

const LeafletMap = ({ onPositionChange }) => {
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          const locationData = await getLocationName(latitude, longitude);
          setLocationName(locationData.display_name);
          onPositionChange([latitude, longitude, locationData.display_name]); // Update parent component with location name
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getLocationName = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
    const data = await response.json();
    return data;
  };

  const MapClickHandler = () => {
    useMapEvent('click', async (event) => {
      const newMarkerPosition = [event.latlng.lat, event.latlng.lng];
      setMarkerPosition(newMarkerPosition);
      setMapCenter(newMarkerPosition);
      const locationData = await getLocationName(event.latlng.lat, event.latlng.lng);
      setLocationName(locationData.display_name);
      onPositionChange([...newMarkerPosition, locationData.display_name]); // Update parent component with location name
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
            {locationName ? locationName : `Latitude: ${markerPosition[0]}, Longitude: ${markerPosition[1]}`}
          </Popup>
        </Marker>
        <MapClickHandler />
        <SetViewOnClick coords={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
