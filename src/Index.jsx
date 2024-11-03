import React from 'react'
import Navbar from './components/Navbar'

function Index() {
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="text-center">
          <h1 style={{ backgroundColor: '#666666', color: '#ffffff', padding: '15px' }}>
            Welcome to Our Multilingual Text Summarization System!
          </h1>
        </div>
        <div className="mt-4">
          <p style={{ fontSize: '1.3rem', backgroundColor: '#d9d9d9', padding: '25px' }}>
            In an era where information is both abundant and fragmented, our automated text summarization system offers a vital solution. Designed to condense lengthy texts into concise, informative summaries, our system supports multiple languages including Hindi, English, and Marathi. Whether you’re sifting through news articles, academic papers, or social media posts, our tool ensures you capture the essence of the content quickly and efficiently. Leveraging cutting-edge natural language processing technologies, our platform aims to make critical information accessible to everyone, transcending language barriers and enhancing understanding. Explore how our system can transform your information consumption experience.
          </p>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Effortless Summarization</h5>
                <p className="card-text flex-grow-1">Experience the power of automated text summarization. Our system reduces lengthy documents into concise summaries, saving you time and effort.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Multilingual Support</h5>
                <p className="card-text flex-grow-1">Breaking language barriers with seamless support for Hindi, English, and Marathi. Summarize texts and receive results in your preferred language effortlessly.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Advanced NLP Technology</h5>
                <p className="card-text flex-grow-1">Leveraging state-of-the-art Natural Language Processing models, our system ensures accurate and contextually relevant summaries for all your text inputs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">User-Friendly Interface</h5>
                <p className="card-text flex-grow-1">Navigate with ease through our intuitive interface. Designed for simplicity, our platform makes text summarization accessible to everyone.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Fast and Efficient</h5>
                <p className="card-text flex-grow-1">Enjoy quick processing and rapid results. Our system is optimized for speed, ensuring you get your summaries without delay.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card flex-fill" style={{ backgroundColor: '#d9d9d9' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Secure and Reliable</h5>
                <p className="card-text flex-grow-1">Your data is safe with us. We prioritize security and reliability to ensure your information is handled with utmost care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;