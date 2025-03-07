import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaArrowLeft, FaPlus, FaEye, FaMoon, FaSun } from 'react-icons/fa';

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    first_name: '', last_name: '', email: '', password: '',
    phase: '', total_fee: '', amount_paid: '', status: 'active', course_id: '',
    profile_photo: '' // New field for profile photo
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

      if (!response.ok) throw new Error('Failed to fetch students.');

      const data = await response.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm({ ...studentForm, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentForm({ ...studentForm, profile_photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!Object.values(studentForm).every(value => value)) {
      toast.error("All fields are required!");
      return;
    }

    const studentData = {
      ...studentForm,
      total_fee: parseFloat(studentForm.total_fee),
      amount_paid: parseFloat(studentForm.amount_paid),
      course_id: parseInt(studentForm.course_id)
    };

    try {
      const response = await fetch(
        editingStudent ? `${API_URL}/${editingStudent.id}` : API_URL,
        {
          method: editingStudent ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        }
      );

      if (!response.ok) throw new Error(`Failed to ${editingStudent ? 'update' : 'add'} student.`);

      const updatedStudent = await response.json();

      if (editingStudent) {
        setStudents(students.map(s => (s.id === updatedStudent.id ? updatedStudent : s)));
        toast.success("Student updated successfully!");
      } else {
        setStudents([...students, updatedStudent]);
        toast.success("Student added successfully!");
      }

      // Reset form and state
      setStudentForm({
        first_name: '', last_name: '', email: '', password: '',
        phase: '', total_fee: '', amount_paid: '', status: 'active', course_id: '',
        profile_photo: '' // Reset profile photo
      });
      setEditingStudent(null);
      setActiveTab('view');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete student.");

      setStudents(students.filter(student => student.id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setStudentForm({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      password: '', // Keep this empty for security reasons
      phase: student.phase,
      total_fee: student.total_fee,
      amount_paid: student.amount_paid,
      status: student.status,
      course_id: student.course_id,
      profile_photo: student.profile_photo // Ensure profile photo is included
    });
    setIsModalOpen(true);
  };

  const courses = [
    { id: 1, name: "Software Engineering" },
    { id: 2, name: "Cyber Security" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Product Design" },
    { id: 5, name: "DevOps" }
  ];

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
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition duration-300 ${activeTab === 'add' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <FaPlus /> <span>{editingStudent ? 'Edit Student' : 'Add Student'}</span>
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition duration-300 ${activeTab === 'view' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <FaEye /> <span>View Students</span>
        </button>
      </div>

      {/* Add/Edit Student Form */}
      {activeTab === 'add' && (
        <div className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-2xl font-bold mb-6">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
          <div className="space-y-4">
            {["first_name", "last_name", "email", "phase", "password"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                value={studentForm[field]}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            ))}
            {["total_fee", "amount_paid"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                value={studentForm[field]}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            ))}
            <select
              name="status"
              value={studentForm.status}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              name="course_id"
              value={studentForm.course_id}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
            {/* Profile Photo Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            {studentForm.profile_photo && (
              <img src={studentForm.profile_photo} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mt-4" />
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {editingStudent ? 'Update' : 'Add'} Student
            </button>
          </div>
        </div>
      )}

      {/* View Students */}
      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {students.map((student) => (
            <div key={student.id} className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-bold mb-2">
                {student.first_name} {student.last_name}
              </h3>
              {/* Display Profile Photo */}
              {student.profile_photo && (
                <img src={student.profile_photo} alt="Profile" className="w-32 h-32 object-cover rounded-full mb-4" />
              )}
              {["email", "phase", "course_id", "total_fee", "amount_paid", "status"].map((field) => (
                <p key={field} className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <strong>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:</strong> {student[field]}
                </p>
              ))}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(student)}
                  className="flex items-center bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
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
          <div className={`p-4 rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl font-bold mb-4">Edit Student</h3>
            <div className="space-y-4">
              {["first_name", "last_name", "email", "phase", "password", "total_fee", "amount_paid", "status"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : field === "total_fee" || field === "amount_paid" ? "number" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                  value={studentForm[field]}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              ))}
              <select
                name="course_id"
                value={studentForm.course_id}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-300"
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