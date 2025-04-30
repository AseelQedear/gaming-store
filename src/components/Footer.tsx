import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer mt-5 text-light">
      <div className="container py-5">
        <div className="row g-4">
          {/* Logo & Rights */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="footer-logo">🎮 Cila</h5>
            <p className="small mb-1">© {new Date().getFullYear()} Cila Tech. All rights reserved.</p>
            <p className="small">Built with ❤️ for gamers</p>
          </div>

          {/* Navigation */}
          <div className="col-md-4 text-center">
            <h6 className="text-accent mb-3">Quick Links</h6>
            <ul className="footer-links list-unstyled d-flex justify-content-center gap-4 mb-0">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Devices</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 text-center text-md-end">
            <h6 className="text-accent mb-3">Contact Us</h6>
            <p className="mb-1">📧 support@cilagaming.com</p>
            <p className="mb-1">📱 +966 555 123 456</p>
            <div className="social-icons d-flex justify-content-center justify-content-md-end gap-3 mt-2">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-discord"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
