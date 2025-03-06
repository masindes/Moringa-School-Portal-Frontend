import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const API_BASE_URL = 'https://moringa-school-portal-backend.onrender.com';
const API_URL = `${API_BASE_URL}/students`;

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch student details from the API
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          toast.error('Unauthorized: Please log in.');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch student details.');
        }

        const data = await response.json();
        setStudent(data);
        setEditedStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
        setError(error.message);
        toast.error(error.message || 'Failed to fetch student details.');
        navigate('/manage-student');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, token, navigate]);

  // Handle updating student details
  const handleUpdateStudent = async () => {
    if (!Object.values(editedStudent).every(value => value)) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedStudent),
      });

      if (!response.ok) throw new Error('Failed to update student.');

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      setIsEditing(false);
      toast.success('Student updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Failed to update student.');
    }
  };

  // Handle deleting a student
  const handleDeleteStudent = async () => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete student.');

      toast.success('Student deleted successfully!');
      navigate('/manage-student');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete student.');
    }
  };

  if (loading) {
    return <div className="text-center text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white p-6">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Link to="/manage-student" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        <FaArrowLeft className="inline-block mr-2" /> Back to Manage Students
      </Link>

      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isEditing ? 'Edit Student' : `${student?.first_name} ${student?.last_name}`}
        </h2>

        {isEditing ? (
          // Edit mode
          <div className="space-y-4">
            {["first_name", "last_name", "email", "phase", "password", "total_fee", "amount_paid"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : field === "total_fee" || field === "amount_paid" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                value={editedStudent[field]}
                onChange={(e) => setEditedStudent({ ...editedStudent, [field]: e.target.value })}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
              />
            ))}
            <select
              value={editedStudent.course_name}
              onChange={(e) => setEditedStudent({ ...editedStudent, course_name: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="">Select Course</option>
              {[
                'Web Development',
                'Data Science',
                'Mobile Development',
                'DevOps',
                'UI/UX Design',
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <select
              value={editedStudent.status}
              onChange={(e) => setEditedStudent({ ...editedStudent, status: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={handleUpdateStudent}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Student
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          // View mode
          <div>
            <p className="mb-2">
              <strong>Email:</strong> {student?.email || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Phase:</strong> {student?.phase || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Course:</strong> {student?.course_name || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Total Fee:</strong> {student?.total_fee || 'N/A'}
            </p>
            <p className="mb-2">
              <strong>Amount Paid:</strong> {student?.amount_paid || 'N/A'}
            </p>
            <p className="mb-4">
              <strong>Status:</strong> {student?.status || 'N/A'}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              <FaEdit className="inline-block mr-2" /> Edit
            </button>
            <button
              onClick={handleDeleteStudent}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
            >
              <FaTrash className="inline-block mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;