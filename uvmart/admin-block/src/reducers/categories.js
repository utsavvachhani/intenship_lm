import { FETCH_UNVERIFIED_CATEGORIES, APPROVE_CATEGORY_SUCCESS, APPROVE_CATEGORY_FAIL, REJECT_CATEGORY_SUCCESS, REJECT_CATEGORY_FAIL } from '../constants/actionTypes'

const initialState = {
  unverified: [],
};


const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNVERIFIED_CATEGORIES:
      return { ...state, unverified: action.payload };

    case APPROVE_CATEGORY_SUCCESS:
      return {
        ...state,
        unverified: state.unverified.filter(cat => cat._id !== action.payload._id),
      };

    case APPROVE_CATEGORY_FAIL:
      return {
        ...state,
      };

    case REJECT_CATEGORY_SUCCESS:
      return {
        ...state,
        unverified: state.unverified.filter(cat => cat._id !== action.payload._id),
      };

    case REJECT_CATEGORY_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
