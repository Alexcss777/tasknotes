import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const token = localStorage.getItem('token'); 
  
 
  const navigate = useNavigate();

  const logoutHandler =()=>{
    console.log("Logout button clicked");
    localStorage.clear();
    navigate('/login')

  }
  
 return (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      Inicio
    </Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token && (<li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/task">
            Tareas
          </Link>
        </li>)}
        <li>
        <Link className="nav-link active" aria-current="page" to="/registro">
            Registro
         </Link>
        </li>
        <li>
        {token ? (
        <button type="button" className="btn btn-outline-success" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <Link className="nav-link active" to="/login">
          Login
        </Link>
      )}
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
  };
  