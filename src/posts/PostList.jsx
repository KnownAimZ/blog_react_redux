import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './PostList.scss';
import Post from './Post.jsx';
import * as postActions from './posts.actions.js';

const PostList = () => {
    const dispatch = useDispatch();
    const { position, postsList } = useSelector(state => state.posts);
    useEffect(()=>{
        dispatch(postActions.getPostsByPosition(position));
    },[position])
    const handleNext = () => {
        if(postsList.length === 10) {
            dispatch(postActions.setPosition(position + 10));
        }
    }
    const handlePrev = () => {
        if(position > 0) {
            dispatch(postActions.setPosition(position - 10));
        }
    }
    return (
        <>
            <h2>Post List</h2>
            {postsList.map(post => (<Post key={post._id} {...post} />))}
            <div className="post_controls">
                <Button variant="contained" color="primary" onClick={handlePrev}>
                    Previos
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>              
            </div>
        </>
    );
};

export default PostList;
