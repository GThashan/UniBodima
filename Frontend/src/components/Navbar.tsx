import React from 'react';
import { FiUser, FiLogOut, FiHome, FiClipboard, FiGrid, FiSettings, FiBell } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';

interface NavbarProps {
  onLoginClick: () => void;
  user: any;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="custom-navbar sticky-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Side: Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="UniBodima" style={{ height: '60px' }} />

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
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {user && (
            <button className="nav-icon-btn d-flex align-items-center justify-content-center position-relative me-1" aria-label="Notifications">
              <FiBell style={{ fontSize: '1.2rem' }} />
              <span className="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                0
              </span>
            </button>
          )}

          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="user-dropdown"
                className="d-flex align-items-center gap-2 text-decoration-none dropdown-custom-toggle"
                style={{
                  color: 'var(--text-dark)',
                  fontSize: '1.1rem',
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
                <Dropdown.Item onClick={onLogout} className="text-danger d-flex align-items-center gap-2">
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
