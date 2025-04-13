// src/App.jsx
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import AvailablePets from "./pages/AvailablePets";
import SoldoutPets from "./pages/SoldoutPets";
import PetMating from "./pages/PetMating";
import PetsSoldHistory from "./pages/PetsSoldHistory";
import BoardingShop from "./pages/BoardingShop";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("available-pets");

  const renderContent = () => {
    switch (activeTab) {
      case "available-pets":
        return <AvailablePets />;
      case "soldout-pets":
        return <SoldoutPets />;
      case "pet-mating":
        return <PetMating />;
      case "pets-sold-history":
        return <PetsSoldHistory />;
      case "boarding-shop":
        return <BoardingShop />;
      default:
        return <AvailablePets />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
    </div>
  );
}

export default App;



// src/App.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import VendorLogin from "./pages/Auth/VendorLogin";
// import VendorSignup from "./pages/Auth/VendorSignup";
// import DashboardApp from "./pages/DashboardApp";

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<VendorLogin />} />
//       <Route path="/signup" element={<VendorSignup />} />
//       <Route path="/dash" element={<DashboardApp />} />
//     </Routes>
//   );
// }

// export default App;

