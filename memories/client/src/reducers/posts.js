import { CREATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, END_LOADING, UPDATE, FETCH_POST, COMMENT } from '../constants/actionTypes.js'

export default (state = { isLoading: true, posts: []} , action) => {
    switch(action.type){
        case START_LOADING : 
            return {...state, isLoading: true };
        case END_LOADING : 
            return {...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts : action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ... state,
                posts: action.payload || []
            }
        case FETCH_POST:
            return {
                ... state,
                post: action.payload || []
            }
        case CREATE:
            return { 
                ...state, 
                posts : [ ...state.posts, action.payload ] 
            };

        case UPDATE:
            return {
                ... state,
                posts : state.posts.map((post) =>  post._id === action.payload._id ? action.payload : post)
            }
            
        case DELETE: 
            return {
                ...state,
                posts : state.posts.filter((post) => post._id !== action.payload)
            }
        case LIKE:
            return {
                ...state,
                posts : state.posts.map((post) =>  post._id === action.payload._id ? action.payload : post)
            } 
        case COMMENT:
            return {
                ...state,
                posts : state.posts.map((post) =>  post._id === action.payload._id ? action.payload : post)
            } 
        default:
            return state;
    }
}                       