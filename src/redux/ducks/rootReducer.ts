import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

import auth from './auth/index';

const rootReducer = combineReducers({
  auth,
});

export default persistReducer(persistConfig, rootReducer);
