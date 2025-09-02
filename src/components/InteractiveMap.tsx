/**
 * InteractiveMap Component
 * 
 * Professional interactive map showing property location and nearby amenities
 * Uses Mapbox GL JS for rich interactivity
 */

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Layers, Navigation } from 'lucide-react';

interface MapProps {
  className?: string;
  showControls?: boolean;
  propertyLocation?: [number, number]; // [lng, lat]
  amenities?: Array<{
    name: string;
    coordinates: [number, number];
    type: 'golf' | 'marina' | 'dining' | 'shopping' | 'airport';
  }>;
}

const InteractiveMap: React.FC<MapProps> = ({
  className = '',
  showControls = true,
  propertyLocation = [-68.8877, 18.4206], // Casa de Campo coordinates
  amenities = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userToken, setUserToken] = useState('pk.eyJ1IjoiZ29sZGVucG9wcHkiLCJhIjoiY21laWxmY3E5MDNrczJtczh2NGlqeml6cSJ9.BE8wGAFzHo2UwkVrhCX2WA');
  const [showTokenInput, setShowTokenInput] = useState(false);

  const defaultAmenities = [
    {
      name: 'Teeth of the Dog Golf Course',
      coordinates: [-68.8875, 18.4210] as [number, number],
      type: 'golf' as const
    },
    {
      name: 'Casa de Campo Marina',
      coordinates: [-68.8830, 18.4180] as [number, number],
      type: 'marina' as const
    },
    {
      name: 'La Romana Airport',
      coordinates: [-68.9120, 18.4507] as [number, number],
      type: 'airport' as const
    },
    {
      name: 'Casa de Campo Village',
      coordinates: [-68.8860, 18.4195] as [number, number],
      type: 'shopping' as const
    }
  ];

  const allAmenities = amenities.length > 0 ? amenities : defaultAmenities;

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = userToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: propertyLocation,
      zoom: 13,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    // Add navigation controls
    if (showControls) {
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.addControl(
        new mapboxgl.FullscreenControl(),
        'top-right'
      );
    }

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add 3D buildings
      if (map.current?.getLayer('building')) {
        map.current.setLayoutProperty('building', 'visibility', 'visible');
        map.current.setPaintProperty('building', 'fill-extrusion-opacity', 0.6);
      }

      // Add property marker
      const propertyMarker = new mapboxgl.Marker({
        color: '#C8A15F',
        scale: 1.2
      })
        .setLngLat(propertyLocation)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3>31 Cacique - Villa Du Cacique</h3><p>Luxury villa with golf frontage</p>'))
        .addTo(map.current!);

      // Add amenity markers
      allAmenities.forEach((amenity) => {
        const color = getAmenityColor(amenity.type);
        
        new mapboxgl.Marker({
          color: color,
          scale: 0.8
        })
          .setLngLat(amenity.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${amenity.name}</h4><p>${getAmenityDescription(amenity.type)}</p>`))
          .addTo(map.current!);
      });

      // Add terrain
      map.current!.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.current!.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  };

  const getAmenityColor = (type: string): string => {
    const colors = {
      golf: '#22c55e',
      marina: '#3b82f6',
      dining: '#f59e0b',
      shopping: '#8b5cf6',
      airport: '#ef4444'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getAmenityDescription = (type: string): string => {
    const descriptions = {
      golf: 'World-class golf course',
      marina: 'Full-service marina',
      dining: 'Fine dining establishments',
      shopping: 'Luxury shopping and services',
      airport: 'Private and commercial flights'
    };
    return descriptions[type as keyof typeof descriptions] || 'Point of interest';
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userToken.trim()) {
      setShowTokenInput(false);
      initializeMap(userToken);
    }
  };

  useEffect(() => {
    // Initialize map with provided token on mount
    initializeMap(userToken);
    
    // Cleanup on unmount
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className={`relative bg-muted rounded-lg overflow-hidden ${className}`}>
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-md">
            <MapPin size={48} className="text-accent mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Interactive Property Map</h4>
            <p className="text-muted-foreground text-sm mb-6">
              To view the interactive map, please enter your Mapbox access token. 
              Get yours free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">mapbox.com</a>
            </p>
            
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <input
                type="text"
                value={userToken}
                onChange={(e) => setUserToken(e.target.value)}
                placeholder="Enter Mapbox access token..."
                className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                required
              />
              <button
                type="submit"
                className="w-full btn-luxury btn-luxury--primary focus-luxury"
              >
                Load Interactive Map
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={16} className="text-accent" />
          <span className="text-sm font-medium">Legend</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C8A15F]"></div>
            <span>Property Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Golf Course</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Marina</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Shopping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Airport</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;