import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state && location.state.showToast) {
      toast.success('User Register successfully! Please login to continue');
    }
    if (sessionStorage.getItem('email')) {
      navigate('/dashboard');
    }
    if (location.state && location.state.showLoginToast) {
      toast.error('Please login first!');
    }
  }, [location.state]);

  const togglePassword = () => {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('basic-addon2');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      passwordField.type = 'password';
      eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { email, password });

      toast.success('Login successful!');
      sessionStorage.setItem('email', email);
      login(email);
      navigate('/dashboard', { state: { showToast: true } });

    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>Login</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', width: '50%', borderRadius: '30px' }}>
        <div className="col-md-12">
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Password</label>
              <div className="col-sm-9 input-group mb-3">
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <span className="input-group-text" id="basic-addon2" onClick={togglePassword}>
                  <i className='fas fa-eye-slash'></i>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050' }}>Submit</button>
            </div>
            <hr />
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;