/**
 * NeighborhoodMapModule Component
 * 
 * Lightweight, responsive neighborhood module with MapBox integration
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

interface PointOfInterest {
  titlePlaceholder: string;
  distancePlaceholder: string;
  iconSlot: React.ReactNode;
  shortDescPlaceholder: string;
}

interface NeighborhoodMapModuleProps {
  pointsOfInterest: PointOfInterest[];
  mapEmbedUrl?: string;
}

const NeighborhoodMapModule: React.FC<NeighborhoodMapModuleProps> = ({
  pointsOfInterest,
  mapEmbedUrl,
}) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Load MapBox script
    if (!document.querySelector('script[src*="mapbox-gl"]')) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js';
      script.async = true;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const loadMap = () => {
    setIsMapLoaded(true);
    
    // Initialize MapBox map
    setTimeout(() => {
      const mapboxgl = (window as any).mapboxgl;
      if (mapboxgl && document.getElementById('mapbox-container')) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ29sZGVucG9wcHkiLCJhIjoiY21laWxmY3E5MDNrczJtczh2NGlqeml6cSJ9.BE8wGAFzHo2UwkVrhCX2WA';
        
        const map = new mapboxgl.Map({
          container: 'mapbox-container',
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-68.4565, 18.5204], // Casa de Campo coordinates
          zoom: 14,
          pitch: 45
        });

        // Add property marker
        new mapboxgl.Marker({ color: '#b19762' })
          .setLngLat([-68.4565, 18.5204])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Villa Du Cacique</h3><p>31 Cacique, Casa de Campo</p>'))
          .addTo(map);

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
      }
    }, 100);
  };

  return (
    <section className="section-luxury" style={{ backgroundColor: '#f6f5f4' }}>
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
            Prime Location Benefits
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#6b6b6b' }}>
            Casa de Campo's most exclusive address with world-class amenities at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Points of Interest Cards */}
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
              {pointsOfInterest.map((poi, index) => (
                <div key={index} className="card-luxury p-4" style={{ backgroundColor: '#ffffff' }}>
                  <div className="flex items-start gap-4">
                    <div style={{ color: '#b19762' }} className="flex-shrink-0">
                      {poi.iconSlot}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold" style={{ color: '#121212' }}>
                          {poi.titlePlaceholder}
                        </h4>
                        <span className="text-sm font-medium" style={{ color: '#b19762' }}>
                          {poi.distancePlaceholder}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: '#6b6b6b' }}>
                        {poi.shortDescPlaceholder}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#121212' }}>
              Property Location
            </h3>
            
            {!isMapLoaded ? (
              <div 
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#ffffff' }}
                onClick={loadMap}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MapPin size={48} style={{ color: '#b19762' }} className="mx-auto" />
                    <p className="font-medium" style={{ color: '#121212' }}>
                      Click to load interactive map
                    </p>
                    <p className="text-sm" style={{ color: '#6b6b6b' }}>
                      Explore Casa de Campo location
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <div id="mapbox-container" className="w-full h-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodMapModule;