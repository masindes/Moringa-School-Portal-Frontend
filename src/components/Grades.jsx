import React from "react";

const Grades = () => {
  // Mock Data
  const grades = [
    { course: "Software Development", grade: "Merit" },
    // { course: "Data Science", grade: "B+" },
    // { course: "Cyber Security", grade: "A-" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">📖 Grades</h2>

      {/* Grades Table */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b border-gray-300">
              <th className="pb-2">Course</th>
              <th className="pb-2 text-right">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, index) => (
              <tr key={index} className="border-b border-gray-300 last:border-0">
                <td className="py-2 text-gray-800">{g.course}</td>
                <td className="py-2 font-bold text-right text-blue-600">{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grades;
