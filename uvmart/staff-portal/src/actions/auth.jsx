import * as api from '../api';
import { AUTH,SIGNUP } from '../constants/actionTypes.js'


export const loadUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) return;

  try {
    const { data } = await api.fetchUser();
    dispatch({ type: AUTH, data: { token, user: data.user } });
  } catch (error) {
    console.log('Failed to load user:', error);
    localStorage.removeItem('token');
  }
};


export const signin = (formData) => async(dispatch) =>  {
    try {
        const { data } = await api.signIn(formData);
        
        dispatch({ type: AUTH, data});
         return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };          
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: SIGNUP, data});
        return { success: true };      
    } catch (error) {
        return { success: false,  message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}

export const verifyingUser = ({email, otp}) => async (dispatch) => {
    try {
        const {data} = await api.verifyingUser({email,otp});
        dispatch({ type: AUTH, data});
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}

export const forget = (formData) => async (dispatch) => {
    try {
        const { data } = await api.forget(formData);
        dispatch({type: SIGNUP, data});
        return { success: true };      
    } catch (error) {
        return { success: false,  message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}

export const verifyingforeget = ({email, otp}) => async (dispatch) => {
    try {
        const {data} = await api.verifyingforeget({email,otp});
        dispatch({ type: AUTH, data});
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}


export const updateUserProfile = (id, updatePayload) => async (dispatch) => {
    try {
        const {data} = await api.updateUserProfile(id,{updatePayload : updatePayload});
        dispatch({ type: AUTH, data});
        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}
