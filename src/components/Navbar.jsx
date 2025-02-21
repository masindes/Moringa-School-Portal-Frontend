import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#fdfdfd] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo & Name Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="src/assets/images/moringa-01.png" 
            alt="Moringa Logo" 
            className="w-48 h-auto object-contain" // ✅ Larger size, keeps aspect ratio
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/login" className="text-black hover:text-[#ff7d00] transition text-base">Login</Link>
          <Link 
            to="/signup" 
            className="bg-[#ff7d00] text-white px-6 py-2 rounded-lg hover:bg-black transition text-base"
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
        <div className="md:hidden bg-[#df872e] py-4 text-center">
          <Link to="/" className="block text-white py-2 hover:bg-[#000000] text-base">Home</Link>
          <Link to="/login" className="block text-white py-2 hover:bg-[#000000] text-base">Login</Link>

          <Link 
            to="/signup" 
            className="block bg-[#df872e] text-[#ffffff] py-2 mx-4 mt-2 rounded-lg hover:bg-[#000000] text-base"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
