import React, { useEffect, useState, useRef } from 'react';
import './navbarBelt.css';

// Assets
import walmart from '../../../Assets/walmart.png';
import india from '../../../Assets/india.png';

// Material UI Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Routing and Redux
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Firebase Authentication
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../Component/firebase';

const NavbarBelt = () => {
    const [userName, setUserName] = useState(null); // Track logged-in user's name
    const [showDropdown, setShowDropdown] = useState(false); // Controls logout dropdown visibility
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref to detect clicks outside dropdown

    // Listen for authentication state changes
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

    // Logout handler
    const handleLogout = async () => {
        await signOut(auth);
        setShowDropdown(false);
        navigate('/LoginPage');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='navbarBelt'>
            {/* Left section: Logo */}
            <div className="leftNavBelt">
                <Link to={'/'} className="leftNavBeltLogo">
                    <img className='amazonLogoNavbar' src={walmart} alt='walmartLogo' />
                    <span className='navbar_inLogo'>.co.in</span>
                </Link>
            </div>

            {/* Delivery Location */}
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
                    <div className="navbarBeltSearchBoxAll">
                        <div className="navbarBeltSearchBoxAllText">All</div>
                        <ArrowDropDownOutlinedIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <input type='text' className='navbarBeltInputSerchBox' placeholder='Search Walmart.in' style={{ width: 600 }} />
                    <div className='searchIconNavbarBelt'>
                        <SearchIcon sx={{ fontSize: "26px" }} className='searchIconNavbarBeltIcon' />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="rightSideNavbarBelt">
                {/* Language/Region Flag */}
                <div className="indianFlagCode">
                    <img src={india} className='indiaFlag' alt="India" />
                    <div className='indiaCodeNavbarBelt'>
                        EN <ArrowDropDownOutlinedIcon sx={{ fontSize: 16, marginTop: 1, marginLeft: -0.4 }} />
                    </div>
                </div>

                {/* User Account/Login/Logout */}
                <div className='helloSignInNavbstBelt' style={{ position: 'relative' }} ref={dropdownRef}>
                    {userName ? (
                        <>
                            {/* If user is logged in */}
                            <div onClick={() => setShowDropdown(!showDropdown)} className='helloTopNavbarBelt' style={{ cursor: 'pointer' }}>
                                Hello, {userName}
                            </div>
                            <div className='indiaCodeNavbarBelt'>Accounts & Lists</div>

                            {/* Dropdown logout menu */}
                            {showDropdown && (
                                <div className='logoutDropdown'>
                                    <button onClick={handleLogout} className='logoutButton'>Logout</button>
                                </div>
                            )}
                        </>
                    ) : (
                        // If user is not logged in
                        <Link to="/LoginPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='helloTopNavbarBelt'>Hello, User</div>
                            <div className='indiaCodeNavbarBelt'>Accounts & Lists</div>
                        </Link>
                    )}
                </div>

                {/* Returns & Orders */}
                <div className='helloSignInNavbstBelt'>
                    <div className='helloTopNavbarBelt'>Returns</div>
                    <div className='indiaCodeNavbarBelt'>& Orders</div>
                </div>

                {/* Shopping Cart */}
                <Link to={'/cart'} className="helloSignInNavbaeBelt">
                    <span className='cartItemNumberNavbarBelt'>{cartItems.length}</span>
                    <div className="helloTopNavbarBelt">
                        <ShoppingCartOutlinedIcon /> <span className='cartTitle'>Cart</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NavbarBelt;
