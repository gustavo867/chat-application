import React, { useContext, useState } from 'react';

import { ImageSourcePropType, TextInputProps } from 'react-native';
import { ThemeContext } from 'styled-components';

import * as S from './styles';

import email from 'assets/mail.png';
import password from 'assets/password.png';
import user from 'assets/user.png';

interface InputProps extends TextInputProps {
  type: 'email' | 'password' | 'user' | 'username';
}

const Input: React.FC<InputProps> = ({ type, ...rest }) => {
  const [active, setActive] = useState(false);
  const {
    colors: { inputPlaceholder },
  } = useContext(ThemeContext);
  const source: () => ImageSourcePropType = () => {
    switch (type) {
      case 'email':
        return email;
      case 'password':
        return password;
      case 'user':
        return user;
      case 'username':
        return user;
      default:
        return user;
    }
  };

  return (
    <S.Container active={active}>
      <S.Icon source={source()} />
      <S.Input
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onSubmitEditing={() => setActive(false)}
        {...rest}
        type={type}
        placeholderTextColor={inputPlaceholder}
        placeholder={
          type === 'email'
            ? 'Email'
            : type === 'username'
            ? 'Username'
            : type === 'password'
            ? 'Password'
            : 'Name'
        }
        secureTextEntry={type === 'password' ? true : false}
      />
    </S.Container>
  );
};

export default Input;
