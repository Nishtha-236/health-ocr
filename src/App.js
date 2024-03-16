import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from './components/About';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  const handleSignout = () => {
    // Clear the token from local storage or perform any other necessary cleanup
    console.log('Sign out');
    setToken(null);
  };

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <BrowserRouter>
      <div className="wrapper">
        <Navbar handleSignout={handleSignout} />
        <Routes>
          <Route
            path="/"
            element={
              token ? <Dashboard /> : <Login setToken={setToken} />
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/form" element={<h1>Form</h1>} />
        </Routes>
      </div>
    </BrowserRouter>

    </div>
  );
}

export default App;