import './UserList.scss';
import User from './User.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import React from 'react';


import * as userActions from './users.action.js';
import { useMemo } from 'react';

const UserList = () => {
    const [usersSearch, setUsersSearch] = React.useState('');
    const users = useSelector(state=> state.users);
    const handleChange = (event) => {
        setUsersSearch(event.target.value);
    };
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(userActions.fetchUsers());
    }, []);

    return (
        <>
        <h2>User List</h2>
        <TextField          
          label="Email"
          value={usersSearch}
          onChange={handleChange}
          variant="outlined"
        />        
        {useMemo(()=> users.filter(user => user['email'].includes(usersSearch)).map(user => (<User key={user._id} {...user} />))) }
        </>
    );
}; 

export default UserList;