import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '', currentPhase: '', course: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, [token]);

  // 🟢 Read: Fetch Students
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

  const courses = ["Software Engineering", "Cyber Security", "Data Science", "Product Design", "DevOps"];

  // 🟢 Create: Add a New Student
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
      setNewStudent({ firstName: '', lastName: '', email: '', currentPhase: '', course: '' });
      toast.success("Student added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🟢 Delete: Remove a Student
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

  // 🟢 Prepare Student for Editing
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  // 🟢 Update: Edit Student Details
  const handleUpdateStudent = async () => {
    if (!Object.values(editingStudent).every(value => value)) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editingStudent.id}`, {
        method: 'PUT',
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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-center mb-6">
        <NavLink to="/Admin" className="flex items-center text-blue-400 hover:text-blue-300">
          <span>&larr;</span> Back to Admin Dashboard
        </NavLink>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setActiveTab('add')} className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600' : 'bg-gray-700'}`}>Add Student</button>
        <button onClick={() => setActiveTab('view')} className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-600' : 'bg-gray-700'}`}>View Students</button>
      </div>

      {activeTab === 'add' && (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">Add New Student</h3>
          {["firstName", "lastName", "email", "currentPhase"].map(field => (
            <input key={field} type="text" placeholder={field} value={newStudent[field]} onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })} className="w-full p-2 mb-2 bg-gray-700 rounded" />
          ))}
          <select value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} className="w-full p-2 mb-2 bg-gray-700 rounded">
            <option value="">Select Course</option>
            {courses.map(course => <option key={course} value={course}>{course}</option>)}
          </select>
          <button onClick={handleAddStudent} className="w-full bg-blue-600 p-2 rounded">Add Student</button>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(students ?? []).map(student => (
            <div key={student.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{student.firstName} {student.lastName}</h3>
              {["email", "currentPhase", "grade", "course"].map(field => (
                <p key={field}><strong>{field}:</strong> {student[field]}</p>
              ))}
              <div className="flex space-x-2 mt-4">
                <button onClick={() => handleEditStudent(student)} className="bg-yellow-500 p-2 rounded">Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 p-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl mb-4">Edit Student</h3>
            {["firstName", "lastName", "email", "currentPhase", "grade"].map(field => (
              <input key={field} type="text" placeholder={field} value={editingStudent[field]} onChange={(e) => setEditingStudent({ ...editingStudent, [field]: e.target.value })} className="w-full p-2 mb-2 bg-gray-700 rounded" />
            ))}
            <select value={editingStudent.course} onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })} className="w-full p-2 mb-2 bg-gray-700 rounded">
              {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>
            <div className="flex space-x-2 mt-4">
              <button onClick={handleUpdateStudent} className="bg-blue-600 p-2 rounded">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
