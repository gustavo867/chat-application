import React from 'react';
import { useRoute } from '@react-navigation/core';
import { SharedElement } from 'react-navigation-shared-element';

import * as S from './styles';

type RouteProps = {
  uri: string;
  uid: string;
  index: number;
};

const UserPhoto: React.FC = () => {
  const route = useRoute();
  const { uri, uid, index } = route.params as RouteProps;

  return (
    <S.Container>
      <SharedElement id={`item.${uid}.image_url.${index}`}>
        <S.FullPhoto source={{ uri }} resizeMode="contain" />
      </SharedElement>
    </S.Container>
  );
};

export default UserPhoto;
