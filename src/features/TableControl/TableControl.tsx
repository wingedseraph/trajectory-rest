import { memo } from "react";
import { useCarsDispatch } from "@/app/store";
import CarActions from "./CarActions";

function TableControl() {
  const dispatch = useCarsDispatch();

  const handleCreate = (data: { name: string; model: string; year: number; color: "red" | "black" | "white" | "blue" | "silver"; price: number }) => {
    dispatch({ type: "create", payload: data });
  };

  return (
    <CarActions onCreate={handleCreate} />
  );
}

export default memo(TableControl);
