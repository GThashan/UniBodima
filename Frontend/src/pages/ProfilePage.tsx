import React, { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiLogOut, FiSave, FiInfo } from 'react-icons/fi';
import api from '../api';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const userData = JSON.parse(data);
      setUser(userData);
      setFormData({ name: userData.name || '', phone: userData.phone || '' });
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', formData);
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success('Profile updated successfully!');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return <div className="container py-5 text-center">Please login to view profile.</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
            <div className="text-center mb-4">
              <div 
                className="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{ width: '80px', height: '80px', fontSize: '2rem' }}
              >
                <FiUser />
              </div>
              <h2 className="fw-bold m-0">My Profile Settings</h2>
              <span className="badge bg-secondary mt-2 px-3">
                {user.role ? user.role.toUpperCase() : 'USER'}
              </span>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label fw-bold d-flex align-items-center gap-2">
                  <FiUser className="text-muted" /> Full Name
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-lg border-2" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold d-flex align-items-center gap-2">
                  <FiPhone className="text-muted" /> Phone Number
                </label>
                <input 
                  type="text" 
                  className="form-control form-control-lg border-2" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  required
                />
              </div>

              <div className="bg-light p-3 rounded-3 mb-4 small d-flex gap-2 text-muted">
                <FiInfo className="mt-1 flex-shrink-0" />
                <div>
                  Updates to your phone number will be verified at next login. 
                  Role changes require contacting administrative support.
                </div>
              </div>

              <div className="d-grid gap-3">
                <button type="submit" className="search-btn justify-content-center py-3" disabled={loading}>
                  <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-outline-danger py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                  <FiLogOut /> Logout from UniBodima
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
