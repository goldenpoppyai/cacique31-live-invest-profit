// src/components/InteractiveMap.tsx
import React, { useEffect, useRef, useState } from "react";

/**
 * InteractiveMap.tsx
 *
 * Dynamic Mapbox map component with:
 *  - env token detection + fallback token
 *  - dynamic import of mapbox-gl and CSS
 *  - property marker + optional amenity markers with popups
 *  - navigation controls and resize handling
 *
 * IMPORTANT:
 *  - Prefer building your app with VITE_MAPBOX_TOKEN set so the token is inlined at build time.
 *  - If you cannot rebuild, replace FALLBACK_MAPBOX_TOKEN below with your public Mapbox token.
 */

type Amenity = {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  type?: string;
};

interface MapProps {
  className?: string;
  propertyLocation?: [number, number]; // [lng, lat]
  propertyLabel?: string;
  amenities?: Amenity[];
  initialZoom?: number;
  showControls?: boolean;
  // Optional fallback token override (useful for quick hotfix without rebuilding)
  fallbackToken?: string | null;
}

const InteractiveMap: React.FC<MapProps> = ({
  className = "",
  propertyLocation = [-68.4565, 18.4206], // default: Villa du Cacique / Casa de Campo approx
  propertyLabel = "Villa du Cacique",
  amenities = [],
  initialZoom = 13,
  showControls = true,
  fallbackToken = null,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      try {
        // Dynamic import of mapbox-gl to avoid SSR issues and reduce initial bundle
        const mapboxglModule = await import("mapbox-gl");
        // Load the CSS (side-effect import). Some bundlers will include it automatically when importing.
        await import("mapbox-gl/dist/mapbox-gl.css");

        const mapboxgl = (mapboxglModule as any).default ?? mapboxglModule;

        // 1) token detection
        // Try import.meta.env first (will be inlined at build time by Vite)
        // Cast to any because TypeScript may not have import.meta.env typing here.
        const envToken = (import.meta as any)?.env?.VITE_MAPBOX_TOKEN;
        // Use fallbackToken prop if provided, else use FALLBACK_MAPBOX_TOKEN constant
        const FALLBACK_MAPBOX_TOKEN = fallbackToken ?? "pk.eyJ1IjoiZ29sZGVucG9wcHkiLCJhIjoiY21laWxham82MDNrejJrczhiNjhnYm5ldCJ9.ANnhMBLWWK7fRmMD3BMhEA";
        const tokenToUse: string | undefined = envToken ?? (FALLBACK_MAPBOX_TOKEN || undefined);

        if (!tokenToUse) {
          throw new Error(
            "Mapbox token not found. Set VITE_MAPBOX_TOKEN in your .env at build time, or provide a fallback token."
          );
        }

        // set the token on the library
        mapboxgl.accessToken = tokenToUse;

        // 2) ensure container available
        if (!containerRef.current) {
          throw new Error("Map container not found");
        }

        // 3) create map
        mapRef.current = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/satellite-streets-v12",
          center: propertyLocation,
          zoom: initialZoom,
          pitch: 35,
          bearing: -10,
          antialias: true,
        });

        // add navigation control optionally
        if (showControls) {
          mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
        }

        // on load, add markers / layers
        mapRef.current.on("load", () => {
          if (!mounted) return;

          // add a property marker with popup
          const propPopup = new mapboxgl.Popup({ offset: 15, closeOnClick: false }).setHTML(
            `<strong>${propertyLabel}</strong><br/>${propertyLocation[1].toFixed(5)}, ${propertyLocation[0].toFixed(5)}`
          );

          const propMarker = new mapboxgl.Marker({ color: "#b19762" })
            .setLngLat(propertyLocation)
            .setPopup(propPopup)
            .addTo(mapRef.current);

          // add amenity markers if provided
          amenities.forEach((a) => {
            const popup = new mapboxgl.Popup({ offset: 12 }).setText(a.name);
            new mapboxgl.Marker({ color: "#2b6cb0" }).setLngLat(a.coordinates).setPopup(popup).addTo(mapRef.current);
          });
        });

        // handle errors on the map
        mapRef.current.on("error", (e: any) => {
          console.error("Mapbox error event:", e);
          if (mounted) setError("Map failed to load correctly (mapbox error).");
        });

        // handle resize when container changes size
        const resizeObserver = new ResizeObserver(() => {
          try {
            mapRef.current?.resize();
          } catch (e) {
            // ignore
          }
        });
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        setError(null);
      } catch (err: any) {
        console.error("InteractiveMap initialization error:", err);
        setError(err?.message ?? "Unknown error initializing map");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      try {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      } catch (e) {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(propertyLocation), JSON.stringify(amenities), initialZoom, showControls, fallbackToken]);

  // render
  return (
    <div className={`${className} w-full h-full min-h-[320px] rounded-md overflow-hidden bg-muted/10`}>
      <div
        ref={containerRef}
        id="map"
        style={{
          width: "100%",
          height: "100%",
          minHeight: 360,
        }}
      />
      {loading && (
        <div className="absolute left-4 top-4 z-50 bg-white/85 rounded px-3 py-1 text-sm shadow">
          Loading map…
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded mt-2 text-sm text-red-700">
          {error} — verify your Mapbox token & referer settings or rebuild with <code>VITE_MAPBOX_TOKEN</code>.
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
