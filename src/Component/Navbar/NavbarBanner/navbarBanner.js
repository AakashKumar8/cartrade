import React from 'react';
import './navbarBanner.css';

// Material UI icon for the menu
import MenuIcon from '@mui/icons-material/Menu';

// React Router for navigation
import { Link } from 'react-router-dom';

const NavbarBanner = () => {
  // Array of menu option labels
  const options = [
    { name: "Fresh" },
    { name: "Mini TV" },
    { name: "Sell" },
    { name: "Best Sellers" },
    { name: "Today's Deals" },
    { name: "Mobiles" },
    { name: "Electronics" },
    { name: "Prime" },
    { name: "Customer Service" },
    { name: "Fashion" },
    { name: "Home & Kitchen" }
  ];

  return (
    <div className="navbarBanner">
      {/* Left section of the banner containing menu icon and category links */}
      <div className="navbarBannerOptionsLeft">

        {/* Static "All" menu icon with label */}
        <div className='optionsNavbarBanner'>
          <MenuIcon sx={{ fontSize: "24px" }} />
          <div className='alloptionsNavbarBanner'>All</div>
        </div>

        {/* Dynamically generate menu links from the options array */}
        {
          options.map((item, ind) => {
            return (
              <Link to={'/products'} className='optionsNavbarBanner' key={ind}>
                <div className='alloptionsNavbarBanner'>{item.name}</div>
              </Link>
            );
          })
        }

      </div>
    </div>
  );
};

export default NavbarBanner;
