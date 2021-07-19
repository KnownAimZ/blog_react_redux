import axios from "axios";
export const GETUSERLIST = 'USERS/GETUSERLIST';

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
