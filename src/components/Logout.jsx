import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext.jsx';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`);
        if (response.data.message === 'Logout successful') {
          toast.success('Logout successful!');
          logout();
          navigate('/', { state: { showLogoutToast: true } });
        }
      } catch (error) {
        console.error('Error logging out:', error);
        toast.error('Error logging out');
      }
    };

    performLogout();
  }, [navigate, logout]);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>Logging out...</h1>
      </div>
    </div>
  );
}

export default Logout;