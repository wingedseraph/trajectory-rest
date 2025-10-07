import { Suspense } from "react";
import { Provider } from "@/app/provider";
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
            <>
              <TableControl />
              <TableView cars={cars} />
              <MapView />
            </>
          )}
        </Provider>
      </Suspense>
    </Layout>
  );
}
