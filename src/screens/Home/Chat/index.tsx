import { useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Threads } from '../Messages/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import * as S from './styles';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import { ThemeContext } from 'styled-components';

import Bubble from './Bubble';
import Toast from 'react-native-toast-message';
import { ListenerContext } from 'src/context/ChannelContext';
import { TextInput } from 'react-native';
import Loading from 'components/Loading';

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
  const { messages, loading } = useContext(ListenerContext);
  const { colors } = useContext(ThemeContext);
  const [inputHeight, setInputHeight] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const route: RouteProps = useRoute() as any;
  const messageRef = useRef<TextInput>(null);

  const thread = route.params.thread;

  const handleSend = useCallback(async () => {
    if (newMessage.length > 0) {
      const text = newMessage;

      if (messageRef.current) {
        messageRef.current.clear();

        firestore()
          .collection('CHAT')
          .doc(thread.id)
          .collection('MESSAGES')
          .add({
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
      }
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

  if (loading) {
    return <Loading />;
  }

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
            ref={messageRef}
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
          <S.RowBtns>
            {/* <S.SubmitMessage>
              <AntIcon name="addfile" color="#FFF" size={15} />
            </S.SubmitMessage> */}
            <S.SubmitMessage onPress={() => handleSend()}>
              <Icon name="md-send" color="#FFF" size={15} />
            </S.SubmitMessage>
          </S.RowBtns>
        </S.ChatInputContainer>
      </S.KeyBoardView>
    </S.Container>
  );
};

export default Chat;
