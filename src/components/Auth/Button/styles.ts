import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

type Props = {
  active: boolean;
};

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<any>`
  width: ${moderateScale(160)}px;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(60)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : '#FFF'};
  elevation: 10;
  margin-top: ${moderateScale(20)}px;
`;

export const Text = styled.Text<Props>`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  color: ${(props) =>
    props.active
      ? props.theme.colors.background
      : props.theme.colors.inputPlaceholder};
  margin-horizontal: 10px;
`;
