import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaMoneyCheckAlt, FaEdit, FaTrash, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";

const StudentPaymentCard = ({ student, onEdit, onDelete }) => {
  if (!student) {
    return <p className="text-red-500">Invalid student data.</p>;
  }

  const { studentName = "Unknown", totalFees = 0, paidAmount = 0, id } = student;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{studentName}</h2>
      <p className="text-gray-600 dark:text-gray-300">Total Fees: Ksh {totalFees.toLocaleString()}</p>
      <p className="text-green-600 dark:text-green-400">Paid Amount: Ksh {paidAmount.toLocaleString()}</p>
      <p className="text-red-600 dark:text-red-400">
        Outstanding Balance: Ksh {(totalFees - paidAmount).toLocaleString()}
      </p>
      <div className="mt-3 flex space-x-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded flex items-center hover:bg-green-700 transition-colors"
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
    studentName: PropTypes.string.isRequired,
    totalFees: PropTypes.number.isRequired,
    paidAmount: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const AdminPayments = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    totalFees: "",
    paidAmount: "",
  });
  const [editingPayment, setEditingPayment] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("https://moringa-school-portal-backend.onrender.com/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", response.data); // Debugging

      // Transform the API response to match the expected format
      const transformedPayments = response.data.map((payment) => ({
        id: payment.id,
        studentName: `Student ${payment.student_id}`, // Placeholder, replace with actual student name if available
        totalFees: 1000, // Placeholder, replace with actual total fees if available
        paidAmount: parseFloat(payment.amount), // Use the amount from the API response
      }));

      setPayments(transformedPayments);
      setError(null);
    } catch (error) {
      setError("Failed to fetch payments. Please try again.");
      console.error("Error fetching payments:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    const formattedPayment = {
      studentName: newPayment.studentName,
      totalFees: parseFloat(newPayment.totalFees) || 0,
      paidAmount: parseFloat(newPayment.paidAmount) || 0,
    };

    try {
      if (editingPayment) {
        await axios.patch(
          `https://moringa-school-portal-backend.onrender.com/students/${editingPayment.id}/payments`,
          formattedPayment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPayments(
          payments.map((payment) =>
            payment.id === editingPayment.id ? { ...editingPayment, ...formattedPayment } : payment
          )
        );
        setEditingPayment(null);
      } else {
        const studentId = newPayment.studentId; // Ensure this is defined
        const response = await axios.post(
          `https://moringa-school-portal-backend.onrender.com/students/${studentId}/payments`,
          formattedPayment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPayments([...payments, response.data]);
      }
      setNewPayment({ studentName: "", totalFees: "", paidAmount: "" });
      setError(null);
    } catch (error) {
      setError("Failed to add/update payment. Please try again.");
      console.error("Error adding/updating payment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://moringa-school-portal-backend.onrender.com/students/${id}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(payments.filter((payment) => payment.id !== id));
      setError(null);
    } catch (error) {
      setError("Failed to delete payment. Please try again.");
      console.error("Error deleting payment:", error);
    }
  };

  const handleEdit = (payment) => {
    if (!payment) {
      setError("Invalid payment data.");
      return;
    }
    setEditingPayment(payment);
    setNewPayment({
      studentName: payment.studentName || "",
      totalFees: payment.totalFees?.toString() || "",
      paidAmount: payment.paidAmount?.toString() || "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FaMoneyCheckAlt className="text-green-500 mr-2" /> Payment Management
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded flex items-center hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? <FaSun className="mr-1" /> : <FaMoon className="mr-1" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              {editingPayment ? "Edit Payment" : "Add Payment"}
            </h3>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={newPayment.studentName}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
              />
              <input
                type="number"
                name="totalFees"
                placeholder="Total Fees"
                value={newPayment.totalFees}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
                min="0"
                step="0.01"
              />
              <input
                type="number"
                name="paidAmount"
                placeholder="Paid Amount"
                value={newPayment.paidAmount}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800"
                required
                min="0"
                step="0.01"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {editingPayment ? "Update Payment" : "Add Payment"}
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Student Payments</h3>
            <div className="space-y-4">
              {payments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No payments recorded yet.</p>
              ) : (
                payments.map((payment) => (
                  <StudentPaymentCard
                    key={payment.id}
                    student={payment}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;