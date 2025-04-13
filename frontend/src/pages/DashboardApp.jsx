import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import AvailablePets from "./AvailablePets"
import SoldoutPets from "./SoldoutPets";
import PetMating from "./PetMating";
import PetsSoldHistory from "./PetsSoldHistory";
import BoardingShop from "./BoardingShop";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthstore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";


function DashboardApp() {
  const [activeTab, setActiveTab] = useState("available-pets");
  const { authUser, checkAuth, ischeckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (ischeckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

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
      <Toaster />
    </div>
  );
}

export default DashboardApp;
