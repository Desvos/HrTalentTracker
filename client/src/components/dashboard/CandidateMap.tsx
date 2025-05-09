import { useEffect, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Candidate } from '@shared/schema';
import { getTalentHotspots } from '@/lib/data';

interface CandidateMapProps {
  candidates: Candidate[];
}

const CandidateMap = ({ candidates }: CandidateMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Initialize map if not already initialized
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([37.0902, -95.7129], 4);
      
      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }
    
    const map = mapRef.current;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });
    
    // Add candidate markers
    candidates.forEach(candidate => {
      const { latitude, longitude } = candidate.currentLocation;
      
      const marker = L.circleMarker([latitude, longitude], {
        radius: 6,
        fillColor: '#f5222d',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-2">
          <div class="font-bold">${candidate.name}</div>
          <div>${candidate.role}</div>
          <div>${candidate.currentLocation.city}, ${candidate.currentLocation.country}</div>
        </div>
      `);
    });
    
    // Calculate and add talent hotspots
    const hotspots = getTalentHotspots(candidates);
    
    hotspots.forEach(hotspot => {
      const { latitude, longitude } = hotspot.location;
      
      // Create hotspot marker
      const marker = L.circleMarker([latitude, longitude], {
        radius: Math.min(15, 10 + hotspot.count / 5),
        fillColor: '#1890ff',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
      
      // Add count label
      const icon = L.divIcon({
        html: `<div style="color: white; font-weight: bold; font-size: 12px;">${hotspot.count}</div>`,
        className: 'hotspot-label',
        iconSize: [20, 20]
      });
      
      L.marker([latitude, longitude], { icon }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-2">
          <div class="font-bold">${hotspot.name}</div>
          <div>${hotspot.count} Candidates</div>
          <div>${hotspot.location.city}, ${hotspot.location.country}</div>
        </div>
      `);
    });
    
    // Clean up on unmount
    return () => {
      // Don't destroy the map, just clear the markers
    };
  }, [candidates]);
  
  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

export default CandidateMap;
