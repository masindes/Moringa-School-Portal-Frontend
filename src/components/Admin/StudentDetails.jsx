import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Retrieve student details from localStorage
        const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
        const selectedStudent = storedStudents.find((s) => s.id === parseInt(id));

        if (selectedStudent) {
            setStudent(selectedStudent);
        } else {
            toast.error("Student not found!");
            navigate('/manage-student');
        }
    }, [id, navigate]);

    if (!student) {
        return <div className="text-center text-white p-6">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <Link to="/manage-student" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">&larr; Back to Manage Students</Link>

            <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center">{student.name}'s Details</h2>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Fee Balance:</strong> KSH {student.feeBalance || "0"}</p>
            </div>
        </div>
    );
};

export default StudentDetails;
