import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {authWatcher} from '../auth/auth.sagas';
import {postsWatcher} from '../posts/posts.sagas';
import {usersWatcher} from '../users/users.sagas';

export const sagaMiddleware = createSagaMiddleware();
export function* rootWatcher() {
    yield all([
        authWatcher(),
        postsWatcher(),
        usersWatcher(),
    ]);
}  
