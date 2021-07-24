 import * as postActions from './posts.actions.js';

const initialState = {
    position: 0,
    postsList: [],
    choosedPost: null
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postActions.SETPOSITION:
            return {...state, position: action.payload};
        case postActions.GETPOSTS:
            return {...state, postsList: action.payload};
        case postActions.CLEARPOSTS:
            return {...state, postsList: []};
        case postActions.CREATEPOST:
            // alert('Post created!');
            return {...state}
        case postActions.GETPOSTBYID:
            return {...state, choosedPost: action.payload};
        case postActions.CHANGEIMAGE:
            return {...state, choosedPost: action.payload};
        case postActions.CLEARSELECTEDPOST:
            return {...state, choosedPost: null}
        case postActions.UPDATEPOST:
            return {...state, choosedPost: action.payload};
        default:
            return state;
    }
};


