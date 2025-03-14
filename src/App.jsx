import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import ResetPassword from './components/ResetPassword';
import Contact from './components/Contact';
import About from './components/About';
import HomePage from './components/HomePage';
import StudentDashboard from './components/StudentDashboard';
import Grades from './components/Grades';
import FeeBalance from './components/FeeBalance';
import CurrentPhase from './components/CurrentPhase';
import Payment from './components/Payment';
import Logout from './components/Logout';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageStudent from './components/Admin/ManageStudent';
import AdminPayments from './components/Admin/AdminPayments';
import ImageUploader from './components/ImageUploader'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
  
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/" element={<AuthForm type="signup" />} />
            <Route path="/signup" element={<AuthForm type="signup" />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Main Pages */}
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/fee-balance" element={<FeeBalance />} />
            <Route path="/current-phase" element={<CurrentPhase />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<About />} />

            {/* Other Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manage-student" element={<ManageStudent />} />
            <Route path="/admin-payments" element={<AdminPayments />} />

            {/* Add the ImageUploader route */}
            <Route path="/upload-image" element={<ImageUploader />} />
          </Routes>
        </div>

        {/* Footer Always Visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;