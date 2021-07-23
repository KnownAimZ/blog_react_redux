import axios from "axios";
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
        const response = await axios.post(`https://nodejs-test-api-blog.herokuapp.com/api/v1/auth`, {
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
        await axios.post(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users`, {
            email,
            password,
            name
        });
        // console.log(response);
        alert('User created');
        dispatch({
            type: CREATEUSER,       
        });
    }
    catch (err){
        console.log(err);
    }     
};