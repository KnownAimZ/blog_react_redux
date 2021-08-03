import axios from "axios";
import {POSTS, POSTS_LIKE, POSTS_UPLOAD} from '../app/API.js';
import {
    SETPOSITION,
    GETPOSTS,
    CLEARPOSTS,
    CREATEPOST,
    GETPOSTBYID,
    DELETEPOST,
    LIKEPOST,
    CHANGEIMAGE,
    CLEARSELECTEDPOST,
    UPDATEPOST,
    REORDERPOSTS
} from './posts.actiontypes.js';

export const setPosition = position => {
    return {
        type: SETPOSITION,
        payload: position
    };
}

export const getPostsByPosition = position => async dispatch => {
    const posts = await axios.get(`${POSTS}?skip=${position}`);
    dispatch({
        type: GETPOSTS,
        payload: posts.data
    });
}

export const getPostsByUserId = userId => async dispatch => {
    const posts = await axios.get(`${POSTS}?postedBy=${userId}`);
    dispatch({
        type: GETPOSTS,
        payload: posts.data
    });
}


export const clearPosts = () => {
    return {
        type: CLEARPOSTS
    };    
};

export const createPost = (token, title, fullText, description) => async dispatch => {
    try {
        await axios.post(POSTS,
        {
            title,
            fullText,
            description,
        },
        {
            headers: { Authorization: `Bearer ${token}` },           
        });
        dispatch({
            type: CREATEPOST
        });
    }
    catch(err) {
        console.log(err);
    }       
};

export const getPostById = id => async dispatch => {
    try {
        const post = await axios.get(`${POSTS}${id}`);
        // console.log(post);
        dispatch({
            type: GETPOSTBYID,
            payload: post.data
        });
    }
    catch(err) {
        console.log(err);        
    }
};

export const deletePost = (token, postId) => async dispatch => {
    try {
        await axios.delete(`${POSTS}${postId}`,{
        headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({
            type: DELETEPOST
        })
    }
    catch(err) {
        console.log(err);
    }
};

export const likePost = (token, postId) => async dispatch => {
    try {
        await axios.put(`${POSTS_LIKE}${postId}`, 
        { hello: 'world' },  //not working with empty data      
        {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({
            type: LIKEPOST
        })
    }
    catch(err) {
        console.log(err);
    }
};

export const changeImage = (id, token, formData) => async dispatch => {
    try {
        const response = await axios.put(`${POSTS_UPLOAD}${id}`,
        formData,
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },           
        });
        // console.log(response);
        dispatch ({
            type: CHANGEIMAGE,
            payload: response.data,
        });
    }
    catch(err) {
        console.log(err);
    }    
};

export const clearSelectedPost = () => {
    return {
        type: CLEARSELECTEDPOST
    };
}

export const updatePost = (token, id, title, fullText, description) => async dispatch => {
    try {
        const response = await axios.patch(`${POSTS}${id}`,
        {
            title,
            fullText,
            description
        },
        {
            headers: { 
                Authorization: `Bearer ${token}`,
            },           
        });
        dispatch ({
            type: UPDATEPOST,
            payload: response.data,
        });
    }
    catch(err) {
        console.log(err);
    }
};

export const reorderPosts = orderedList => {
    return {
        type: REORDERPOSTS,
        payload: orderedList,
    }
};