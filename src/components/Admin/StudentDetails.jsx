import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', grade: '', currentPhase: '' });

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const foundStudent = storedStudents.find(s => s.id === parseInt(id));

        if (foundStudent) {
            setStudent(foundStudent);
            setFormData({
                name: foundStudent.name,
                email: foundStudent.email,
                grade: foundStudent.grade,
                currentPhase: foundStudent.currentPhase,
            });
        } else {
            toast.error("Student not found!");
            navigate('/manage-student');
        }
    }, [id, navigate]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
            const updatedStudents = storedStudents.filter(s => s.id !== parseInt(id));

            localStorage.setItem('students', JSON.stringify(updatedStudents));
            toast.success("Student deleted successfully!");
            navigate('/manage-student');
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        if (!formData.name || !formData.email || !formData.grade || !formData.currentPhase) {
            toast.error("Please fill in all fields.");
            return;
        }

        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = storedStudents.map(s =>
            s.id === parseInt(id) ? { ...s, ...formData } : s
        );

        localStorage.setItem('students', JSON.stringify(updatedStudents));
        setStudent(updatedStudents.find(s => s.id === parseInt(id)));
        setEditMode(false);
        toast.success("Student updated successfully!");
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({
            name: student.name,
            email: student.email,
            grade: student.grade,
            currentPhase: student.currentPhase,
        });
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <Link to="/manage-student" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                &larr; Back to Manage Students
            </Link>

            <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Student Details</h2>

                {editMode ? (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-full bg-gray-700 text-white rounded-md"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full bg-gray-700 text-white rounded-md"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className="border p-2 w-full bg-gray-700 text-white rounded-md"
                            placeholder="Grade"
                        />
                        <input
                            type="text"
                            name="currentPhase"
                            value={formData.currentPhase}
                            onChange={handleChange}
                            className="border p-2 w-full bg-gray-700 text-white rounded-md"
                            placeholder="Current Phase"
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <p className="text-gray-300"><strong>Name:</strong></p>
                        <p>{student?.name}</p>

                        <p className="text-gray-300"><strong>Email:</strong></p>
                        <p>{student?.email}</p>

                        <p className="text-gray-300"><strong>Grade:</strong></p>
                        <p>{student?.grade}</p>

                        <p className="text-gray-300"><strong>Current Phase:</strong></p>
                        <p>{student?.currentPhase}</p>
                    </div>
                )}

                <div className="mt-6 flex justify-between">
                    {!editMode && (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-black"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
