import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800">About Moringa Students Portal</h2>
        
        <p className="text-gray-700 mt-4 text-center">
          The <strong>Moringa Students Portal</strong> is an all-in-one platform designed to provide Moringa students and administrators with seamless access to academic and financial information. Students can create accounts, log in securely, and view their grades, fee balances, and current training phase. Additionally, the portal enables online payments, ensuring real-time updates to student accounts.
        </p>

        <p className="text-gray-700 mt-4">
          For administrators, the portal offers tools to manage student records, update details, and monitor payments effortlessly. This platform enhances transparency, streamlines communication, and simplifies academic management, creating a better experience for both students and administrators at Moringa School.
        </p>

        <div className="text-center mt-6">
          <a href="/contact" className="inline-block bg-black text-white py-2 px-6 rounded-lg hover:text-[#ff7d00] transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
