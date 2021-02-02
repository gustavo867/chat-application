import { useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Threads } from '../Messages/index';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import * as S from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import { ThemeContext } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Bubble from './Bubble';
import Toast from 'react-native-toast-message';

type RouteProps = {
  params: {
    thread: Threads;
    params: string;
  };
};

interface Message extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  text: string;
  createdAt: number;
  uid: string;
  photo: string;
}

const Chat: React.FC = () => {
  const userUid = useSelector(
    (state: ApplicationState) => state.auth.user?.user.uid,
  );
  const { colors } = useContext(ThemeContext);
  const [messages, setMessages] = useState<Message[]>();
  const [inputHeight, setInputHeight] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const route: RouteProps = useRoute() as any;

  const thread = route.params.thread;

  useEffect(() => {
    const messagesListener = firestore()
      .collection('CHAT')
      .doc(thread.id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async (querySnapshot) => {
        const messages = querySnapshot.docs.map(async (doc) => {
          const firebaseData = doc.data();

          const info = await firestore()
            .collection('INFO')
            .doc(firebaseData.uid)
            .get();

          const data = {
            id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            photo: info.data()
              ? info.data()!.profilePhoto!
              : 'https://i.stack.imgur.com/l60Hf.png',
            ...firebaseData,
          };

          await AsyncStorage.setItem(
            `@message-id=${thread.id}`,
            JSON.stringify(data),
          );
          return data;
        });

        const data = await Promise.all(messages).then((res) => res);
        setMessages(data as Message[]);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  const handleSend = useCallback(async () => {
    if (newMessage.length > 0) {
      const text = newMessage;

      firestore().collection('CHAT').doc(thread.id).collection('MESSAGES').add({
        text,
        createdAt: new Date().getTime(),
        uid: userUid,
      });

      await firestore()
        .collection('CHAT')
        .doc(thread.id)
        .set(
          {
            latestMessage: {
              text,
              createdAt: new Date().getTime(),
            },
          },
          { merge: true },
        );

      setNewMessage('');
      setInputHeight(0);
    } else {
      Toast.show({
        text1: 'Please digit at least 1 caracter',
        type: 'info',
      });
    }
  }, [newMessage]);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <Bubble
        photo={item.photo}
        isSendByMe={userUid === item.uid ? true : false}
        text={item.text}
      />
    ),
    [],
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <S.Container>
      <S.KeyBoardView behavior="height">
        <S.ChatList
          inverted
          data={messages}
          renderItem={renderItem as any}
          keyExtractor={keyExtractor as any}
          alwaysBounceVertical={false}
          centerContent
          contentInsetAdjustmentBehavior="always"
        />
        <S.ChatInputContainer>
          <S.ChatInput
            onContentSizeChange={(e) =>
              setInputHeight(e.nativeEvent.contentSize.height)
            }
            style={{
              height: inputHeight,
            }}
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            multiline={true}
            focusable={true}
            returnKeyType="next"
            showSoftInputOnFocus
            textAlignVertical="center"
            placeholder="Type a message"
            placeholderTextColor={colors.inputPlaceholder}
          />
          <S.SubmitMessage onPress={() => handleSend()}>
            <Icon name="md-send" color="#FFF" size={15} />
          </S.SubmitMessage>
        </S.ChatInputContainer>
      </S.KeyBoardView>
    </S.Container>
  );
};

export default Chat;
