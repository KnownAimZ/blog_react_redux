import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Avatar, Button} from '@material-ui/core';
import {getUserByToken, deleteUser, clearMyUser, changeName, changeAvatar} from './users.actions.js';
import {clearPosts, getPostsByUserId} from '../posts/posts.actions.js';
import {authLogout} from '../auth/auth.actions.js'
import PostList from '../posts/PostList.jsx';

const MyPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const currentUser = useSelector(state => state.users.myUser);

    useEffect(()=>{
        if(token) {
            dispatch(getUserByToken(token));                      
        } 
        return ()=> {
            dispatch(clearPosts());
        }
    },[dispatch, token]);

    useEffect(()=>{
        if (currentUser) {
            dispatch(getPostsByUserId(currentUser._id));
        }
    },[currentUser, dispatch]);

    const handleDeleteUser = () => {
        let choose = window.confirm("Are you sure?");
        if (choose) {
            dispatch(deleteUser(currentUser._id, token));
            dispatch(clearMyUser());
            dispatch(authLogout());
            alert('user deleted');
            history.push('/login');
        }            
    }

    const handleChangeName = () => {
        const name = prompt('New name', currentUser.name);
        if (name) {
            dispatch(changeName(currentUser._id, token, name));
        }
    }

    const handleImageChange = ({target}) => {
        const formData = new FormData();
        formData.append('avatar', target.files[0]);
        dispatch(changeAvatar(currentUser._id, token, formData));
    }

    const handleLogout = () => {
        dispatch(clearMyUser());
        dispatch(authLogout());
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