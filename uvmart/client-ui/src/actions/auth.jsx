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
        return { success: false, message: 'Username or password is incorrect! Please try again!' };          
    }
}

export const signup = (formData) => async (dispatch) => {
    console.log("signup ");
    
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: SIGNUP, data});

        // navigate(`/posts`); 
        return { success: true };      
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong. Please try again!' };
    }
}

export const verifyingUser = ({email, otp}) => async (dispatch) => {
    try {
        const {data} = await api.verifyingUser({email,otp});
        dispatch({ type: AUTH, data});
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong. Please try again!' };
    }
}

export const updateUserProfile = (id, formData) => async (dispatch) => {
    try {
        // console.log(id,formData);
        const {data} = await api.updateUserProfile(id,{formData : formData});
        // console.log("data : ",data);
        dispatch({ type: AUTH, data});
        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Something went wrong. Please try again!' };
    }
}
