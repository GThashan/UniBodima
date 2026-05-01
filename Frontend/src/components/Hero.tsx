import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import topImage from '../assets/top.png';

export const Hero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('10');
  const [priceRange, setPriceRange] = useState('15000'); // Adjusted for student budget

  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: `url(${topImage})` }}
    >
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">Find Your Ideal Bodima</h1>
        <p className="hero-subtitle">
          Perfectly specialized for Vavuniya University Students. 
          Discover affordable and comfortable stays near the campus.
        </p>

        {/* Search Bar Container */}
        <div className="search-container">
          
          {/* Location Input */}
          <div className="search-input-wrapper">
            <label>Location near Vavuniya Uni</label>
            <input 
              type="text" 
              placeholder="e.g. Pampaimadu, Kurumankadu..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="search-divider d-none d-lg-block"></div>

          {/* Location Range (Distance) */}
          <div className="search-input-wrapper">
            <label>Distance ({distance} km)</label>
            <input 
              type="range" 
              className="form-range custom-range" 
              min="0.5" 
              max="10" 
              step="0.5"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>

          <div className="search-divider d-none d-lg-block"></div>

          {/* Price Range */}
          <div className="search-input-wrapper">
            <label>Max Price (LKR {Number(priceRange).toLocaleString()})</label>
            <input 
              type="range" 
              className="form-range custom-range" 
              min="2000" 
              max="50000" 
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button className="search-btn ms-lg-3">
            Search <FiSearch />
          </button>
        </div>

        {/* Categories aligned nicely below search */}
        <div className="category-buttons">
          <button className="category-btn">
             Single Room
          </button>
          <button className="category-btn">
             Shared Annex
          </button>
          <button className="category-btn">
             Full House
          </button>
          <button className="category-btn">
             Hostel
          </button>
        </div>

      </div>
    </section>
  );
};
