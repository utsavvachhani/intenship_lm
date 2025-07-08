import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const signIn = (formData) => API.post('/admin/signin', formData);
export const signUp = (formData) => API.post('/admin/signup', formData); 
export const verifyingUser = ({email, otp}) => API.post('/admin/verifyinguser',{email,otp})

export const getCategoriesDetails = (params) => API.get(`/categories/fetch`, { params });
export const approveCategory = (categoryId) => API.put(`/categories/${categoryId}/approve`);
export const rejectCategory = (categoryId) => API.put(`/categories/${categoryId}/reject`);

export const getStaffDetails = (params) => API.get('/staff/fetch', { params });
export const approveStaff = (staffId) => API.put(`/staff/${staffId}/approve`);
export const rejectStaff = (staffId) => API.put(`/staff/${staffId}/reject`);