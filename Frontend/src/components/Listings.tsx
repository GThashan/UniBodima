import React from 'react';
import { FiMapPin, FiHeart, FiSearch, FiRepeat } from 'react-icons/fi';

const listings = [
  {
    id: 1,
    title: 'House In Foxhall Ave',
    location: 'Ryanggang, North Korea',
    price: '$203,652',
    beds: 6,
    baths: 5,
    sqft: '2,250',
    type: 'For Rent',
    featured: true,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Popcorn Aspen Colorado',
    location: 'Karas, Namibia',
    price: '$165,400',
    beds: 5,
    baths: 3,
    sqft: '1,652',
    type: 'For Sale',
    featured: true,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Refinery Parade Apartments',
    location: 'Trairão, Pará, Brazil',
    price: '$178,942',
    beds: 5,
    baths: 4,
    sqft: '2,213',
    type: 'For Sale',
    featured: true,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

export const Listings: React.FC = () => {
  return (
    <section className="listings-section">
      <div className="container">
        <h2 className="section-title">Today's Luxury Listings</h2>
        <p className="section-subtitle">
          Thousands of luxury home enthusiasts just like you visit our website.
        </p>

        <div className="row g-4">
          {listings.map((listing) => (
            <div className="col-12 col-md-6 col-lg-4" key={listing.id}>
              <div className="listing-card">
                <div className="listing-img-wrapper">
                  <img src={listing.img} alt={listing.title} className="listing-img" />
                  <div className="listing-tags">
                    {listing.featured && <span className="tag-featured">Featured</span>}
                    <span className="tag-status">{listing.type}</span>
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
                      <span>{listing.beds}</span> Beds
                    </div>
                    <div className="feature-item">
                      <span>{listing.baths}</span> Baths
                    </div>
                    <div className="feature-item">
                      <span>{listing.sqft}</span> SqFt
                    </div>
                  </div>
                  
                  <div className="listing-footer">
                    <div className="listing-price">{listing.price}</div>
                    <div className="listing-compare">
                      <FiRepeat /> Compare
                    </div>
                    <button className="btn-details">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
