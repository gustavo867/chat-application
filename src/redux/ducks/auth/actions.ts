import { act } from 'react-test-renderer';
import { action } from 'typesafe-actions';
import { AuthTypes, AuthUserType } from './types';

export const authRegisterRequest = (
  email: string,
  username: string,
  password: string,
) => action(AuthTypes.AUTH_REGISTER_REQUEST, { email, username, password });

export const authRegisterSuccess = (data: AuthUserType) =>
  action(AuthTypes.AUTH_REGISTER_SUCCESS, data);

export const authRegisterFailure = () =>
  action(AuthTypes.AUTH_REGISTER_FAILURE);

export const authSignInRequest = (email: string, password: string) =>
  action(AuthTypes.AUTH_SIGNIN_REQUEST, { email, password });

export const authSignInSuccess = (data: AuthUserType) =>
  action(AuthTypes.AUTH_SIGNIN_SUCCESS, data);
export const authSignInFailure = () => action(AuthTypes.AUTH_SIGNIN_FAILURE);
