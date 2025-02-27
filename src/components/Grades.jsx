import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Grades = () => {
  const navigate = useNavigate();

  // Mock Data
  const grades = [
    { course: "Web Development", grade: "A" },
    { course: "Data Science", grade: "B+" },
    { course: "Cyber Security", grade: "A-" },
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-full max-w-md mx-auto">
      {/* Back Button */}
      <button 
        className="flex items-center text-gray-300 hover:text-gray-100 mb-4"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-200 text-center mb-4">📖 Grades</h2>

      {/* Grades Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-600">
              <th className="pb-2">Course</th>
              <th className="pb-2 text-right">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-0">
                <td className="py-2 text-gray-300">{g.course}</td>
                <td className="py-2 font-bold text-right text-green-400">{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grades;
