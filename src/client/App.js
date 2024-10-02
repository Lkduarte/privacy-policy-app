import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import ConsentHistory from './pages/ConsentHistory';
import Termo from './pages/Termo';
import { Routes } from 'react-router-dom/dist';
import Navbar from '../client/components/navbar/navbar';
import ProtectedRoute from '../client/components/protectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/consent-history" element={<ProtectedRoute><ConsentHistory /></ProtectedRoute>} />
          <Route path="/termo" element={<ProtectedRoute><Termo /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
