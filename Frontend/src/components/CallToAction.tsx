import React from 'react';
import bagImage from '../assets/bag.png';

export const CallToAction: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card shadow-lg">
          <div className="row align-items-center">
            <div className="col-lg-7 cta-text-content">
              <h2 className="cta-title">Looking to list your Bodima or Annex?</h2>
              <p className="cta-subtitle">
                Reach hundreds of Vavuniya University students searching for their next home. 
                Manage your properties and requests effortlessly.
              </p>
              <button className="search-btn px-5 py-3 fs-5">
                List Your Property
              </button>
            </div>
            <div className="col-lg-5 d-none d-lg-block text-center p-0">
              <img 
                src={bagImage} 
                alt="Owner" 
                className="cta-image" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Listing';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
