import type { Car } from "@/lib/apiTypes";
import { carsSchema, getErrorMessageFromUnknown } from "@/lib/apiTypes";

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
