import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Avatar, Button} from '@material-ui/core';
import {clearMyUser} from './users.actions.js';
import {clearPosts} from '../posts/posts.actions.js';
import {authLogout} from '../auth/auth.actions.js'
import PostList from '../posts/PostList.jsx';
import {GETPOSTS_BYUSERID_WATCHER} from '../posts/posts.actiontypes.js';
import {CHANGEAVATAR_WATCHER, CHANGENAME_WATCHER, DELETEUSER_WATCHER, GETUSERBYTOKEN_WATCHER} from './users.actiontypes.js';

const MyPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.auth.token);
    const currentUser = useSelector(state => state.users.myUser);

    useEffect(()=>{
        if(token) {
            dispatch({type:GETUSERBYTOKEN_WATCHER, payload: {
                token
            }});                      
        } 
        return ()=> {
            dispatch(clearPosts());
        }
    },[dispatch, token]);

    useEffect(()=>{
        if (currentUser) {
            dispatch({type: GETPOSTS_BYUSERID_WATCHER, payload: {
                userId: currentUser._id
            }});

        }
    },[currentUser, dispatch]);

    const handleDeleteUser = () => {
        let choose = window.confirm("Are you sure?");
        if (choose) {
            dispatch({type: DELETEUSER_WATCHER, payload: {
                id: currentUser._id, 
                token,
            }});
            history.push('/login');
        }            
    }

    const handleChangeName = () => {
        const name = prompt('New name', currentUser.name);
        if (name) {
            dispatch({type: CHANGENAME_WATCHER, payload: {
                id: currentUser._id, 
                token, 
                name
            }});
        }
    }

    const handleImageChange = ({target}) => {
        const formData = new FormData();
        formData.append('avatar', target.files[0]);
        dispatch({type: CHANGEAVATAR_WATCHER, payload: {
            id: currentUser._id, 
            token, 
            formData
        }});
        
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
                    <Avatar src={`https://nodejs-test-api-blog.herokuapp.com${currentUser.avatar}` || null} variant="rounded" style = {{width: '100px', height: '100px'}}/>
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