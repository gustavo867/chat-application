import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';

const Route = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Route.Navigator headerMode="none">
        <Route.Screen name="Auth" component={AuthStack} />
      </Route.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
