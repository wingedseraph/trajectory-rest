import type { Car } from "@/api/getCars.types";

export const sortableColumns = ["year", "price"] as const;
export type SortableColumn = typeof sortableColumns[number];

export const columns: Array<keyof Car> = [
  "id",
  "name",
  "model",
  "year",
  "color",
  "price",
  "latitude",
  "longitude",
];

export function isSortable(column: keyof Car): column is SortableColumn {
  return column === "year" || column === "price";
}
