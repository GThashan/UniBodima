import React, { useState, useEffect } from 'react';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

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
      
      Swal.fire({
        title: 'Success!',
        text: 'Your visit request has been sent to the owner.',
        icon: 'success',
        confirmButtonColor: '#f08336'
      });
      
      setShowRequestModal(false);
    } catch (error) {
      toast.error('Log in as a student to send requests');
    }
  };

  if (!loading && listings.length === 0) return null;

  return (
    <section className="listings-section">
      <div className="container">
        <h2 className="section-title">Today's Listings</h2>
        <p className="section-subtitle">
          Discover hand-picked lodgings specifically for Vavuniya University students.
        </p>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {listings.map((listing) => (
              <div className="col-12 col-md-6 col-lg-4" key={listing._id}>
                <div className="listing-card shadow-sm">
                  <Link to={`/properties/${listing._id}`} className="text-decoration-none">
                    <div className="listing-img-wrapper">
                      <img src={listing.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt={listing.title} className="listing-img" />
                      <div className="listing-tags">
                        <span className="tag-featured">Featured</span>
                        <span className="tag-status">For Rent</span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="listing-body">
                    <Link to={`/properties/${listing._id}`} className="text-decoration-none color-inherit">
                      <h3 className="listing-title">{listing.title}</h3>
                    </Link>
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
                      <div className="listing-price text-primary">LKR {listing.price.toLocaleString()}</div>
                      <div className="d-flex gap-2">
                        <Link to={`/properties/${listing._id}`} className="btn btn-outline-dark rounded-pill px-3 py-1 small">
                          Details
                        </Link>
                        <button 
                          className="btn-details d-flex align-items-center gap-2"
                          onClick={() => {
                            const token = localStorage.getItem('token');
                            if (!token) {
                               toast.error('Please login to send a request');
                               return;
                            }
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
              </div>
            ))}
          </div>
        )}
      </div>

      {showRequestModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal animate__animated animate__zoomIn">
            <button className="custom-modal-close" onClick={() => setShowRequestModal(false)}>&times;</button>
            <h3 className="mb-4 fw-bold">Request Visit</h3>
            <p className="text-muted mb-4 small">Interested in <strong>{selectedBoarding?.title}</strong>? Confirm your contact details for the owner.</p>
            
            <form onSubmit={handleSendRequest}>
              <div className="mb-3">
                <label className="form-label fw-bold">Your Name</label>
                <input 
                  type="text" 
                  className="form-control border-2" 
                  value={requestData.name} 
                  onChange={(e) => setRequestData({...requestData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control border-2" 
                  value={requestData.phone} 
                  onChange={(e) => setRequestData({...requestData, phone: e.target.value})} 
                  required 
                />
              </div>
              <button type="submit" className="search-btn w-100 justify-content-center py-3">
                Confirm & Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
