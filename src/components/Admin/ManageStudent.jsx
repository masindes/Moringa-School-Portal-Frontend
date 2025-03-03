import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://moringa-school-portal-backend.onrender.com/students";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    first_name: '', last_name: '', email: '', password: '',
    phase: '', total_fee: '', amount_paid: '', status: 'active', course_id: ''
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('add');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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

  const courses = [
    { id: 1, name: "Software Engineering" },
    { id: 2, name: "Cyber Security" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Product Design" },
    { id: 5, name: "DevOps" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm({ ...studentForm, [name]: value });
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

      setStudentForm({
        first_name: '', last_name: '', email: '', password: '',
        phase: '', total_fee: '', amount_paid: '', status: 'active', course_id: ''
      });
      setEditingStudent(null);
      setActiveTab('view');

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
    setStudentForm(student);
    setActiveTab('add');
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
        <button onClick={() => setActiveTab('add')} className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-blue-600' : 'bg-gray-700'}`}>{editingStudent ? 'Edit Student' : 'Add Student'}</button>
        <button onClick={() => setActiveTab('view')} className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-600' : 'bg-gray-700'}`}>View Students</button>
      </div>

      {activeTab === 'add' && (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
          {["first_name", "last_name", "email", "password", "phase"].map(field => (
            <input key={field} type={field === "password" ? "password" : "text"} name={field} placeholder={field}
              value={studentForm[field]} onChange={handleInputChange}
              className="w-full p-2 mb-2 bg-gray-700 rounded"
            />
          ))}
          {["total_fee", "amount_paid"].map(field => (
            <input key={field} type="number" name={field} placeholder={field} value={studentForm[field]}
              onChange={handleInputChange} className="w-full p-2 mb-2 bg-gray-700 rounded"
            />
          ))}
          <select name="status" value={studentForm.status} onChange={handleInputChange} className="w-full p-2 mb-2 bg-gray-700 rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select name="course_id" value={studentForm.course_id} onChange={handleInputChange} className="w-full p-2 mb-2 bg-gray-700 rounded">
            <option value="">Select Course</option>
            {courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
          </select>
          <button onClick={handleSubmit} className="w-full bg-blue-600 p-2 rounded">{editingStudent ? 'Update' : 'Add'} Student</button>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl mb-2">{student.first_name} {student.last_name}</h3>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Course:</strong> {courses.find(c => c.id === student.course_id)?.name || "Unknown"}</p>
              <button onClick={() => handleEdit(student)} className="bg-yellow-500 px-4 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(student.id)} className="bg-red-600 px-4 py-1 rounded">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
