import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import UserDashboard from './UserDashboard';
import ConsentHistory from './ConsentHistory';
import Notification from './Notification';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/dashboard" component={UserDashboard} />
          <Route path="/consent-history" component={ConsentHistory} />
          <Route path="/notifications" component={Notification} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
