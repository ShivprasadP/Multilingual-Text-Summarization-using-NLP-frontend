import React from 'react'

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff'}}>Dashboard</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        <div className="col-md-8">
            <form className='mt-5'>
                <div className="form-group row">
                  <label htmlFor="srcLan" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Input Language</label>
                  <div className="col-sm-4">
                    <select className="form-control" id="gender">
                      <option>Select Language</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="srcLan" className="col-sm-4 col-form-label" style={{ fontSize: '1.2rem' }}>Output Language</label>
                  <div className="col-sm-4">
                    <select className="form-control" id="gender">
                      <option>Select Language</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                    </select>
                  </div>
                </div>

                <label htmlFor="srcLan" className="col-form-label" style={{ fontSize: '1.2rem' }}>Input Text</label>
                <textarea className="form-control" id="inputText" rows="10" placeholder="Enter your text"></textarea>
                <div className="text-center mt-4">
                  <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050'}}>Summarize</button>
                </div>
                <hr />
            </form>
            
            <label htmlFor="srcLan" className="col-form-label" style={{ fontSize: '1.2rem' }}>Summarized Text</label>
            <textarea className="form-control" id="summarizedText" rows="10" disabled></textarea>
            
            <div className='text-center mt-5 mb-5'>
              <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050'}}>Download Summary</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;