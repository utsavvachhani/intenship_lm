import { ADDCATEGORIES} from '../constants/actionTypes.js'

const categoriesReducer = (state = { categoriesData : null }, action) => {
    switch (action.type) {
        case ADDCATEGORIES:
            return { ...state, authData: action?.data };

        default:
            return state;
    }
}

export default categoriesReducer