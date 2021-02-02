import { Dimensions, StatusBar } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  padding-top: ${StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20}px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfilePhoto = styled.Image`
  width: ${scale(120)}px;
  height: ${scale(120)}px;
  border-radius: ${scale(60)}px;
  margin-left: ${moderateScale(10)}px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: ${moderateScale(20)}px;
  max-width: ${width * 0.5}px;
  font-family: 'Poppins-Regular';
  margin-left: ${moderateScale(20)}px;
`;
