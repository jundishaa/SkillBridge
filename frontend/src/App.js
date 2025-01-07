import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnrollmentPage from './pages/EnrollmentPage';
import Navbar from './components/Navbar'; // Import Navbar
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enrollments" element={<EnrollmentPage />} />
        <Route path="/courses/:id" element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;

