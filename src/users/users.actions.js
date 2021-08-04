import {
    CLEARSELECTEDUSER, 
    CLEARMYUSER,
} from './users.actiontypes.js';

export const clearSelectedUser = () => {
    return {
        type: CLEARSELECTEDUSER
    };    
};

export const clearMyUser = () => {
    return {
        type: CLEARMYUSER
    };    
};