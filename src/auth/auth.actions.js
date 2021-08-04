import {LOGOUT} from "./auth.actiontypes.js";

export const authLogout = () => {
    return {
        type: LOGOUT
    };    
};