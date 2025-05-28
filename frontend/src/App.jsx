import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route
          path="/"
          element={
            token ? (
              <Dashboard token={token} logout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
