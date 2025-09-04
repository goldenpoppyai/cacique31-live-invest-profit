/**
 * InteractiveMap Component
 * 
 * Production-ready interactive map showing Villa du Cacique 31 and nearby POIs
 * Uses dynamic imports and proper error handling
 */

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Layers, AlertCircle } from 'lucide-react';

interface MapProps {
  className?: string;
  showControls?: boolean;
  propertyLocation?: [number, number]; // [lng, lat]
  amenities?: Array<{
    name: string;
    coordinates: [number, number];
    type: 'golf' | 'marina' | 'dining' | 'shopping' | 'airport' | 'recreation';
  }>;
}

const InteractiveMap: React.FC<MapProps> = ({
  className = '',
  showControls = true,
  propertyLocation = [-68.4565, 18.4206], // Villa Du Cacique 31
  amenities = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Exact POI coordinates as provided
  const defaultAmenities = [
    {
      name: 'Villa Du Cacique 31',
      coordinates: [-68.4565, 18.4206] as [number, number],
      type: 'property' as const
    },
    {
      name: 'La Romana International Airport (LRM)',
      coordinates: [-68.9120, 18.4507] as [number, number],
      type: 'airport' as const
    },
    {
      name: 'Teeth of the Dog Golf Course',
      coordinates: [-68.8875, 18.4210] as [number, number],
      type: 'golf' as const
    },
    {
      name: 'Casa de Campo Equestrian Center',
      coordinates: [-68.8895, 18.4165] as [number, number],
      type: 'recreation' as const
    },
    {
      name: 'Casa de Campo Racquet Center',
      coordinates: [-68.8845, 18.4185] as [number, number],
      type: 'recreation' as const
    },
    {
      name: 'Casa de Campo Marina',
      coordinates: [-68.8830, 18.4180] as [number, number],
      type: 'marina' as const
    },
    {
      name: 'Minitas Beach Club & Restaurant',
      coordinates: [-68.8890, 18.4150] as [number, number],
      type: 'dining' as const
    }
  ];

  const allAmenities = amenities.length > 0 ? amenities : defaultAmenities;

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Auto-init on desktop
    if (!isMobile) {
      loadMapboxLibrary();
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      map.current?.remove();
    };
  }, []);

  const loadMapboxLibrary = async () => {
    try {
      // Dynamic import for code splitting
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      initializeMap(mapboxgl.default);
    } catch (error) {
      console.error('Failed to load Mapbox GL JS:', error);
      setMapError('Failed to load map library');
      setShowFallback(true);
    }
  };

  const initializeMap = (mapboxgl: any) => {
    try {
      // Read token from environment variable
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      
      if (!mapboxToken) {
        console.warn('Mapbox token not found in environment variables');
        setShowFallback(true);
        return;
      }

      if (!mapContainer.current) {
        console.error('Map container not found');
        return;
      }

      mapboxgl.accessToken = mapboxToken;
      
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
        
        // Add 3D buildings and terrain
        if (map.current?.getLayer('building')) {
          map.current.setLayoutProperty('building', 'visibility', 'visible');
          map.current.setPaintProperty('building', 'fill-extrusion-opacity', 0.6);
        }

        // Add terrain
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add markers with popups
        allAmenities.forEach((amenity) => {
          const color = getAmenityColor(amenity.type);
          const scale = amenity.type === 'property' ? 1.2 : 0.9;
          
          const marker = new mapboxgl.Marker({
            color: color,
            scale: scale
          })
            .setLngLat(amenity.coordinates)
            .setPopup(new mapboxgl.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false,
              maxWidth: '300px'
            })
              .setHTML(`<div style="font-family: 'Inter', sans-serif; padding: 4px;">
                <h4 style="color: #121212; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">${amenity.name}</h4>
                <p style="color: #6b6b6b; font-size: 13px; margin: 0; line-height: 1.4;">${getAmenityDescription(amenity.type)}</p>
              </div>`))
            .addTo(map.current);

          // Add accessibility labels
          marker.getElement().setAttribute('aria-label', amenity.name);
          marker.getElement().setAttribute('role', 'button');
          marker.getElement().setAttribute('tabindex', '0');
        });
      });

      map.current.on('error', (e: any) => {
        console.error('Map error:', e);
        setMapError('Map failed to load properly');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
      setShowFallback(true);
    }
  };

  const handleMapClick = () => {
    if (isMobile && !mapLoaded) {
      loadMapboxLibrary();
    }
  };

  const getAmenityColor = (type: string): string => {
    const colors = {
      property: '#b19762',
      golf: '#22c55e',
      marina: '#3b82f6',
      dining: '#f59e0b',
      shopping: '#8b5cf6',
      airport: '#ef4444',
      recreation: '#3b82f6'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getAmenityDescription = (type: string): string => {
    const descriptions = {
      property: 'Your luxury estate with golf course frontage',
      golf: 'Caribbean\'s #1 rated golf course',
      marina: 'Full-service marina with fine dining',
      dining: 'Exclusive beachfront dining',
      shopping: 'Luxury shopping and services',
      airport: 'Private and commercial connections',
      recreation: 'World-class facilities'
    };
    return descriptions[type as keyof typeof descriptions] || 'Point of interest';
  };

  if (showFallback) {
    return (
      <div className={`relative bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 ${className}`}>
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-md">
            <AlertCircle size={48} className="text-orange-500 mx-auto mb-4" />
            <h4 className="font-semibold mb-2 text-gray-900">Map Unavailable</h4>
            <p className="text-gray-600 text-sm mb-4">
              {mapError || 'Please set VITE_MAPBOX_TOKEN in your .env file to view the interactive map'}
            </p>
            <p className="text-xs text-gray-500">
              Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {!mapLoaded && !showFallback && (
        <div
          className="w-full h-full min-h-[400px] bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleMapClick}
        >
          <div className="text-center">
            {isMobile ? (
              <>
                <MapPin size={48} className="text-[#b19762] mx-auto mb-2" />
                <p className="font-medium text-gray-900">Tap to load interactive map</p>
                <p className="text-sm text-gray-600">Villa Du Cacique & surroundings</p>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b19762] mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading map...</p>
              </>
            )}
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full min-h-[400px]" />

      {/* Map Legend */}
      {mapLoaded && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Layers size={16} className="text-[#b19762]" />
            <span className="text-sm font-medium text-gray-900">Legend</span>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#b19762]"></div>
              <span>Villa Du Cacique 31</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Golf Course</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Recreation & Marina</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Dining</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Airport</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;