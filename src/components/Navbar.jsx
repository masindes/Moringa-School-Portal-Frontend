import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem("student_id");
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) fetchNotifications(token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = (token) => {
    fetch(`${API_URL}/my/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setNotifications(Array.isArray(data) ? data.filter(n => n.status === "unread") : []))
      .catch(() => {});
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    navigate("/logout");
  };

  const unreadCount = notifications.length;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/moringa-01.png" alt="Moringa Logo" className="w-48 h-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              {/* Notification Bell */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} className="relative text-black">
                  <Bell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl p-3 z-50 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-700 font-semibold text-sm">Notifications</h3>
                      <Link to="/notifications" onClick={() => setShowDropdown(false)} className="text-xs text-orange-500 hover:underline">
                        View all
                      </Link>
                    </div>
                    {notifications.length > 0 ? (
                      notifications.slice(0, 4).map((n) => (
                        <div key={n.id} className="border-b border-gray-100 py-2 text-sm text-gray-700 last:border-0">
                          {n.message}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm text-center py-2">No new notifications</p>
                    )}
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold hover:text-white hover:bg-red-600 transition border border-red-600 px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-[#ff7d00] text-white px-6 py-2 rounded-lg hover:bg-black transition text-base">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#df872e] py-4 text-center space-y-2">
          {isAuthenticated ? (
            <>
              {unreadCount > 0 && (
                <Link to="/notifications" onClick={() => setIsOpen(false)}
                  className="block text-white py-2 font-medium">
                  🔔 {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
                </Link>
              )}
              <button onClick={() => { setIsOpen(false); handleLogout(); }}
                className="block text-white bg-red-600 py-2 px-6 mx-auto rounded-lg font-semibold w-fit">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}
              className="block bg-white text-orange-600 px-6 py-2 mx-auto rounded-lg font-semibold w-fit">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
