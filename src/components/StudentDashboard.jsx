import React from "react";
import { Link } from "react-router-dom";
import Grades from "./Grades";
import FeeBalance from "./FeeBalance";
import CurrentPhase from "./CurrentPhase";

const StudentDashboard = () => {
  return (
    <div className="p-6 center-top">
      <h1 className="text-3xl font-bold">📊 Student Dashboard</h1>
      <p className="text-gray-700">Your academic and financial overview.</p>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Grades />
        <FeeBalance />
        <CurrentPhase />
      </div>

      {/* Payment Link */}
      {/* <div className="mt-6">
        <Link to="/payment" className="p-4 bg-black text-white rounded-lg block text-center">💳 Make a Payment</Link>
      </div> */}
    </div>
  );
};

export default StudentDashboard;
