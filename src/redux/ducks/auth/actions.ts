import { action } from 'typesafe-actions';
import { AuthTypes, AuthUserType, InfoUserType } from './types';

export const authRegisterRequest = (
  email: string,
  username: string,
  password: string,
  imageUri: string,
  name: string,
) =>
  action(AuthTypes.AUTH_REGISTER_REQUEST, {
    email,
    username,
    password,
    imageUri,
    name,
  });

export const authRegisterSuccess = (data: AuthUserType, info: InfoUserType) =>
  action(AuthTypes.AUTH_REGISTER_SUCCESS, { data, info });

export const authRegisterFailure = () =>
  action(AuthTypes.AUTH_REGISTER_FAILURE);

export const authSignInRequest = (email: string, password: string) =>
  action(AuthTypes.AUTH_SIGNIN_REQUEST, { email, password });

export const authSignInSuccess = (data: AuthUserType, info: InfoUserType) =>
  action(AuthTypes.AUTH_SIGNIN_SUCCESS, { data, info });
export const authSignInFailure = () => action(AuthTypes.AUTH_SIGNIN_FAILURE);

export const authLogoutRequest = () => action(AuthTypes.AUTH_LOGOUT_REQUEST);

export const authLogoutSuccess = () => action(AuthTypes.AUTH_LOGOUT_SUCCESS);
