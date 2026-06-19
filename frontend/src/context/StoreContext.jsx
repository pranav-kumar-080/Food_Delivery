import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));
        if (token) {
            await axios.post(url + "/api/cart/add", { food: itemId }, {
                headers: { token }
            });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            if (!prev[itemId]) return prev;
            const updated = { ...prev };
            if (updated[itemId] === 1) {
                delete updated[itemId];
            } else {
                updated[itemId] -= 1;
            }
            return updated;
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { food: itemId }, {
                headers: { token }
            });
        }
    }

    const loadCartData = async()=>{
     const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
     if(response.data.success){
       setCartItems(response.data.cartData);
     }
    }


    const getTotalCartAmount = () =>{
     let totalAmount = 0;
     
     for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = food_list.find((product) => product._id == item)
            totalAmount += itemInfo.price * cartItems[item];
        }
     }
     return totalAmount;
    }
    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loadCartItems: loadCartData,
    };

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData();
            }
        }
        loadData();
    },[]);

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;