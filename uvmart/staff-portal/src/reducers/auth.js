import { AUTH, LOGOUT, SIGNUP } from '../constants/actionTypes.js'

const authReducer = (state = { authData : null }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log(action?.data);
            localStorage.clear();
            localStorage.setItem(`profile`, JSON.stringify({    ...action?.data}));
            return { ...state, authData: action?.data };
        
        case LOGOUT : 
            localStorage.clear()
            return { ...state, authData: null };

        case SIGNUP : 
            localStorage.setItem('user', JSON.stringify({ ...action?.data}))
            return state;

        default:
            return state;
    }
}

export default authReducer