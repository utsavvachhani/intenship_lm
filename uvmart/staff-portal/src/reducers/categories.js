// reducers/categories.js
import { GETCATEGORIES, ADDCATEGORIES } from '../constants/actionTypes';

const initialState = {
  userData: [],      
  allData: [],       
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETCATEGORIES:
      return {
        ...state,
        userData: action.data, 
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
