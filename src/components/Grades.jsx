import React from "react";

const Grades = () => {
  // Mock Data
  const grades = [
    { course: "Web Development", grade: "A" },
    { course: "Data Science", grade: "B+" },
    { course: "Cyber Security", grade: "A-" },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">📖 Grades</h2>
      <ul className="mt-3">
        {grades.map((g, index) => (
          <li key={index} className="text-gray-700">{g.course}: <strong>{g.grade}</strong></li>
        ))}
      </ul>
    </div>
  );
};

export default Grades;
