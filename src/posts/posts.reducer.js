import {
    SETPOSITION,
    GETPOSTS,
    CLEARPOSTS,
    CREATEPOST,
    GETPOSTBYID,
    CHANGEIMAGE,
    CLEARSELECTEDPOST,
    UPDATEPOST,
    REORDERPOSTS,
    POSTS_ERROR
} from './posts.actiontypes.js';

const initialState = {
    position: 0,
    postsList: [],
    choosedPost: null,
    // postToLoad: 10,
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETPOSITION:
            return {...state, position: action.payload};
        case GETPOSTS:
            return {...state, postsList: action.payload};
        case CLEARPOSTS:
            return {...state, postsList: []};
        case CREATEPOST:
            return {...state}
        case GETPOSTBYID:
            // console.log(`choosed post: ${Object.values(action.payload)}`)
            return {...state, choosedPost: action.payload};
        case CHANGEIMAGE:
            return {...state, choosedPost: action.payload};
        case CLEARSELECTEDPOST:
            return {...state, choosedPost: null};
        case UPDATEPOST:
            return {...state, choosedPost: action.payload};
        case REORDERPOSTS: 
            return {...state, postsList: action.payload};
        case POSTS_ERROR: {
            console.log(action.message);
        }
        default:
            return state;
    }
};


