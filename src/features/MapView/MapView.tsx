import type { Map } from "ol";
import type { Car } from "@/api/getCars.types";

import { memo, useEffect, useRef } from "react";
import { createMap, updateMap } from "./MapClient";

function MapView({ cars }: { cars: Car[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = createMap(mapRef.current, cars);
    }
    else {
      updateMap(mapInstanceRef.current, cars);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [cars]);

  return <div ref={mapRef} className="h-96 w-full" />;
}

export default memo(MapView);
