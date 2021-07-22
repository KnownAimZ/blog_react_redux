import {createStore, combineReducers, applyMiddleware} from 'redux';
import {usersReducer} from './users/users.reducer.js';
import {postsReducer} from './posts/posts.reducer.js';
import {authReducer} from './auth/auth.reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    users: usersReducer,
    posts: postsReducer,
    auth: authReducer,
}), composeWithDevTools(applyMiddleware(thunk)));

export default store;