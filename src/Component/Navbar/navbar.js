import React from 'react'

// Importing the top navigation belt component (e.g., logo, search bar, account links)
import NavbarBelt from './NavbarBelt/navbarBelt'

// Importing the secondary banner navigation (e.g., category links, deals)
import NavbarBanner from './NavbarBanner/navbarBanner'

// Navbar component that combines the belt and banner into a single navigation bar
const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Top section of the navbar */}
      <NavbarBelt />

      {/* Bottom section with banner links */}
      <NavbarBanner />
    </div>
  )
}

export default Navbar
