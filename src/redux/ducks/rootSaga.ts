import { all, takeLatest } from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { authRegisterLoad, authSignIn, logOut } from './auth/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.AUTH_SIGNIN_REQUEST, authSignIn as any),
    takeLatest(AuthTypes.AUTH_REGISTER_REQUEST, authRegisterLoad as any),
    takeLatest(AuthTypes.AUTH_LOGOUT_REQUEST, logOut),
  ]);
}
