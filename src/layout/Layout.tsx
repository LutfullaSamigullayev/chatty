import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet /> {/* Sahifa kontenti shu yerda ko‘rinadi */}
      </main>
    </div>
  );
}
