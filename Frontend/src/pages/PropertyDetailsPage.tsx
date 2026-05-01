import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUser, FiPhone, FiCheckCircle, FiInfo, FiArrowLeft, FiEdit } from 'react-icons/fi';
import api from '../api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boarding, setBoarding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({ name: '', phone: '' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchBoarding = async () => {
      try {
        const response = await api.get(`/boardings/public/${id}`);
        setBoarding(response.data.boarding);
      } catch (error) {
        toast.error('Failed to load property details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setRequestData({ name: parsedUser.name, phone: parsedUser.phone });
    }

    fetchBoarding();
  }, [id, navigate]);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/requests/create', {
        boardingId: id,
        studentName: requestData.name,
        studentPhone: requestData.phone
      });
      Swal.fire({
        title: 'Interest Sent!',
        text: 'The owner has been notified of your interest.',
        icon: 'success',
        confirmButtonColor: '#f08336'
      });
      setShowRequestModal(false);
    } catch (error) {
      toast.error('Could not send request');
    }
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (!boarding) return null;

  const isOwner = user && user._id === boarding.ownerId?._id;

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button 
        className="btn btn-link text-decoration-none text-muted mb-4 p-0 d-flex align-items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back to Listings
      </button>

      <div className="row g-5">
        {/* Left Side: Images and Main Details */}
        <div className="col-lg-8">
          <div className="property-details-card shadow-sm rounded-4 overflow-hidden bg-white mb-4">
            <img 
              src={boarding.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
              alt={boarding.title} 
              className="w-100"
              style={{ height: '450px', objectFit: 'cover' }}
            />
            
            <div className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="fw-bold mb-2">{boarding.title}</h1>
                  <div className="listing-location fs-5">
                    <FiMapPin /> {boarding.location}
                  </div>
                </div>
                <div className="text-end">
                  <div className="listing-price h2 mb-0">LKR {boarding.price.toLocaleString()}</div>
                  <span className="text-muted small">Per Month</span>
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="fw-bold mb-3">Description</h4>
              <p className="text-muted lh-lg mb-4">
                {boarding.description || "This beautiful property is located near Vavuniya University, offering a quiet and safe environment for students. It features well-maintained rooms and essential facilities to ensure a comfortable stay."}
              </p>

              <h4 className="fw-bold mb-3">Key Features</h4>
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <div className="fw-bold text-dark">{boarding.roomCount}</div>
                    <div className="small text-muted">Rooms</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <div className="fw-bold text-dark">{boarding.studentsCapacity}</div>
                    <div className="small text-muted">Total Capacity</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <div className="fw-bold text-dark">{boarding.distanceFromUniversity} km</div>
                    <div className="small text-muted">Uni Distance</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <div className="fw-bold text-success">Verified</div>
                    <div className="small text-muted">Status</div>
                  </div>
                </div>
              </div>

              <h4 className="fw-bold mb-3">Facilities Included</h4>
              <div className="d-flex flex-wrap gap-2">
                {['Electricity', 'Water', 'Kitchen', 'Tile Floor', 'Fan'].map(f => (
                  <span key={f} className="badge bg-light text-dark border px-3 py-2 fw-normal">
                    <FiCheckCircle className="text-success me-2" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Info & Actions */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
            {/* Owner Profile Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4">Posted By</h5>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <FiUser size={24} />
                </div>
                <div>
                  <div className="fw-bold">{boarding.ownerId?.name || 'Vavuniya Owner'}</div>
                  <div className="small text-muted">Registered Property Owner</div>
                </div>
              </div>
              
              <div className="d-grid gap-3">
                {isOwner ? (
                  <button className="btn btn-outline-primary py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" onClick={() => navigate('/properties')}>
                    <FiEdit /> Edit Listing
                  </button>
                ) : (
                  <>
                     <button 
                      className="search-btn justify-content-center py-3 fs-5"
                      onClick={() => {
                        const token = localStorage.getItem('token');
                        if (!token) {
                           toast.error('Please login to send a request');
                           return;
                        }
                        setShowRequestModal(true);
                      }}
                    >
                      <FiCalendar /> Request to Visit
                    </button>
                    <a href={`tel:${boarding.ownerId?.phone}`} className="btn btn-outline-dark py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2">
                      <FiPhone /> Call Owner
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="card borer-0 bg-light rounded-4 p-4">
              <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                <FiInfo /> <h6 className="fw-bold m-0">Safety Tips</h6>
              </div>
              <ul className="small text-muted ps-3 mb-0">
                <li className="mb-2">Visit the boarding place before making any payments.</li>
                <li className="mb-2">Verify the facilities with the owner directly.</li>
                <li>University students are advised to stay in groups.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

       {showRequestModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal animate__animated animate__zoomIn">
            <button className="custom-modal-close" onClick={() => setShowRequestModal(false)}>&times;</button>
            <h3 className="mb-4 fw-bold text-center">Confirm Visit Request</h3>
            <p className="text-muted mb-4 small text-center">Sending request for <strong>{boarding.title}</strong></p>
            
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
                Send Interest Notification
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
