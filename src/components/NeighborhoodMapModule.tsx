/**
 * NeighborhoodMapModule Component
 * 
 * Production-ready Mapbox map for Villa du Cacique 31 and nearby POIs
 * with dynamic loading and proper error handling
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

const NeighborhoodMapModule: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadMapboxLibrary = async () => {
    try {
      // Dynamic import for code splitting
      const mapboxgl = await import('mapbox-gl');
      
      // Add CSS if not present
      if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
        const link = document.createElement('link');
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }

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

      if (!document.getElementById('mapbox-container')) {
        console.error('Map container not found');
        return;
      }

      mapboxgl.accessToken = mapboxToken;

      const map = new mapboxgl.Map({
        container: 'mapbox-container',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-68.5266, 18.4478], // Villa Du Cacique 31 center
        zoom: 12,
        pitch: 45,
        bearing: -17,
        antialias: true
      });

      // POI locations with exact coordinates  
      const locations = [
        {
          coords: [-68.5266, 18.4478],
          title: 'Villa Du Cacique 31',
          desc: 'Av. El Cacique, La Romana 22000, Dominican Republic<br><em>Your luxury estate with golf course frontage</em>',
          color: '#b19762',
          type: 'property'
        },
        {
          coords: [-68.3675, 18.4300],
          title: 'La Romana International Airport (LRM)',
          desc: 'Carr. La Romana - Higuey 5.5, La Romana 22000<br><em>Private & commercial connections • 15 minutes</em>',
          color: '#ef4444',
          type: 'airport'
        },
        {
          coords: [-68.5281, 18.4510],
          title: 'Teeth of the Dog Golf Course',
          desc: 'Casa de Campo Resort & Villas, C368+V92, La Romana 22000<br><em>Caribbean\'s #1 rated golf course • On property</em>',
          color: '#22c55e',
          type: 'golf'
        },
        {
          coords: [-68.5240, 18.4480],
          title: 'Casa de Campo Equestrian Center',
          desc: 'C399+632, La Romana 22000<br><em>World-class polo & equestrian facilities • 5 minutes</em>',
          color: '#3b82f6',
          type: 'recreation'
        },
        {
          coords: [-68.5270, 18.4500],
          title: 'Casa de Campo Racquet Center',
          desc: 'C3CJ+662, La Romana 22000<br><em>Professional tennis facilities • 3 minutes</em>',
          color: '#3b82f6',
          type: 'recreation'
        },
        {
          coords: [-68.5248, 18.4472],
          title: 'Casa de Campo Marina',
          desc: '22000 La Romana, Dominican Republic<br><em>Full-service marina & fine dining • 8 minutes</em>',
          color: '#f59e0b',
          type: 'marina'
        },
        {
          coords: [-68.5260, 18.4485],
          title: 'Minitas Beach Club & Restaurant',
          desc: 'C33J+99V, La Romana 22000<br><em>Exclusive beachfront dining • 10 minutes</em>',
          color: '#f59e0b',
          type: 'dining'
        }
      ];

      map.on('load', () => {
        setIsMapLoaded(true);
        
        // Add 3D terrain and buildings
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add markers with popups
        locations.forEach((location) => {
          const marker = new mapboxgl.Marker({ 
            color: location.color,
            scale: location.type === 'property' ? 1.2 : 0.9
          })
            .setLngLat(location.coords)
            .setPopup(
              new mapboxgl.Popup({ 
                closeButton: true,
                closeOnClick: false,
                className: 'luxury-popup',
                maxWidth: '300px'
              }).setHTML(
                `<div style="font-family: 'Inter', sans-serif; padding: 4px;">
                  <h3 style="color: #121212; font-size: 16px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3;">${location.title}</h3>
                  <p style="color: #6b6b6b; font-size: 13px; margin: 0; line-height: 1.4;">${location.desc}</p>
                </div>`
              )
            )
            .addTo(map);

          // Add accessibility labels
          marker.getElement().setAttribute('aria-label', location.title);
          marker.getElement().setAttribute('role', 'button');
          marker.getElement().setAttribute('tabindex', '0');
        });

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl({
          visualizePitch: true
        }), 'top-right');

        // Add fullscreen control
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      });

      map.on('error', (e) => {
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
    if (isMobile && !isMapLoaded) {
      loadMapboxLibrary();
    }
  };

  return (
    <section className="section-luxury" style={{ backgroundColor: '#f6f5f4' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Your 5-Minute Life */}
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Clock size={24} style={{ color: '#b19762' }} />
                Your 5-Minute Life
              </h3>
              <p className="text-sm" style={{ color: '#6b6b6b' }}>
                Everything you need within minutes of your front door
              </p>
            </div>

            <div className="space-y-4">
              <div className="card-luxury p-4 bg-white">
                <h4 className="font-semibold text-lg text-[#121212]">
                  Teeth of the Dog
                </h4>
                <p className="text-sm text-[#6b6b6b]">
                  Immediate / on-property frontage — Award-winning course ranked
                  among the best in the Americas; direct golf frontage and
                  scenic views.
                </p>
              </div>

              <div className="card-luxury p-4 bg-white">
                <h4 className="font-semibold text-lg text-[#121212]">
                  Casa de Campo Marina
                </h4>
                <p className="text-sm text-[#6b6b6b]">
                  Short drive (10–15 minutes) — Full-service marina with private
                  berths, dining, and concierge leisure services.
                </p>
              </div>

              <div className="card-luxury p-4 bg-white">
                <h4 className="font-semibold text-lg text-[#121212]">
                  Casa de Campo fine dining
                </h4>
                <p className="text-sm text-[#6b6b6b]">
                  Short drive — Michelin-quality and private dining options
                  available nearby via concierge.
                </p>
              </div>

              <div className="card-luxury p-4 bg-white">
                <h4 className="font-semibold text-lg text-[#121212]">
                  Casa de Campo village shopping
                </h4>
                <p className="text-sm text-[#6b6b6b]">
                  Short drive — Curated boutiques, essential services, and
                  private provisioning.
                </p>
              </div>

              <div className="card-luxury p-4 bg-white">
                <h4 className="font-semibold text-lg text-[#121212]">
                  La Romana International Airport (LRM)
                </h4>
                <p className="text-sm text-[#6b6b6b]">
                  25–30 minutes by car — Quick private and commercial
                  connections; discreet arrivals for owners and guests.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#121212' }}>
              Property Location
            </h3>
            
            {showFallback ? (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 p-6">
                    <AlertCircle size={48} style={{ color: '#f59e0b' }} className="mx-auto" />
                    <p className="font-medium text-[#121212]">Map Unavailable</p>
                    <p className="text-sm text-[#6b6b6b] max-w-xs">
                      {mapError || 'Please set VITE_MAPBOX_TOKEN in your .env file to view the interactive map'}
                    </p>
                    <p className="text-xs text-[#6b6b6b]">
                      Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-[#b19762] hover:underline">mapbox.com</a>
                    </p>
                  </div>
                </div>
              </div>
            ) : !isMapLoaded ? (
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-white shadow-lg"
                onClick={handleMapClick}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MapPin size={48} style={{ color: '#b19762' }} className="mx-auto" />
                    <p className="font-medium text-[#121212]">
                      {isMobile ? 'Tap to load interactive map' : 'Loading interactive map...'}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">Explore Casa de Campo & Villa Du Cacique</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <div id="mapbox-container" className="w-full h-full"></div>
                
                {/* Map Legend */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} style={{ color: '#b19762' }} />
                    <span className="text-sm font-medium text-[#121212]">Legend</span>
                  </div>
                  <div className="space-y-1 text-xs text-[#6b6b6b]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#b19762' }}></div>
                      <span>Villa Du Cacique 31</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                      <span>Golf Course</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                      <span>Recreation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
                      <span>Dining & Marina</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
                      <span>Airport</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodMapModule;
