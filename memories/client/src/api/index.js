import axios from 'axios';
const API = axios.create({ baseURL: 'https://memories-backend-sigma.vercel.app/'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}  `);
export const createPost = (newPost) => API.post('/posts',newPost);
export const updatePost = (id,updatedPost) =>API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, { value })


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 
export const updateUserProfile = (id,formData) =>API.patch(`/user/${id}`,formData)

export const fetchPost = (id) => API.get(`/posts/${id}`);