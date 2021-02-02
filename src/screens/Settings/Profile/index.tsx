import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/index';
import * as S from './styles';

const Profile: React.FC = () => {
  const { info, user } = useSelector((state: ApplicationState) => state.auth);

  console.log(user?.user.displayName);

  return (
    <S.Container>
      <S.Row>
        <S.ProfilePhoto
          source={{
            uri: info?.profilePhoto
              ? info.profilePhoto
              : 'https://i.stack.imgur.com/l60Hf.png',
          }}
        />
        <S.Title>{user?.user.displayName}</S.Title>
      </S.Row>
    </S.Container>
  );
};

export default Profile;
