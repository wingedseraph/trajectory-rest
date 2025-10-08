import type { SortableColumn } from "./TableView.types";
import type { Car } from "@/api/getCars.types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { memo, useMemo } from "react";
import { useCarsDispatch, useCarsState } from "@/app/store";
import { Button } from "@/shared/ui/Button/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table/table";
import { columns, isSortable } from "./TableView.types";
import { sortCars } from "./TableViewSort";

function TableView({ cars }: { cars: Car[] }) {
  const state = useCarsState();
  const dispatch = useCarsDispatch();
  const base = state.cars.length ? state.cars : cars;

  const data = useMemo(() => {
    return sortCars(base, state.sort.by, state.sort.direction);
  }, [base, state.sort.by, state.sort.direction]);

  const handleSort = (column: SortableColumn, direction: "asc" | "desc") => {
    dispatch({ type: "sort", payload: { by: column, direction } });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column}>
              <div className="flex items-center gap-2">
                <span>{column.toUpperCase()}</span>
                {isSortable(column) && (
                  <div className="flex gap-1">
                    <Button
                      size="iconSmall"
                      variant={state.sort.by === column && state.sort.direction === "desc" ? "neutral" : "noShadow"}
                      onClick={() => handleSort(column, "desc")}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      size="iconSmall"
                      variant={state.sort.by === column && state.sort.direction === "asc" ? "neutral" : "noShadow"}
                      onClick={() => handleSort(column, "asc")}
                    >
                      <ArrowDown />
                    </Button>

                  </div>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(car => (
          <TableRow key={car.id}>
            {columns.map(column => (
              <TableCell key={column}>{String(car[column])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default memo(TableView);
