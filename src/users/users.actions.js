import axios from "axios";
import { USERS, USERS_UPLOAD, AUTH_USER } from "../app/API";

export const FETCHUSERS = 'USERS/FETCHUSERS';
export const FINDSELECTEDUSER ='USERS/FINDSELECTEDUSER';
export const CLEARSELECTEDUSER = 'USERS/CLEARSELECTEDUSER';
export const GETUSERBYTOKEN = 'USERS/GETUSERBYTOKEN';
export const CLEARMYUSER = 'USERS/CLEARMYUSER';
export const DELETEUSER = 'USERS/DELETEUSER';
export const CHANGENAME = 'USERS/CHANGENAME';
export const CHANGEAVATAR = 'USERS/CHANGEAVATAR';

export const fetchUsers = () => async dispatch => {
    const users = await axios.get(USERS);
    dispatch( 
        { 
            type: FETCHUSERS, 
            payload: users.data
        }
    );    
};

export const findSelectedUser = userId => async dispatch => {
    try {
        const user = await axios.get(`${USERS}${userId}`);
        dispatch(
            {
                type: FINDSELECTEDUSER,
                payload: user.data
            }
        );
    }
    catch (err) {
        console.log(err);
    }
};

export const clearSelectedUser = () => {
    return {
        type: CLEARSELECTEDUSER
    };    
};

export const getUserByToken = token => async dispatch => {
    const response = await axios.get(AUTH_USER,{
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch ({
        type: GETUSERBYTOKEN,
        payload: response.data
    });
};

export const clearMyUser = () => {
    return {
        type: CLEARMYUSER
    };    
};

export const deleteUser = (id, token) => async dispatch => {
    await axios.delete(`${USERS}${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch ({
        type: DELETEUSER,
    });
}

export const changeName = (id, token, name) => async dispatch => {
    try {
        const response = await axios.patch(`${USERS}${id}`,
        {
            "name": name
        },
        {
            headers: { Authorization: `Bearer ${token}` },           
        });
        dispatch ({
            type: CHANGENAME,
            payload: response.data,
        });
    }
    catch(err) {
        console.log(err);
    }    
}

export const changeAvatar = (id, token, formData) => async dispatch => {
    try {
        const response = await axios.put(`${USERS_UPLOAD}${id}`,
        formData,
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },           
        });
        dispatch ({
            type: CHANGEAVATAR,
            payload: response.data,
        });
    }
    catch(err) {
        console.log(err);
    }    
}