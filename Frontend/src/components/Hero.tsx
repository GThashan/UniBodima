import React, { useState } from 'react';
import { FiSearch, FiHome, FiKey } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import topImage from '../assets/top.png';

export const Hero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('10');
  const [priceRange, setPriceRange] = useState('500000');

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${topImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Search Luxury Homes</h1>
        <p className="hero-subtitle">
          Thousands of luxury home enthusiasts just like you visit our website.
        </p>

        {/* Search Bar Container */}
        <div className="search-container">

          {/* Location Input */}
          <div className="search-input-wrapper">
            <label>Location</label>
            <input
              type="text"
              placeholder="Place, neighborhood..."
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
              min="1"
              max="50"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>

          <div className="search-divider d-none d-lg-block"></div>

          {/* Price Range */}
          <div className="search-input-wrapper">
            <label>Max Price (${Number(priceRange).toLocaleString()})</label>
            <input
              type="range"
              className="form-range custom-range"
              min="50000"
              max="5000000"
              step="50000"
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
            <BsBuilding /> Penthouse
          </button>
          <button className="category-btn">
            <FiHome /> Townhouse
          </button>
          <button className="category-btn">
            <FiKey /> Villa
          </button>
          <button className="category-btn">
            <BsBuilding /> Apartments
          </button>
        </div>

      </div>
    </section>
  );
};
