import React from 'react'

function PreviousSummary() {
  return (
    <div className="container mt-5">
        <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
            <h1 style={{ color: '#ffffff'}}>Previous Summary</h1>
        </div>
        <div className="row justify-content-center mx-auto" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
            <div className="col-md-8 text-right">
                <div className="form-group align-items-center row">
                    <label htmlFor="date" className="col-form-label" style={{ fontSize: '1.2rem' }}>Date : </label>
                    <h5 className='mt-2 ml-2'>03/11/2024</h5>
                </div>
            </div>
            <div className="col-md-8">
                <form className='mt-2'>
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

                    <div className="form-group row mb-5">
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

                    <hr />
                    <label htmlFor="srcLan" className="col-form-label" style={{ fontSize: '1.2rem' }}>Input Text</label>
                    <textarea className="form-control mb-5" id="inputText" rows="10" placeholder='Enter input text'>In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.</textarea>
                    <div className="text-center">
                        <button type="submit" className="btn" style={{ color: '#ffffff', backgroundColor: '#505050'}}>Save Changes</button>
                    </div>
                    <hr />
                </form>
                
                <label htmlFor="srcLan" className="col-form-label" style={{ fontSize: '1.2rem' }}>Summarized Text</label>
                <textarea className="form-control" id="summarizedText" rows="10" disabled>Our automated text summarization system efficiently condenses lengthy texts into concise summaries, supporting Hindi, English, and Marathi. Designed for various text types like news, research papers, and social media, it leverages advanced NLP technologies to make critical information easily accessible, breaking language barriers and enhancing understanding. Explore how it transforms information consumption.</textarea>
                
                <div className='text-center mt-5 mb-5'>
                <button type="submit" className="btn mr-5 btn-success" style={{ color: '#ffffff'}}>Download Summary</button>
                <button type="submit" className="btn btn-danger">Remove Summary</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PreviousSummary