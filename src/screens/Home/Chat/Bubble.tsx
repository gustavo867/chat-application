import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import * as S from './styles';

interface Bubble {
  isSendByMe: boolean;
  text: string;
  photo: string;
}

const { width } = Dimensions.get('screen');

const Bubble: React.FC<Bubble> = ({ isSendByMe, text, photo }) => {
  const translateX = useRef(new Animated.Value(width)).current;
  const translateXLeft = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.11, 0, 0.5, 0),
      useNativeDriver: true,
    }).start();
    Animated.timing(translateXLeft, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.11, 0, 0.5, 0),
      useNativeDriver: true,
    }).start();
  }, []);

  const leftOpacity = translateXLeft.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const opacity = translateX.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  switch (isSendByMe) {
    case true:
      return (
        <S.BubbleMainContainer
          style={{
            transform: [
              {
                translateX,
              },
            ],
            opacity,
          }}
          isSendByMe={isSendByMe}
        >
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
        <S.BubbleMainContainer
          style={{
            transform: [
              {
                translateX: translateXLeft,
              },
            ],
            opacity: leftOpacity,
          }}
          isSendByMe={isSendByMe}
        >
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
        <S.BubbleMainContainer
          style={{
            transform: [
              {
                translateX,
              },
            ],
            opacity,
          }}
          isSendByMe={isSendByMe}
        >
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
