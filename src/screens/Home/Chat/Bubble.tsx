import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

interface Bubble {
  isSendByMe: boolean;
  text: string;
  photo: string;
  index: number;
  uid: string;
}

const { width, height } = Dimensions.get('screen');

const Bubble: React.FC<Bubble> = ({ uid, isSendByMe, text, photo, index }) => {
  const { navigate } = useNavigation();
  const translateY = useRef(new Animated.Value(-height)).current;
  const translateX = useRef(new Animated.Value(width)).current;
  const translateXLeft = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    translateX.setValue(width);
    translateXLeft.setValue(-width);
    translateY.setValue(-height);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 200,
        easing: Easing.bezier(0.83, 0, 0.17, 1),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        delay: index * 200,
        easing: Easing.bezier(0.11, 0, 0.5, 0),
        useNativeDriver: true,
      }),
      Animated.timing(translateXLeft, {
        toValue: 0,
        duration: 500,
        delay: index * 200,
        easing: Easing.bezier(0.11, 0, 0.5, 0),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const leftOpacity = translateXLeft.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const opacity = translateY.interpolate({
    inputRange: [-height, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  switch (isSendByMe) {
    case true:
      return (
        <S.BubbleMainContainer
          style={{
            transform: [
              {
                translateY,
              },
              { translateX },
            ],
            opacity,
          }}
          isSendByMe={isSendByMe}
        >
          <S.BubbleContainer isSendByMe={isSendByMe}>
            <S.BubbleText isSendByMe={isSendByMe}>{text}</S.BubbleText>
          </S.BubbleContainer>
          <S.ActionBtn
            onPress={() =>
              navigate('FullPhoto', {
                uri: photo,
                uid,
                index,
              })
            }
          >
            <SharedElement id={`item.${uid}.image_url.${index}`}>
              <S.BubblePhoto
                source={{
                  uri: photo,
                }}
              />
            </SharedElement>
          </S.ActionBtn>
        </S.BubbleMainContainer>
      );
    case false:
      return (
        <S.BubbleMainContainer
          style={{
            transform: [
              {
                translateY,
              },
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
                translateY,
              },
              {
                translateX: translateXLeft,
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
