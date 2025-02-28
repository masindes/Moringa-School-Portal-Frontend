import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '', currentPhase: '', course: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        toast.error("Failed to fetch students.");
      }
    };
    fetchStudents();
  }, []);

  const courses = ["Software Engineering", "Cyber Security", "Data Science", "Product Design", "DevOps"];

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.grade || !newStudent.currentPhase || !newStudent.course) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(API_URL, newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ name: '', email: '', grade: '', currentPhase: '', course: '' });
      toast.success("Student added successfully!");
    } catch (error) {
      toast.error("Failed to add student.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter(student => student.id !== id));
      toast.info("Student deleted.");
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent.name || !editingStudent.email || !editingStudent.grade || !editingStudent.currentPhase || !editingStudent.course) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${editingStudent.id}`, editingStudent);
      setStudents(students.map(student => (student.id === editingStudent.id ? editingStudent : student)));
      setIsModalOpen(false);
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error("Failed to update student.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Back Button */}
      <div className="flex justify-center mb-6">
        <NavLink to="/Admin" className="flex items-center text-blue-400 hover:text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Admin Dashboard
        </NavLink>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setActiveTab('add')} className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Add Student</button>
        <button onClick={() => setActiveTab('view')} className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>View Students</button>
      </div>

      {/* Add Student Form */}
      {activeTab === 'add' && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Add New Student</h3>
          <div className="space-y-4">
            {["name", "email", "grade", "currentPhase"].map(field => (
              <input key={field} type="text" placeholder={field} value={newStudent[field]} onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
            ))}
            <select value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white">
              <option value="">Select Course</option>
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <button onClick={handleAddStudent} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Student</button>
          </div>
        </div>
      )}

      {/* Student List */}
      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              {["email", "grade", "currentPhase", "course"].map(field => (
                <p key={field} className="text-gray-300"><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {student[field]}</p>
              ))}
              <div className="flex space-x-2 mt-4">
                <button onClick={() => handleEditStudent(student)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
            {["name", "email", "grade", "currentPhase"].map(field => (
              <input key={field} type="text" placeholder={field} value={editingStudent[field]} onChange={(e) => setEditingStudent({ ...editingStudent, [field]: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"/>
            ))}
            <button onClick={handleUpdateStudent} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
