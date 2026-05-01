import React, { useState } from 'react';
import { BsBuilding, BsHouseDoor } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { FiMap } from 'react-icons/fi';
import { LiaHotelSolid } from 'react-icons/lia';

const categories = [
  { id: 1, name: 'Penthouse', count: '1 Property', icon: <BsBuilding /> },
  { id: 2, name: 'Townhouse', count: '1 Property', icon: <BsBuilding /> },
  { id: 3, name: 'Villa', count: '4 Properties', icon: <MdOutlineVilla /> },
  { id: 4, name: 'Apartments', count: '3 Properties', icon: <BsBuilding /> },
  { id: 5, name: 'Homestay', count: '3 Properties', icon: <LiaHotelSolid /> },
  { id: 6, name: 'Land/Plot', count: '1 Property', icon: <FiMap /> },
];

export const Categories: React.FC = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Try Searching For</h2>
        <p className="section-subtitle">
          Thousands of luxury home enthusiasts just like you have found their dream home
        </p>
        
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div className="col-6 col-md-4 col-lg-2" key={cat.id}>
              <div 
                className={`category-card ${active === cat.id ? 'active' : ''}`}
                onClick={() => setActive(cat.id)}
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
