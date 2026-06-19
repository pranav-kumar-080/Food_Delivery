import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header' id='header'>
        <div className='header-content'>
            <h2>Order Your Favourite Food Here</h2>
            <p>Explore our menu and choose from a wide selection of delicious meals delivered right to your door.</p>
            <button onClick={() => document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' })}>View Menu</button>
        </div>
    </div>
  )
}

export default Header