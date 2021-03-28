import React, { useContext, useRef } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { ListenerContext } from 'src/context/ChannelContext';
import { ApplicationState } from 'store/index';
import Item from './Item';
import * as S from './styles';

const Users: React.FC = () => {
  const { users } = useContext(ListenerContext);
  const uid = useSelector(
    (state: ApplicationState) => state.auth.user?.user.uid,
  );

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <S.Container>
      <S.UsersList
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {users
          .filter((item) => {
            return item.uid !== uid;
          })
          .map((item, index) => (
            <Item
              key={index.toString()}
              item={item}
              index={index}
              scrollY={scrollY}
            />
          ))}
      </S.UsersList>
    </S.Container>
  );
};

export default Users;
