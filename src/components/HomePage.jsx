import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-center text-white"
        style={{
          backgroundImage: `url('/images/cod.jpg')`, 
          backgroundSize: "cover",
          
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Moringa Students Portal</h1>
        <p className="text-xl mb-6">Stay updated with the latest announcements and access key features.</p>
        {/* Removed the "Go to Dashboard" link */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Announcements Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Announcement Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📢</span>
                <h3 className="text-xl font-semibold">Exam Results</h3>
              </div>
              <p className="text-gray-600">Exam results will be released next week.</p>
            </div>

            {/* Announcement Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📅</span>
                <h3 className="text-xl font-semibold">New Semester</h3>
              </div>
              <p className="text-gray-600">New semester starts on March 1st, 2025.</p>
            </div>

            {/* Announcement Card 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">💰</span>
                <h3 className="text-xl font-semibold">Fee Payment</h3>
              </div>
              <p className="text-gray-600">Fee payment deadline: February 28th, 2025.</p>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/dashboard"
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition transform hover:scale-105"
            >
              <span className="text-4xl mb-4">📊</span>
              <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
              <p className="text-gray-600">Access your personalized dashboard.</p>
            </Link>

            <Link
              to="/grades"
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition transform hover:scale-105"
            >
              <span className="text-4xl mb-4">📖</span>
              <h3 className="text-xl font-semibold mb-2">Grades</h3>
              <p className="text-gray-600">Check your latest grades and progress.</p>
            </Link>

            <Link
              to="/payment"
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition transform hover:scale-105"
            >
              <span className="text-4xl mb-4">💰</span>
              <h3 className="text-xl font-semibold mb-2">Payment</h3>
              <p className="text-gray-600">Make fee payments securely online.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Removed */}
    </div>
  );
};

export default HomePage;