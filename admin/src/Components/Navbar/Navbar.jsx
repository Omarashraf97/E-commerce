import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-Profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt='' className='nav-logo'/>
        <img src={navProfile} alt='' className='nav-Profile'/>
      
    </div>
  )
}

export default Navbar
