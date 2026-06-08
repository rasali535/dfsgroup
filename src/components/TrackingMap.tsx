"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const truckIcon = new L.DivIcon({
  className: 'custom-truck-icon',
  html: `<div style="background-color: #0B1F3A; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-9h-4v9h-1"/><path d="M15 6h4l3 3v5h-7V6z"/><circle cx="8" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface TrackingMapProps {
  origin: string;
  destination: string;
  statusIndex: number;
}

// Very basic mapping for the 3 demo shipments
const MOCK_COORDS: Record<string, [number, number]> = {
  "Johannesburg, ZA": [-26.2041, 28.0473],
  "Gaborone, BW": [-24.6282, 25.9231],
  "Lusaka, ZM": [-15.3875, 28.3228],
  "Harare, ZW": [-17.8216, 31.0492],
  "Pretoria, ZA": [-25.7479, 28.2293],
  "Maputo, MZ": [-25.9692, 32.5732],
};

export default function TrackingMap({ origin, destination, statusIndex }: TrackingMapProps) {
  // Use explicit coordinates, fallback to JHB -> GBE
  const start = MOCK_COORDS[origin] || [-26.2041, 28.0473];
  const end = MOCK_COORDS[destination] || [-24.6282, 25.9231];

  // Calculate current vehicle position based on status index (0 to 7)
  // If status is Booked/Received (0,1), it's at start.
  // If status is Delivered (7), it's at end.
  // Otherwise interpolate.
  let progress = 0;
  if (statusIndex >= 7) progress = 1;
  else if (statusIndex <= 1) progress = 0;
  else {
    // Indices 2,3,4,5,6 scale from 0 to 1
    progress = (statusIndex - 1) / 6;
  }

  const currentPos: [number, number] = [
    start[0] + (end[0] - start[0]) * progress,
    start[1] + (end[1] - start[1]) * progress,
  ];

  // Map center logic
  const center: [number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ];

  return (
    <div className="h-64 sm:h-96 w-full z-0">
      <MapContainer center={center} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <Polyline positions={[start, end]} color="#D4A017" weight={3} dashArray="5, 10" />
        
        <Marker position={start} icon={customIcon}>
          <Popup><strong>Origin</strong><br/>{origin}</Popup>
        </Marker>
        
        <Marker position={end} icon={customIcon}>
          <Popup><strong>Destination</strong><br/>{destination}</Popup>
        </Marker>

        {progress > 0 && progress < 1 && (
          <Marker position={currentPos} icon={truckIcon}>
            <Popup><strong>Current Location</strong><br/>In Transit</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
