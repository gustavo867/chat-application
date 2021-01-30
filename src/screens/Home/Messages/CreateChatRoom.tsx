import React, { useCallback, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Input from 'components/Messages/Input';

import * as S from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CreateChatRoom: React.FC = () => {
  const { goBack } = useNavigation();
  const uid = useSelector(
    (state: ApplicationState) => state.auth.user?.user.uid,
  );
  const [room, setRoom] = useState('');

  const handleCreateChatRoom = useCallback(() => {
    if (room.length > 0) {
      firestore()
        .collection('CHAT')
        .add({
          name: room,
          createdAt: new Date(),
          latestMessage: {
            text: `You have joined the room ${room}.`,
            createdAt: new Date().getTime(),
            uid: uid,
          },
        })
        .then((docRef) => {
          docRef.collection('MESSAGES').add({
            text: `You have joined the room ${room}.`,
            createdAt: new Date().getTime(),
            uid: uid,
          });

          Toast.show({
            text1: 'Success in create chat room',
            text2: 'Redirecting',
            type: 'success',
          });

          goBack();
        })
        .catch((e) => {
          Toast.show({
            text1: 'Error in create chat room',
            text2: 'Try again',
            type: 'error',
          });
        });
    }
  }, [room]);

  return (
    <S.ChatRoomContainer>
      <S.ChatRoomTitle>Create a new chat room</S.ChatRoomTitle>
      <Input
        label="Room name"
        value={room}
        onChangeText={(text) => setRoom(text)}
      />
      <S.ChatRoomBtn onPress={() => handleCreateChatRoom()}>
        <S.ChatRoomBtnTitle>Create</S.ChatRoomBtnTitle>
      </S.ChatRoomBtn>
    </S.ChatRoomContainer>
  );
};

export default CreateChatRoom;
