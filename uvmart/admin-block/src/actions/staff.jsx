import * as api from '../api';
import { 
  FETCH_STAFF,
  APPROVE_STAFF_SUCCESS,
  APPROVE_STAFF_FAIL,
  REJECT_STAFF_SUCCESS,
  REJECT_STAFF_FAIL
} from '../constants/actionTypes'


export const getStaffDetails = (params) => async (dispatch) => {
  try {
    const { data } = await api.getStaffDetails(params);
    dispatch({ type: FETCH_STAFF, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const approvestaffDeatils = (staffId) => async (dispatch) => {
  try {
    const { data } = await api.approveStaff(staffId);
    dispatch({
      type: APPROVE_STAFF_SUCCESS,
      payload: data,
    });

    return { success: true }
  } catch (error) {
    console.error("Error approving staff:", error);
    dispatch({
      type: APPROVE_STAFF_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
  }
};

export const rejectstaffDeatils = (staffId) => async (dispatch) => {
  try {
    const { data } = await api.rejectStaff(staffId);
    dispatch({
      type: REJECT_STAFF_SUCCESS,
      payload: data, 
    });
    return { success: true }
  } catch (error) {
    console.error('Error rejecting staff:', error);
    dispatch({
      type: REJECT_STAFF_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, message: error.response?.data?.message || 'Something went wrong. Please try again!' };
  }
};