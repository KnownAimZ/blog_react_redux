import React, {useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from './users.actions.js';
import * as postActions from '../posts/posts.actions.js';
import PostList from '../posts/PostList.jsx';
import './UserPage.scss';
import { Avatar } from '@material-ui/core';

const UserPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.choosedUser);
    const myUser = useSelector(state => state.users.myUser);
    const history = useHistory();
    // const posts = useSelector(state => state.posts.postsList);
    useEffect(()=>{
        if(myUser && id === myUser._id) {
            history.push('/lc');
        }
        dispatch(userActions.findSelectedUser(id));
        dispatch(postActions.getPostsByUserId(id));
        return ()=> {
            dispatch(userActions.clearSelectedUser());
            dispatch(postActions.clearPosts());
        }
    },[]);
    if (currentUser === null) return (<p>Loading</p>);
    return (
    <div className="Page">
        <div className="userBlock">
            <div className='userInfo'>
                <Avatar src={currentUser.avatar} variant="rounded" style = {{width: '100px', height: '100px'}}/>
                <h2>{currentUser.name}</h2>
                <p>{currentUser.email}</p>
                <p>{currentUser.dateCreated}</p>
            </div>
            <PostList title={`${currentUser.name}'s posts`} />
        </div>  
    </div>);
}

export default UserPage;