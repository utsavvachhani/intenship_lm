import {
  FETCH_STAFF,
  APPROVE_STAFF_SUCCESS,
  APPROVE_STAFF_FAIL,
  REJECT_STAFF_SUCCESS,
  REJECT_STAFF_FAIL
} from '../constants/actionTypes';

const initialState = {
  staffDetails: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFF:
      return {
        ...state,
        staffDetails: action.payload.staff,
        pagination: action.payload.pagination,
      };

    case APPROVE_STAFF_SUCCESS:
    case REJECT_STAFF_SUCCESS:
      return {
        ...state,
        staffDetails: state.staffDetails.filter(
          (staff) => staff._id !== action.payload._id
        ),
      };

    case APPROVE_STAFF_FAIL:
    case REJECT_STAFF_FAIL:
      return state;

    default:
      return state;
  }
};

export default staffReducer;
