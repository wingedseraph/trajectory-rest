import type { Map } from "ol";
import type { Car } from "@/api/getCars.types";

import { memo, useEffect, useRef } from "react";
import { createMap, updateMap } from "./MapClient";

type MapViewProps = {
  cars: Car[];
};

function MapView({ cars }: MapViewProps) {
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

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}

export default memo(MapView);
