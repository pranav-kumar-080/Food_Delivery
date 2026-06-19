import React from 'react'
import logo from '../../assets/logo.png'
import profile_icon from '../../assets/profile_image.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className='logo' src={logo} alt="Logo" />
      <img className='profile' src={profile_icon} alt="Profile" />
    </div>
  )
}

export default Navbar