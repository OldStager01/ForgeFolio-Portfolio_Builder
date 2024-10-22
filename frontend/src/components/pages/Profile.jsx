import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Personal from "../sections/Personal.jsx";

export default function MainBody() {
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </main>
  );
}
