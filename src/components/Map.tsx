'use client';

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { colors } from '@/lib/design-tokens';
import { PlusMarker } from '@/components/ui/PlusMarker';

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
            mapContainer.current.innerHTML = `<div class="w-full h-full bg-border flex items-center justify-center text-center text-textDarkMuted p-4">Map cannot be displayed. <br/>Mapbox token missing.</div>`
        }
        return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      interactive: false, // Make map non-interactive
    });

    // Create a custom marker element
    const el = document.createElement('div');
    el.className = 'w-4 h-4 rounded-full shadow-lg';
    el.style.backgroundColor = colors.accent;
    el.style.outline = `3px solid ${colors.accent}66`; // 40% opacity
    
    // Add marker to the map
    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Clean up on unmount
    return () => map.current?.remove();
  }, [lng, lat, zoom]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      <PlusMarker className="top-2 left-2" colorClassName="text-textDark/30" />
      <PlusMarker className="top-2 right-2" colorClassName="text-textDark/30" />
      <PlusMarker className="bottom-2 left-2" colorClassName="text-textDark/30" />
      <PlusMarker className="bottom-2 right-2" colorClassName="text-textDark/30" />
    </div>
  );
};

export default Map;
