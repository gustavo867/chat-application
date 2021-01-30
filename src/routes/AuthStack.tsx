import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Register from 'auth/Register';
import Splash from 'auth/Splash';
import SignIn from 'auth/SignIn';
import { Easing } from 'react-native';

const Auth = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Auth.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              easing: Easing.bezier(0.7, 0, 0.84, 0),
              duration: 500,
            },
          },
          close: {
            animation: 'timing',
            config: {
              easing: Easing.bezier(0.76, 0, 0.24, 1),
              duration: 500,
            },
          },
        },
      }}>
      <Auth.Screen name="Splash" component={Splash} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="Register" component={Register} />
    </Auth.Navigator>
  );
};

export default AuthStack;
