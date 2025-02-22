import React from "react";
import { Link } from "react-router-dom";
import Grades from "./Grades";
import FeeBalance from "./FeeBalance";
import CurrentPhase from "./CurrentPhase";

const StudentDashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center">📊 Student Dashboard</h1>
      <p className="text-gray-700 text-center">Your academic and financial overview.</p>

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
          className="p-3 bg-[#ff7d00] text-white rounded-lg text-center text-lg w-full max-w-xs"
        >
          💳 Make a Payment
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
