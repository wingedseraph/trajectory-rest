import type { Dispatch } from "react";
import type { CarsAction, CarsState } from "@/app/store/cars.types";
import { createContext, useContext } from "react";

export const CarsStateContext = createContext<CarsState | null>(null);
export const CarsDispatchContext = createContext<Dispatch<CarsAction> | null>(null);

export function useCarsState() {
  const context = useContext(CarsStateContext);
  if (!context)
    throw new Error("useCarsState must be used within CarsProvider");
  return context;
}

export function useCarsDispatch() {
  const context = useContext(CarsDispatchContext);
  if (!context)
    throw new Error("useCarsDispatch must be used within CarsProvider");
  return context;
}
