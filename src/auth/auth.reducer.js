import {LOGIN, LOGOUT} from "./auth.actiontypes.js";

const initialState = {
    token: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT: {
            return {...state, token: null};
        }
        case LOGIN: {
            return {...state, token: action.payload}
        }
        default:
            return state;
    }
};


