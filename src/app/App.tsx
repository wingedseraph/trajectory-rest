import { Suspense } from "react";
import TableView from "@/features/TableView/TableView";
import { Skeleton } from "@/shared/ui/Skeleton/skeleton";
import Layout from "@/widgets/layout/layout";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <TableView />
      </Suspense>
    </Layout>
  );
}
