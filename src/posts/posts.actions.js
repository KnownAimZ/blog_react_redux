import axios from "axios";
export const SETPOSITION = 'POSTS/SETPOSITION';
export const GETPOSTS = 'POSTS/GETPOSTS';
export const CLEARPOSTS = 'POSTS/CLEARPOSTS';
export const CREATEPOST = 'POSTS/CREATEPOST';
export const GETPOSTBYID = 'POSTS/GETPOSTBYID';
export const DELETEPOST = 'POSTS/DELETEPOST';
export const LIKEPOST = 'POSTS/LIKEPOST';

export const setPosition = position => {
    return {
        type: SETPOSITION,
        payload: position
    };
}

export const getPostsByPosition = position => async dispatch => {
    const posts = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?skip=${position}`);
    console.log(posts);
    dispatch({
        type: GETPOSTS,
        payload: posts.data
    });
}

export const getPostsByUserId = userId => async dispatch => {
    const posts = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?postedBy=${userId}`);
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
        await axios.post('https://nodejs-test-api-blog.herokuapp.com/api/v1/posts',
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
        const post = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${id}`);
        console.log(post);
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
        await axios.delete(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${postId}`,{
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
        await axios.put(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/like/${postId}`, 
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