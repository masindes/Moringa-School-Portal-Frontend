import React, { useState } from "react";
import pexelsImage from "/images/pexels.jpg"; // Import the image

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can integrate with backend API here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${pexelsImage})`, 
      }}
    >
      <div className="max-w-3xl w-full bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Contact Us</h2>
        <p className="text-center text-gray-600 mt-2">
          Have questions? We'd love to hear from you.
        </p>

        {/* Contact Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:text-[#ff7d00] transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-6 text-center text-gray-700">
          <p><strong>Email:</strong> contact@moringa.com</p>
          <p><strong>Phone:</strong> +254 700 123 456</p>
          <p><strong>Address:</strong> Nairobi, Kenya</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;