import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('screen');

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 40px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Scroll = styled.ScrollView`
  flex-grow: 1;
  padding-bottom: 20px;
  flex: 1;
  width: ${width}px;
`;

export const LeftAlignmentContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  max-width: ${width * 0.8}px;
  width: ${width * 0.8}px;
`;

export const Circle = styled.TouchableOpacity`
  height: ${moderateScale(44)}px;
  width: ${moderateScale(44)}px;
  border-radius: ${moderateScale(22)}px;
  background-color: ${(props) => props.theme.colors.blackOpacity};
  margin-bottom: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
`;

export const Close = styled.Image``;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-size: ${moderateScale(28)}px;
  text-align: left;
  font-family: 'Poppins-Bold';
`;

export const SignUp = styled.Text`
  color: ${(props) => props.theme.colors.grey};
  font-size: ${moderateScale(12)}px;
  text-align: left;
  font-family: 'Poppins-Medium';
`;

export const Separator = styled.View`
  width: ${width * 0.8}px;
  align-self: center;
  height: 1px;
  background-color: ${(props) => props.theme.colors.inputColor};
  opacity: 0.3;
  margin-top: ${moderateScale(10)}px;
`;

export const LargeMargin = styled.View`
  height: ${moderateScale(50)}px;
`;

export const KeyBoardView = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const InputContainer = styled.View`
  margin-top: ${moderateScale(18)}px;
  align-items: center;
  justify-content: center;
`;

export const ImageSelectContainer = styled.View`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${(props) => props.theme.colors.blackOpacity};
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(20)}px;
`;

export const ActionBtn = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  top: ${moderateScale(40)}px;
  z-index: 10;
`;

export const Avatar = styled.Image`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(20)}px;
`;
