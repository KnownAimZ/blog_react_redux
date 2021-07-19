import User from './User.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import * as userActions from './users.action.js';
const UserList = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(userActions.fetchUsers());
    }, []);    
    const users = useSelector(state=> state.users);
    return (
        <>
        <h2>User List</h2>
        {users.map(user => (<User key={user._id} {...user} />))}
        </>
    );
}; 

export default UserList;