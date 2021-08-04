import {LOGIN, LOGOUT, AUTH_ERROR} from "./auth.actiontypes.js";

const initialState = {
    token: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT: {
            return {...state, token: null};
        }
        case LOGIN: {           
            return {...state, token: action.payload};
        }
        case AUTH_ERROR: {
            alert(`AUTH_ERROR: ${action.message}`);
            break;
        }
        default:  return state;        
    }
};


