import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {LOGIN, CREATEUSER, AUTH_ERROR, LOGIN_WATCHER, CREATEUSER_WATCHER} from './auth.actiontypes.js';
import {AUTH, USERS} from '../app/API.js';  

const loginRequest = (email, password) => axios.post(AUTH, {email,password});
const createUserRequest = (email, password, name) => axios.post(USERS, {email, password, name});

function* authLogin (action) {
    try {        
        const response = yield call(loginRequest, action.payload.email, action.payload.password);
        yield put({type: LOGIN, payload: response.data.token});
    } 
    catch(err) {
        yield put({type: AUTH_ERROR, message: 'Login failed'});
    }
}

function* createUser (action) {
    try {
        const response = yield call(createUserRequest, action.payload.email, action.payload.password, action.payload.name);
        yield put({type: CREATEUSER, payload: response.data});
    } 
    catch(err) {
        yield put({type: AUTH_ERROR, message: 'User creation failed'});
    }
}

export function* authWatcher () {
    yield takeLatest(LOGIN_WATCHER, authLogin);
    yield takeLatest(CREATEUSER_WATCHER, createUser);
}