import type { Car } from "@/api/getCars.types";
import type { CarsState } from "@/app/store";

export function sortCars(cars: Car[], sortBy: CarsState["sort"]["by"], direction: CarsState["sort"]["direction"]): Car[] {
  if (!sortBy)
    return cars;

  const copy = [...cars];
  copy.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (valueA === valueB)
      return 0;

    const comparison = valueA < valueB ? -1 : 1;
    return direction === "asc" ? comparison : -comparison;
  });

  return copy;
}
