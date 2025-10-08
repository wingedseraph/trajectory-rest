import type { Car } from "@/api/getCars.types";
import { carsSchema } from "@/api/getCars.types";

export const LS_KEY = "cars-store" as const;

export function isCar(value: string): Car[] {
  try {
    if (!value) {
      return [];
    }
    const parsed = JSON.parse(value);
    const response = carsSchema.safeParse(parsed);
    return response.success ? response.data : [];
  }
  catch {
    return [];
  }
}
