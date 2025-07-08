// reducers/categories.js
import { GETCATEGORIES, ADDCATEGORIES } from '../constants/actionTypes';

const initialState = {
  userData: [],      
  allData: [], 
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },      
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETCATEGORIES:
      return {
        ...state,
        userData: action.data.categories || [],
        pagination: action.data.pagination || initialState.pagination, 
      };

    case ADDCATEGORIES:
      return {
        ...state,
        allData: [...state.allData, action.data],
      };

    default:
      return state;
  }
};

export default categoriesReducer;
