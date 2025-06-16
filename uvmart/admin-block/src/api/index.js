import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const signIn = (formData) => API.post('/staff/signin', formData);
export const signUp = (formData) => API.post('/staff/signup', formData); 
export const verifyingUser = ({email, otp}) => API.post('/staff/verifyinguser',{email,otp})
export const verifyingforeget = ({email, otp}) => API.post('/staff/verifyingforeget',{email,otp})
export const forget = (formData) => API.post('/staff/forget',formData);
