import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import {usersReducer} from '../users/users.reducer.js';
import {postsReducer} from '../posts/posts.reducer.js';
import {authReducer} from '../auth/auth.reducer.js';

const reducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    auth: authReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer , composeWithDevTools(applyMiddleware(thunk)));

export default store;

export const persistor = persistStore(store);