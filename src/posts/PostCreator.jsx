import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import * as postActions from '../posts/posts.actions.js';
import './PostCreator.scss';


const PostCreator = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [fullText, setFullText] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const {id} = useParams();
    const token = useSelector(state => state.auth.token);
    const post = useSelector(state => state.posts.choosedPost);

    useEffect(()=> {
        if(id) {
            const updateFields = async () => {
                setTitle(post.title);
                setFullText(post.fullText);
                setDescription(post.description);
            }
            updateFields();
        }
    },[id, post.title, post.fullText, post.description]);

    const handlePostCreate = async() => {
        if (title !== '' && fullText !== '' && description !== '' && fullText.length >= 20 && title.length >= 5) {
            await dispatch(postActions.createPost(token, title, fullText, description));
            history.push('/lc');
        }
        else {
            alert('Error! Something went wrong');
        }
    }

    const handlePostUpdate = async() => {
        if (title !== '' && fullText !== '' && description !== '' && fullText.length >= 20 && title.length >= 5) {
            await dispatch(postActions.updatePost(token, id, title, fullText, description));
            history.goBack();
        }
        else {
            alert('Error! Something went wrong');
        }
    }

    const handleCancel = () => {
        history.goBack();
    }

    if (!token) {
        return (<h2>You need login to create new posts</h2>);
    }

    return (
        <div className="Page">
            <div className="PostCreator">
                <h2>{id === undefined ? 'Create new post' : 'Update this post'}</h2>
                <TextField
                    required          
                    label="Title"
                    value={title}
                    onChange={(e=>setTitle(e.target.value))}
                    variant="outlined"
                />
                <TextField
                    required          
                    label="FullText"
                    value={fullText}
                    onChange={(e=>setFullText(e.target.value))}
                    variant="outlined"
                />
                <TextField
                    required          
                    label="Description"
                    value={description}
                    onChange={(e=>setDescription(e.target.value))}
                    variant="outlined"
                />
                {id===undefined && 
                    <>
                     <Button variant="contained" color="primary" onClick={handlePostCreate}>
                        Create new post
                    </Button>                
                    <Link to="/lc" style={{textDecoration: 'none', marginLeft: '10px'}}>
                        <Button variant="contained" color="primary">
                            Go back to profile
                        </Button>
                    </Link> 
                    </>
                }
                {id && 
                    <>
                    <Button variant="contained" color="primary" onClick={handlePostUpdate}>
                        Update
                    </Button>                
                    <Button variant="contained" color="primary" onClick={handleCancel} style={{marginLeft: '10px'}}>
                        Cancel
                    </Button>
                    </>
                }
               
            </div>
        </div>
       
    );
}

export default PostCreator;