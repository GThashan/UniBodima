import React from 'react';
import { FiMapPin, FiPhoneCall, FiMail, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiChevronUp } from 'react-icons/fi';
import logo from '../assets/logo.png';

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
            <img src={logo} alt="UniBodima" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <div className="footer-contact-item">
              <FiMapPin className="contact-icon" />
              <div className="contact-text">
                <div>Campus Hub</div>
                <div>Vavuniya, Sri Lanka</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3 mb-md-0">
            <div className="footer-contact-item">
              <FiPhoneCall className="contact-icon" />
              <div className="contact-text">
                <div>Student Helpline</div>
                <div>+94 71 234 5678</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="footer-contact-item">
              <FiMail className="contact-icon" />
              <div className="contact-text">
                <div>Support Email</div>
                <div>support@unibodima.lk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Widgets */}
        <div className="row g-4">
          {/* About Us */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>UniBodima</h4>
            <p className="small text-muted mb-3">
              The leading platform for Vavuniya University students to find safe, affordable, and high-quality boarding houses near the campus.
            </p>
            <ul className="footer-links">
              <li><a href="#">About Project</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Student Safety</a></li>
              <li><a href="#">Campus Map</a></li>
            </ul>
          </div>

          {/* Accommodation Types */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Common Categories</h4>
            <ul className="footer-links">
              <li><a href="#">#SingleRooms</a></li>
              <li><a href="#">#SharedAnnex</a></li>
              <li><a href="#">#BoardingHouses</a></li>
              <li><a href="#">#Pampaimadu</a></li>
              <li><a href="#">#Kurumankadu</a></li>
              <li><a href="#">#GirlsOnly</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Quick links</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Registration Guide</a></li>
              <li><a href="#">Owner Login</a></li>
              <li><a href="#">Student Login</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3 footer-widget">
            <h4>Stay Updated</h4>
            <p style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
              Subscribe to get alerts on newly listed properties near the university.
            </p>
            <div className="newsletter-box">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="btn-subscribe">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-5">
          <div className="small">
            Copyright © 2024 UniBodima. Specifically tailored for Vavuniya University of Sri Lanka.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ color: 'white', fontWeight: 500 }}>Find us on</span>
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
