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

  const generateHTMLContent = (summaryData) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Summary</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
          }
          h1 {
            text-align: center;
          }
          .summary-section {
            margin-bottom: 20px;
          }
          .summary-section label {
            font-weight: bold;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .header img {
            max-height: 100px;
          }
          .header h1 {
            flex-grow: 1;
            font-family: 'Georgia', serif;
            font-size: 3rem;
          }
        </style>
      </head>
      <body>
        <div class="container mt-5">
          <div class="header">
            <img src="/logo.png" alt="Logo">
            <h1>Text Summarization using NLP</h1>
          </div>
          <hr>
          <div class="summary-section row">
            <div class="col-sm-6">
              <label>Date:</label>
              <span>${new Date(summaryData.date).toLocaleDateString()}</span>
            </div>
            <div class="col-sm-6">
              <label>User Email:</label>
              <span>${summaryData.email}</span>
            </div>
          </div>
          <hr>
          <div class="summary-section row">
            <label class="col-sm-4">Input Language:</label>
            <span class="col-sm-8">${summaryData.inputLanguage}</span>
          </div>
          <div class="summary-section row">
            <label class="col-sm-4">Output Language:</label>
            <span class="col-sm-8">${summaryData.outputLanguage}</span>
          </div>
          <div class="summary-section row">
            <label class="col-sm-4">Input Text:</label>
            <p class="col-sm-8">${summaryData.text}</p>
          </div>
          <div class="summary-section row">
            <label class="col-sm-4">Output Text:</label>
            <p class="col-sm-8">${summaryData.summary}</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;
  };

  const handleDownloadSummary = () => {
    if (!summary) return;

    const summaryData = {
      date: summary.date,
      email,
      inputLanguage: summary.inputLanguage,
      outputLanguage: summary.outputLanguage,
      text: summary.text,
      summary: summary.summary
    };

    const htmlContent = generateHTMLContent(summaryData);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
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