import type { CarFormValues, CarsAction } from "@/app/store/cars.types";

export function createCar(payload: CarFormValues): CarsAction {
  return { type: "create", payload };
}

export function editCarByName(name: string, price: number): CarsAction {
  return { type: "editByName", payload: { name, price } };
}

export function editCarById(id: number, name: string, price: number): CarsAction {
  return { type: "editById", payload: { id, name, price } };
}

export function deleteCar(id: number): CarsAction {
  return { type: "delete", payload: { id } };
}

export function sortCars(by: "year" | "price", direction: "asc" | "desc"): CarsAction {
  return { type: "sort", payload: { by, direction } };
}
