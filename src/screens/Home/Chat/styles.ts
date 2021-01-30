import { Dimensions } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

type BubbleProps = {
  isSendByMe: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: #edf0f5;
`;

export const KeyBoardView = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #edf0f5;
`;

export const ChatList = styled.FlatList`
  flex-grow: 0;
  max-height: ${height - moderateScale(100)}px;
  margin-bottom: ${moderateVerticalScale(80)}px;
  overflow: hidden;
`;

export const BubbleContainer = styled.View<BubbleProps>`
  max-width: ${width * 0.8}px;
  min-height: ${moderateScale(40)}px;
  min-width: ${width * 0.2}px;
  padding: ${moderateScale(15)}px;
  background-color: ${(props) =>
    props.isSendByMe
      ? props.theme.colors.userChat
      : props.theme.colors.otherChat};
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(10)}px;
  align-self: ${(props) => (props.isSendByMe ? 'flex-end' : 'flex-start')};
  margin-right: ${(props) => (props.isSendByMe ? moderateScale(10) : 0)}px;
  margin-left: ${(props) => (props.isSendByMe ? 0 : moderateScale(10))}px;
`;

export const BubbleText = styled.Text<BubbleProps>`
  font-family: 'Poppins-Medium';
  font-size: ${moderateScale(13)}px;
  color: ${(props) =>
    props.isSendByMe ? props.theme.colors.background : props.theme.colors.text};
`;

export const ChatInputContainer = styled.View`
  width: ${width * 0.95}px;
  background-color: #fbfbfb;
  elevation: 2;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
  height: auto;
  min-height: ${moderateScale(50)}px;
  max-height: ${moderateScale(100)}px;
  padding-horizontal: ${moderateScale(10)}px;
  position: absolute;
  bottom: ${moderateScale(20)}px; ;
`;

export const ChatInput = styled.TextInput`
  width: ${width * 0.7}px;
  padding-left: ${moderateScale(15)}px;
  align-self: center;
  height: auto;
  justify-content: center;
  min-height: ${moderateScale(50)}px;
  max-height: ${moderateScale(100)}px;
  font-size: ${moderateScale(14)}px;
  font-family: 'Poppins-Medium';
  color: ${(props) => props.theme.colors.inputColor};
`;

export const SubmitMessage = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${10}px;
  background-color: ${(props) => props.theme.colors.userChat};
  align-items: center;
  justify-content: center;
`;