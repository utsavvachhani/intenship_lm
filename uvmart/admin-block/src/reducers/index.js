import {combineReducers} from 'redux'
import auth from './auth.js'
import categoriesReducer from './categories.js'
import staffReducer from './staff.js'
export default combineReducers({
    auth: auth,
    categories: categoriesReducer,
    staff:staffReducer,
})