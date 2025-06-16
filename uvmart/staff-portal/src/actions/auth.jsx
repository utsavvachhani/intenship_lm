import * as api from '../api';
import { AUTH,SIGNUP } from '../constants/actionTypes.js'

export const signin = (formData) => async(dispatch) =>  {
    // console.log("signin");
    
    try {
        const { data } = await api.signIn(formData);
        
        dispatch({ type: AUTH, data});
        // navigate(`/posts`);
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

export const forget = (formData) => async (dispatch) => {
    try {
        const { data } = await api.forget(formData);
        dispatch({type: SIGNUP, data});
        return { success: true };      
    } catch (error) {
        return { success: false,  message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}

export const updateUserProfile = (id, updatePayload) => async (dispatch) => {
    try {
        // console.log(id,updatePayload);
        const {data} = await api.updateUserProfile(id,{updatePayload : updatePayload});
        // console.log("data : ",data);
        dispatch({ type: AUTH, data});
        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
    }
}
