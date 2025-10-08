import type { ReactNode } from "react";
import Footer from "@/widgets/layout/Footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}
