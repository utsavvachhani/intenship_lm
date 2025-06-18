import * as api from '../api';
import { FETCH_UNVERIFIED_CATEGORIES, APPROVE_CATEGORY_SUCCESS, APPROVE_CATEGORY_FAIL,REJECT_CATEGORY_SUCCESS, REJECT_CATEGORY_FAIL } from '../constants/actionTypes'

export const getCategoriesWhonotVerified = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUnverifiedCategories();
    dispatch({ type: FETCH_UNVERIFIED_CATEGORIES, payload: data });
  } catch (error) {
    console.error(error);
  }
};


export const approveCategory = (categoryId) => async (dispatch) => {
  try {
    const { data } = await api.approveCategory(categoryId); 
    dispatch({
      type: APPROVE_CATEGORY_SUCCESS,
      payload: data, 
    });

    return { success : true}
  } catch (error) {
    console.error("Error approving category:", error);
    dispatch({
      type: APPROVE_CATEGORY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
  }
};

export const rejectCategory = (categoryId) => async (dispatch) => {
  try {
    const { data } = await api.rejectCategory(categoryId); 
    dispatch({
      type: REJECT_CATEGORY_SUCCESS,
      payload: data, // Could be the updated category or ID
    });
    return { success : true}
  } catch (error) {
    console.error('Error rejecting category:', error);
    dispatch({
      type: REJECT_CATEGORY_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
  }
};