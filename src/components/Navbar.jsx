import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../AuthContext.jsx';

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#333333' }}>
      <Link className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#ffffff' }}>
        <img src={logo} width="70" height="70" className="d-inline-block align-top" alt="Logo" />
        <span className="ml-2">GenZ Intelligents</span>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ color: '#ffffff' }}>Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" style={{ color: '#ffffff' }}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history" style={{ color: '#ffffff' }}>History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" style={{ color: '#ffffff' }}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#ffffff' }}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={{ color: '#ffffff' }}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;