import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OSMMapWithAllPolygons = ({ projekte }) => {
  const mapRef = useRef();
  const navigate = useNavigate();

  // Alle Features extrahieren und zu einer FeatureCollection zusammenführen
  const allFeatures = projekte
    .map(p => {
      try {
        return JSON.parse(p.geoJsonData);
      } catch (e) {
        console.error('Invalid geoJsonData in project:', p.id);
        return null;
      }
    })
    .filter(f => f !== null);

  const featureCollection = {
    type: 'FeatureCollection',
    features: allFeatures
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        const nummer = feature.properties?.PROJEKTNUM;
        if (nummer) {
          navigate(`/details/${nummer}`);
        }
      }
    });
  };



  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const layer = L.geoJSON(featureCollection);
    map.fitBounds(layer.getBounds());
  }, [featureCollection]);

  return (
    <MapContainer
      center={[46.94809, 7.44744]} // Fallback: Bern
      zoom={8}
      style={{ height: '600px', width: '100%' }}
      whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={featureCollection}
        style={{
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.7,
          weight: 2
        }}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default OSMMapWithAllPolygons;