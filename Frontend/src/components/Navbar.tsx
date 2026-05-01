import React, { useState, useEffect } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import logo from '../assets/logo.png';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

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
          {user ? (
            <div className="dropdown">
              <button 
                className="btn d-flex align-items-center gap-2" 
                style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)', borderRadius: '25px', padding: '8px 20px', fontWeight: 600 }}
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <FiUser /> <span className="d-none d-md-block">{user.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li><a className="dropdown-item" href="#">Dashboard ({user.role})</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}><FiLogOut /> Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <button className="login-btn" aria-label="Login" onClick={onLoginClick}>
                <FiUser />
              </button>
              <span className="login-text d-none d-md-block" onClick={onLoginClick}>Login</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
