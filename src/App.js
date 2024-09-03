import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './components/About'
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { Tasks } from './components/Tasks';
import PrivateRoutes from './utils/privateRoutes'
import HomePage from './components/home';


function App() {
  return (
   
    <Router>
      <Navbar/>
    <div className='container p-4'>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<PrivateRoutes />}>
                <Route path="/task" element={<Tasks />} />
       </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
