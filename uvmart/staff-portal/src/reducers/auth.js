import { AUTH, LOGOUT, SIGNUP } from '../constants/actionTypes.js';
const initialState = {
    user: null,
    token: null,
    signupEmail: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.clear();
            localStorage.setItem('token', JSON.stringify(action?.data?.token))
            return { ...state, user: action?.data?.user, token: action?.data?.token };

        case SIGNUP:
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(action?.data?.email))
            return { ...state, signupEmail: action?.data?.email };

        case LOGOUT:
            localStorage.clear();
            return { ...initialState };

        default:
            return state;
    }
};

export default authReducer