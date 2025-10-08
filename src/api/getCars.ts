import type { Car } from "@/api/getCars.types";
import { carsSchema, getErrorMessageFromUnknown } from "@/api/getCars.types";

const JSON_URL
  = "https://ofc-test-01.tspb.su/test-task/vehicles" as const;

export async function getCars(): Promise<Car[]> {
  try {
    const response = await fetch(JSON_URL);
    const result: unknown = await response.json();

    const validatedData = carsSchema.parse(result);
    return validatedData;
  }
  catch (error) {
    throw new Error(getErrorMessageFromUnknown(error));
  }
}
