import React from 'react';
import { FiUser } from 'react-icons/fi';
import logo from '../assets/logo.png';

export const Navbar: React.FC = () => {
  return (
    <nav className="custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Side: Logo */}
        <div className="logo-container">
          <img 
            src={logo} 
            alt="Proty Real Estate" 
            style={{ height: '40px', objectFit: 'contain' }} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x40?text=LOGO';
            }}
          />
        </div>

        {/* Right Side: Login Icon */}
        <div className="d-flex align-items-center">
          <button className="login-btn" aria-label="Login">
            <FiUser />
          </button>
          <span className="login-text d-none d-md-block">Login</span>
        </div>
      </div>
    </nav>
  );
};
