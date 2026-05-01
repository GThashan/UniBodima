import React, { useState, useEffect } from 'react';
import { FiUser, FiLogOut, FiHome, FiClipboard, FiGrid, FiSettings } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
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
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

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
          {user && (
            <Link to="/" className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          )}
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
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="none" 
                id="dropdown-user"
                className="d-flex align-items-center gap-2"
                style={{ 
                  border: '1px solid var(--primary-color)', 
                  color: 'var(--primary-color)', 
                  borderRadius: '25px', 
                  padding: '8px 20px', 
                  fontWeight: 600,
                  boxShadow: 'none'
                }}
              >
                <FiUser /> <span className="d-none d-md-block">{user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0 mt-2">
                <Dropdown.Item onClick={() => navigate('/profile')} className="d-flex align-items-center gap-2">
                  <FiSettings /> Profile Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <div className="d-lg-none">
                  <Dropdown.Item onClick={() => navigate('/')} className="d-flex align-items-center gap-2">
                    <FiHome /> Home
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/requests')} className="d-flex align-items-center gap-2">
                    <FiClipboard /> Request
                  </Dropdown.Item>
                  {user.role === 'owner' && (
                    <Dropdown.Item onClick={() => navigate('/properties')} className="d-flex align-items-center gap-2">
                      <FiGrid /> Properties
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                </div>
                <Dropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2">
                  <FiLogOut /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
