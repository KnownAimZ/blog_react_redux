 import * as authActions from './auth.actions.js';

const initialState = {
    token: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {...state, token: null};
        }
        case authActions.LOGIN: {
            alert('You logged in');
            return {...state, token: action.payload}
        }
        default:
            return state;
    }
};


