import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './components/About'
import { Users } from './components/Users';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Registro } from './components/Registro';


function App() {
  return (
   
    <Router>
      <Navbar/>
    <div className='container p-4'>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
