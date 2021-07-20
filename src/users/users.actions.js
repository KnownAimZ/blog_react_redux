import axios from "axios";
export const GETUSERLIST = 'USERS/GETUSERLIST';
export const FINDSELECTEDUSER ='USERS/FINDSELECTEDUSER'
export const CLEARSELECTEDUSER = 'USERS/CLEARSELECTEDUSER';

export const getUserList = users => {
    return {
        type: GETUSERLIST,
        payload: users
    };
}

export const fetchUsers = () => async dispatch => {
    const users = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users');
    dispatch( 
        { 
            type: GETUSERLIST, 
            payload: users.data
        }
    );    
}

export const findSelectedUser = userId => async dispatch => {
    const user = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${userId}`);
    dispatch(
        {
            type: FINDSELECTEDUSER,
            payload: user.data
        }
    );
}

export const clearSelectedUser = () => {
    return {
        type: CLEARSELECTEDUSER
    };    
};