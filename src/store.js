import {createStore, combineReducers, applyMiddleware} from 'redux';
import {usersReducer} from './users/users.reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    users: usersReducer
}), composeWithDevTools(applyMiddleware(thunk)));

export default store;