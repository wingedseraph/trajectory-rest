import type { ReactNode } from "react";
import type { Car } from "@/api/getCars.types";
import type { CarsState } from "@/app/store/cars.types";
import { useEffect, useMemo, useReducer } from "react";
import { CarsDispatchContext, CarsStateContext } from "@/app/store/cars.context";
import { isCar, LS_KEY } from "@/app/store/cars.persistence";
import { carsReducer } from "@/app/store/cars.reducer";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export function CarsProvider({ initialCars, children }: { initialCars: Car[]; children: ReactNode }) {
  const { valueFromLS, setValueToLS } = useLocalStorage(LS_KEY);
  const [state, dispatch] = useReducer(carsReducer, {
    cars: [],
    sort: { by: null, direction: "asc" },
  } satisfies CarsState);

  useEffect(() => {
    const LSCars = isCar(valueFromLS);
    dispatch({ type: "hydrate", payload: LSCars.length ? LSCars : initialCars });
  }, [initialCars, valueFromLS]);

  useEffect(() => {
    setValueToLS(JSON.stringify(state.cars));
  }, [state.cars, setValueToLS]);

  const stateValue = useMemo(() => state, [state]);
  return (
    <CarsDispatchContext.Provider value={dispatch}>
      <CarsStateContext.Provider value={stateValue}>{children}</CarsStateContext.Provider>
    </CarsDispatchContext.Provider>
  );
}
