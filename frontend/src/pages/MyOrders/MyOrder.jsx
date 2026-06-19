import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'
import axios from 'axios';

const MyOrder = () => {
    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userOrders",{},{headers:{token}});
        setData(response.data.orders);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,i)=>{
                            return <React.Fragment key={i}> <img src={url+"/images/"+item.image} alt={item.name} />
                            <p>{item.name + " x " + item.quantity}</p>
                            </React.Fragment>
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25CF;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default MyOrder