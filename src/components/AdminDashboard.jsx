import { useState, useEffect } from "react";
import { UserCheck, Users, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalType("student");
    setShowModal(true);
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setModalType("payment");
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <UserCheck className="w-12 h-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold">Manage Students</h2>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleEditStudent(students[0])}
          >
            View Students
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold">Student Details</h2>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => handleEditStudent(students[1])}
          >
            View Details
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <DollarSign className="w-12 h-12 text-yellow-600 mb-4" />
          <h2 className="text-xl font-semibold">Payments</h2>
          <button
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => handleEditPayment(payments[0])}
          >
            Manage Payments
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {modalType === "student" && selectedStudent && (
              <>
                <h2 className="text-xl font-bold mb-4">Edit Student</h2>
                <input
                  type="text"
                  className="w-full border p-2 mb-3"
                  value={selectedStudent.name}
                  onChange={(e) =>
                    setSelectedStudent({ ...selectedStudent, name: e.target.value })
                  }
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </>
            )}

            {modalType === "payment" && selectedPayment && (
              <>
                <h2 className="text-xl font-bold mb-4">Edit Payment</h2>
                <input
                  type="text"
                  className="w-full border p-2 mb-3"
                  value={selectedPayment.amount}
                  onChange={(e) =>
                    setSelectedPayment({ ...selectedPayment, amount: e.target.value })
                  }
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
