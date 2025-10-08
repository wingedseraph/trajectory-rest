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
      <Suspense fallback={(
        <div className="flex items-center justify-center h-screen w-screen">
          <Spinner />
        </div>
      )}
      >
        <Provider>
          {cars => (
            <CarsProvider initialCars={cars}>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-col gap-4 flex-1">
                  <TableControl />
                  <TableView cars={cars} />
                </div>
                <div className="flex-1 min-h-96">
                  <MapView cars={cars} />
                </div>
              </div>
            </CarsProvider>
          )}
        </Provider>
      </Suspense>
    </Layout>
  );
}
