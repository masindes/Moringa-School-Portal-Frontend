import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      loadMockNotifications(); // Load mock data instead of API call
    }
  }, []);

  // Load Mock Notifications
  const loadMockNotifications = () => {
    const mockNotifications = [
      { id: 1, message: "Your grades have been updated!" },
      { id: 2, message: "Your fee balance is due next week." },
      { id: 3, message: "You have been moved to Phase 2!" },
    ];
    setNotifications(mockNotifications);
  };

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <nav className=" shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/images/moringa-01.png" 
            alt="Moringa Logo" 
            className="w-48 h-auto object-contain" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)} 
                  className="relative text-black"
                >
                  <Bell size={24} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-6 shadow-lg rounded-lg p-2">
                    <h3 className="text-gray-700 font-semibold mb-2">Notifications</h3>
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div key={notif.id} className="border-b border-gray-200 p-2 text-sm">
                          {notif.message}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No new notifications</p>
                    )}
                  </div>
                )}
              </div>

              {/* Logout Button */}
               <button 
                onClick={handleLogout} 
                className="text-red-600 font-semibold hover:text-black transition text-base border border-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button> 
            </>
          ) : (
            // Sign In Button for Unauthenticated Users
            <Link 
              to="/" 
              className="bg-[#ff7d00] text-white px-6 py-2 rounded-lg hover:bg-black transition text-base"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#ff7d00] py-4 text-center">
          {isAuthenticated ? (
            // Logout Button for Authenticated Users
            <button 
              onClick={handleLogout} 
              className="block  py-2 w-full hover:bg-black text-base"
            >
              Logout
            </button>
          ) : (
            // Sign In Button for Unauthenticated Users
            <Link 
              to="/login" 
              className="block  text-white px-6 py-2 mx-4 rounded-l text-base"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;