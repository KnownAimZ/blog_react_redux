 import * as postActions from './posts.actions.js';

const initialState = {
    position: 0,
    postsList: []
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postActions.SETPOSITION:
            return {...state, position: action.payload}
        case postActions.GETPOSTS:
            return {...state, postsList: action.payload}
        default:
            return state;
    }
};


