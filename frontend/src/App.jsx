import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceHolder from './pages/PlaceHolder/PlaceHolder'
import Verify from './pages/Verify/Verify'
import MyOrder from './pages/MyOrders/MyOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <Navbar  setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceHolder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/my-orders' element={<MyOrder />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App