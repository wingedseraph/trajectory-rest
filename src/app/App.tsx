import { Suspense } from "react";
import { Provider } from "@/app/provider";
import MapView from "@/features/MapView/MapView";
import TableControl from "@/features/TableControl/TableControl";
import TableView from "@/features/TableView/TableView";
import { Skeleton } from "@/shared/ui/Skeleton/skeleton";
import Layout from "@/widgets/layout/layout";

export default function App() {
  return (
    <Layout>
      <div className="min-h-screen grid place-items-center p-4">
        <Suspense
          fallback={(
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[160px]" />
                <Skeleton className="h-4 sm:w-[200px] w-[120px]" />
              </div>
            </div>
          )}
        >
          <Provider>
            {cars => (
              <div className="">
                <TableControl />
                <Suspense fallback={<Skeleton className="h-24 w-full" />}>
                  <TableView cars={cars} />
                </Suspense>
                <MapView />
              </div>
            )}
          </Provider>
        </Suspense>
      </div>
    </Layout>
  );
}
