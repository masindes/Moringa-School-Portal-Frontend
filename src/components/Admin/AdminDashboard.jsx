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
    e.stopPropagation();
    navigate("/admin-payments"); 
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Students Button */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <UserCheck className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold">Manage Students</h2>
          <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/manage-student")}
          >
            View Students
          </button>
        </div>

        {/* Student Details Button */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold">Student Details</h2>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>

        {/* Payments Button */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <DollarSign className="w-12 h-12 text-yellow-600 mb-4" />
          <h2 className="text-xl font-semibold">Payments</h2>
          <button 
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={handlePaymentsNavigation} 
          >
            Manage Payments
          </button>
        </div>
      </div>

      {/* Show Student Details when button is clicked */}
      {showDetails && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">All Student Details</h2>
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student.id} className="border-b py-4">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <h3 className="font-semibold mt-2">Current Phase:</h3>
                <ul className="list-disc pl-5">
                  {student.currentPhase.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No students available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;