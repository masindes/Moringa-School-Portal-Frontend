import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grades from "./Grades";
import FeeBalance from "./FeeBalance";
import CurrentPhase from "./CurrentPhase";
import { Moon, Sun, CreditCard, BarChart2, Layers, LogOut, ArrowLeft } from "lucide-react";

const StudentDashboard = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 dark:bg-gray-800 shadow-lg p-6 flex flex-col justify-between transition-all">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🎓 Student Portal
          </h2>

          <nav className="mt-6 space-y-4">
            <Link
              to="/grades"
              className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition"
            >
              <BarChart2 size={20} /> Grades
            </Link>

            <Link
              to="/fee-balance"
              className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition"
            >
              <CreditCard size={20} /> Fee Balance
            </Link>

            <Link
              to="/current-phase"
              className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition"
            >
              <Layers size={20} /> Current Phase
            </Link>
          </nav>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />} Toggle Theme
        </button>

        {/* <button className="flex items-center gap-3 text-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-90 p-2 rounded-md transition">
          <LogOut size={20} /> Logout
        </button> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            to="/home-page"
            className="flex items-center text-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 transition"
          >
            <ArrowLeft size={24} /> Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📊 Student Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Your academic and financial overview.
        </p>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Grades />
          <FeeBalance />
          <CurrentPhase />
        </div>

        {/* Payment Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/payment"
            className="p-3 bg-[#ff7d00] hover:bg-orange-600 transition-all text-white rounded-lg text-center text-lg w-full max-w-xs shadow-lg"
          >
            💳 Make a Payment
          </Link>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
