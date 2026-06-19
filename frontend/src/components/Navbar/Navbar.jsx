import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const scrollToSection = (sectionId, menuName) => {
        setMenu(menuName);
        // If not on home page, navigate first then scroll
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

            <ul className="navbar-menu">
                <li className={menu === "home" ? "active" : ""} onClick={() => scrollToSection('header', 'home')}>Home</li>
                <li className={menu === "menu" ? "active" : ""} onClick={() => scrollToSection('explore-menu', 'menu')}>Menu</li>
                <li className={menu === "mobile-app" ? "active" : ""} onClick={() => scrollToSection('app-download', 'mobile-app')}>Mobile-App</li>
                <li className={menu === "contact-us" ? "active" : ""} onClick={() => scrollToSection('footer', 'contact-us')}>Contact-Us</li>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)} className="btn">sign in</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate('/my-orders')}>
                                <img src={assets.bag_icon} alt="" />
                                <p>My Orders</p>
                            </li>
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar