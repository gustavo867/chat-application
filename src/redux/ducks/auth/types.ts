import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthTypes {
  'AUTH_REGISTER_REQUEST' = '@auth/register_request',
  'AUTH_REGISTER_SUCCESS' = '@auth/register_success',
  'AUTH_REGISTER_FAILURE' = '@auth/register_failure',
  'AUTH_SIGNIN_REQUEST' = '@auth/signin_request',
  'AUTH_SIGNIN_SUCCESS' = '@auth/signin_success',
  'AUTH_SIGNIN_FAILURE' = '@auth/signin_failure',
  'AUTH_LOGOUT_REQUEST' = '@auth/auth_logout_request',
  'AUTH_LOGOUT_SUCCESS' = '@auth/auth_logout_success',
}

export type AuthUserType = FirebaseAuthTypes.UserCredential;
export type InfoUserType = {
  profilePhoto: string | null;
  username: string;
};

export interface AuthState {
  readonly user: FirebaseAuthTypes.UserCredential | null | undefined;
  readonly isAuthenticated: boolean;
  readonly info: InfoUserType | null;
  readonly error: {
    msg: string;
    hasError: boolean;
  };
  readonly loading: boolean;
}
