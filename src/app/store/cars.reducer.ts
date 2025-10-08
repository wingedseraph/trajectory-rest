import type { Car } from "@/api/getCars.types";
import type { CarsAction, CarsState } from "@/app/store/cars.types";

export function carsReducer(state: CarsState, action: CarsAction): CarsState {
  switch (action.type) {
    case "hydrate": {
      return { ...state, cars: action.payload };
    }
    case "create": {
      const nextId
        = state.cars.length > 0
          ? Number(...state.cars.map(car => car.id)) + 1
          : 1;
      const newCar: Car = {
        id: nextId,
        name: action.payload.name,
        model: action.payload.model,
        year: action.payload.year,
        color: action.payload.color,
        price: action.payload.price,
        latitude: 0,
        longitude: 0,
      };
      return { ...state, cars: [...state.cars, newCar] };
    }
    case "editByName": {
      const { name, price } = action.payload;
      const cars = state.cars.map(car =>
        car.name === name ? { ...car, price } : car,
      );
      return { ...state, cars };
    }
    case "delete": {
      const cars = state.cars.filter(car => car.id !== action.payload.id);
      return { ...state, cars };
    }
    case "sort": {
      const { by, direction } = action.payload;
      return { ...state, sort: { by, direction } };
    }
    default:
      return state;
  }
}
