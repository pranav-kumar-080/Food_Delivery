import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async(event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{orderId:orderId,status:event.target.value});
    if(response.data.success){
      toast.success(response.data.message || "Status Updated");
      fetchAllOrders();
    }
    const status = event.target.value;
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="orders-empty">No orders found.</div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-icon-wrap">
                <span>{order.items?.length || 0}</span>
              </div>

              <div className="order-details">
                <p className="order-items">
                  {order.items?.map((item) => item.name).join(", ") || "No items"}
                </p>
                <p className="order-name">
                  {order.address?.firstName || "Customer"} {order.address?.lastName || ""}
                </p>
                <p className="order-address">
                  {order.address?.street || ""}, {order.address?.city || ""}
                </p>
                <p className="order-phone">{order.address?.phone || "No phone number"}</p>
              </div>

              <div className="order-meta">
                <p>{new Date(order.date).toLocaleDateString()}</p>
                <p className="order-amount">₹{order.amount}</p>
                <select onChange={(e)=>statusHandler(e,order._id)}className="order-status" value={order.status || "Food Processing"}>
                  <option>Food Processing</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
