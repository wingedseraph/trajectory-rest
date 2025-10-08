import type { ReactNode } from "react";
import type { Car } from "@/api/getCars.types";
import type { CarsAction } from "@/app/store/cars.types";
import { useReducer } from "react";
import { CarsDispatchContext, CarsStateContext } from "@/app/store/cars.context";
import { isCar, LS_KEY } from "@/app/store/cars.persistence";
import { carsReducer } from "@/app/store/cars.reducer";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export function CarsProvider({ initialCars, children }: { initialCars: Car[]; children: ReactNode }) {
  const { valueFromLS, setValueToLS } = useLocalStorage(LS_KEY);

  const savedCars = isCar(valueFromLS);
  const carsToUse = savedCars.length > 0 ? savedCars : initialCars;

  const [state, dispatch] = useReducer(carsReducer, {
    cars: carsToUse,
    sort: { by: null, direction: "asc" },
  });

  const saveCars = (newCars: Car[]) => {
    setValueToLS(JSON.stringify(newCars));
  };

  const dispatchWithSave = (action: CarsAction) => {
    dispatch(action);
    const newState = carsReducer(state, action);
    saveCars(newState.cars);
  };

  return (
    <CarsDispatchContext.Provider value={dispatchWithSave}>
      <CarsStateContext.Provider value={state}>{children}</CarsStateContext.Provider>
    </CarsDispatchContext.Provider>
  );
}
