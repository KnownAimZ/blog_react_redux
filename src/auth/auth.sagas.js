import {call, put, takeLatest} from 'redux-saga/effects';
import {LOGIN, CREATEUSER, AUTH_ERROR, LOGIN_WATCHER, CREATEUSER_WATCHER} from './auth.actiontypes.js';
import API from '../app/API.js';  

const loginRequest = (email, password) => API.post('auth/', {email,password});
const createUserRequest = (email, password, name) => API.post('users/', {email, password, name});

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