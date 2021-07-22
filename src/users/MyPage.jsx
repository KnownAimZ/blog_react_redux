import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './users.actions.js';
import * as postActions from '../posts/posts.actions.js';
import PostList from '../posts/PostList.jsx';
import { Avatar } from '@material-ui/core';

const MyPage = () => {
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.myUser);
    // const posts = useSelector(state => state.posts.postsList);

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
            dispatch(postActions.getPostsByUserId(currentUser.id));
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
        </div>
        <PostList title={`${currentUser.name}'s posts`} />        
    </div>);
}

export default MyPage;