import toast from 'react-hot-toast';
import { BASE_URL } from '@/config/config';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const successCallback = (response: AxiosResponse) => {
    const {data} = response;
    return data;
}

const errorCallback = (error: any) => {
    if (error?.response?.status === 401) {
        // add logout user logic here
        // window.location.assign(window.location.origin)
    }
    const message = error?.response?.data?.message;
    if (message) toast.error(message);
    return Promise.reject(error);
}


const Axios = axios.create({
    baseURL: BASE_URL
});


Axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Accept = 'application/json'
    config.withCredentials = true
    return config;
})

Axios.interceptors.response.use(successCallback, errorCallback);

export default Axios;

