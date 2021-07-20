import * as userActions from './users.actions.js';

const initialState = [];

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.GETUSERLIST:
            return action.payload;
        default:
            return state;
    }
};


