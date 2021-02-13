import React, { useCallback, useContext } from 'react';
import { Animated } from 'react-native';
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

const Item: React.FC<ItemProps> = ({ index, item, scrollY }) => {
  const { rooms } = useContext(ListenerContext);
  const { navigate } = useNavigation();
  const uid = useSelector(
    (state: ApplicationState) => state.auth.user?.user.uid,
  );
  const { colors } = useContext(ThemeContext);
  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
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
        transform: [{ scale }],
        opacity,
      }}
    >
      <S.ProfilePhoto source={{ uri: item.profilePhoto }} />
      <S.ItemUsername>{item.username}</S.ItemUsername>
      <S.ColumnAdd>
        <S.ActionBtn onPress={() => handleSendMessageToUser()}>
          <Ant name="message1" color={colors.primary} size={24} />
        </S.ActionBtn>
        <S.ActionBtn>
          <Icon name="person-add-sharp" color={colors.primary} size={24} />
        </S.ActionBtn>
      </S.ColumnAdd>
    </S.ItemContainer>
  );
};

export default Item;
