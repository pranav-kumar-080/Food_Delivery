import React, { useContext, useState, useEffect } from 'react'
import './PlaceHolder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceHolder = () => {
  const { getTotalCartAmount,token,url,food_list,cartItems,loadCartItems} = useContext(StoreContext)
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(e)=>{
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item)=>{
      if(cartItems[item._id]>0){
        orderItems.push(item);
      }
    })
    if(getTotalCartAmount() === 0){
      toast.error("Cart is empty");
    }
    else if(data.firstName === "" || data.lastName === "" || data.email === "" || data.street === "" || data.city === "" || data.state === "" || data.zipCode === "" || data.country === "" || data.phone === ""){
      toast.error("Please fill all the fields");
    }
    else{
      try {
        let orderData = {
          address: data,
          items: food_list.filter((item) => cartItems[item._id] > 0).map((item) => ({
            ...item,
            quantity: cartItems[item._id]
          })),
          amount: getTotalCartAmount() + 2,
        };
        const response = await axios.post(url + "/api/order/place", orderData, {
          headers: { token }
        });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to place order.");
      }
    } 
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }
  },[token])

  useEffect(()=>{
    if(token){
      loadCartItems();
    }
  },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type="submit">Proceed to Checkout</button>
        </div>
      </div>
      </div>
    </form>
  )
}

export default PlaceHolder