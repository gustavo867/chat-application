import React from 'react';
import * as S from './styles';

interface Bubble {
  isSendByMe: boolean;
  text: string;
  photo: string;
}

const Bubble: React.FC<Bubble> = ({ isSendByMe, text, photo }) => {
  switch (isSendByMe) {
    case true:
      return (
        <S.BubbleMainContainer isSendByMe={isSendByMe}>
          <S.BubbleContainer isSendByMe={isSendByMe}>
            <S.BubbleText isSendByMe={isSendByMe}>{text}</S.BubbleText>
          </S.BubbleContainer>
          <S.BubblePhoto
            source={{
              uri: photo,
            }}
          />
        </S.BubbleMainContainer>
      );
    case false:
      return (
        <S.BubbleMainContainer isSendByMe={isSendByMe}>
          <S.BubblePhoto
            source={{
              uri: photo,
            }}
          />
          <S.BubbleContainer isSendByMe={isSendByMe}>
            <S.BubbleText isSendByMe={isSendByMe}>{text}</S.BubbleText>
          </S.BubbleContainer>
        </S.BubbleMainContainer>
      );
    default:
      return (
        <S.BubbleMainContainer isSendByMe={isSendByMe}>
          <S.BubblePhoto
            source={{
              uri: photo,
            }}
          />
          <S.BubbleContainer isSendByMe={isSendByMe}>
            <S.BubbleText isSendByMe={isSendByMe}>{text}</S.BubbleText>
          </S.BubbleContainer>
        </S.BubbleMainContainer>
      );
  }
};

export default Bubble;
