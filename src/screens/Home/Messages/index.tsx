import React, { useCallback, useContext } from 'react';

import * as S from './styles';
import Loading from 'components/Loading';
import { useNavigation } from '@react-navigation/native';
import { ListenerContext } from 'src/context/ChannelContext';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';

export type Threads = {
  id: string;
  name: string;
  latestMessage: {
    createdAt: number;
    text: string;
    uid: string;
  };
  uid: string;
  private: boolean;
};

const Messages: React.FC = () => {
  const { rooms, loading, getCurrentRoom } = useContext(ListenerContext);
  const { user, additionalUserInfo } = useSelector(
    (state: ApplicationState) => state.auth.user!,
  );

  const { navigate } = useNavigation();

  const onGetCurrentRoom = useCallback(
    (item: Threads) => {
      getCurrentRoom(item.id);

      navigate('Chat', { params: 'Messages', thread: item });
    },
    [navigate, rooms],
  );

  const Item = (item: Threads) => {
    return (
      <S.RoomBtn onPress={() => onGetCurrentRoom(item)}>
        <S.RoomName>{item.name}</S.RoomName>
        <S.LastMessage>Latest Message: {item.latestMessage.text}</S.LastMessage>
      </S.RoomBtn>
    );
  };

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(({ item }) => <Item {...item} />, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.RoomList
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        data={rooms?.filter((item) => {
          if (item.private === false) {
            return item;
          } else {
            if (item.private === true) {
              if (item.name === additionalUserInfo?.username) {
                return item;
              }
              if (item.uid === user!.uid) {
                return item;
              }

              return;
            }
          }
        })}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <S.Separator />}
      />
    </S.Container>
  );
};

export default Messages;
