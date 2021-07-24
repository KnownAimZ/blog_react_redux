import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import * as userActions from './users.actions.js';
import * as postActions from '../posts/posts.actions.js';
import * as authActions from '../auth/auth.actions.js'
import PostList from '../posts/PostList.jsx';

const MyPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const currentUser = useSelector(state => state.users.myUser);

    useEffect(()=>{
        if(token) {
            dispatch(userActions.getUserByToken(token));                      
        } 
        return ()=> {
            dispatch(postActions.clearPosts());
        }
    },[]);

    useEffect(()=>{
        if (currentUser) {
            dispatch(postActions.getPostsByUserId(currentUser._id));
        }
    },[currentUser]);

    const handleDeleteUser = () => {
        let choose = window.confirm("Are you sure?");
        if (choose) {
            dispatch(userActions.deleteUser(currentUser._id, token));
            dispatch(userActions.clearMyUser());
            dispatch(authActions.authLogout());
            alert('user deleted');
            history.push('/login');
        }            
    }

    const handleChangeName = () => {
        const name = prompt('New name', currentUser.name);
        if (name) {
            dispatch(userActions.changeName(currentUser._id, token, name));
        }
    }

    const handleImageChange = ({target}) => {
        const formData = new FormData();
        formData.append('avatar', target.files[0]);
        dispatch(userActions.changeAvatar(currentUser._id, token, formData));
    }

    const handleLogout = () => {
        dispatch(userActions.clearMyUser());
        dispatch(authActions.authLogout());
        history.push('/login');
    }
    
    if(token === null) {
        return (
            <h2>You are not logged in...</h2>
        );
    }    

    if (currentUser === null) return (<p>Loading</p>);
    
    return (          
        <div className="Page">
            <div className="userBlock">
                <div className='userInfo'>
                    <Avatar src={currentUser.avatar} variant="rounded" style = {{width: '100px', height: '100px'}}/>
                    <h2>{currentUser.name}</h2>
                    <p>{currentUser.email}</p>
                    <p>{currentUser.dateCreated}</p>
                    <Button variant="contained" color="secondary" onClick={handleDeleteUser}>
                        Delete my account
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleChangeName} style={{marginTop: '5px', marginBottom: '5px'}}>
                        Change name
                    </Button>
                    <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    >
                    Change Avatar
                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleImageChange} 
                        hidden
                    />
                    </Button>
                    <Link to="/postcreate" style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary" style={{marginTop: '5px', marginBottom: '5px'}}>
                            Create new post
                        </Button>
                    </Link>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
                <PostList title={`${currentUser.name}'s posts`} />
            </div> 
        </div>);
}

export default MyPage;