import axios from "axios";

import { getAccessToken } from './authUtilities'

const instance = axios.create({
    //baseURL: process.env.REACT_APP_API_BASE_URL,
    baseURL: 'http://localhost:8080/',
    responseType: "json",
})

instance.defaults.headers.common["Authorization"] = "Bearer ";
instance.defaults.headers.common["Authorization"] += getAccessToken()

export default instance