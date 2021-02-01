import { action } from 'typesafe-actions';
import { AuthTypes, AuthUserType } from './types';

export const authRegisterRequest = (
  email: string,
  username: string,
  password: string,
  imageUri: string,
) =>
  action(AuthTypes.AUTH_REGISTER_REQUEST, {
    email,
    username,
    password,
    imageUri,
  });

export const authRegisterSuccess = (data: AuthUserType) =>
  action(AuthTypes.AUTH_REGISTER_SUCCESS, data);

export const authRegisterFailure = () =>
  action(AuthTypes.AUTH_REGISTER_FAILURE);

export const authSignInRequest = (email: string, password: string) =>
  action(AuthTypes.AUTH_SIGNIN_REQUEST, { email, password });

export const authSignInSuccess = (data: AuthUserType) =>
  action(AuthTypes.AUTH_SIGNIN_SUCCESS, data);
export const authSignInFailure = () => action(AuthTypes.AUTH_SIGNIN_FAILURE);

export const authLogoutRequest = () => action(AuthTypes.AUTH_LOGOUT_REQUEST);

export const authLogoutSuccess = () => action(AuthTypes.AUTH_LOGOUT_SUCCESS);
