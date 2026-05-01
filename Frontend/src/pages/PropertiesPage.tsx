import React, { useState, useEffect } from 'react';
import api from '../api';
import { PropertyModal } from '../components/PropertyModal';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get('/boardings/ownerBoardings');
      if (response.data.status === 'success') {
        setProperties(response.data.boardings);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/boardings/deleteBoarding/${id}`);
        fetchProperties();
        toast.success('Property deleted successfully');
      } catch (error) {
        toast.error('Error deleting property');
      }
    }
  };

  const openAddModal = () => {
    setSelectedProperty(null);
    setShowModal(true);
  };

  const openEditModal = (property: any) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold" style={{ color: 'var(--text-dark)' }}>My Properties</h1>
          <p className="text-muted">Manage and update your property listings</p>
        </div>
        <button className="search-btn" onClick={openAddModal}>
          <FiPlus /> Add Property
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <h3>No properties found</h3>
          <p>You haven't added any properties yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {properties.map((property) => (
            <div className="col-12 col-md-6 col-lg-4" key={property._id}>
              <div className="listing-card">
                <div className="listing-img-wrapper">
                  <img 
                    src={property.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={property.title} 
                    className="listing-img" 
                  />
                  <div className="listing-tags">
                    <span className="tag-status">For Rent</span>
                  </div>
                </div>
                <div className="listing-body">
                  <h3 className="listing-title">{property.title}</h3>
                  <div className="listing-location">
                    <FiMapPin /> {property.location}
                  </div>
                  <div className="listing-features">
                    <div className="feature-item"><span>{property.roomCount}</span> Rooms</div>
                    <div className="feature-item"><span>{property.studentsCapacity}</span> Capacity</div>
                  </div>
                  <div className="listing-footer">
                    <div className="listing-price text-primary">LKR {property.price.toLocaleString()}</div>
                    <div className="d-flex gap-2">
                       <Link to={`/properties/${property._id}`} className="btn btn-outline-dark btn-sm rounded-circle p-2" title="View Details">
                        <FiEye />
                      </Link>
                      <button className="btn btn-outline-primary btn-sm rounded-circle p-2" onClick={() => openEditModal(property)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button className="btn btn-outline-danger btn-sm rounded-circle p-2" onClick={() => handleDelete(property._id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setShowModal(false)} 
          onSuccess={fetchProperties} 
        />
      )}
    </div>
  );
};
