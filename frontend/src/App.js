import React from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';

/*File Imports*/
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


