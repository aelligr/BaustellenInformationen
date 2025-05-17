import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OSMMapWithPolygon = ({ data }) => {

  const geoJson = typeof data === 'string' ? JSON.parse(data) : data;

  const coordinates = geoJson?.geometry?.coordinates;

  // Für Kartenausschnitt immer erstes Punktpaar nehmen
  const firstCoord = Array.isArray(coordinates?.[0])
    ? (Array.isArray(coordinates[0][0]) ? coordinates[0][0] : coordinates[0]) // Polygon vs LineString
    : null;

  // [lat, lon] Reihenfolge für Leaflet beachten
  const position = firstCoord ? [firstCoord[1], firstCoord[0]] : [46.93847, 7.43129];

  return (
    <MapContainer center={position} zoom={17} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={geoJson}
        style={{
          color: 'red',
          fillColor: 'red',
          fillOpacity: 1,
          weight: 3
        }}
      />
    </MapContainer>
  );
};

export default OSMMapWithPolygon;