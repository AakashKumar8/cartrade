import React, { useEffect, useState, useRef } from 'react';
import './navbarBelt.css';
import axios from 'axios';

// Assets
import CarTrade from '../../../Assets/CarTrade.png';
import india from '../../../Assets/india.png';

// Material UI Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';

// Routing and Redux
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Firebase Authentication
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../Component/firebase';

const NavbarBelt = () => {
  const [userName, setUserName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email?.split('@')[0];
        setUserName(name);
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    navigate('/LoginPage');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // search using NHTSA API (No API key needed)
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${searchQuery}?format=json`
      );
      console.log('Search results:', response.data.Results);

      // Optional: navigate to a result page with results
      navigate('/search-results', {
        state: { results: response.data.Results, make: searchQuery }
      });
    } catch (error) {
      console.error('Error fetching car data:', error);
      alert('Could not fetch car data. Please try again.');
    }
  };

  return (
    <div className='navbarBelt'>
      {/* Logo */}
      <div className="leftNavBelt">
        <Link to={'/'} className="leftNavBeltLogo">
          <img className='amazonLogoNavbar' src={CarTrade} alt='CarTradeLogo' />
        </Link>
      </div>

      {/* Location */}
      <div className="navbarBeltLocation">
        <div className="navbarBeltLocationImg">
          <LocationOnOutlinedIcon className='navbarBeltLocationImgIcon' sx={{ fontSize: "22px" }} />
        </div>
        <div className='navbarBeltLocationPlace'>
          <div className='navbarBeltLocationTop'>Delivering To Kolkata 700001</div>
          <div className='navbarBeltLocationBottom'>Update Location</div>
        </div>
      </div>

      {/* Search Box */}
      <div className="navbarBeltSearchBox">
        <div className="navbarBeltSearchDiv">
          <input
            type="text"
            className="navbarBeltInputSerchBox"
            placeholder="Search by Car Make (e.g., Toyota, Honda)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 600 }}
          />
          <div className="searchIconNavbarBelt" onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "26px" }} className="searchIconNavbarBeltIcon" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="rightSideNavbarBelt">
        {/* Language Flag */}
        <div className="indianFlagCode">
          <img src={india} className='indiaFlag' alt="India" />
          <div className='indiaCodeNavbarBelt'>
            EN <ArrowDropDownOutlinedIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: -0.4 }} />
          </div>
        </div>

        {/* User Account Section */}
        <div className='helloSignInNavbstBelt' style={{ position: 'relative' }} ref={dropdownRef}>
          {userName ? (
            <>
              <div onClick={handleLogout} className='helloTopNavbarBelt' style={{ cursor: 'pointer' }}>
                Hello, {userName}
              </div>
              <div className='indiaCodeNavbarBelt'>Accounts & Lists</div>
            </>
          ) : (
            <Link to="/LoginPage" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className='helloTopNavbarBelt'>Hello, User</div>
              <div className='indiaCodeNavbarBelt'>Accounts & Lists</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarBelt;
