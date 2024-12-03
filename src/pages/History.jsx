import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function History() {
  const [summaries, setSummaries] = useState([]);
  const email = sessionStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/login', { state: { showLoginToast: true } });
    }

    const fetchSummaries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/summaries/user/${email}`);
        setSummaries(response.data);
      } catch (error) {
        console.error('Error fetching summaries', error);
      }
    };

    if (email) {
      fetchSummaries();
    }
  }, [email, navigate]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>History</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        {summaries.length === 0 ? (
          <div className="col-md-12 text-center">
            <h5>No record found</h5>
          </div>
        ) : (
          summaries.map((summary) => (
            <React.Fragment key={summary._id}>
              <div className="col-md-12">
                <h5>Date: {new Date(summary.date).toLocaleDateString()}</h5>
              </div>
              <div className="col-md-8">
                <div className="p-3 mb-3 mt-5" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                  <p>{summary.text}</p>
                  <Link to={`/previous-summary/${summary._id}`} className="btn btn-link">Read More</Link>
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default History;