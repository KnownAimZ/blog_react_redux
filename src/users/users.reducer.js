import * as userActions from './users.action.js';

const initialState = [];

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.GETUSERLIST:
            return [...state, ...action.payload]
        default:
            return state;
    }
};


