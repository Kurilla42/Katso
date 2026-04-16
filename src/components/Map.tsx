'use client';

import { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    // Don't do anything if the container is not rendered or if the map is already there.
    // The Yandex script creates a `ymaps` element.
    if (!mapContainer || mapContainer.querySelector('ymaps')) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A14c480810c5924650cc12d101ab70dff0dc165c1de66b9a77d5fb6a18e4d09a5&width=100%&height=100%&lang=ru_RU&scroll=true';

    mapContainer.appendChild(script);

  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default Map;
