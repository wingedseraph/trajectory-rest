import type { Car } from "@/api/getCars.types";

export type CarsState = {
  cars: Car[];
  sort: { by: "year" | "price" | null; direction: "asc" | "desc" };
};

export type CarFormValues = Omit<Car, "id" | "latitude" | "longitude">;

export type CarsAction
  = | { type: "hydrate"; payload: Car[] }
    | { type: "create"; payload: CarFormValues }
    | { type: "editByName"; payload: { name: string; price: number } }
    | { type: "delete"; payload: { id: number } }
    | {
      type: "sort";
      payload: { by: "year" | "price"; direction: "asc" | "desc" };
    };
