import axios from "axios";

// Axios instance for all admin API calls.
// Automatically attaches the admin JWT token to every request header.
const adminAxios = axios.create();

adminAxios.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_ADMIN_TOKEN;
    if (token) {
        config.headers["token"] = token;
    }
    return config;
});

export default adminAxios;
