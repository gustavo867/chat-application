import React, { useContext, useState } from 'react';
import { TextInputProps } from 'react-native';
import { ThemeContext } from 'styled-components';
import * as S from './styles';

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  const [active, setActive] = useState(false);
  const { colors } = useContext(ThemeContext);
  return (
    <S.Container active={active}>
      <S.Input
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onSubmitEditing={() => setActive(false)}
        placeholder={label}
        placeholderTextColor={colors.inputPlaceholder}
        {...rest}
      />
    </S.Container>
  );
};

export default Input;
