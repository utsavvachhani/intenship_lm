import {
  FETCH_CATEGORIES,
  APPROVE_CATEGORY_SUCCESS,
  APPROVE_CATEGORY_FAIL,
  REJECT_CATEGORY_SUCCESS,
  REJECT_CATEGORY_FAIL
} from '../constants/actionTypes';

const initialState = {
  categories: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories || [],
        pagination: action.payload.pagination || initialState.pagination,
      };

    case APPROVE_CATEGORY_SUCCESS:
    case REJECT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(cat => cat._id !== action.payload._id),
      };

    case APPROVE_CATEGORY_FAIL:
    case REJECT_CATEGORY_FAIL:
      return { ...state };

    default:
      return state;
  }
};

export default categoriesReducer;