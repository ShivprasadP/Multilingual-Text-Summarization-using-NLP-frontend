import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    gender: '',
    address: '',
    password: '',
    confirm_password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const togglePassword = () => {
    const password = document.getElementById('password');
    const eyeIcon = document.getElementById('basic-addon2');
    if (password.type === 'password') {
      password.type = 'text';
      eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      password.type = 'password';
      eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  };

  const toggleConPassword = () => {
    const cpassword = document.getElementById('cpassword');
    const eyeCIcon = document.getElementById('basic-addon3');
    if (cpassword.type === 'password') {
      cpassword.type = 'text';
      eyeCIcon.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      cpassword.type = 'password';
      eyeCIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    // Hash the password before sending it to the backend
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Prepare user data
    const userData = {
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      address: user.address,
      password: hashedPassword
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
      toast.success('User registered successfully!');

      navigate('/login', { state: { showToast: true } });

      // Clear form
      setUser({
        full_name: '',
        email: '',
        phone_number: '',
        gender: '',
        address: '',
        password: '',
        confirm_password: ''
      });
    } catch (error) {
      console.error('Error registering user:', error); // Log error to console
      if (error.response && error.response.data.message === 'Email already exists') {
        toast.error('Email already exists');
      }
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>Register</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', width: '50%', borderRadius: '30px' }}>
        <div className="col-md-12">
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="full_name" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Full Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="full_name" name="full_name" value={user.full_name} onChange={handleChange} placeholder="Enter your full name" required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone_number" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Phone Number</label>
              <div className="col-sm-9">
                <input type="tel" className="form-control" id="phone_number" name="phone_number" value={user.phone_number} onChange={handleChange} placeholder="Enter your phone number" required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gender" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Gender</label>
              <div className="col-sm-9">
                <select className="form-control" id="gender" name="gender" value={user.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="address" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Address</label>
              <div className="col-sm-9">
                <textarea className="form-control" id="address" name="address" rows="3" value={user.address} onChange={handleChange} placeholder="Enter your address" required></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Password</label>
              <div className="col-sm-9 input-group mb-3">
                <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" required />
                <span className="input-group-text" id="basic-addon2" onClick={togglePassword}>
                  <i className='fas fa-eye-slash'></i>
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="cpassword" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Confirm Password</label>
              <div className="col-sm-9 input-group mb-5">
                <input type="password" className="form-control" id="cpassword" name="confirm_password" value={user.confirm_password} onChange={handleChange} placeholder="Confirm your password" required />
                <span className="input-group-text" id="basic-addon3" onClick={toggleConPassword}>
                  <i className='fas fa-eye-slash'></i>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050' }}>Submit</button>
            </div>
            <hr />
            <div className="text-center mt-3">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;