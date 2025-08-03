import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaArrowLeft, FaPlus, FaEye, FaMoon, FaSun } from 'react-icons/fa';

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const techCourses = [
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'Data Science' },
  { id: 3, name: 'Mobile Development' },
  { id: 4, name: 'DevOps' },
  { id: 5, name: 'UI/UX Design' },
];

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phase: '',
    course_name: '',
    password: '',
    total_fee: '',
    amount_paid: '',
    status: 'active',
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, [token]);

  // 🟢 Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 🟢 Fetch Students
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        toast.error('Unauthorized: Please log in.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch students.');
      }

      const data = await response.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🟢 Add Student
  const handleAddStudent = async () => {
    if (!Object.values(newStudent).every(value => value)) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) throw new Error('Failed to add student.');

      const addedStudent = await response.json();
      setStudents([...students, addedStudent]);
      setNewStudent({
        first_name: '',
        last_name: '',
        email: '',
        phase: '',
        course_name: '',
        password: '',
        total_fee: '',
        amount_paid: '',
        status: 'active',
      });
      toast.success("Student added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🟢 Delete Student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete student.');

      setStudents(students.filter(student => student.id !== id));
      toast.info("Student deleted.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🟢 Edit Student
  const handleEditStudent = (student) => {
    setEditingStudent({ ...student }); // Ensure a copy of the student object is used
    setIsModalOpen(true);
  };

  // 🟢 Update Student
  const handleUpdateStudent = async () => {
    if (!Object.values(editingStudent).every(value => value)) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editingStudent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingStudent),
      });

      if (!response.ok) throw new Error('Failed to update student.'); 
      setStudents(students.map(student => (student.id === editingStudent.id ? editingStudent : student)));
      setIsModalOpen(false);
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} font-sans`}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition duration-300`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Back Button */}
      <div className="flex justify-start mb-6 p-6">
        <NavLink to="/Admin" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition duration-300`}>
          <FaArrowLeft className="mr-2" /> Back to Admin Dashboard
        </NavLink>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8 p-6">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition duration-300 ${
            activeTab === 'add' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FaPlus /> <span>Add Student</span>
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition duration-300 ${
            activeTab === 'view' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FaEye /> <span>View Students</span>
        </button>
      </div>

      {/* Add Student Form */}
      {activeTab === 'add' && (
        <div className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-2xl font-bold mb-6">Add New Student</h3>
          <div className="space-y-4">
            {["first_name", "last_name", "email", "phase", "password"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                value={newStudent[field]}
                onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            ))}
            {/* Course Name Dropdown */}
            <select
              value={newStudent.course_name}
              onChange={(e) => setNewStudent({ ...newStudent, course_name: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Select Course</option>
              {techCourses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            {/* Total Fee Field */}
            <input
              type="number"
              placeholder="Total Fee"
              value={newStudent.total_fee}
              onChange={(e) => setNewStudent({ ...newStudent, total_fee: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            {/* Amount Paid Field */}
            <input
              type="number"
              placeholder="Amount Paid"
              value={newStudent.amount_paid}
              onChange={(e) => setNewStudent({ ...newStudent, amount_paid: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            {/* Status Field */}
            <select
              value={newStudent.status}
              onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={handleAddStudent}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Student
            </button>
          </div>
        </div>
      )}

      {/* View Students */}
      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {(students ?? []).map((student) => (
            <div key={student.id} className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="text-xl font-bold mb-2">
                {student.first_name} {student.last_name}
              </h3>
              {["email", "phase", "course_name", "total_fee", "amount_paid", "status"].map((field) => (
                <p key={field} className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <strong>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:</strong> {student[field]}
                </p>
              ))}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditStudent(student)}
                  className="flex items-center bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-8 rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl font-bold mb-6">Edit Student</h3>
            <div className="space-y-4">
              {["first_name", "last_name", "email", "phase", "password", "total_fee", "amount_paid", "status"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : field === "total_fee" || field === "amount_paid" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  value={editingStudent[field]}
                  onChange={(e) => setEditingStudent({ ...editingStudent, [field]: e.target.value })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              ))}
              {/* Course Name Dropdown in Edit Modal */}
              <select
                value={editingStudent.course_name}
                onChange={(e) => setEditingStudent({ ...editingStudent, course_name: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {techCourses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleUpdateStudent}
                  className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;