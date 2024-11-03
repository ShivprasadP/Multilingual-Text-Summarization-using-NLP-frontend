import React from 'react'

function Footer() {
  return (
    <footer className="text-white text-center py-3" style={{ backgroundColor: '#333333' }}>
      <div className="container">
        <p className="mb-0">© 2024 GenZ Intelligents. All rights reserved.</p>
        <p className="mb-0">
          <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-linkedin-in"></i></a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;