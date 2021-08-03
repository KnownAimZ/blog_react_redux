import * as userActions from './users.actions.js';
import { CREATEUSER } from '../auth/auth.actions.js';

const initialState = {
    allUsers: [],
    choosedUser: null,
    myUser: null,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.FETCHUSERS:
            return {...state, allUsers: action.payload};
        case userActions.FINDSELECTEDUSER:
            return {...state, choosedUser: action.payload};
        case userActions.CLEARSELECTEDUSER:
            return {...state, choosedUser: null};
        case userActions.GETUSERBYTOKEN:
            return {...state, myUser: action.payload};
        case userActions.CLEARMYUSER:
            return {...state, myUser: null};
        case userActions.CHANGENAME:
            return {...state, myUser: action.payload}
        case userActions.CHANGEAVATAR:
            return {...state, myUser: action.payload}
        case CREATEUSER:
            return {...state, myUser: action.payload}
        default:
            return state;
    }
};


