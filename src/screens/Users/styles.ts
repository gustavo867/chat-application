import { Animated, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${moderateScale(20)}px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const UsersList = styled(Animated.FlatList)`
  flex-grow: 1;
`;

export const ProfilePhoto = styled.Image`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(50)}px;
`;

export const ItemContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${width * 0.9}px;
  align-self: center;
  margin-top: ${moderateScale(10)}px;
  padding: ${moderateScale(10)}px;
`;

export const ItemUsername = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-family: 'Poppins-Regular';
  color: ${(props) => props.theme.colors.text};
`;

export const ColumnAdd = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: ${moderateScale(10)}px;
`;

export const ActionBtn = styled.TouchableOpacity`
  margin-top: ${moderateScale(8)}px;
`;
