import React, { useCallback, useEffect, useState } from 'react';
import Input from 'components/Auth/Input';

import * as Yup from 'yup';
import * as S from './styles';

import close from 'assets/close.png';
import Button from 'components/Auth/Button';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { authRegisterRequest } from 'store/ducks/auth/actions';
import Toast from 'react-native-toast-message';

const Register: React.FC = () => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid mail').required('E-mail is required'),
    username: Yup.string().required('User is required'),
    password: Yup.string()
      .min(8, 'Password needed to be at least 8 caracters')
      .required('Password is required'),
  });

  useEffect(() => {
    if (
      validateEmail(userData.email) &&
      userData.password.length >= 8 &&
      userData.username.length >= 2
    ) {
      schema
        .validate(userData, { abortEarly: false })
        .then(() => {
          setActive(true);
        })
        .catch((e) => {
          Toast.show({
            text1: e.message,
            type: 'error',
          });
          Alert.alert(JSON.stringify(e.message));
          setActive(false);
        });
    } else return;

    return () => {
      setActive(false);
    };
  }, [userData.email, userData.username, userData.password]);

  const onSubmit = useCallback(() => {
    dispatch(
      authRegisterRequest(userData.email, userData.username, userData.password),
    );
  }, [userData.email, userData.password, userData.username]);

  return (
    <S.Container>
      <S.LeftAlignmentContainer>
        <S.Circle>
          <S.Close source={close} />
        </S.Circle>
        <S.Title>Let's Get Started</S.Title>
        <S.SignUp>Fill the form to continue</S.SignUp>
      </S.LeftAlignmentContainer>
      <S.KeyBoardView behavior="position">
        <S.Separator />
        <S.InputContainer>
          <Input
            type="email"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
          />
          <Input
            type="user"
            value={userData.username}
            onChangeText={(text) =>
              setUserData({ ...userData, username: text })
            }
          />
          <Input
            type="password"
            value={userData.password}
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
            style={{
              letterSpacing: userData.password.length !== 0 ? 4 : 0.4,
            }}
          />
        </S.InputContainer>
      </S.KeyBoardView>
      <S.LargeMargin />
      <Button
        onPress={() => onSubmit()}
        disabled={!active}
        active={active}
        label="Sign Up"
      />
    </S.Container>
  );
};

export default Register;
