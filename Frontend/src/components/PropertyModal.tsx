import React, { useState, useEffect } from 'react';
import api from '../api';

interface PropertyModalProps {
  property?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    distanceFromUniversity: '',
    price: '',
    roomCount: '',
    studentsCapacity: '',
    description: '',
    specialNote: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        location: property.location || '',
        distanceFromUniversity: property.distanceFromUniversity || '',
        price: property.price || '',
        roomCount: property.roomCount || '',
        studentsCapacity: property.studentsCapacity || '',
        description: property.description || '',
        specialNote: property.specialNote || '',
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (property) {
        await api.put(`/boardings/updateBoarding/${property._id}`, formData);
      } else {
        await api.post('/boardings/createBoarding', formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error saving property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal" style={{ maxWidth: '600px' }}>
        <button className="custom-modal-close" onClick={onClose}>&times;</button>
        <h2 className="text-center mb-4" style={{ fontWeight: 600 }}>
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-bold">Title</label>
              <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Location</label>
              <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Distance from Uni</label>
              <input type="text" name="distanceFromUniversity" className="form-control" value={formData.distanceFromUniversity} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Price</label>
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Rooms</label>
              <input type="number" name="roomCount" className="form-control" value={formData.roomCount} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Capacity</label>
              <input type="number" name="studentsCapacity" className="form-control" value={formData.studentsCapacity} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-bold">Description</label>
              <textarea name="description" className="form-control" rows={3} value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="col-12">
              <label className="form-label fw-bold">Special Note</label>
              <input type="text" name="specialNote" className="form-control" value={formData.specialNote} onChange={handleChange} />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="search-btn w-100 justify-content-center" disabled={loading}>
              {loading ? 'Saving...' : (property ? 'Update Property' : 'Add Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
