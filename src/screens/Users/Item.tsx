import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { ThemeContext } from 'styled-components';

import * as S from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import Toast from 'react-native-toast-message';
import { ListenerContext } from 'src/context/ChannelContext';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

type User = {
  username: string;
  profilePhoto: string;
  uid: string;
};

type ItemProps = {
  index: number;
  item: User;
  scrollY: Animated.Value;
};

const ITEM_SIZE = moderateScale(100);
const { width } = Dimensions.get('screen');

const Item: React.FC<ItemProps> = ({ index, item, scrollY }) => {
  const { rooms } = useContext(ListenerContext);
  const { navigate } = useNavigation();
  const uid = useSelector(
    (state: ApplicationState) => state.auth.user?.user.uid,
  );
  const { colors } = useContext(ThemeContext);
  const translateY = useRef(new Animated.Value(-ITEM_SIZE)).current;
  const translateXFirstIcon = useRef(new Animated.Value(width)).current;
  const translateXSecondIcon = useRef(new Animated.Value(width)).current;
  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const opacityInputRange = [
    -ITEM_SIZE,
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 1),
  ];

  const animateEntry = useCallback(() => {
    translateY.setValue(-ITEM_SIZE);
    translateXFirstIcon.setValue(width);
    translateXSecondIcon.setValue(width);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay: index * 250,
      easing: Easing.bezier(0.39, 0.42, 0, 0.87),
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(translateXFirstIcon, {
        toValue: 0,
        duration: 800,
        delay: index * 250,
        easing: Easing.bezier(0.39, 0.42, 0, 0.87),
        useNativeDriver: true,
      }),
      Animated.timing(translateXSecondIcon, {
        toValue: 0,
        duration: 800,
        delay: index * 250 + 100,
        easing: Easing.bezier(0.39, 0.42, 0, 0.87),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    animateEntry();
  }, []);

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const opacity = Animated.add(scrollY, translateY).interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const iconOpacity = Animated.add(
    translateXFirstIcon,
    translateXSecondIcon,
  ).interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleSendMessageToUser = useCallback(() => {
    const stat = rooms?.find(
      (r) => r.private === true && r.name === item.username && r.uid === uid,
    );

    if (stat === undefined) {
      firestore()
        .collection('CHAT')
        .add({
          name: `${item.username}`,
          createdAt: new Date(),
          private: true,
          latestMessage: {
            createdAt: new Date().getTime(),
          },
          uid: uid,
        })
        .then((doc) => {
          navigate('Messages');
          Toast.show({
            text1: 'Success in create chat room',
            text2: 'Redirecting',
            type: 'success',
          });
        })
        .catch((e) => {
          Toast.show({
            text1: 'Error in create chat room',
            text2: 'Try again',
            type: 'error',
          });
        });
    } else {
      navigate('Messages');
      Toast.show({
        text1: 'Room already created',
        type: 'error',
      });
    }
  }, []);

  return (
    <S.ItemContainer
      style={{
        transform: [{ scale }, { translateY }],
        opacity,
      }}
    >
      <S.ActionBtn
        onPress={() =>
          navigate('FullPhoto', {
            uri: item.profilePhoto,
            uid: item.uid,
            index,
          })
        }
      >
        <SharedElement id={`item.${item.uid}.image_url.${index}`}>
          <S.ProfilePhoto source={{ uri: item.profilePhoto }} />
        </SharedElement>
      </S.ActionBtn>
      <S.ItemUsername>{item.username}</S.ItemUsername>
      <S.ColumnAdd>
        <S.AnimatedContainer
          style={{
            transform: [{ translateX: translateXFirstIcon }],
            opacity: iconOpacity,
          }}
        >
          <S.ActionBtn onPress={() => handleSendMessageToUser()}>
            <Ant name="message1" color={colors.primary} size={24} />
          </S.ActionBtn>
        </S.AnimatedContainer>
        <S.AnimatedContainer
          style={{
            transform: [{ translateX: translateXSecondIcon }],
            opacity: iconOpacity,
          }}
        >
          <S.ActionBtn>
            <Icon name="person-add-sharp" color={colors.primary} size={24} />
          </S.ActionBtn>
        </S.AnimatedContainer>
      </S.ColumnAdd>
    </S.ItemContainer>
  );
};

export default Item;
