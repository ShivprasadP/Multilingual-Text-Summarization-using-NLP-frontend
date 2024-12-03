import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showLogoutToast) {
      toast.success('Logout successful!');
    }
  }, [location.state]);

  return (
    <div>
      <ToastContainer />
      <div className="container mt-5 mb-5">
        <div className="text-center">
          <h1 style={{ backgroundColor: '#666666', color: '#ffffff', padding: '15px' }}>
            Welcome to Our Multilingual Text Summarization System!
          </h1>
        </div>
        <div className="mt-4">
          <p style={{ fontSize: '1.3rem', backgroundColor: '#deeaff', padding: '25px' }}>
            In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;