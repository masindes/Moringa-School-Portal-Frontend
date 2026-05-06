import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const gradeColor = (grade) => {
  if (!grade) return "text-gray-500";
  const g = grade.toUpperCase();
  if (g === "A" || g === "A+" || g === "MERIT" || g === "DISTINCTION") return "text-green-600";
  if (g === "B" || g === "B+") return "text-blue-600";
  if (g === "C" || g === "C+") return "text-yellow-600";
  return "text-red-500";
};

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    const token = localStorage.getItem("token");
    if (!studentId || !token) { setLoading(false); return; }

    fetch(`${API_URL}/students/${studentId}/grades`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setGrades(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Failed to load grades."); setLoading(false); });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">📖 Grades</h2>
      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-sm">{error}</p>
      ) : grades.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">No grades recorded yet.</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300">
                <th className="pb-2">Course</th>
                <th className="pb-2 text-right">Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-b border-gray-300 last:border-0">
                  <td className="py-2 text-gray-800">{g.course}</td>
                  <td className={`py-2 font-bold text-right ${gradeColor(g.grade)}`}>{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Grades;
