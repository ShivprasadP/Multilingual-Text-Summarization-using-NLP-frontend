import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import axios from 'axios';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputLanguage, setInputLanguage] = useState('');
  const [outputLanguage, setOutputLanguage] = useState('');
  const [inputText, setInputText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (!email) {
      navigate('/login', { state: { showLoginToast: true } });
    } else if (location.state && location.state.showToast) {
      toast.success('Login successful!');
    }
  }, [location, navigate]);

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

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setOutputLanguage(e.target.value);
  };

  const handleSummarize = async (event) => {
    event.preventDefault();
    const email = sessionStorage.getItem('email');

    if (!inputText) {
      toast.error('Please enter the input text.');
      return;
    }

    const detectedLanguage = await detectLanguage(inputText);
    setInputLanguage(detectedLanguage);
    
    if (!outputLanguage || outputLanguage === 'Select Language') {
      toast.error('Please select an output language.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/summaries`, {
        email,
        text: inputText,
        inputLanguage: detectedLanguage,
        outputLanguage
      });
      setSummarizedText(response.data.summary);
      toast.success('Text summarized successfully!');
    } catch (error) {
      console.error('Error summarizing text:', error);
      toast.error('Failed to summarize text. Please try again later.');
    }
  };

  const handleDownloadSummary = () => {
    if (!inputLanguage || inputLanguage === 'unknown') {
      toast.error('Unable to detect input language.');
      return;
    }
    if (!outputLanguage || outputLanguage === 'Select Language') {
      toast.error('Please select an output language.');
      return;
    }
    if (!inputText) {
      toast.error('Please enter the input text.');
      return;
    }
    if (!summarizedText) {
      toast.error('Summarized text is empty.');
      return;
    }

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

    const email = sessionStorage.getItem('email');
    const summary = {
      date: new Date(),
      inputLanguage,
      outputLanguage,
      text: inputText,
      summary: summarizedText
    };
    const id = 'summary';

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

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff' }}>Dashboard</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        <div className="col-md-8">
          <form className='mt-5' onSubmit={handleSummarize}>
            <div className="form-group row">
              <label htmlFor="inputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Input Language</label>
              <div className="col-sm-4">
                <input type="text" className="form-control" id="inputLanguage" value={inputLanguage} readOnly />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="outputLanguage" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Output Language</label>
              <div className="col-sm-4">
                <select className="form-control" id="outputLanguage" value={outputLanguage} onChange={handleOutputLanguageChange}>
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>
            </div>

            <label htmlFor="inputText" className="col-form-label" style={{ fontSize: '1.2rem' }}>Input Text</label>
            <textarea className="form-control" id="inputText" rows="10" placeholder="Enter your text" value={inputText} onChange={handleInputTextChange}></textarea>
            <div className="text-center mt-4">
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050' }}>Summarize</button>
            </div>
            <hr />
          </form>

          <label htmlFor="summarizedText" className="col-form-label" style={{ fontSize: '1.2rem' }}>Summarized Text</label>
          <textarea className="form-control" id="summarizedText" rows="10" value={summarizedText} disabled></textarea>

          <div className='text-center mt-5 mb-5'>
            <button type="button" className="btn mr-5 btn-success" style={{ color: '#ffffff'}} onClick={handleDownloadSummary}>Download Summary</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;