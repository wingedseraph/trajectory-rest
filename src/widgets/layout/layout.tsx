import type { ReactNode } from "react";
import Footer from "@/widgets/layout/Footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
