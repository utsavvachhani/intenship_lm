import {
  FETCH_UNVERIFIED_STAFF,
  APPROVE_STAFF_SUCCESS,
  APPROVE_STAFF_FAIL,
  REJECT_STAFF_SUCCESS,
  REJECT_STAFF_FAIL
} from '../constants/actionTypes'
const initialState = {
  unverified: [],
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNVERIFIED_STAFF:
      return { ...state, unverified: action.payload };
    case APPROVE_STAFF_SUCCESS:
      return {
        ...state,
        unverified: state.unverified.filter(cat => cat._id !== action.payload._id),
      };

    case APPROVE_STAFF_FAIL:
      return {
        ...state,
      };

    case REJECT_STAFF_SUCCESS:
      return {
        ...state,
        unverified: state.unverified.filter(cat => cat._id !== action.payload._id),
      };

    case REJECT_STAFF_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default staffReducer;
