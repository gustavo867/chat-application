import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import close from 'assets/close.png';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/Auth/Input';
import Button from 'components/Auth/Button';
import Toast from 'react-native-toast-message';
import { authSignInRequest } from 'store/ducks/auth/actions';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const SignIn: React.FC = () => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid mail').required('E-mail is required'),
    password: Yup.string()
      .min(8, 'Password needed to be at least 8 caracters')
      .required('Password is required'),
  });

  useEffect(() => {
    if (validateEmail(userData.email) && userData.password.length >= 8) {
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
          setActive(false);
        });
    } else return;

    return () => {
      setActive(false);
    };
  }, [userData.email, userData.password]);

  const onSubmit = useCallback(() => {
    dispatch(authSignInRequest(userData.email, userData.password));
  }, [userData.email, userData.password]);

  return (
    <S.Container>
      <S.LeftAlignmentContainer>
        <S.Circle onPress={() => goBack()}>
          <S.Close source={close} />
        </S.Circle>
        <S.Title>Welcome</S.Title>
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
        label="Sign In"
      />
    </S.Container>
  );
};

export default SignIn;
