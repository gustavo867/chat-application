import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, TouchableOpacityProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  type: 'dark' | 'light';
}

type BtnProps = {
  type: 'dark' | 'light';
};

const Button: React.FC<ButtonProps> = ({ label, type, ...rest }) => {
  switch (type) {
    case 'light':
      return (
        <BtnContainer type="light" {...rest}>
          <BtnTitle type="light">{label}</BtnTitle>
        </BtnContainer>
      );
    case 'dark':
      return (
        <BtnContainer type="dark" {...rest}>
          <BtnTitle type="dark">{label}</BtnTitle>
        </BtnContainer>
      );
    default:
      return (
        <BtnContainer type={type} {...rest}>
          <BtnTitle type={type}>{label}</BtnTitle>
        </BtnContainer>
      );
  }
};

const Splash: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <Container>
      <Title>Chat Application</Title>
      <ButtonsContainer>
        <Button
          label="Sign Up"
          type="light"
          onPress={() => navigate('Register')}
        />
        <Button
          label="Sign In"
          type="dark"
          onPress={() => navigate('SignIn')}
        />
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: ${moderateScale(40)}px;
  padding-top: ${moderateScale(40)}px;
`;

const Title = styled.Text`
  font-size: ${moderateScale(48)}px;
  color: ${(props) => props.theme.colors.background};
  font-family: 'Poppins-Bold';
  margin-left: ${moderateScale(20)}px;
`;

const ButtonsContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
`;

const BtnContainer = styled.TouchableOpacity<BtnProps>`
  width: ${width * 0.8}px;
  height: ${moderateScale(56)}px;
  background-color: ${(props) =>
    props.type === 'light'
      ? props.theme.title === 'dark'
        ? '#1B1B1B'
        : '#FFFFFF'
      : props.theme.colors.inputPlaceholder};
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: ${moderateScale(60)}px;
  margin-top: ${moderateScale(10)}px;
`;

const BtnTitle = styled.Text<BtnProps>`
  font-family: 'Poppins-Bold';
  font-size: ${moderateScale(16)}px;
  color: ${(props) =>
    props.theme.title === 'dark'
      ? '#FEFEFF'
      : props.type === 'light'
      ? props.theme.colors.inputColor
      : '#FFFFFF'};
`;

export default Splash;
