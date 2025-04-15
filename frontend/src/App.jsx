// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorLogin from "./pages/Auth/VendorLogin";
import VendorSignup from "./pages/Auth/VendorSignup";
import DashboardApp from "./pages/DashboardApp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VendorLogin />} />
      <Route path="/signup" element={<VendorSignup />} />
      <Route path="/dash" element={<DashboardApp />} />
    </Routes>
  );
}

export default App;

