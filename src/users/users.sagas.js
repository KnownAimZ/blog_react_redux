import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {USERS, USERS_UPLOAD, AUTH_USER} from "../app/API";
import { 
    FETCHUSERS, 
    USERS_ERROR, 
    FETCHUSERS_WATCHER, 
    FINDSELECTEDUSER,
    FINDSELECTEDUSER_WATCHER,
    GETUSERBYTOKEN,
    GETUSERBYTOKEN_WATCHER,
    DELETEUSER,
    DELETEUSER_WATCHER,
    CLEARMYUSER,
    CHANGENAME,
    CHANGENAME_WATCHER,
    CHANGEAVATAR,
    CHANGEAVATAR_WATCHER,
} from './users.actiontypes';
import { LOGOUT } from '../auth/auth.actiontypes';

const fetchUserRequest= () => axios.get(USERS);
const findSelectedUserRequest = userId => axios.get(`${USERS}${userId}`);
const getUserByTokenRequest = token => axios.get(AUTH_USER,{
    headers: { Authorization: `Bearer ${token}` }
});
const deleteUserRequest = (id, token) => axios.delete(`${USERS}${id}`,{
    headers: { Authorization: `Bearer ${token}` }
});
const changeNameRequest = (id, token, name) => axios.patch(`${USERS}${id}`,
{
    "name": name
},
{
    headers: { Authorization: `Bearer ${token}` },           
});
const changeAvatarRequest = (id, token, formData) => axios.put(`${USERS_UPLOAD}${id}`,
formData,
{
    headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },           
});

function* fetchUsers(action) {
    try {
        const users = yield call(fetchUserRequest);
        yield put({type: FETCHUSERS, payload: users.data});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'Users not loaded'});
    }
}

function* findSelectedUser(action) {
    const {payload: {userId}} = action;
    try {
        const user = yield call(findSelectedUserRequest, userId);
        yield put({type: FINDSELECTEDUSER, payload: user.data});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'User not found(wrong id)'});
    }
}

function* getUserByToken(action) {
    const {payload: {token}} = action;
    try {
        const user = yield call(getUserByTokenRequest, token);
        yield put({type: GETUSERBYTOKEN, payload: user.data});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'User not found(token error)'});
    }
}

function* deleteUser(action) {
    const {payload: {id, token}} = action;
    try {
        yield call(deleteUserRequest, id, token);
        yield put({type: DELETEUSER});
        yield put({type: CLEARMYUSER});
        yield put({type: LOGOUT});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'User cannot be deleted'});
    }
}

function* changeName(action) {
    const {payload: {id, token, name}} = action;
    try {
        const response = yield call(changeNameRequest, id, token, name);
        yield put({type: CHANGENAME, payload: response.data});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'Name cant be changed'});
    }
}

function* changeAvatar(action) {
    const {payload: {id, token, formData}} = action;
    try {
        const response = yield call(changeAvatarRequest, id, token, formData);
        yield put({type: CHANGEAVATAR, payload: response.data});
    }
    catch(err) {
        yield put({type: USERS_ERROR, message: 'Avatar wasnt changed'});
    }
}

export function* usersWatcher () {
    yield takeLatest(FETCHUSERS_WATCHER, fetchUsers);
    yield takeLatest(FINDSELECTEDUSER_WATCHER, findSelectedUser);
    yield takeLatest(GETUSERBYTOKEN_WATCHER, getUserByToken);
    yield takeLatest(DELETEUSER_WATCHER, deleteUser);
    yield takeLatest(CHANGENAME_WATCHER, changeName);
    yield takeLatest(CHANGEAVATAR_WATCHER, changeAvatar);
}