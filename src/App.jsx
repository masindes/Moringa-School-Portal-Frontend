import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import ResetPassword from "./components/ResetPassword";
import ManagePayments from "./components/ManagePayments";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About"; // Import About Page

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar Always Visible */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/manage-payments" element={<ManagePayments />} />
            <Route path="/signup" element={<AuthForm type="signup" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} /> {/* About Page Route */}
            <Route path="/" element={<h1 className="text-center mt-10">Home Page</h1>} />
          </Routes>
        </div>

        {/* Footer Always Visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
