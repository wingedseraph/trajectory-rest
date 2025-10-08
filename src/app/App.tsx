import { Suspense } from "react";
import { Provider } from "@/app/provider";
import { CarsProvider } from "@/app/store";
import MapView from "@/features/MapView/MapView";
import TableControl from "@/features/TableControl/TableControl";
import TableView from "@/features/TableView/TableView";
import { Spinner } from "@/shared/ui/Spinner/spinner";
import Layout from "@/widgets/layout/layout";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Provider>
          {cars => (
            <CarsProvider initialCars={cars}>
              <div className="flex flex-col gap-4">
                <TableControl />
                <TableView cars={cars} />
                <MapView />
              </div>
            </CarsProvider>
          )}
        </Provider>
      </Suspense>
    </Layout>
  );
}
