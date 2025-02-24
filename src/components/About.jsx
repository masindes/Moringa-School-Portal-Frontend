import React from "react";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
      style={{
        backgroundImage: "url('src/assets/images/laptop.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps background static while scrolling
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="relative z-10 text-white text-center max-w-4xl">
        <h2 className="text-4xl font-semibold mb-6">About Moringa Students Portal</h2>
        <p className="text-lg">
          The <strong>Moringa Students Portal</strong> is an all-in-one platform designed to provide students and administrators with seamless access to academic and financial information. Students can log in, view grades, check fee balances, and manage their learning progress effortlessly.
        </p>
        <p className="text-lg mt-4">
          Administrators can manage student records, update information, and track payments efficiently, enhancing communication and transparency within Moringa School.
        </p>
      </div>

      {/* Card Section Below the Background */}
      <div className="relative z-10 max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8 mt-12">
        {/* Grid Layout for Image and Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src="src/assets/images/about.jpg"
              alt="Moringa School"
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-gray-700">
            <p className="text-center md:text-left">
              Our student portal is designed to simplify student and admin interactions. With features like user authentication, grade tracking, and online payments, managing academic life at Moringa has never been easier.
            </p>
            <p className="mt-4 text-center md:text-left">
              We aim to enhance efficiency, transparency, and accessibility, ensuring a smooth learning experience for everyone at Moringa School.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Button Outside the Card */}
      <div className="text-center mt-8 relative z-10">
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
