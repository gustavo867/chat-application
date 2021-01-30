import React from 'react';
import * as S from './styles';

interface Bubble {
  isSendByMe: boolean;
  text: string;
}

const Bubble: React.FC<Bubble> = ({ isSendByMe, text }) => {
  return (
    <S.BubbleContainer isSendByMe={isSendByMe}>
      <S.BubbleText isSendByMe={isSendByMe}>{text}</S.BubbleText>
    </S.BubbleContainer>
  );
};

export default Bubble;
