import type { ReactNode } from "react";

import type { Car } from "@/api/getCars.types";
import { use } from "react";

import { getCars } from "@/api/getCars";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary/ErrorBoundary";

const carsPromise = getCars();

export function Provider({
  children,
}: {
  children: (data: Car[]) => ReactNode;
}) {
  const cars = use<Car[]>(carsPromise);
  return <ErrorBoundary>{children(cars)}</ErrorBoundary>;
}
