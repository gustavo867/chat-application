import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const LoadText = styled.Text`
  font-size: ${moderateScale(20)}px;
  color: ${(props) => props.theme.colors.inputColor};
  font-weight: bold;
`;
