import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets/frontend_assets/assets'

const FoodItem = ({ id, name, description, price, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const quantity = cartItems[id] || 0;

    return (
        <div className="food-item">
            {/* Image + cart controls */}
            <div className="food-item-img-container">
                <img src={url+"/images/"+image} alt={name} className="food-item-image" />

                {quantity === 0 ? (
                    <div className="food-item-add" onClick={() => addToCart(id)}>
                        <img src={assets.add_icon_white} alt="add" />
                    </div>
                ) : (
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} alt="remove" onClick={() => removeFromCart(id)} />
                        <span>{quantity}</span>
                        <img src={assets.add_icon_green} alt="add" onClick={() => addToCart(id)} />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <h3>{name}</h3>
                    <img src={assets.rating_starts} alt="rating" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
}

export default FoodItem