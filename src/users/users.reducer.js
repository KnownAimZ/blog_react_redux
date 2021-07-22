import * as userActions from './users.actions.js';

const initialState = {
    allUsers: [],
    choosedUser: null,
    myUser: null,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.GETUSERLIST:
            return {...state, allUsers: action.payload};
        case userActions.FINDSELECTEDUSER:
            return {...state, choosedUser: action.payload};
        case userActions.CLEARSELECTEDUSER:
            return {...state, choosedUser: null};
        case userActions.GETUSERBYTOKEN:
            console.log(123);
            return {...state, myUser: action.payload};
        default:
            return state;
    }
};


