import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {useParams} from 'react-router';
import {useHistory, Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {clearSelectedPost} from './posts.actions.js';
import {clearSelectedUser} from '../users/users.actions.js';
import User from '../users/User.jsx'
import './PostPage.scss';
import { CHANGEIMAGE_WATCHER, DELETEPOST_WATCHER, GETPOSTBYID_WATCHER, LIKEPOST_WATCHER } from './posts.actiontypes.js';
import { FINDSELECTEDUSER_WATCHER } from '../users/users.actiontypes.js';

const PostPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    const postData = useSelector(state => state.posts.choosedPost);
    const postedBy = useSelector(state => state.users.choosedUser);
    const myUser = useSelector(state => state.users.myUser);
    const token = useSelector(state => state.auth.token);

    useEffect(()=> {
        dispatch({type: GETPOSTBYID_WATCHER, payload: {
            id
        }});
        return ()=> {
            dispatch(clearSelectedUser());
            dispatch(clearSelectedPost());
        }
    }, [dispatch, id]);

    useEffect(()=> {
        if (postData!== null) {
            dispatch({type: FINDSELECTEDUSER_WATCHER, payload: {
                userId: postData.postedBy,
            }});
            
        } 
    }, [postData, dispatch]);

    const handleDeletePost = async() => {
        await dispatch({type: DELETEPOST_WATCHER, payload: {
            token,
            postId: postData._id
        }});
        history.goBack();
    }

    const handleLikePost = async() => {
        await dispatch({type: LIKEPOST_WATCHER, payload: {
            token,
            postId: id
        }});        
    }

    const handleImageChange = ({target}) => {
        const formData = new FormData();
        formData.append('image', target.files[0]);
        dispatch({type:CHANGEIMAGE_WATCHER, payload: {
            id: postData._id, 
            token, 
            formData
        }});
    }

    if (postData === null) {
        return (
            <p>Loading</p>
        );
    }
    return (
        <div className="Page">
            <div className="PostBlock">
            <h2>{postData.title}</h2>
            <h4>{postData.description}</h4>
            <p>{postData.fullText}</p>
            <h4>{postData.dateCreated}</h4>
            {postData.likes && <h4>Likes: {postData.likes.length}</h4>}
            <h4>Posted by:</h4>
            <User {...postedBy}/>
            { token !== null &&  
                <div className="controls">
                    <Button variant="contained" color="primary" onClick={handleLikePost}>
                            Like this post
                    </Button>
                    {  myUser !== null && myUser._id === postData.postedBy &&
                    <>
                        <Button variant="contained" color="secondary" onClick={handleDeletePost} style={{marginLeft:'10px'}}>
                                Delete post
                        </Button>
                        <Link to={`/postcreate/${id}`} style={{textDecoration:'none'}}>
                            <Button variant="contained" color="primary" style={{marginLeft:'10px'}}>
                                    Update post
                            </Button>
                        </Link>                        
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            style={{marginLeft:'10px'}}
                        >
                            Change Post Image
                            <input
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange} 
                                hidden
                            />
                        </Button>
                    </>                        
                    }
                </div>
            }
            </div>          
        </div>
        
    );
};

export default PostPage;