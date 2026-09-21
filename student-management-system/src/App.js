import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    // The "future" flags switch on React Router v7 behaviour early
    // (this also keeps the browser console free of upgrade warnings).
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <main className="container py-4">
        <Routes>
          {/* Public page */}
          <Route path="/login" element={<Login />} />

          {/* Private pages (login required) */}
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <PrivateRoute>
                <StudentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Any other address goes to the student list
              (which sends logged-out users to the login page) */}
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
