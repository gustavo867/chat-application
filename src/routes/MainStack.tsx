import React, { useCallback, useContext } from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import Messages from 'home/Messages/index';
import { ThemeContext } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';
import CreateChatRoom from 'home/Messages/CreateChatRoom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Chat from 'home/Chat';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authLogoutRequest } from 'store/ducks/auth/actions';

const Main = createStackNavigator();

const MainStack: React.FC = () => {
  const { goBack } = useNavigation();
  const { colors } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const onPressLogOut = useCallback(() => {
    dispatch(authLogoutRequest());
  }, []);
  return (
    <Main.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          height: moderateScale(100),
        },
        headerTintColor: colors.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: moderateScale(22),
          color: colors.background,
          fontFamily: 'Poppins-Medium',
        },
        headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
                {
                  scale: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9],
                      })
                    : 1,
                },
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
      <Main.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              style={{
                marginLeft: moderateScale(10),
              }}
              name="log-out-outline"
              size={28}
              color="#ffffff"
              onPress={() => onPressLogOut()}
            />
          ),
          headerRight: () => (
            <Icon
              style={{
                marginRight: moderateScale(10),
              }}
              name="message-plus"
              size={28}
              color="#ffffff"
              onPress={() =>
                navigation.navigate('CreateChatRoom', { params: 'Message' })
              }
            />
          ),
        })}
        name="Messages"
        component={Messages}
      />
      <Main.Screen
        options={({ navigation, route }: any) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: moderateScale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
              onPress={() => goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={28}
                color="#ffffff"
                onPress={() => goBack()}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: colors.background,
                  fontSize: moderateScale(12),
                }}
              >
                {route.params.params}
              </Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            marginLeft: 40,
            fontSize: moderateScale(22),
            color: colors.background,
            fontFamily: 'Poppins-Medium',
          },
        })}
        name="CreateChatRoom"
        component={CreateChatRoom}
      />
      <Main.Screen
        options={({ navigation, route }: any) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: moderateScale(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Messages')}
            >
              <Ionicons
                name="chevron-back-outline"
                size={28}
                color="#ffffff"
                onPress={() => navigation.navigate('Messages')}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: colors.background,
                  fontSize: moderateScale(12),
                }}
              >
                {route.params.params}
              </Text>
            </TouchableOpacity>
          ),
          title: route.params.thread.name,
          headerTitleStyle: {
            marginLeft: moderateScale(15),
            fontSize: moderateScale(22),
            color: colors.background,
            fontFamily: 'Poppins-Medium',
          },
        })}
        name="Chat"
        component={Chat}
      />
    </Main.Navigator>
  );
};

export default MainStack;
