import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from 'auth/Register';

const Auth = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Auth.Navigator headerMode="none">
      <Auth.Screen name="Register" component={Register} />
    </Auth.Navigator>
  );
};

export default AuthStack;
