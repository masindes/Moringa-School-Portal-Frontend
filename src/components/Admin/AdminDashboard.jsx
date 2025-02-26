import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, CreditCard, Activity } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Load students from localStorage when showDetails is toggled
  useEffect(() => {
    if (showDetails) {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      setStudents(storedStudents);
    }
  }, [showDetails]);

  // Function to navigate to payments
  const handlePaymentsNavigation = (e) => {
    e.stopPropagation();
    navigate("/admin-payments");
  };

  // Function to toggle student activation status
  const toggleActivation = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, isActive: !student.isActive } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text inline-block">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Manage students, payments, and more.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Manage Students Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 hover:shadow-purple-500/50">
          <UserCheck className="w-12 h-12 text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Manage Students</h2>
          <p className="text-gray-400 text-center mb-4">
            View and manage all student records.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => {
              navigate("/manage-student");
              setShowDetails(true); // Show student details when navigating
            }}
          >
            View Students
          </button>
        </div>

        {/* Payments Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 hover:shadow-yellow-500/50">
          <CreditCard className="w-12 h-12 text-yellow-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Payments</h2>
          <p className="text-gray-400 text-center mb-4">
            Manage and track student payments.
          </p>
          <button
            className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300"
            onClick={handlePaymentsNavigation}
          >
            Manage Payments
          </button>
        </div>

        {/* Analytics Card */}
        <div className="bg-gray-800 shadow-2xl rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 hover:shadow-green-500/50">
          <Activity className="w-12 h-12 text-green-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Analytics</h2>
          <p className="text-gray-400 text-center mb-4">
            View insights and performance metrics.
          </p>
          <button
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={() => navigate("/admin-analytics")}
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Student Details Section */}
      {showDetails && (
        <div className="mt-8 p-6 bg-gray-800 shadow-2xl rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">All Student Details</h2>
          {students.length > 0 ? (
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div>
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
                        {student.currentPhase?.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                      <p className="text-gray-400 mt-2">
                        <strong>Status:</strong>{" "}
                        <span
                          className={student.isActive ? "text-green-400" : "text-red-400"}
                        >
                          {student.isActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                        student.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      onClick={() => toggleActivation(student.id)}
                    >
                      {student.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No students available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;