import React from 'react'
import { Link } from 'react-router-dom'

function History() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4 mx-auto row justify-content-center" style={{ backgroundColor: '#666666', width: '50%', borderRadius: '50px' }}>
        <h1 style={{ color: '#ffffff'}}>History</h1>
      </div>
      <div className="row justify-content-center mx-auto mb-5" style={{ backgroundColor: '#cccccc', borderRadius: '30px' }}>
        <div className="col-md-12">
            <h5>Date: 03/11/2024</h5>
        </div>
        <div className="col-md-8">
            <div className="p-3 mb-3 mt-5" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                <p>
                    In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
                </p>
                <Link to="/previous-summary" className="btn btn-link">Read More</Link>
            </div>
            <div className="p-3 mb-5" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                <p>
                    In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
                </p>
                <Link to="/previous-summary" className="btn btn-link">Read More</Link>
            </div>
        </div>

        <div className="col-md-12">
            <h5>Date: 04/11/2024</h5>
        </div>
        <div className="col-md-8">
            <div className="p-3 mb-3 mt-5" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                <p>
                    In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
                </p>
                <Link to="/previous-summary" className="btn btn-link">Read More</Link>
            </div>
            <div className="p-3 mb-5" style={{ backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                <p>
                    In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
                </p>
                <Link to="/previous-summary" className="btn btn-link">Read More</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default History