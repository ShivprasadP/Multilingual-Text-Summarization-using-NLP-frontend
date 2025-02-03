import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function History() {
  const [summaries, setSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm) {
      // If search term is empty, fetch all summaries
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/summaries/user/${email}`);
        setSummaries(response.data);
      } catch (error) {
        console.error('Error fetching summaries', error);
        toast.error('Failed to fetch summaries. Please try again later.');
      }
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/summaries/search`, {
        email,
        searchText: searchTerm
      });
      setSummaries(response.data);
    } catch (error) {
      console.error('Error searching summaries', error);
      toast.error('Failed to search summaries. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>History</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        <div className="col-md-8">
          <form className="form-inline mb-4 d-flex justify-content-end" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control mr-2 mt-2"
              placeholder="Search summaries"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary mt-2">Search</button>
          </form>
        </div>
        {summaries.length === 0 ? (
          <div className="col-md-12 text-center">
            <h5>No record found</h5>
          </div>
        ) : (
          summaries.map((summary) => (
            <div className="col-md-8" key={summary._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Date: {new Date(summary.date).toLocaleDateString()}</h5>
                  <p className="card-text">{summary.text}</p>
                  <Link to={`/previous-summary/${summary._id}`} className="btn btn-link">Read More</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;