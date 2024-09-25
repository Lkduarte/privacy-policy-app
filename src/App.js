import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Register';
import UserDashboard from './UserDashboard';
import ConsentHistory from './ConsentHistory';
import Termo from './Termo';
import { Routes } from 'react-router-dom/dist';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/consent-history" element={<ConsentHistory />} />
          <Route path="/termo" element={<Termo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
