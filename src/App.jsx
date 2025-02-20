import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import ResetPassword from "./components/ResetPassword";
import ManagePayments from "./components/ManagePayments";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Always Visible */}
        <Navbar />

        {/* Route-based Rendering */}
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/manage-payments" element={<ManagePayments />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
