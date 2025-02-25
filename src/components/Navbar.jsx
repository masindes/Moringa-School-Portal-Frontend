import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); 
    setIsAuthenticated(!!token); 
  }, []);

  // Handle Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token"); 
      setIsAuthenticated(false); 
      console.log("User logged out. Token removed."); 
      navigate("/login"); 
    }
  };

  console.log("isAuthenticated:", isAuthenticated); 

  return (
    <nav className="bg-[#ffffff] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="src/assets/images/moringa-01.png" 
            alt="Moringa Logo" 
            className="w-48 h-auto object-contain" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            // Display Logout button if authenticated
            <button 
              onClick={handleLogout} 
              className="text-red-600 font-semibold hover:text-black transition text-base border border-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            // Display Sign Up and Login buttons if not authenticated
            <>
              <Link to="/signup" className="bg-[#ff7d00] text-white px-6 py-2 rounded-lg hover:bg-black transition text-base">
                Sign Up
              </Link>
              <Link to="/login" className="text-black hover:text-[#ff7d00] transition text-base">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#df872e] py-4 text-center">
          {!isAuthenticated ? (
            // Display Sign Up and Login buttons if not authenticated
            <>
              <Link 
                to="/signup" 
                className="block bg-[#df872e] text-[#ffffff] py-2 mx-4 mt-2 rounded-lg hover:bg-[#000000] text-base"
              >
                Sign Up
              </Link>
              <Link to="/login" className="block text-white py-2 hover:bg-[#000000] text-base">
                Login
              </Link>
            </>
          ) : (
            // Display Logout button if authenticated
            <button 
              onClick={handleLogout} 
              className="block text-red-600 py-2 w-full hover:bg-black text-base"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;