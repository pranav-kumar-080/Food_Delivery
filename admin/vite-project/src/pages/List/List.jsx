import React, { useState, useEffect } from "react";
import "./List.css";
import adminAxios from "../../utils/adminAxios";
import { toast } from "react-toastify";

const List = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await adminAxios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  }

  const removeFood = async (e, id) => {
    const response = await adminAxios.post(`${url}/api/food/remove`, { id });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>All Food Items</h2>
      <div className="list-table">
        <div className="list-table-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
          <div className="list-empty">No food items found.</div>
        ) : (
          list.map((item, index) => (
            <div className="list-table-row" key={index}>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={(e) => removeFood(e, item._id)} className="list-remove-btn">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
