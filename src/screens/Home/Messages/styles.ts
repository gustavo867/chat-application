import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const CreateChatBtn = styled.TouchableOpacity`
  height: ${moderateScale(60)}px;
  width: ${moderateScale(60)}px;
  border-radius: ${moderateScale(30)}px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const ChatRoomContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const ChatRoomTitle = styled.Text`
  font-size: ${moderateScale(24)}px;
  font-family: 'Poppins-Bold';
  color: ${(props) => props.theme.colors.text};
`;

export const ChatRoomBtn = styled.TouchableOpacity`
  width: ${width * 0.8}px;
  height: ${moderateScale(56)}px;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: ${moderateScale(60)}px;
  margin-top: ${moderateScale(40)}px;
`;

export const ChatRoomBtnTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: ${moderateScale(16)}px;
  color: #ffffff;
`;

export const RoomList = styled.FlatList`
  flex-grow: 1;
  flex: 1;
`;

export const RoomBtn = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  align-items: flex-start;
  justify-content: center;
  width: ${width * 0.8}px;
  align-self: center;
  border-radius: ${moderateScale(10)}px;
  height: ${moderateScale(80)}px;
  background-color: #f5fbfe;
  margin-top: ${moderateScale(10)}px;
  elevation: 5;
  padding-horizontal: ${moderateScale(20)}px;
`;

export const RoomName = styled.Text`
  font-size: ${moderateScale(22)}px;
  font-family: 'Poppins-Regular';
  color: ${(props) => props.theme.colors.text};
`;

export const Separator = styled.View`
  background-color: ${(props) => props.theme.colors.inputPlaceholder};
  height: 1px;
  width: ${width}px;
  margin-top: ${moderateScale(10)}px;
`;
