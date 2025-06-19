import * as api from '../api/index.js';
import { ADDCATEGORIES } from '../constants/actionTypes.js'

export const addedCategories = ({id,formData}) => async(dispatch) => {
    try {
        const { data } = await api.addedCategories({id,formData});
        dispatch({ type: ADDCATEGORIES, data});
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };          
    }
}