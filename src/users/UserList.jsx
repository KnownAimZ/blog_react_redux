import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import './UserList.scss';
import * as userActions from './users.actions.js';
import User from './User.jsx';

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
        {users.filter(user => user['email'].includes(usersSearch)).map(user => (<User key={user._id} {...user} />)) }
        </>
    );
}; 

export default UserList;