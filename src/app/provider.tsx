import type { ReactNode } from "react";

import { ErrorBoundary } from "@/shared/ui/ErrorBoundary/ErrorBoundary";

export function Provider({
  children,
}: {
  children: ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
