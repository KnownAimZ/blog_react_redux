import {
    FETCHUSERS, 
    FINDSELECTEDUSER, 
    CLEARSELECTEDUSER, 
    GETUSERBYTOKEN,
    CLEARMYUSER,    
    CHANGENAME,
    CHANGEAVATAR,
} from './users.actiontypes.js';
import { CREATEUSER } from '../auth/auth.actiontypes.js';

const initialState = {
    allUsers: [],
    choosedUser: null,
    myUser: null,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHUSERS:
            return {...state, allUsers: action.payload};
        case FINDSELECTEDUSER:
            return {...state, choosedUser: action.payload};
        case CLEARSELECTEDUSER:
            return {...state, choosedUser: null};
        case GETUSERBYTOKEN:
            return {...state, myUser: action.payload};
        case CLEARMYUSER:
            return {...state, myUser: null};
        case CHANGENAME:
            return {...state, myUser: action.payload}
        case CHANGEAVATAR:
            return {...state, myUser: action.payload}
        case CREATEUSER:
            return {...state, myUser: action.payload}
        default:
            return state;
    }
};


