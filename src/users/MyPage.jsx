import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './users.actions.js';
import * as postActions from '../posts/posts.actions.js';
import * as authActions from '../auth/auth.actions.js'
import PostList from '../posts/PostList.jsx';
import { Avatar, Button } from '@material-ui/core';

const MyPage = () => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.myUser);

    const handleDeleteUser = () => {
        dispatch(userActions.deleteUser(currentUser._id, token));
        dispatch(userActions.clearMyUser());
        dispatch(authActions.authLogout());
        alert('user deleted');    
    }

    const handleChangeName = () => {
        const name = prompt('New name', '');
        if (name!=='') {
            dispatch(userActions.changeName(currentUser._id, token, name));
        }
    }

    const handleImageChange = ({target}) => {
        const formData = new FormData();
        formData.append('avatar', target.files[0]);
        dispatch(userActions.changeAvatar(currentUser._id, token, formData));
    }

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
    },[currentUser])
    
    if(token === null) {
        return (
            <h2>You are not logged in...</h2>
        );
    }    

    if (currentUser === null) return (<p>Loading</p>);
    
    return (
    <div>        
        <div className='userInfo'>
            <Avatar src={currentUser.avatar} variant="rounded" style = {{width: '100px', height: '100px'}}/>
            <h2>{currentUser.name}</h2>
            <p>{currentUser.email}</p>
            <p>{currentUser.dateCreated}</p>
            <Button variant="contained" color="primary" onClick={handleDeleteUser}>
                Delete my account
            </Button>
            <Button variant="contained" color="primary" onClick={handleChangeName} style={{marginTop: '5px', marginBottom: '5px'}}>
                Change name
            </Button>
            <Button
            variant="contained"
            component="label"
            color="primary"
            // onClick={()=>}
            >
            Change Avatar
            <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageChange} 
                hidden
            />
            </Button>
        </div>
        <PostList title={`${currentUser.name}'s posts`} />        
    </div>);
}

export default MyPage;