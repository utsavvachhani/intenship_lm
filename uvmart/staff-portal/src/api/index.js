import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
    return req;
})

export const fetchUser = () => API.get('staff/me',)
export const signIn = (formData) => API.post('/staff/signin', formData);
export const signUp = (formData) => API.post('/staff/signup', formData); 
export const verifyingUser = ({email, otp}) => API.post('/staff/verifyinguser',{email,otp});
export const verifyingforeget = ({email, otp}) => API.post('/staff/verifyingforeget',{email,otp});
export const updateUserProfile = (id,updatePayload) =>API.put(`/staff/${id}`,updatePayload);
export const forget = (formData) => API.post('/staff/forget',formData);


export const addedCategories = ({id,formData}) => API.post(`/categories/add`,{id,formData});
export const getCategoriesByStaffId = ({id, params}) => API.get(`categories/gets/${id}`, { params })