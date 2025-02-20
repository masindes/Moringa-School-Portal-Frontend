import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Moringa Portal</h1>
        <div>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/login" className="mx-2">Login</Link>
        </div>
      </div>
    </nav>
  );
};

// ✅ Make sure to export it as default
export default Navbar;
