import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const OSMMapWithAllPolygon = ({ features }) => {
  const navigate = useNavigate();

  const allCoords = features
    .map(f => f.geometry?.coordinates)
    .filter(Boolean)
    .map(coords => {
      const first = Array.isArray(coords[0][0]) ? coords[0][0] : coords[0];
      return [first[1], first[0]];
    });

  const center = allCoords.length > 0 ? allCoords[0] : [46.94809, 7.44744];

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        if (feature.projektnummer) {
          navigate(`/details/${feature.projektnummer}`);
        }
      }
    });
    layer.bindTooltip(feature.titel || feature.projektnummer || 'Details');
  };

  return (
    <MapContainer center={center} zoom={14} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {features.map((feature, idx) => (
        <GeoJSON
          key={idx}
          data={feature}
          style={{
            color: 'red',
            fillColor: 'red',
            fillOpacity: 1,
            weight: 10
          }}
          onEachFeature={onEachFeature}
        />
      ))}
    </MapContainer>
  );
};

export default OSMMapWithAllPolygon;