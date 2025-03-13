import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Title Outside the Card */}
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        About Moringa Students Portal
      </h2>

      {/* Card Container */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Grid Layout for Image and Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src="public/images/about.jpg" 
              alt="Moringa School"
              className="w-full max-w-lg rounded-lg shadow-md" 
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-700 text-center md:text-left">
              The <strong>Moringa Students Portal</strong> is an all-in-one platform designed to provide Moringa students and administrators with seamless access to academic and financial information. Students can create accounts, log in securely, and view their grades, fee balances, and current training phase. Additionally, the portal enables online payments, ensuring real-time updates to student accounts.
            </p>
            <p className="text-gray-700 mt-4 text-center md:text-left">
              For administrators, the portal offers tools to manage student records, update details, and monitor payments effortlessly. This platform enhances transparency, streamlines communication, and simplifies academic management, creating a better experience for both students and administrators at Moringa School.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Button Outside the Card */}
      <div className="text-center mt-8">
        <a
          href="/contact"
          className="inline-block bg-black text-white py-2 px-6 rounded-lg hover:text-[#ff7d00] transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default About;