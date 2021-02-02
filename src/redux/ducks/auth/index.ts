import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  error: {
    msg: '',
    hasError: false,
  },
  info: null,
  loading: false,
};

const reducer: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          msg: '',
          hasError: false,
        },
        user: action.payload.data,
        info: action.payload.info,
        isAuthenticated: true,
      };
    case AuthTypes.AUTH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          msg: 'Error while registering user',
          hasError: true,
        },
      };
    case AuthTypes.AUTH_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
      };
    case AuthTypes.AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        info: action.payload.info,
        isAuthenticated: true,
      };
    case AuthTypes.AUTH_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          msg: 'Error while signing user',
          hasError: true,
        },
      };
    case AuthTypes.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: {
          msg: '',
          hasError: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
