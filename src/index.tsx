import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';
import firebase from '@react-native-firebase/app';

import { ThemeProvider } from 'styled-components';
import { LogBox, StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store/index';

import Routes from './routes/routes';
import light from 'themes/light';
import firebaseConfig from './config/firebaseConfig';
import Loading from 'components/Loading';

const App: React.FC = () => {
  if (firebase.apps.length > 0) {
    firebase.initializeApp(firebaseConfig);
  }

  LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  if (store.getState().auth.loading) {
    return (
      <ThemeProvider theme={light}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="default"
            />
            <Loading />
            <Toast
              ref={(ref) => Toast.setRef(ref)}
              topOffset={50}
              visibilityTime={1000}
            />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={light}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="default"
          />
          <Routes />
          <Toast
            ref={(ref) => Toast.setRef(ref)}
            topOffset={50}
            visibilityTime={500}
          />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
