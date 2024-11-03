import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

  const togglePassword = () => {
    const password = document.getElementById('password');
    const cpassword = document.getElementById('cpassword');
    const eyeIcon = document.getElementById('basic-addon2');
    if (password.type === 'password') {
      password.type = 'text';
      cpassword.type = 'text';
      eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      password.type = 'password';
      cpassword.type = 'password';
      eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff'}}>Register</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', width: '50%', borderRadius: '30px' }}>
        <div className="col-md-12">
          <form className='mt-5'>
            <div className="form-group row">
              <label htmlFor="fullName" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Full Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Phone Number</label>
              <div className="col-sm-9">
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gender" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Gender</label>
              <div className="col-sm-9">
                <select className="form-control" id="gender">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="address" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Address</label>
              <div className="col-sm-9">
                <textarea className="form-control" id="address" rows="3" placeholder="Enter your address"></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Password</label>
              <div className="col-sm-9 input-group mb-3">
                <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                <span className="input-group-text" id="basic-addon2" onClick={togglePassword}>
                  <i className='fas fa-eye-slash'></i>
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="cpassword" className="col-sm-3 col-form-label" style={{ fontSize: '1.2rem' }}>Confirm Password</label>
              <div className="col-sm-9 input-group mb-5">
                <input type="password" className="form-control" id="cpassword" placeholder="Confirm your password" />
                <span className="input-group-text" id="basic-addon2" onClick={togglePassword}>
                  <i className='fas fa-eye-slash'></i>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050'}}>Submit</button>
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