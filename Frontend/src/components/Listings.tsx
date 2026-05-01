import React, { useState, useEffect } from 'react';
import { FiMapPin, FiHeart, FiSearch, FiCalendar } from 'react-icons/fi';
import api from '../api';

export const Listings: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedBoarding, setSelectedBoarding] = useState<any>(null);
  const [requestData, setRequestData] = useState({ name: '', phone: '' });

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/boardings/public');
      if (response.data) {
        // Handle different response structures gracefully
        const data = Array.isArray(response.data) ? response.data : (response.data.boardings || []);
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    
    // Prefill user data if logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setRequestData({ name: user.name, phone: user.phone });
    }
  }, []);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/requests/create', {
        boardingId: selectedBoarding._id,
        studentName: requestData.name,
        studentPhone: requestData.phone
      });
      alert('Request sent successfully!');
      setShowRequestModal(false);
    } catch (error) {
      alert('Error sending request. Please login first.');
    }
  };

  return (
    <section className="listings-section">
      <div className="container">
        <h2 className="section-title">Today's Luxury Listings</h2>
        <p className="section-subtitle">
          Thousands of luxury home enthusiasts just like you visit our website.
        </p>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {listings.map((listing) => (
              <div className="col-12 col-md-6 col-lg-4" key={listing._id}>
                <div className="listing-card">
                  <div className="listing-img-wrapper">
                    <img src={listing.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={listing.title} className="listing-img" />
                    <div className="listing-tags">
                      <span className="tag-featured">Featured</span>
                      <span className="tag-status">For Rent</span>
                    </div>
                    <div className="listing-actions">
                      <button className="action-btn-circle"><FiHeart /></button>
                      <button className="action-btn-circle"><FiSearch /></button>
                    </div>
                  </div>
                  
                  <div className="listing-body">
                    <h3 className="listing-title">{listing.title}</h3>
                    <div className="listing-location">
                      <FiMapPin /> {listing.location}
                    </div>
                    
                    <div className="listing-features">
                      <div className="feature-item">
                        <span>{listing.roomCount}</span> Rooms
                      </div>
                      <div className="feature-item">
                        <span>{listing.studentsCapacity}</span> Capacity
                      </div>
                      <div className="feature-item">
                        <span>{listing.distanceFromUniversity}</span> km
                      </div>
                    </div>
                    
                    <div className="listing-footer">
                      <div className="listing-price">${listing.price}</div>
                      <button 
                        className="btn-details d-flex align-items-center gap-2"
                        onClick={() => {
                          setSelectedBoarding(listing);
                          setShowRequestModal(true);
                        }}
                      >
                        <FiCalendar /> Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showRequestModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="custom-modal-close" onClick={() => setShowRequestModal(false)}>&times;</button>
            <h3 className="mb-4">Request Visit</h3>
            <p className="text-muted mb-4 small">Interested in <strong>{selectedBoarding?.title}</strong>? Send a request to the owner.</p>
            
            <form onSubmit={handleSendRequest}>
              <div className="mb-3">
                <label className="form-label fw-bold">Your Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={requestData.name} 
                  onChange={(e) => setRequestData({...requestData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={requestData.phone} 
                  onChange={(e) => setRequestData({...requestData, phone: e.target.value})} 
                  required 
                />
              </div>
              <button type="submit" className="search-btn w-100 justify-content-center">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
