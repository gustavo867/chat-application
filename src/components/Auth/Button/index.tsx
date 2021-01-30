import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { TouchableOpacityProps, Dimensions } from 'react-native';

import * as S from './styles';
import { moderateScale } from 'react-native-size-matters';

interface BtnProps extends TouchableOpacityProps {
  active: boolean;
  label: string;
  buttonHeight?: number;
  buttonWidth?: number;
}

const Button: React.FC<BtnProps> = ({
  active,
  label,
  buttonHeight = moderateScale(56),
  buttonWidth = moderateScale(160),
  ...rest
}) => {
  switch (active) {
    case true:
      return (
        <S.Container
          style={{
            height: buttonHeight,
            width: buttonWidth,
          }}
          active={true}
          {...rest}>
          <S.Text active={true}>{label}</S.Text>
          <Feather name="arrow-right" color="white" size={24} />
        </S.Container>
      );
    case false:
      return (
        <S.Container
          style={{
            height: buttonHeight,
            width: buttonWidth,
          }}
          active={false}
          {...rest}>
          <S.Text active={false}>{label}</S.Text>
        </S.Container>
      );
    default:
      return (
        <S.Container
          style={{
            height: buttonHeight,
            width: buttonWidth,
          }}
          active={active}
          {...rest}>
          <S.Text active={active}>{label}</S.Text>
        </S.Container>
      );
  }
};

export default Button;
