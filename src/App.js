import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Register';
import UserDashboard from './UserDashboard';
import ConsentHistory from './ConsentHistory';
import Notification from './Notification';
import { Routes } from 'react-router-dom/dist';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/consent-history" element={<ConsentHistory />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
