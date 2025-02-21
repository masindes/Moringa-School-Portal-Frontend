import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to Moringa Students Portal</h1>
      <p className="text-center text-gray-700 mt-2">Stay updated with the latest announcements and access key features.</p>

      {/* Announcements Section */}
      <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Announcements</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>📢 Exam results will be released next week.</li>
          <li>📅 New semester starts on March 1st, 2025.</li>
          <li>💰 Fee payment deadline: February 28th, 2025.</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard" className="p-4 bg-blue-500 text-white rounded-lg text-center">📊 Dashboard</Link>
        <Link to="/grades" className="p-4 bg-green-500 text-white rounded-lg text-center">📖 Grades</Link>
        <Link to="/payment" className="p-4 bg-yellow-500 text-white rounded-lg text-center">💰 Payment</Link>
      </div>
    </div>
  );
};

export default HomePage;
