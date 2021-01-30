import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  error: {
    msg: '',
    hasError: false,
  },
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
        user: action.payload,
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
    default:
      return state;
  }
};

export default reducer;
