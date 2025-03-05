import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaMoon, FaSun, FaArrowLeft, FaBars } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  if (!student) {
    return <p className="text-red-500">Invalid student data.</p>;
  }

  const { first_name, last_name, total_fee = 0, amount_paid = 0, id } = student;
  const studentName = `${first_name} ${last_name}`;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{studentName}</h2>
      <p className="text-gray-600 dark:text-gray-300">Total Fees: Ksh {total_fee.toLocaleString()}</p>
      <p className="text-green-600 dark:text-green-400">Paid Amount: Ksh {amount_paid.toLocaleString()}</p>
      <p className="text-red-600 dark:text-red-400">
        Outstanding Balance: Ksh {(total_fee - amount_paid).toLocaleString()}
      </p>
      <div className="mt-3 flex space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center hover:bg-yellow-600 transition-colors"
          onClick={() => onEdit(student)}
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600 transition-colors"
          onClick={() => onDelete(id)}
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

StudentPaymentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    total_fee: PropTypes.number.isRequired,
    amount_paid: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const ManageStudentPayments = () => {
  const [students, setStudents] = useState([]);
  const [newPayment, setNewPayment] = useState({
    first_name: "",
    last_name: "",
    total_fee: "",
    amount_paid: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch students. Please try again.");
      console.error("Error fetching students:", error);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL,
        {
          ...newPayment,
          outstanding_balance: newPayment.total_fee - newPayment.amount_paid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents([...students, response.data]);
      setNewPayment({
        first_name: "",
        last_name: "",
        total_fee: "",
        amount_paid: "",
      });
      setIsSidebarOpen(false);
      toast.success("Payment added successfully!");
    } catch (error) {
      setError("Failed to add payment. Please try again.");
      console.error("Error adding payment:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student.id !== id));
      toast.info("Student payment deleted successfully!");
    } catch (error) {
      setError("Failed to delete student payment. Please try again.");
      console.error("Error deleting student payment:", error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewPayment(student);
    setIsSidebarOpen(true);
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${API_URL}/${editingStudent.id}`,
        {
          ...newPayment,
          outstanding_balance: newPayment.total_fee - newPayment.amount_paid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(students.map((student) => (student.id === editingStudent.id ? response.data : student)));
      setEditingStudent(null);
      setNewPayment({
        first_name: "",
        last_name: "",
        total_fee: "",
        amount_paid: "",
      });
      setIsSidebarOpen(false);
      toast.success("Payment updated successfully!");
    } catch (error) {
      setError("Failed to update payment. Please try again.");
      console.error("Error updating payment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex">
        {/* Sidebar Drawer */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform z-20`}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {editingStudent ? "Edit Payment" : "Add Payment"}
            </h3>
            <form onSubmit={editingStudent ? handleUpdatePayment : handleAddPayment} className="space-y-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={newPayment.first_name}
                onChange={(e) => setNewPayment({ ...newPayment, first_name: e.target.value })}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={newPayment.last_name}
                onChange={(e) => setNewPayment({ ...newPayment, last_name: e.target.value })}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
              />
              <input
                type="number"
                name="total_fee"
                placeholder="Total Fee"
                value={newPayment.total_fee}
                onChange={(e) => setNewPayment({ ...newPayment, total_fee: e.target.value })}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
              />
              <input
                type="number"
                name="amount_paid"
                placeholder="Amount Paid"
                value={newPayment.amount_paid}
                onChange={(e) => setNewPayment({ ...newPayment, amount_paid: e.target.value })}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {editingStudent ? "Update Payment" : "Add Payment"}
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded flex items-center hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              <FaBars className="mr-2" /> Menu
            </button>
            <NavLink to="/Admin" className="flex items-center text-blue-500 hover:text-blue-600">
              <FaArrowLeft className="mr-2" /> Back to Admin Dashboard
            </NavLink>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded flex items-center hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <FaSun className="mr-1" /> : <FaMoon className="mr-1" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No payments found.</p>
            ) : (
              students.map((student) => (
                <StudentPaymentCard
                  key={student.id}
                  student={student}
                  onDelete={handleDeleteStudent}
                  onEdit={handleEditStudent}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPayments;