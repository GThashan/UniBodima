import React, { useState } from 'react';
import api from '../api';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', { name, phone, password, role });
      if (response.data.status === 'success') {
        onSwitchToLogin(); // Automatically prompt login after successful register
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="custom-modal-close" onClick={onClose}>&times;</button>
        <h2 className="text-center mb-4" style={{ fontWeight: 600 }}>Create Account</h2>
        
        {error && <div className="alert alert-danger p-2 fs-6">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. 0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: 500 }}>I am a...</label>
            <div className="d-flex gap-3">
              <label className="d-flex align-items-center gap-2">
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={role === 'student'} 
                  onChange={() => setRole('student')} 
                /> Student
              </label>
              <label className="d-flex align-items-center gap-2">
                <input 
                  type="radio" 
                  name="role" 
                  value="owner" 
                  checked={role === 'owner'} 
                  onChange={() => setRole('owner')} 
                /> Property Owner
              </label>
            </div>
          </div>
          
          <button type="submit" className="search-btn w-100 justify-content-center" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <span className="text-muted">Already have an account? </span>
          <button 
            type="button"
            className="btn btn-link p-0 text-decoration-none" 
            style={{ fontWeight: 600, color: 'var(--primary-color)' }}
            onClick={onSwitchToLogin}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
