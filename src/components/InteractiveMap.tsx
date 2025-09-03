/**
 * InteractiveMap Component
 * 
 * Professional interactive map with property & amenities
 * Uses Mapbox GL JS with 3D terrain, custom markers & legend.
 */

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Layers } from 'lucide-react';

interface MapProps {
  className?: string;
  showControls?: boolean;
}

const InteractiveMap: React.FC<MapProps> = ({ className = '', showControls = true }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const token =
    'sk.eyJ1IjoiZ29sZGVucG9wcHkiLCJhIjoiY21mM3dwOTd3MDE0czJxczZvNnE1aGtmdSJ9.KgOJSJQPLIEhZ6IauVVKUA';

  const locations = [
    {
      coords: [-68.4565, 18.4206],
      title: 'Villa Du Cacique 31',
      desc: 'Luxury villa at Av. El Cacique, Casa de Campo',
      color: '#C8A15F',
    },
    {
      coords: [-68.9120, 18.4507],
      title: 'La Romana International Airport (LRM)',
      desc: 'Private & commercial connections',
      color: '#ef4444',
    },
    {
      coords: [-68.8875, 18.4210],
      title: 'Teeth of the Dog Golf Course',
      desc: 'World-class golf, oceanfront views',
      color: '#22c55e',
    },
    {
      coords: [-68.8895, 18.4165],
      title: 'Casa de Campo Equestrian Center',
      desc: 'Equestrian facilities & polo',
      color: '#f59e0b',
    },
    {
      coords: [-68.8845, 18.4185],
      title: 'Casa de Campo Racquet Center',
      desc: 'Tennis and racquet sports',
      color: '#8b5cf6',
    },
    {
      coords: [-68.8830, 18.4180],
      title: 'Casa de Campo Marina',
      desc: 'Full-service marina & leisure',
      color: '#3b82f6',
    },
    {
      coords: [-68.8890, 18.4150],
      title: 'Minitas Beach Club & Restaurant',
      desc: 'Exclusive beach & fine dining',
      color: '#f97316',
    },
  ];

  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-68.4565, 18.4206],
      zoom: 13,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
    });

    if (showControls) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    }

    map.current.on('load', () => {
      setMapLoaded(true);

      // 3D terrain
      map.current!.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      map.current!.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Markers
      locations.forEach((loc) => {
        new mapboxgl.Marker({ color: loc.color, scale: 1 })
          .setLngLat(loc.coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${loc.title}</h3><p>${loc.desc}</p>`))
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full min-h-[400px]" />

      {!mapLoaded && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={16} className="text-accent" />
          <span className="text-sm font-medium">Legend</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#C8A15F]"></div><span>Villa Du Cacique 31</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span>Golf Course</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Marina</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div><span>Equestrian / Beach</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span>Shopping / Racquet</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Airport</span></div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
