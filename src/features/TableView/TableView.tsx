import type { Car } from "@/lib/apiTypes";

export default function TableView({ cars }: { cars: Car[] }) {
  return <>{cars.length > 0 && cars.map(car => <p>{car.model}</p>)}</>;
}
