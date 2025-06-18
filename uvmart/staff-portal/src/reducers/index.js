import {combineReducers} from 'redux'
import auth from './auth.js'
import categories from './categories.js'

export default combineReducers({
    auth: auth,
    categories: categories,
})