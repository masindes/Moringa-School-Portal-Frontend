import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#ffffff] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo & Name Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="src/assets/images/logo1.png" alt="Moringa Logo" className="w-12 h-12" />
          <span className="text-black text-2xl font-bold">Moringa School</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-black hover:text-blue-600 transition text-base">Home</Link>
          <Link to="/login" className="text-black hover:text-blue-600 transition text-base">Login</Link>
          <Link 
            to="/signup" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 py-4 text-center">
          <Link to="/" className="block text-white py-2 hover:bg-blue-500 text-base">Home</Link>
          <Link to="/login" className="block text-white py-2 hover:bg-blue-500 text-base">Login</Link>
          <Link to="/manage-payments" className="block text-white py-2 hover:bg-blue-500 text-base">Payments</Link>
          <Link 
            to="/signup" 
            className="block bg-white text-blue-600 py-2 mx-4 mt-2 rounded-lg hover:bg-gray-200 text-base"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
