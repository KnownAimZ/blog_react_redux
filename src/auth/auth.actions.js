import axios from "axios";
import {AUTH, USERS} from "../app/API.js";

export const LOGIN = "AUTH/LOGIN";
export const LOGOUT = "AUTH/LOGOUT";
export const CREATEUSER = "AUTH/CREATEUSER";

export const authLogout = () => {
    return {
        type: LOGOUT
    };    
};

export const authLogin = (email, password) => async dispatch => {
    try {
        const response = await axios.post(AUTH, {
            email,
            password,
        })
        .catch(function (error) {
            if (error.response) {
                const err = error.response.data.error;
                if (Array.isArray(err)) {
                    error.response.data.error.forEach(err => alert(err.message));            
                }
                else {
                    alert(err);
                }
            }
        });        
        dispatch({
            type: LOGIN,
            payload: response.data.token
        });
    }
    catch (err){
        console.log(err);
    }      
};

export const createUser = (email, password, name) => async dispatch => {
    try {
        const response = await axios.post(USERS, {
            email,
            password,
            name
        })
        .catch(function (error) {
            if (error.response) {
                const err = error.response.data.error;
                if (Array.isArray(err)) {
                    error.response.data.error.forEach(err => alert(err.message));            
                }
                else {
                    alert(err);
                }
            }
        });  
      
        dispatch({
            type: CREATEUSER,
            payload: response.data     
        });
    }
    catch (err){
        console.log(err);
    }     
};