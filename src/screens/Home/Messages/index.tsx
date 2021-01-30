import React, { useCallback, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import * as S from './styles';
import Loading from 'components/Loading';
import { useNavigation } from '@react-navigation/native';

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
  const [threads, setThreads] = useState<Threads[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate } = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('CHAT')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads: any = querySnapshot.docs.map((documentSnapshot) => {
          return {
            id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });
        setThreads(threads);

        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const Item = (item: Threads) => {
    return (
      <S.RoomBtn
        onPress={() => navigate('Chat', { params: 'Messages', thread: item })}
      >
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
        data={threads}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <S.Separator />}
      />
    </S.Container>
  );
};

export default Messages;
