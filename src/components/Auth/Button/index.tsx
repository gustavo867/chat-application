import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface BtnProps extends TouchableOpacityProps {
  active: boolean;
  label: string;
}

const Button: React.FC<BtnProps> = ({ active, label, ...rest }) => {
  switch (active) {
    case true:
      return (
        <S.Container active={true} {...rest}>
          <S.Text active={true}>{label}</S.Text>
          <Feather name="arrow-right" color="white" size={24} />
        </S.Container>
      );
    case false:
      return (
        <S.Container active={false} {...rest}>
          <S.Text active={false}>{label}</S.Text>
        </S.Container>
      );
    default:
      return (
        <S.Container active={active} {...rest}>
          <S.Text active={active}>{label}</S.Text>
        </S.Container>
      );
  }
};

export default Button;
