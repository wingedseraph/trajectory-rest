import type { Car } from "@/api/getCars.types";
import { Feature, Map, View } from "ol";
import { Point } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { useGeographic } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";

import { Circle, Fill, Stroke, Style } from "ol/style";

useGeographic();

const stroke = {
  color: "#000000",
  width: 2,
} as const;

function getColorFromCarColor(color: Car["color"]): string {
  const colorMap: Record<Car["color"], string> = {
    red: "#FF0000",
    blue: "#0000FF",
    black: "#000000",
    white: "#FFFFFF",
    silver: "#C4C4C4",
  };
  return colorMap[color] || "#FFFFFF";
}

function createCarFeature(car: Car): Feature {
  const feature = new Feature({
    car,
    geometry: new Point([car.longitude, car.latitude]),
  });

  const carColor = getColorFromCarColor(car.color);

  feature.setStyle(
    new Style({
      image: new Circle({
        fill: new Fill({ color: carColor }),
        radius: 8,
        stroke: new Stroke({ color: stroke.color, width: stroke.width }),
      }),
    }),
  );

  return feature;
}

export function createMap(container: HTMLElement, cars: Car[]): Map {
  if (!cars || cars.length === 0) {
    return new Map({
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      target: container,
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  const features = cars.map(createCarFeature);
  const vectorSource = new VectorSource({ features });
  const vectorLayer = new VectorLayer({ source: vectorSource });

  const map = new Map({
    layers: [
      new TileLayer({ source: new OSM() }),
      vectorLayer,
    ],
    target: container,
    view: new View({
      center: [cars[0].longitude, cars[0].latitude],
      zoom: 10,
    }),
  });

  const extent = vectorSource.getExtent();
  map.getView().fit(extent, { padding: [20, 20, 20, 20] });

  return map;
}

export function updateMap(map: Map, cars: Car[]): void {
  map.getLayers().clear();
  map.getLayers().push(new TileLayer({ source: new OSM() }));

  if (!cars || cars.length === 0) {
    map.getView().setCenter([0, 0]);
    map.getView().setZoom(2);
    return;
  }

  const features = cars.map(createCarFeature);
  const vectorSource = new VectorSource({ features });
  const vectorLayer = new VectorLayer({ source: vectorSource });

  map.getLayers().push(vectorLayer);

  const extent = vectorSource.getExtent();
  map.getView().fit(extent, { padding: [20, 20, 20, 20] });
}
