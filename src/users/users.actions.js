import axios from "axios";
export const GETUSERLIST = 'USERS/GETUSERLIST';
export const FINDSELECTEDUSER ='USERS/FINDSELECTEDUSER';
export const CLEARSELECTEDUSER = 'USERS/CLEARSELECTEDUSER';
export const GETUSERBYTOKEN = 'USERS/GETUSERBYTOKEN';
export const CLEARMYUSER = 'USERS/CLEARMYUSER';
export const DELETEUSER = 'USERS/DELETEUSER';
export const CHANGENAME = 'USERS/CHANGENAME';
export const CHANGEAVATAR = 'USERS/CHANGEAVATAR';

export const getUserList = users => {
    return {
        type: GETUSERLIST,
        payload: users
    };
};

export const fetchUsers = () => async dispatch => {
    const users = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users');
    dispatch( 
        { 
            type: GETUSERLIST, 
            payload: users.data
        }
    );    
};

export const findSelectedUser = userId => async dispatch => {
    try {
        const user = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${userId}`);
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
    const response = await axios.get('https://nodejs-test-api-blog.herokuapp.com/api/v1/auth/user',{
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
    await axios.delete(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch ({
        type: DELETEUSER,
    });
}

export const changeName = (id, token, name) => async dispatch => {
    try {
        const response = await axios.patch(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${id}`,
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
        const response = await axios.put(`https://nodejs-test-api-blog.herokuapp.com/api/v1/users/upload/${id}`,
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