import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';


const LoginPopup = ({ setShowLogin }) => {
    const {url,token,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({ name: '', email: '', password: '' });

    const onChangeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onLogin = async(e) => {
        e.preventDefault();
        let newUrl = url;
        if(currState == "Login"){
            newUrl+="/api/user/login";
        }
        else{
            newUrl+="/api/user/register";
        }
        const res = await axios.post(newUrl,data);

        if(res.data.success){
            setToken(res.data.token);
            localStorage.setItem("token",res.data.token);
            setShowLogin(false);
        }
        else{
            alert(res.data.message);
        }
    }



    return (
        <div>
            <div className="login-popup">
                <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="login-popup-inputs">
                        {currState === "Login"?<></>:<input name='name' onChange={onChangeHandler} value = {data.name} type="text" placeholder='name' required />}
                        <input name='email' onChange={onChangeHandler} value = {data.email} type="email" placeholder='email' required />
                        <input name='password' onChange={onChangeHandler} value = {data.password} type="password" placeholder='password' required />
                    </div>
                    <button type="submit" >{currState === "Sign Up"?"Create Account":"Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>I agree to the terms of use privacy policy</p>                        
                    </div>
                    {currState === "Login"? <p>Create an account? <span onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p>:<p>Already have an account?<span onClick={()=>{setCurrState("Login")}}>Login</span></p>}
                </form>
            </div>
        </div>
    )
}

export default LoginPopup