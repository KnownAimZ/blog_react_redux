import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {authWatcher} from '../auth/auth.sagas';

export const sagaMiddleware = createSagaMiddleware();
export function* rootWatcher() {
    yield all([
        authWatcher(),
    ]);
}  
