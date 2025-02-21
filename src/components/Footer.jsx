import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img 
            src="src/assets/images/moringa-01.png" 
            alt="Moringa Logo" 
            className="w-24 md:w-28" // Increased size for better visibility
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0 text-sm">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
          <Link to="/contact" className="hover:text-gray-600">Contact</Link>
          <Link to="/help" className="hover:text-gray-600">Help Center</Link>
        </nav>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Moringa School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
