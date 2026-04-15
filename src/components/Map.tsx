'use client';

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const lng = 28.8593;
  const lat = 47.0211;
  const zoom = 14;

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once
    
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
        if (mapContainer.current) {
            mapContainer.current.innerHTML = '<div class="w-full h-full bg-gray-700 flex items-center justify-center text-center text-textLightMuted p-4">Map cannot be displayed. <br/>Mapbox token missing.</div>'
        }
        return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      interactive: false, // Make map non-interactive
    });

    // Create a custom marker element
    const el = document.createElement('div');
    el.className = 'w-4 h-4 rounded-full shadow-lg';
    el.style.backgroundColor = '#E8683A'; // colors.orange
    el.style.outline = '3px solid rgba(232, 104, 58, 0.4)';
    
    // Add marker to the map
    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Clean up on unmount
    return () => map.current?.remove();
  }, [lng, lat, zoom]);

  return <div ref={mapContainer} className="absolute inset-0 w-full h-full" />;
};

export default Map;
