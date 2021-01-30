import React from 'react';
import { ActivityIndicator } from 'react-native';
import * as S from './styles';

const Loading: React.FC = () => {
  return (
    <S.Container>
      <ActivityIndicator color="#ccc" size="large" />
      <S.LoadText>Loading ...</S.LoadText>
    </S.Container>
  );
};

export default Loading;
