import React, { useCallback, useContext } from 'react';

import * as S from './styles';
import Loading from 'components/Loading';
import { useNavigation } from '@react-navigation/native';
import { ListenerContext } from 'src/context/ChannelContext';

export type Threads = {
  id: string;
  name: string;
  latestMessage: {
    createdAt: number;
    text: string;
    uid: string;
  };
};

const Messages: React.FC = () => {
  const { rooms, loading, getCurrentRoom } = useContext(ListenerContext);

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
        data={rooms}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <S.Separator />}
      />
    </S.Container>
  );
};

export default Messages;
