// src/components/Layout/Navbar/NavbarBelt.jsx
import React, { useEffect, useState, useRef } from 'react';
import './navbarBelt.css';
import axios from 'axios';

// Assets
import CarTrade from '../../../Assets/CarTrade.png';
import india from '../../../Assets/india.png';

// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';

// Routing & Redux
import { Link, useNavigate } from 'react-router-dom';

// Firebase‑Auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../Component/firebase';

const NavbarBelt = () => {
  const [userName, setUserName] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // User Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email?.split('@')[0];
        setUserName(name);
      } else {
        setUserName(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/LoginPage');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = async () => {
    const makeQuery = searchQuery.trim();
    if (!makeQuery) {
      alert('Please provide car name');
      return
    };

    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/cars', {
        params: { make: makeQuery },
        headers: {
          'X-Api-Key': 'F/uc9EP6E7znmUFdoiI7Ng==Ysxy52pQWpcKqCj6',
        },
      });

      const cars = Array.isArray(response.data) ? response.data : [];

      if (cars.length === 0) {
        alert('No cars found for that make.');
        return;
      }

      // Filter unique models (max 3)
      const uniqueModelsMap = new Map();
      for (const c of cars) {
        if (!uniqueModelsMap.has(c.model)) {
          uniqueModelsMap.set(c.model, c);
        }
        if (uniqueModelsMap.size >= 3) break; // stop once we have 3 unique models
      }

      const uniqueCars = Array.from(uniqueModelsMap.values());

      if (uniqueCars.length === 0) {
        alert('No unique car models found for that make.');
        return;
      }

      const formatted = uniqueCars.map((c, idx) => ({
        id: idx + 1,
        Make_Name: c.make,
        Model_Name: c.model,
        image: `https://source.unsplash.com/400x300/?car,${c.make},${c.model}+car`,
      }));

      navigate('/search-results', { state: { results: formatted, make: makeQuery } });
    } catch (err) {
      console.error('API error:', err);
      alert('Could not fetch car data. Please try again.');
    }
  };

  // Handle enter key press in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="navbarBelt">
      {/* Logo */}
      <div className="leftNavBelt">
        <Link to="/" className="leftNavBeltLogo">
          <img src={CarTrade} alt="CarTradeLogo" className="amazonLogoNavbar" />
        </Link>
      </div>

      {/* Location */}
      <div className="navbarBeltLocation">
        <LocationOnOutlinedIcon className="navbarBeltLocationImgIcon" />
        <div className="navbarBeltLocationPlace">
          <div className="navbarBeltLocationTop">Delivering To Kolkata 700001</div>
          <div className="navbarBeltLocationBottom">Update Location</div>
        </div>
      </div>

      {/* Search */}
      <div className="navbarBeltSearchBox">
        <div className="navbarBeltSearchDiv">
          <input
            className="navbarBeltInputSerchBox"
            placeholder="Search by Car Make (e.g., Toyota, Honda)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: 600 }}
          />
          <div
            className="searchIconNavbarBelt"
            onClick={handleSearch}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          >
            <SearchIcon className="searchIconNavbarBeltIcon" />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="rightSideNavbarBelt">
        {/* Language selector */}
        <div className="indianFlagCode">
          <img src={india} alt="India" className="indiaFlag" />
          <div className="indiaCodeNavbarBelt">
            EN <ArrowDropDownOutlinedIcon fontSize="small" />
          </div>
        </div>

        {/* Account */}
        <div
          className="helloSignInNavbstBelt"
          ref={dropdownRef}
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {userName ? (
            <>
              <div className="helloTopNavbarBelt">Hello, {userName}</div>
              <div className="indiaCodeNavbarBelt">Accounts & Lists</div>
              {showDropdown && (
                <div className="dropdownMenu">
                  <button onClick={handleLogout} className="dropdownItem">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/LoginPage" className="helloTopNavbarBelt">
              Hello, User
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarBelt;
