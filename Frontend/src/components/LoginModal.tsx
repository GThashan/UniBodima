import React, { useState } from 'react';
import api from '../api';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToRegister, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { identifier, password });
      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess();
        onClose();
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="custom-modal-close" onClick={onClose}>&times;</button>
        <h2 className="text-center mb-4" style={{ fontWeight: 600 }}>Welcome Back</h2>
        
        {error && <div className="alert alert-danger p-2 fs-6">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Phone Number or Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="search-btn w-100 justify-content-center" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <span className="text-muted">Don't have an account? </span>
          <button 
            type="button"
            className="btn btn-link p-0 text-decoration-none" 
            style={{ fontWeight: 600, color: 'var(--primary-color)' }}
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
