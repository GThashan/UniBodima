import React, { useState, useEffect } from 'react';
import api from '../api';
import { FiX, FiCalendar, FiUser, FiPhone } from 'react-icons/fi';

export const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [actionData, setActionData] = useState({ date: '', time: '', reason: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchRequests(userData.role);
  }, []);

  const fetchRequests = async (role: string) => {
    setLoading(true);
    try {
      const endpoint = role === 'owner' ? '/requests/ownerRequests' : '/requests/studentRequests';
      const response = await api.get(endpoint);
      if (response.data.status === 'success') {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      await api.put(`/requests/accept/${id}`, {
        visitDate: actionData.date,
        visitTime: actionData.time
      });
      setSelectedRequest(null);
      setActionData({ date: '', time: '', reason: '' });
      fetchRequests('owner');
    } catch (error) {
      alert('Error accepting request');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.put(`/requests/reject/${id}`, {
        rejectReason: actionData.reason
      });
      setSelectedRequest(null);
      setActionData({ date: '', time: '', reason: '' });
      fetchRequests('owner');
    } catch (error) {
      alert('Error rejecting request');
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--text-dark)' }}>My Requests</h1>
        <p className="text-muted">
          {user?.role === 'owner' ? 'Manage student requests for visits' : 'Track the status of your sent requests'}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <h3>No requests found</h3>
          <p>You don't have any requests at the moment.</p>
        </div>
      ) : (
        <div className="row g-4">
          {requests.map((req) => (
            <div className="col-12" key={req._id}>
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <h5 className="fw-bold mb-1">{req.boardingId?.title || 'Unknown Property'}</h5>
                    <p className="text-muted mb-0">{req.boardingId?.location}</p>
                    <span className={`badge mt-2 ${
                      req.status === 'pending' ? 'bg-warning' : 
                      req.status === 'accepted' ? 'bg-success' : 'bg-danger'
                    }`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="col-lg-4 my-3 my-lg-0">
                    {user?.role === 'owner' ? (
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FiUser className="text-primary" /> <strong>{req.studentName}</strong>
                        </div>
                        <div className="d-flex align-items-center gap-2 text-muted">
                          <FiPhone /> {req.studentPhone}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {req.status === 'accepted' && (
                          <div className="bg-success bg-opacity-10 p-3 rounded-3">
                            <p className="mb-1 text-success fw-bold"><FiCalendar /> Visit Details:</p>
                            <span className="text-dark small">{req.visitDate} at {req.visitTime}</span>
                          </div>
                        )}
                        {req.status === 'rejected' && (
                          <div className="bg-danger bg-opacity-10 p-3 rounded-3">
                            <p className="mb-1 text-danger fw-bold"><FiX /> Reject Reason:</p>
                            <span className="text-dark small">{req.rejectReason}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-lg-4 text-lg-end">
                    {user?.role === 'owner' && req.status === 'pending' && (
                      <div className="d-flex gap-2 justify-content-lg-end">
                        <button className="btn btn-success rounded-pill px-4" onClick={() => setSelectedRequest({ id: req._id, type: 'accept' })}>
                          Accept
                        </button>
                        <button className="btn btn-danger rounded-pill px-4" onClick={() => setSelectedRequest({ id: req._id, type: 'reject' })}>
                          Reject
                        </button>
                      </div>
                    )}
                    {user?.role === 'owner' && req.status !== 'pending' && (
                       <div className="text-muted italic">Request {req.status}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal (Accept/Reject) */}
      {selectedRequest && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="custom-modal-close" onClick={() => setSelectedRequest(null)}>&times;</button>
            <h3 className="mb-4">{selectedRequest.type === 'accept' ? 'Set Visit Schedule' : 'Reject Request'}</h3>
            
            {selectedRequest.type === 'accept' ? (
              <div>
                <div className="mb-3">
                  <label className="form-label">Visit Date</label>
                  <input type="date" className="form-control" value={actionData.date} onChange={(e) => setActionData({...actionData, date: e.target.value})} />
                </div>
                <div className="mb-4">
                  <label className="form-label">Visit Time</label>
                  <input type="time" className="form-control" value={actionData.time} onChange={(e) => setActionData({...actionData, time: e.target.value})} />
                </div>
                <button className="search-btn w-100 justify-content-center" onClick={() => handleAccept(selectedRequest.id)}>
                  Confirm Acceptance
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="form-label">Reason for Rejection</label>
                  <textarea className="form-control" rows={3} value={actionData.reason} onChange={(e) => setActionData({...actionData, reason: e.target.value})} placeholder="e.g. Property already booked"></textarea>
                </div>
                <button className="btn btn-danger w-100 py-3 rounded-4 fw-bold" onClick={() => handleReject(selectedRequest.id)}>
                  Reject Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
