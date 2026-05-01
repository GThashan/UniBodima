import React from 'react';
import { FiMapPin, FiPhoneCall, FiMail, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiChevronUp } from 'react-icons/fi';
import logo from '../assets/logo.png'; // Make sure the logo is transparent/white or adapted for dark bg

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container position-relative">
        
        {/* Scroll to top button */}
        <button onClick={scrollToTop} className="scroll-top-btn border-0">
          <FiChevronUp />
        </button>

        {/* Top Contact Row */}
        <div className="row footer-top align-items-center">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <img src={logo} alt="Proty" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <div className="footer-contact-item">
              <FiMapPin className="contact-icon" />
              <div className="contact-text">
                <div>Address</div>
                <div>proty-support@gmail.com</div> {/* Matching the image */}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <div className="footer-contact-item">
              <FiPhoneCall className="contact-icon" />
              <div className="contact-text">
                <div>Call us</div>
                <div>(603) 555-0123</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="footer-contact-item">
              <FiMail className="contact-icon" />
              <div className="contact-text">
                <div>Nee live help</div>
                <div>proty-support@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Widgets */}
        <div className="row g-4">
          {/* About Us */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>About us</h4>
            <ul className="footer-links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Home Loan Process</a></li>
              <li><a href="#">Customer reviews</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers with Proty</a></li>
              <li><a href="#">Work with us</a></li>
            </ul>
          </div>

          {/* Popular house */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Popular house</h4>
            <ul className="footer-links">
              <li><a href="#">#Villa</a></li>
              <li><a href="#">#Commercial</a></li>
              <li><a href="#">#Farm House</a></li>
              <li><a href="#">#Homestay</a></li>
              <li><a href="#">#Apartments</a></li>
              <li><a href="#">#Land/Plot</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Quick links</h4>
            <ul className="footer-links">
              <li><a href="#">Terms of use</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Our services</a></li>
              <li><a href="#">Contact support</a></li>
              <li><a href="#">Pricing plans</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Newsletter</h4>
            <p style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
              Sign up to receive the latest articles
            </p>
            <div className="newsletter-box">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="btn-subscribe">Subscribe</button>
            </div>
            <label className="agreement">
              <input type="checkbox" style={{ marginTop: '4px' }} />
              I have read and agree to the terms & conditions
            </label>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-5">
          <div>
            Copyright © 2024 Proty - real estate. Designed & Developed by Themesflat
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ color: 'white', fontWeight: 500 }}>Follow us</span>
            <div className="social-links">
              <a href="#" className="social-circle"><FiFacebook /></a>
              <a href="#" className="social-circle"><FiTwitter /></a>
              <a href="#" className="social-circle"><FiLinkedin /></a>
              <a href="#" className="social-circle"><FiInstagram /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
