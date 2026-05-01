import React, { useState, useEffect } from 'react';
import { FiUser, FiLogOut, FiHome, FiClipboard, FiGrid, FiSettings } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]); // Re-check user status on location changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="custom-navbar sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Side: Logo */}
        <Link to="/" className="logo-container text-decoration-none">
          <img 
            src={logo} 
            alt="UniBodima Logo" 
            style={{ height: '40px', objectFit: 'contain' }} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x40?text=UniBodima';
            }}
          />
        </Link>

        {/* Center: Navigation Links */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <Link to="/" className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          {user && (
            <Link to="/requests" className={`nav-link-custom ${isActive('/requests') ? 'active' : ''}`}>
              Request
            </Link>
          )}
          {user && user.role === 'owner' && (
            <Link to="/properties" className={`nav-link-custom ${isActive('/properties') ? 'active' : ''}`}>
              Properties
            </Link>
          )}
        </div>

        {/* Right Side: User Actions */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <div className="dropdown">
              <button 
                className="btn d-flex align-items-center gap-2" 
                style={{ border: '1px solid var(--primary-color)', color: 'var(--primary-color)', borderRadius: '25px', padding: '8px 20px', fontWeight: 600 }}
                id="userDropdown"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <FiUser /> <span className="d-none d-md-block">{user.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
                <li>
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleNavigate('/profile')}>
                    <FiSettings /> Profile Settings
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li className="d-lg-none">
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleNavigate('/')}>
                    <FiHome /> Home
                  </button>
                </li>
                <li className="d-lg-none">
                  <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleNavigate('/requests')}>
                    <FiClipboard /> Request
                  </button>
                </li>
                {user.role === 'owner' && (
                  <li className="d-lg-none">
                    <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleNavigate('/properties')}>
                      <FiGrid /> Properties
                    </button>
                  </li>
                )}
                <li className="d-lg-none"><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <button className="login-btn" aria-label="Login" onClick={onLoginClick}>
                <FiUser />
              </button>
              <span className="login-text d-none d-md-block" onClick={onLoginClick}>Login</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
