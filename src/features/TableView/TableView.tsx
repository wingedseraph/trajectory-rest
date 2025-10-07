import type { Car } from "@/lib/apiTypes";
import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table/table";

const columns: Array<keyof Car> = [
  "id",
  "name",
  "model",
  "year",
  "color",
  "price",
  "latitude",
  "longitude",
];

function TableView({ cars }: { cars: Car[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map(car => (
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
