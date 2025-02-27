import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const foundStudent = storedStudents.find(s => s.id === parseInt(id));

        if (foundStudent) {
            setStudent(foundStudent);
            setEditedStudent(foundStudent);
        } else {
            toast.error("Student not found!");
            navigate('/manage-student');
        }
    }, [id, navigate]);

    const handleUpdateStudent = () => {
        if (!editedStudent.name || !editedStudent.email || !editedStudent.grade || !editedStudent.currentPhase || !editedStudent.course) {
            toast.error("All fields are required!");
            return;
        }
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.map(s => (s.id === editedStudent.id ? editedStudent : s));

        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudent(editedStudent);
        setIsEditing(false);
        toast.success("Student updated successfully!");
    };

    const handleDeleteStudent = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.filter(s => s.id !== student.id);

        localStorage.setItem('students', JSON.stringify(updatedStudents));
        toast.info("Student deleted.");
        navigate('/manage-student');
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <Link to="/manage-student" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">&larr; Back to Manage Students</Link>

            <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">{isEditing ? "Edit Student" : student?.name}</h2>

                {isEditing ? (
                    <div className="space-y-4">
                        <input type="text" placeholder="Name" value={editedStudent.name} onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
                        <input type="email" placeholder="Email" value={editedStudent.email} onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
                        <input type="text" placeholder="Grade" value={editedStudent.grade} onChange={(e) => setEditedStudent({ ...editedStudent, grade: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
                        <input type="text" placeholder="Current Phase" value={editedStudent.currentPhase} onChange={(e) => setEditedStudent({ ...editedStudent, currentPhase: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"/>
                        <select value={editedStudent.course} onChange={(e) => setEditedStudent({ ...editedStudent, course: e.target.value })} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white">
                            <option value="">Select Course</option>
                            {["Software Engineering", "Cyber Security", "Data Science", "Product Design", "DevOps"].map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateStudent} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Student</button>
                        <button onClick={() => setIsEditing(false)} className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-2">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-2"><strong>Email:</strong> {student?.email}</p>
                        <p className="mb-2"><strong>Grade:</strong> {student?.grade}</p>
                        <p className="mb-2"><strong>Course:</strong> {student?.course}</p>
                        <p className="mb-4"><strong>Current Phase:</strong> {student?.currentPhase}</p>

                        <button onClick={() => setIsEditing(true)} className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={handleDeleteStudent} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2">Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDetails;
