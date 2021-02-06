import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import MainStack from './MainStack';
import Loading from 'components/Loading';

const Route = createStackNavigator();

const Routes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: ApplicationState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      <Route.Navigator headerMode="none">
        {isAuthenticated ? (
          <Route.Screen name="Main" component={MainStack} />
        ) : (
          <Route.Screen name="Auth" component={AuthStack} />
        )}
        <Route.Screen name="Loading" component={Loading} />
      </Route.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
