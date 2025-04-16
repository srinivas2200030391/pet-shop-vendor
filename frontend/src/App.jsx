// src/App.jsx
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import AvailablePets from "./pages/AvailablePets";
import SoldoutPets from "./pages/SoldoutPets";
import PetMating from "./pages/MatingPets";
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
// import { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import VendorLogin from "./pages/Auth/VendorLogin";
// import VendorSignup from "./pages/Auth/VendorSignup";
// import DashboardApp from "./pages/DashboardApp";
// import axios from "axios";
// import config from "./config"; // Make sure the config is imported

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // Check if the user is authenticated on page load
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(`${config.baseURL}/api/vendors/check`, { withCredentials: true });
//         if (res.status === 200) {
//           setAuthenticated(true);
//         } else {
//           setAuthenticated(false);
//         }
//       } catch (error) {
//         setAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (authenticated) {
//     return (
//       <Routes>
//         <Route path="/vendor/dashboard" element={<DashboardApp />} />
//         {/* Add other protected routes here */}
//       </Routes>
//     );
//   } else {
//     return (
//       <Routes>
//         <Route path="/vendor/login" element={<VendorLogin />} />
//         <Route path="/vendor/signup" element={<VendorSignup />} />
//         {/* Redirect unauthenticated users to login */}
//         <Route path="*" element={<VendorLogin />} />
//       </Routes>
//     );
//   }
// }

// export default App;
