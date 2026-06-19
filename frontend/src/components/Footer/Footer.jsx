import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="Foodie Logo" className="footer-logo" />
                <p>Good food, delivered fast. Bringing your favorite meals right to your doorstep — fresh, hot, and on time.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Twitter" />
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>+1 (234) 567-890</li>
                    <li>foodie@gmail.com</li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Foodie. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer