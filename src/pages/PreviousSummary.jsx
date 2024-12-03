import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';

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

  const handleDownloadSummary = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;
    let cursorY = 10;

    const addText = (text, x, y) => {
      const lines = doc.splitTextToSize(text, maxLineWidth);
      doc.text(lines, x, y);
      return y + lines.length * lineHeight;
    };

    cursorY = addText('Summary Details', margin, cursorY);
    cursorY = addText(`Date: ${new Date(summary.date).toLocaleDateString()}`, margin, cursorY);
    cursorY = addText(`User Email: ${email}`, margin, cursorY);
    cursorY = addText(`Input Language: ${summary.inputLanguage}`, margin, cursorY);
    cursorY = addText(`Output Language: ${summary.outputLanguage}`, margin, cursorY);
    cursorY = addText('Input Text:', margin, cursorY);
    cursorY = addText(summary.text, margin, cursorY);
    cursorY = addText('Output Text:', margin, cursorY);
    cursorY = addText(summary.summary, margin, cursorY);

    doc.save(`${id}.pdf`);
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
          <form className='mt-2'>
            <div className="form-group row">
              <label htmlFor="inputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Input Language</label>
              <div className="col-sm-4">
                <select className="form-control" id="inputLanguage" value={summary.inputLanguage} disabled>
                  <option>{summary.inputLanguage}</option>
                  {languages.filter(lang => lang !== summary.inputLanguage).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row mb-5">
              <label htmlFor="outputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Output Language</label>
              <div className="col-sm-4">
                <select className="form-control" id="outputLanguage" value={summary.outputLanguage} disabled>
                  <option>{summary.outputLanguage}</option>
                  {languages.filter(lang => lang !== summary.outputLanguage).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <hr />
            <label htmlFor="inputText" className="col-form-label" style={{ fontSize: '1.2rem' }}>Input Text</label>
            <textarea className="form-control mb-5" id="inputText" rows="10" placeholder='Enter input text' value={summary.text} disabled></textarea>
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