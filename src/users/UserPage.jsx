import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Avatar} from '@material-ui/core';
import {clearSelectedUser} from './users.actions.js';
import {clearPosts} from '../posts/posts.actions.js';
import PostList from '../posts/PostList.jsx';
import './UserPage.scss';
import {GETPOSTS_BYUSERID_WATCHER} from '../posts/posts.actiontypes.js';
import {FINDSELECTEDUSER_WATCHER} from './users.actiontypes.js';
import PostChart from '../charts/PostChart.jsx';

const UserPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.users.choosedUser);
    const myUser = useSelector(state => state.users.myUser);

    useEffect(()=>{
        if(myUser && id === myUser._id) {
            history.push('/lc');
        }
        dispatch({type: FINDSELECTEDUSER_WATCHER, payload: {
            userId: id,
        }});
        dispatch({type: GETPOSTS_BYUSERID_WATCHER, payload: {
            userId: id,
        }});
        return ()=> {
            dispatch(clearSelectedUser());
            dispatch(clearPosts());
        }

    },[dispatch, history, id, myUser]);

    if (currentUser === null) return (<p>Loading</p>);

    return (
    <div className="Page">
        <div className="userBlock">
            <div className='userInfo'>
                <Avatar src={`https://nodejs-test-api-blog.herokuapp.com/users${currentUser.avatar}` || null} variant="rounded" style = {{width: '100px', height: '100px'}}/>
                <h2>{currentUser.name}</h2>
                <p>{currentUser.email}</p>
                <p>{currentUser.dateCreated}</p>
            </div>
            <PostChart />
            <PostList title={`${currentUser.name}'s posts`} />
        </div>  
    </div>);
}

export default UserPage;