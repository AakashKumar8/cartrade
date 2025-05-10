import React, { useState } from 'react';
import './navbarBanner.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavbarBanner = () => {
  const [showNewCarsDropdown, setShowNewCarsDropdown] = useState(false);
  const [showOldCarsDropdown, setShowOldCarsDropdown] = useState(false);

  const toggleDropdown = (type) => {
    if (type === 'new') {
      setShowNewCarsDropdown(!showNewCarsDropdown);
      setShowOldCarsDropdown(false);
    } else if (type === 'old') {
      setShowOldCarsDropdown(!showOldCarsDropdown);
      setShowNewCarsDropdown(false);
    }
  };

  return (
    <div className="navbarBanner">
      <div className="navbarBannerOptionsLeft">
        <div className="optionsNavbarBanner">
          <MenuIcon sx={{ fontSize: '24px' }} />
          <div className="alloptionsNavbarBanner">
          
            </div>
        </div>

        {/* New Cars Dropdown */}
        <div className="optionsNavbarBanner dropdown-container" onClick={() => toggleDropdown('new')}>
          <div className="alloptionsNavbarBanner">New Cars</div>
          {showNewCarsDropdown && (
            <div className="dropdown-menu">
              <Link to="/products/SUV">SUV</Link>
              <Link to="/products/Sedan">Sedan</Link>
              <Link to="/products/Hatchback">Hatchback</Link>
              <Link to="/products/Crossover">Crossover</Link>
              <Link to="/products/Convertible">Convertible</Link>
              <Link to="/products/Electric Cars">Electric Cars</Link>
              <Link to="/products/Minivan">Minivan</Link>
            </div>
          )}
        </div>

        {/* Old Cars Dropdown */}
        <div className="optionsNavbarBanner dropdown-container" onClick={() => toggleDropdown('old')}>
          <div className="alloptionsNavbarBanner">Old Cars</div>
          {showOldCarsDropdown && (
            <div className="dropdown-menu">
              <Link to="/products/development">By City</Link>
              <Link to="/products/development">By Model</Link>
              <Link to="/products/development">By Brand</Link>
              <Link to="/products/development">Explore Used Cars</Link>
              <Link to="/products/development">CarWale abSure</Link>
              <Link to="/products/development">Used Car Valuation</Link>
            </div>
          )}
        </div>

        {/* Remaining Static Links */}
        <Link to="/products" className="optionsNavbarBanner">
          <div className="alloptionsNavbarBanner">Car Loan</div>
        </Link>
        <Link to="/cart" className="optionsNavbarBanner">
          <div className="alloptionsNavbarBanner">Sell Car</div>
        </Link>
        <Link to="https://www.whatcar.com/reviews" className="optionsNavbarBanner">
          <div className="alloptionsNavbarBanner">News & Reviews</div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarBanner;
