import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-300 pb-10 shadow-lg pt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img 
            src="src/assets/images/moringa-01.png"  // Ensure this path is correct
            alt="Moringa Logo" 
            className="w-24 md:w-28" 
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0 text-sm">
          <Link to="/login" className="hover:text-[#ff7d00]">Home</Link>
          <Link to="/about" className="hover:text-[#ff7d00]">About</Link>
          <Link to="/contact" className="hover:text-[#ff7d00]">Contact</Link>
          <Link to="/help" className="hover:text-[#ff7d00]">Help Center</Link>
        </nav>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs text-black mt-4">
        &copy; {new Date().getFullYear()} Moringa School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;