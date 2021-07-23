import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import * as postActions from '../posts/posts.actions.js';

const PostCreator = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [fullText, setFullText] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const token = useSelector(state => state.auth.token);
    const handlePostCreate = async() => {
        if (title !== '' && fullText !== '' && description !== '' && fullText.length >= 20) {
            await dispatch(postActions.createPost(token, title, fullText, description));
            history.push('/lc');
        }
        else {
            alert('Error! Something went wrong');
        }
    }

    if (!token) {
        return (<h2>You need login to create new posts</h2>);
    }

    return (
        <div className="PostCreator">
            <h2>Create new Post</h2>
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
            <Button variant="contained" color="primary" onClick={handlePostCreate}>
                Create new post
            </Button>
            
            <Link to="/lc" style={{textDecoration: 'none'}}>
                <Button variant="contained" color="primary">
                    Go back to profile
                </Button>
            </Link>
        </div>
        
    );
}

export default PostCreator;