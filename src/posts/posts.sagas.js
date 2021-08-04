import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {POSTS, POSTS_LIKE, POSTS_UPLOAD} from "../app/API";
import {
    GETPOSTS, 
    POSTS_ERROR, 
    GETPOSTS_BYPOSITION_WATCHER, 
    GETPOSTS_BYUSERID_WATCHER,
    CREATEPOST,
    CREATEPOST_WATCHER,
    GETPOSTBYID,
    GETPOSTBYID_WATCHER,
    DELETEPOST,
    DELETEPOST_WATCHER,
    LIKEPOST,
    LIKEPOST_WATCHER,
    CHANGEIMAGE,
    CHANGEIMAGE_WATCHER,
    UPDATEPOST,
    UPDATEPOST_WATCHER,
} from './posts.actiontypes';

const postByPositionRequest = position => axios.get(`${POSTS}?skip=${position}`);
const postByUserIdRequest = userId => axios.get(`${POSTS}?postedBy=${userId}`);
const createPostRequest = (token, title, fullText, description) => 
    axios.post(POSTS,
    {
        title,
        fullText,
        description,
    },
    {
        headers: { Authorization: `Bearer ${token}` },           
});
const getPostByIdRequest = id => axios.get(`${POSTS}${id}`);
const deletePostRequest = (token, postId) => axios.delete(`${POSTS}${postId}`,{
    headers: { Authorization: `Bearer ${token}` }
});
const likePostRequest = (token, postId) => axios.put(`${POSTS_LIKE}${postId}`, 
{ hello: 'world' },      
{
    headers: { Authorization: `Bearer ${token}` }
});
const changeImageRequest = (id, token, formData) => axios.put(`${POSTS_UPLOAD}${id}`,
formData,
{
    headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },           
});
const updatePostRequest = (token, id, title, fullText, description) => axios.patch(`${POSTS}${id}`,
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

function* getPostsByPosition (action) {
    const {payload: {position}} = action;
    try {
        const posts = yield call(postByPositionRequest, position);
        yield put({type: GETPOSTS, payload: posts.data});
    }
    catch (err) {
        yield put({type: POSTS_ERROR, message: 'Incorect position'});
    }
}

function* getPostsByUserId (action) {
    const {payload: {userId}} = action;
    try {
        const posts = yield call(postByUserIdRequest, userId);
        yield put({type: GETPOSTS, payload: posts.data});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'User has no posts'});
    }
}

function* createPost(action) {
    const {payload: {token, title, fullText, description}} = action;
    try {
        yield call(createPostRequest, token, title, fullText, description);
        yield put({type: CREATEPOST});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Post creation failed'});
    }
}

function* getPostById(action) {
    const {payload: {id}} = action;
    try {
        const post = yield call(getPostByIdRequest, id);
        yield put({type: GETPOSTBYID, payload: post.data});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Post not found'});
    }
}

function* deletePost(action) {
    const {payload: {token, postId}} = action;
    try {
        yield call(deletePostRequest, token, postId);
        yield put({type: DELETEPOST});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Post wasnt deleted'});
    }
}

function* likePost(action) {
    const {payload: {token, postId}} = action;
    try {        
        yield call(likePostRequest, token, postId);
        yield put({type: LIKEPOST});
        const post = yield call(getPostByIdRequest, postId);
        yield put({type: GETPOSTBYID, payload: post.data});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Like error'});
    }
}

function* changeImage(action) {
    const {payload: {id, token, formData}} = action;
    try {
        const response = yield call(changeImageRequest, id, token, formData);
        yield put({type: CHANGEIMAGE, payload: response.data});
        const post = yield call(getPostByIdRequest, id);
        yield put({type: GETPOSTBYID, payload: post.data});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Change image error'});
    }
}

function* updatePost(action) {
    const {payload: {token, id, title, fullText, description}} = action;
    try {
        const response = yield call(updatePostRequest, token, id, title, fullText, description);
        yield put({type: UPDATEPOST, payload: response.data});
        const post = yield call(getPostByIdRequest, id);
        yield put({type: GETPOSTBYID, payload: post.data});
    }
    catch(err) {
        yield put({type: POSTS_ERROR, message: 'Post update error'});
    }
}

export function* postsWatcher () {
    yield takeLatest(GETPOSTS_BYPOSITION_WATCHER, getPostsByPosition);
    yield takeLatest(GETPOSTS_BYUSERID_WATCHER, getPostsByUserId);
    yield takeLatest(CREATEPOST_WATCHER, createPost);
    yield takeLatest(GETPOSTBYID_WATCHER, getPostById);
    yield takeLatest(DELETEPOST_WATCHER, deletePost);
    yield takeLatest(LIKEPOST_WATCHER, likePost);
    yield takeLatest(CHANGEIMAGE_WATCHER, changeImage);
    yield takeLatest(UPDATEPOST_WATCHER, updatePost);
}