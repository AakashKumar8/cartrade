import React, { useState, useEffect, useRef } from 'react';
import './navbarBanner.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';

const NavbarBanner = () => {
  const [showNewCarsDropdown, setShowNewCarsDropdown] = useState(false);
  const [showOldCarsDropdown, setShowOldCarsDropdown] = useState(false);

  const navigate = useNavigate();

  const newCarsRef = useRef(null);
  const oldCarsRef = useRef(null);

  const toggleDropdown = (type) => {
    if (type === 'new') {
      setShowNewCarsDropdown((prev) => !prev);
      setShowOldCarsDropdown(false);
    } else if (type === 'old') {
      setShowOldCarsDropdown((prev) => !prev);
      setShowNewCarsDropdown(false);
    }
  };

  const handleCategoryClick = (category) => {
    const carsRef = ref(db, 'selectedCategories');
    push(carsRef, {
      category,
      timestamp: new Date().toISOString(),
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        newCarsRef.current &&
        !newCarsRef.current.contains(event.target) &&
        oldCarsRef.current &&
        !oldCarsRef.current.contains(event.target)
      ) {
        setShowNewCarsDropdown(false);
        setShowOldCarsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbarBanner">
      <div className="navbarBannerOptionsLeft">
        {/* Home Icon */}
        <div className="optionsNavbarBanner" onClick={() => navigate('/')}>
          <MenuIcon sx={{ fontSize: '24px' }} />
        </div>

        {/* New Cars Dropdown */}
        <div
          className="optionsNavbarBanner dropdown-container"
          ref={newCarsRef}
          onClick={() => toggleDropdown('new')}
        >
          <div className="alloptionsNavbarBanner">New Cars</div>
          {showNewCarsDropdown && (
            <div className="dropdown-menu">
              {['SUV', 'Sedan', 'Hatchback', 'Crossover', 'Convertible', 'Electric Cars', 'Minivan'].map((type) => (
                <Link
                  to={`/products/${type}`}
                  key={type}
                  onClick={() => {
                    handleCategoryClick(type);
                    setShowNewCarsDropdown(false);
                  }}
                >
                  {type}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Static Links */}
        <a
          href="https://www.cartrade.com/car-loan/"
          className="optionsNavbarBanner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="alloptionsNavbarBanner">Car Loan</div>
        </a>

        <Link to="/cart" className="optionsNavbarBanner">
          <div className="alloptionsNavbarBanner">Sell Car</div>
        </Link>

        <a
          href="https://www.whatcar.com/reviews"
          className="optionsNavbarBanner"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="alloptionsNavbarBanner">News & Reviews</div>
        </a>
      </div>
    </div>
  );
};

export default NavbarBanner;
