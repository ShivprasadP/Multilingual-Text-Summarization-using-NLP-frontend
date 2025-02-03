import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PreviousSummary() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const languages = ['English', 'Hindi', 'Marathi'];
  const email = sessionStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/login', { state: { showLoginToast: true } });
    }

    const fetchSummary = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/summaries/${id}`);
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching the summary:', error);
      }
    };

    fetchSummary();
  }, [id, email, navigate]);

  const detectLanguage = async (text) => {
    try {
      const response = await axios.post(`https://translation.googleapis.com/language/translate/v2/detect`, null, {
        params: {
          q: text,
          key: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
        }
      });
      const detectedLanguage = response.data.data.detections[0][0].language;
      return detectedLanguage;
    } catch (error) {
      console.error('Error detecting language:', error);
      toast.error('Failed to detect language. Please try again later.');
      return 'unknown';
    }
  };

  const handleRemoveSummary = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this summary?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/summaries/${id}`);
        if (response.status === 200) {
          toast.success('Summary removed successfully!');
          navigate('/history');
        } else {
          toast.error('Failed to remove summary. Please try again later.');
        }
      } catch (error) {
        console.error('Error removing summary:', error);
        toast.error('Failed to remove summary. Please try again later.');
      }
    }
  };

  const handleDownloadSummary = async () => {
    if (!summary) return;

    if (!summary.inputLanguage || summary.inputLanguage === 'unknown') {
      toast.error('Unable to detect input language.');
      return;
    }
    if (!summary.outputLanguage || summary.outputLanguage === 'Select Language') {
      toast.error('Please select an output language.');
      return;
    }

    try {
      const response = await axios.post('/generate-pdf', {
        date: new Date(summary.date).toLocaleDateString(),
        email,
        inputLanguage: summary.inputLanguage,
        outputLanguage: summary.outputLanguage,
        inputText: summary.text,
        summary: summary.summary
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'summary.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSummary((prevSummary) => ({
      ...prevSummary,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const detectedLanguage = await detectLanguage(summary.text);
    setSummary((prevSummary) => ({
      ...prevSummary,
      inputLanguage: detectedLanguage,
    }));

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/summaries/${id}`, {
        ...summary,
        inputLanguage: detectedLanguage
      });
      if (response.status === 200) {
        toast.success('Summary updated successfully!');
      } else {
        toast.error('Failed to update summary. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating summary:', error);
      toast.error('Failed to update summary. Please try again later.');
    }
  };

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff'}}>Previous Summary</h1>
      </div>
      <div className="row justify-content-center mx-auto" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        <div className="col-md-8 text-right">
          <div className="form-group align-items-center row">
            <label htmlFor="date" className="col-form-label" style={{ fontSize: '1.2rem' }}>Date : </label>
            <h5 className='mt-2 ml-2'>{new Date(summary.date).toLocaleDateString()}</h5>
          </div>
        </div>
        <div className="col-md-8">
          <form className='mt-2' onSubmit={handleSaveChanges}>
            <div className="form-group row">
              <label htmlFor="inputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Input Language</label>
              <div className="col-sm-4">
                <select className="form-control" id="inputLanguage" name="inputLanguage" value={summary.inputLanguage} onChange={handleChange} disabled>
                  <option>Select Language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row mb-5">
              <label htmlFor="outputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Output Language</label>
              <div className="col-sm-4">
                <select className="form-control" id="outputLanguage" name="outputLanguage" value={summary.outputLanguage} onChange={handleChange}>
                  <option>Select Language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <hr />
            <label htmlFor="inputText" className="col-form-label" style={{ fontSize: '1.2rem' }}>Input Text</label>
            <textarea className="form-control mb-5" id="inputText" name="text" rows="10" placeholder='Enter input text' value={summary.text} onChange={handleChange}></textarea>
            <div className="text-center">
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050'}}>Save Changes</button>
            </div>
            <hr />
          </form>
          
          <label htmlFor="summarizedText" className="col-form-label" style={{ fontSize: '1.2rem' }}>Summarized Text</label>
          <textarea className="form-control" id="summarizedText" rows="10" value={summary.summary} disabled></textarea>
          
          <div className='text-center mt-5 mb-5'>
            <button type="button" className="btn mr-5 btn-success" style={{ color: '#ffffff'}} onClick={handleDownloadSummary}>Download Summary</button>
            <button type="button" className="btn btn-danger" onClick={handleRemoveSummary}>Remove Summary</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviousSummary;