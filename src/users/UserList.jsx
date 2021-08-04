import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import User from './User.jsx';
import {FETCHUSERS_WATCHER} from './users.actiontypes.js';
import './UserList.scss';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state=> state.users.allUsers);
    const [usersSearch, setUsersSearch] = React.useState('');

    useEffect(()=>{
        dispatch({type: FETCHUSERS_WATCHER});
    }, [dispatch]);

    const handleChange = (event) => {
        setUsersSearch(event.target.value);
    };

    return (
        <div className="Page">
            <div className="UserList">
                <h2>User List</h2>
                <TextField          
                label="Email"
                value={usersSearch}
                onChange={handleChange}
                variant="outlined"
                />
                {users.filter(user => user['email'].includes(usersSearch)).map(user => (<User key={user._id} {...user} />)) }
            </div>
        </div>        
    );
}; 

export default UserList;