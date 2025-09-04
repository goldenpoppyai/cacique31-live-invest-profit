/**
 * NeighborhoodMapModule Component
 * 
 * Luxury neighborhood showcase with static "Your 5-Minute Life" column
 * and updated MapBox integration (property + nearby amenities).
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

const NeighborhoodMapModule: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
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

    setTimeout(() => {
      const mapboxgl = (window as any).mapboxgl;
      if (mapboxgl && document.getElementById('mapbox-container')) {
        mapboxgl.accessToken = 'sk.eyJ1IjoiZ29sZGVucG9wcHkiLCJhIjoiY21mM3dwOTd3MDE0czJxczZvNnE1aGtmdSJ9.KgOJSJQPLIEhZ6IauVVKUA';

        const map = new mapboxgl.Map({
          container: 'mapbox-container',
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-68.9195, 18.4294], // Center between Villa and Airport
          zoom: 11,
          pitch: 45,
        });

        // Premium Property & Luxury Amenities
        const locations = [
          {
            coords: [-68.9195, 18.4294],
            title: 'Villa Du Cacique 31',
            desc: 'Av. El Cacique, La Romana 22000, Dominican Republic<br><em>Your luxury estate with golf course frontage</em>',
            color: '#b19762', // Gold for main property
          },
          {
            coords: [-68.9120, 18.4507],
            title: 'La Romana International Airport',
            desc: 'Carr. La Romana - Higuey 5.5, La Romana 22000<br><em>Private & commercial connections • 15 minutes</em>',
            color: '#4CAF50', // Green for transportation
          },
          {
            coords: [-68.9156, 18.4247],
            title: 'Teeth of the Dog Golf Course',
            desc: 'Casa de Campo Resort & Villas, La Romana 22000<br><em>Caribbean\'s #1 rated golf course • On property</em>',
            color: '#2196F3', // Blue for recreation
          },
          {
            coords: [-68.9178, 18.4285],
            title: 'Casa de Campo Equestrian Center',
            desc: 'Casa de Campo, La Romana 22000<br><em>World-class polo & equestrian facilities • 5 minutes</em>',
            color: '#2196F3', // Blue for recreation
          },
          {
            coords: [-68.9165, 18.4295],
            title: 'Casa de Campo Racquet Center',
            desc: 'Casa de Campo, La Romana 22000<br><em>Professional tennis facilities • 3 minutes</em>',
            color: '#2196F3', // Blue for recreation
          },
          {
            coords: [-68.9145, 18.4275],
            title: 'Casa de Campo Marina',
            desc: 'La Romana 22000, Dominican Republic<br><em>Full-service marina & fine dining • 8 minutes</em>',
            color: '#FF9800', // Orange for dining/leisure
          },
          {
            coords: [-68.9135, 18.4255],
            title: 'Minitas Beach Club & Restaurant',
            desc: 'Casa de Campo, La Romana 22000<br><em>Exclusive beachfront dining • 10 minutes</em>',
            color: '#FF9800', // Orange for dining/leisure
          },
        ];

        locations.forEach((loc) => {
          new mapboxgl.Marker({ color: loc.color || '#b19762' })
            .setLngLat(loc.coords)
            .setPopup(
              new mapboxgl.Popup({ 
                closeButton: true,
                closeOnClick: false,
                className: 'luxury-popup'
              }).setHTML(
                `<div style="font-family: 'Inter', sans-serif; max-width: 280px;">
                  <h3 style="color: #121212; font-size: 16px; font-weight: 600; margin: 0 0 8px 0; line-height: 1.3;">${loc.title}</h3>
                  <p style="color: #6b6b6b; font-size: 13px; margin: 0; line-height: 1.4;">${loc.desc}</p>
                </div>`
              )
            )
            .addTo(map);
        });

        map.addControl(new mapboxgl.NavigationControl());
      }
    }, 200);
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
            {!isMapLoaded ? (
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#ffffff' }}
                onClick={loadMap}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MapPin size={48} style={{ color: '#b19762' }} className="mx-auto" />
                    <p className="font-medium text-[#121212]">Click to load interactive map</p>
                    <p className="text-sm text-[#6b6b6b]">Explore Casa de Campo</p>
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
