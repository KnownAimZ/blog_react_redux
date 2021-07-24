import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as postActions from './posts.actions.js';
import Post from './Post.jsx';
import './PostList.scss';

const PostList = ({withControls, title}) => {
    const dispatch = useDispatch();
    const { position, postsList } = useSelector(state => state.posts);
    
    useEffect(()=>{
        if(withControls) {
            dispatch(postActions.getPostsByPosition(position));
        }
    },[position]);

    useEffect(()=> {
        return ()=> {
            dispatch(postActions.clearPosts());
        }
    },[]);

    const handleNext = () => {
        if(postsList.length === 10) {
            dispatch(postActions.setPosition(position + 10));
        }
    };

    const handlePrev = () => {
        if(position > 0) {
            dispatch(postActions.setPosition(position - 10));
        }
    };

    if (!withControls && postsList.length === 0) {
        return (
            <>
                <h2>{title}</h2>
                <p>This user has no posts...</p>
            </>
        );
    }
    return (
        <>
            <h2>{title}</h2>
            {postsList.map(post => (<Post key={post._id} {...post} />))}
            { withControls && 
            <div className="post_controls">
                <Button variant="contained" color="primary" onClick={handlePrev}>
                    Previous
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                </Button>              
            </div> }
        </>
    );
};

export default PostList;
