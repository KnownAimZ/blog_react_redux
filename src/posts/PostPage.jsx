import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'; 
import * as postActions from './posts.actions.js';
import * as userActions from '../users/users.actions.js';
import User from '../users/User.jsx'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const PostPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const postData = useSelector(state => state.posts.choosedPost);
    const postedBy = useSelector(state => state.users.choosedUser);
    const myUser = useSelector(state => state.users.myUser);
    const token = useSelector(state => state.auth.token);
    const history = useHistory();

    useEffect(()=> {
        dispatch(postActions.getPostById(id));
    }, []);

    useEffect(()=> {
        if (postData!== null) {
            dispatch(userActions.findSelectedUser(postData.postedBy));
        } 
    }, [postData]);

    const handleDeletePost = async() => {
        // console.log(token, postData._id);
        await dispatch(postActions.deletePost(token, postData._id));
        history.goBack();
    }

    const handleLikePost = async() => {
        await dispatch(postActions.likePost(token, postData._id));
        await dispatch(postActions.getPostById(id));
    }

    if (postData === null) {
        return (
            <p>Loading</p>
        );
    }
    return (
        <div className="PostPage">
            <h2>{postData.title}</h2>
            <h4>{postData.description}</h4>
            <p>{postData.fullText}</p>
            <h4>{postData.dateCreated}</h4>
            <h4>Likes: {postData.likes.length}</h4>
            <h4>Posted by:</h4>
            <User {...postedBy}/>
            { token !== null &&  
                <div className="controls">
                    <Button variant="contained" color="primary" onClick={handleLikePost}>
                            Like this post
                    </Button>
                    {  myUser !== null && myUser._id === postData.postedBy &&
                        <Button variant="contained" color="secondary" onClick={handleDeletePost}>
                            Delete post
                        </Button>
                    }
                </div>
            }
        </div>
        
    );
};

export default PostPage;