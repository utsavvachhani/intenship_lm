import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 
export const verifyingUser = ({email, otp}) => API.post('/user/verifyinguser',{email,otp})
export const verifyingforeget = ({email, otp}) => API.post('/user/verifyingforeget',{email,otp})
export const updateUserProfile = (id,updatePayload) =>API.put(`/user/${id}`,updatePayload)
export const forget = (formData) => API.post('/user/forget',formData);
export const googleSignIn = (userData) => API.post('/user/googlesignin',userData);
