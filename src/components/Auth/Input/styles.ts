import { Dimensions } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

type Props = {
  active: boolean;
};

type InputProps = {
  type: 'email' | 'password' | 'user';
};

export const Container = styled.View<Props>`
  width: ${width * 0.8}px;
  align-items: center;
  margin-top: ${moderateScale(10)}px;
  flex-direction: row;
  justify-content: flex-start;
  height: ${moderateVerticalScale(70)}px;
  border-bottom-color: ${(props) =>
    props.active
      ? props.theme.colors.inputColor
      : props.theme.colors.inputPlaceholder};
  border-bottom-width: 0.6px;
`;

export const Icon = styled.Image`
  height: ${moderateScale(24)}px;
  width: ${moderateScale(24)}px;
`;

export const Input = styled.TextInput<InputProps>`
  color: ${(props) => props.theme.colors.inputColor};
  font-size: ${moderateScale(16)}px;
  letter-spacing: 0.4px;
  padding-left: ${moderateScale(10)}px;
  flex: 1;
  max-width: ${width * 0.6}px;
  font-family: 'Poppins-Bold';
`;
