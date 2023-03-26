import axios from "axios";

const API_URL = "http://localhost:8800/api";


export const publicRequest = axios.create({
    baseURL: API_URL
});

export const userRequest = axios.create({
    baseURL: API_URL,
    headers: {
        access_token: JSON.parse(localStorage.getItem("user")) && `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
    }
});




