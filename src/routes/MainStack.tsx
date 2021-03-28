import React, { useCallback, useContext } from 'react';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import Messages from 'home/Messages/index';
import { ThemeContext } from 'styled-components';
import { moderateScale } from 'react-native-size-matters';
import CreateChatRoom from 'home/Messages/CreateChatRoom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Chat from 'home/Chat';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authLogoutRequest } from 'store/ducks/auth/actions';
import Profile from 'src/screens/Settings/Profile';
import Users from 'src/screens/Users';
import Toast from 'react-native-toast-message';
import UserPhoto from 'src/screens/Users/UserPhoto';

const Main = createSharedElementStackNavigator();

const MainStack: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const { colors } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const onDeleteThread = useCallback((id: string) => {
    firestore()
      .collection('CHAT')
      .doc(id)
      .delete()
      .then((res) => {
        navigate('Messages');
        Toast.show({
          text1: 'Room deleted with success',
          text2: 'Redirecting ...',
          type: 'success',
        });
      })
      .catch((e) => {
        Toast.show({
          text1: e.message,
          type: 'error',
        });
      });
  }, []);

  const onPressLogOut = useCallback(() => {
    dispatch(authLogoutRequest());
  }, []);

  const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({ current: { progress } }: any) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };

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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: moderateScale(10),
              }}
            >
              <Ionicons
                style={{
                  marginRight: moderateScale(15),
                }}
                name="add"
                size={28}
                color="#ffffff"
                onPress={() =>
                  navigate('CreateChatRoom', { params: 'Messages' })
                }
              />
              <Feather
                name="user-plus"
                size={28}
                color="#FFFFFF"
                onPress={() => navigate('Users')}
              />
            </View>
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => onDeleteThread(route.params.thread.id)}
            >
              <Feather
                style={{
                  marginRight: moderateScale(10),
                }}
                name="trash"
                size={24}
                color="white"
              />
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
      <Main.Screen
        name="Users"
        component={Users}
        options={{
          headerShown: false,
        }}
      />
      <Main.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Main.Screen
        name="FullPhoto"
        component={UserPhoto}
        options={{
          headerShown: false,
        }}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { uri, uid, index } = route.params;

          return [
            {
              id: `item.${uid}.image_url.${index}`,
              animation: 'fade-out',
              resize: 'clip',
            },
          ];
        }}
      />
    </Main.Navigator>
  );
};

export default MainStack;
