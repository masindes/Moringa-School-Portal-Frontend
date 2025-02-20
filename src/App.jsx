import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ManageStudents from "./components/Admin/ManageStudents";
import ManagePayments from "./components/Admin/ManagePayments";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/payments" element={<ManagePayments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
