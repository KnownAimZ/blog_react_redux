import axios from "axios";
export const SETPOSITION = 'POSTS/SETPOSITION';
export const GETPOSTS = 'POSTS/GETPOSTS';

export const setPosition = position => {
    return {
        type: SETPOSITION,
        payload: position
    };
}

export const getPostsByPosition = position => async dispatch => {
    const posts = await axios.get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts?skip=${position}`);
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