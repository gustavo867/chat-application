import { all, takeLatest } from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { authRegisterLoad } from './auth/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.AUTH_REGISTER_REQUEST, authRegisterLoad as any),
  ]);
}
