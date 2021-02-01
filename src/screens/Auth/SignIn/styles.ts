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

export const LeftAlignmentContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  max-width: ${width * 0.8}px;
  width: ${width * 0.8}px;
  margin-top: ${height * 0.04}px;
`;

export const Circle = styled.TouchableOpacity`
  height: ${moderateScale(44)}px;
  width: ${moderateScale(44)}px;
  border-radius: ${moderateScale(22)}px;
  background-color: ${(props) => props.theme.colors.blackOpacity};
  margin-bottom: ${moderateScale(30)}px;
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
  margin-top: ${moderateScale(20)}px;
`;

export const LargeMargin = styled.View`
  height: ${moderateScale(150)}px;
`;

export const KeyBoardView = styled.KeyboardAvoidingView``;

export const InputContainer = styled.View`
  margin-top: ${moderateScale(18)}px;
  align-items: center;
  justify-content: center;
`;
