import {React, useState} from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AboutUs from './components/About';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import SignUp from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import ProtectedRoute from './components/ProtectedRoute';

import { auth } from './firebase';

const AppContent = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);

  const handleSignout = () => {
    console.log('Sign out');
    auth.signOut(); // sign out from Firebase
  };

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar handleSignout={handleSignout} />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <FileUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
