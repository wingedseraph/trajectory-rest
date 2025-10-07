import { Suspense } from "react";
import { Provider } from "@/app/provider";
import TableView from "@/features/TableView/TableView";
import { Skeleton } from "@/shared/ui/Skeleton/skeleton";
import Layout from "@/widgets/layout/layout";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <Provider>
          {cars => <TableView cars={cars} />}
        </Provider>
      </Suspense>
    </Layout>
  );
}
