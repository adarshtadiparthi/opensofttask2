import React from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

/*File Imports*/
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import Recovery from './components/Recovery';
import Reset from './components/Reset';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
