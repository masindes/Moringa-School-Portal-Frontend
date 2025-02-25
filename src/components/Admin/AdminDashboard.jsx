import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails) {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      setStudents(storedStudents);
    }
  }, [showDetails]);

  // Function to handle payments navigation
  const handlePaymentsNavigation = (e) => {
    e.stopPropagation(); // Prevent interference
    navigate("/admin-payments"); // Ensure this route exists
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Admin Dashboard
        </span>
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Students Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <UserCheck className="w-12 h-12 text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100">Manage Students</h2>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => navigate("/manage-student")}
          >
            View Students
          </button>
        </div>

        {/* Student Details Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <Users className="w-12 h-12 text-green-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100">Student Details</h2>
          <button
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>

        {/* Payments Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <DollarSign className="w-12 h-12 text-yellow-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100">Payments</h2>
          <button
            className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300"
            onClick={handlePaymentsNavigation}
          >
            Manage Payments
          </button>
        </div>
      </div>

      {/* Student Details Section */}
      {showDetails && (
        <div className="mt-8 p-6 bg-gray-800 shadow-2xl rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">All Student Details</h2>
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.id}
                className="border-b border-gray-700 py-4 last:border-b-0"
              >
                <p className="text-gray-200">
                  <strong>Name:</strong> {student.name}
                </p>
                <p className="text-gray-200">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-gray-200">
                  <strong>Grade:</strong> {student.grade}
                </p>
                <h3 className="font-semibold mt-2 text-gray-200">Current Phase:</h3>
                <ul className="list-disc pl-5 text-gray-300">
                  {student.currentPhase.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No students available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;