/**
 * NeighborhoodMapModule Component
 * 
 * Lightweight, responsive neighborhood module showing "5-minute life" microcards 
 * and a small interactive map (static map tile or embedded iframe fallback).
 * 
 * Required Props:
 * - pointsOfInterest: Array<{titlePlaceholder: string, distancePlaceholder: string, iconSlot: React.ReactNode, shortDescPlaceholder: string}>
 * 
 * Optional Props:
 * - mapEmbedUrl: string (URL for map embed)
 */

import React, { useState } from 'react';
import { MapPin, Clock, Car, Utensils, ShoppingBag, Plane } from 'lucide-react';

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

  const loadMap = () => {
    setIsMapLoaded(true);
  };

  // Default POI data if none provided (for demonstration)
  const defaultPOI = [
    {
      titlePlaceholder: '{{GOLF_COURSE_NAME}}',
      distancePlaceholder: '{{GOLF_DISTANCE}}',
      iconSlot: <MapPin size={24} />,
      shortDescPlaceholder: '{{GOLF_DESCRIPTION}}'
    },
    {
      titlePlaceholder: '{{MARINA_NAME}}',
      distancePlaceholder: '{{MARINA_DISTANCE}}',
      iconSlot: <Car size={24} />,
      shortDescPlaceholder: '{{MARINA_DESCRIPTION}}'
    },
    {
      titlePlaceholder: '{{RESTAURANT_NAME}}',
      distancePlaceholder: '{{RESTAURANT_DISTANCE}}',
      iconSlot: <Utensils size={24} />,
      shortDescPlaceholder: '{{RESTAURANT_DESCRIPTION}}'
    },
    {
      titlePlaceholder: '{{SHOPPING_NAME}}',
      distancePlaceholder: '{{SHOPPING_DISTANCE}}',
      iconSlot: <ShoppingBag size={24} />,
      shortDescPlaceholder: '{{SHOPPING_DESCRIPTION}}'
    },
    {
      titlePlaceholder: '{{AIRPORT_NAME}}',
      distancePlaceholder: '{{AIRPORT_DISTANCE}}',
      iconSlot: <Plane size={24} />,
      shortDescPlaceholder: '{{AIRPORT_DESCRIPTION}}'
    }
  ];

  const displayPOI = pointsOfInterest.length > 0 ? pointsOfInterest : defaultPOI;

  return (
    <section className="section-luxury" role="region" aria-label="Neighborhood amenities and location">
      <div className="container-luxury">
        <h2 className="mb-8">Neighborhood & Location</h2>

        <div className="map-row">
          {/* Points of Interest Cards */}
          <div className="poi-list">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Clock size={20} className="text-accent" />
                Your 5-Minute Life
              </h3>
              <p className="text-muted-foreground text-sm">
                Everything you need within minutes of your front door
              </p>
            </div>

            {displayPOI.map((poi, index) => (
              <article key={index} className="card-luxury">
                <div className="flex items-start gap-4">
                  <div className="text-accent flex-shrink-0" aria-hidden="true">
                    {poi.iconSlot}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{poi.titlePlaceholder}</h4>
                      <span className="text-accent text-sm font-medium">
                        {poi.distancePlaceholder}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {poi.shortDescPlaceholder}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Map Section */}
          <div className="map-container">
            <h3 className="text-lg font-semibold mb-4">Area Map</h3>
            
            <div className="relative bg-muted rounded-lg overflow-hidden h-96 lg:h-full min-h-[400px]">
              {!isMapLoaded ? (
                /* Static Map Placeholder */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-elegant">
                  <div className="text-center">
                    <MapPin size={48} className="text-accent mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Interactive Map</h4>
                    <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                      Click to load the interactive map showing nearby amenities and points of interest.
                    </p>
                    <button
                      onClick={loadMap}
                      className="btn-luxury btn-luxury--primary focus-luxury"
                      aria-label="Load interactive map"
                    >
                      Load Map
                    </button>
                  </div>
                </div>
              ) : (
                /* Embedded Map */
                <div className="w-full h-full">
                  {mapEmbedUrl ? (
                    <iframe
                      src={mapEmbedUrl}
                      title="Neighborhood map showing nearby amenities"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-label="Interactive map of the neighborhood"
                    />
                  ) : (
                    /* Fallback map */
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={32} className="text-accent mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Map currently unavailable
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Map Controls/Legend */}
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                Property Location
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                Amenities
              </span>
            </div>
          </div>
        </div>

        {/* Transportation Access */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-luxury text-center">
            <Car size={32} className="text-accent mx-auto mb-3" />
            <h4 className="font-semibold mb-2">By Car</h4>
            <p className="text-muted-foreground text-sm">Easy highway access and ample parking available.</p>
          </div>
          
          <div className="card-luxury text-center">
            <Plane size={32} className="text-accent mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Airport Access</h4>
            <p className="text-muted-foreground text-sm">Private jet and commercial flight access nearby.</p>
          </div>
          
          <div className="card-luxury text-center">
            <MapPin size={32} className="text-accent mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Local Transport</h4>
            <p className="text-muted-foreground text-sm">Resort shuttles and concierge transportation services.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodMapModule;