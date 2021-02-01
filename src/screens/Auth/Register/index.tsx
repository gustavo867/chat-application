import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Callback, launchImageLibrary } from 'react-native-image-picker/src';
import Input from 'components/Auth/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import * as S from './styles';

import close from 'assets/close.png';
import Button from 'components/Auth/Button';
import { useDispatch } from 'react-redux';
import { authRegisterRequest } from 'store/ducks/auth/actions';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_OPTIONS } from 'src/config/cameraOptions';
import { ThemeContext } from 'styled-components';
import firestore from '@react-native-firebase/firestore';

const Register: React.FC = () => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    username: '',
    imageUri: '',
  });

  const { colors } = useContext(ThemeContext);

  const { goBack } = useNavigation();

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
    name: Yup.string().required('Name is required'),
  });

  useEffect(() => {
    if (
      validateEmail(userData.email) &&
      userData.password.length >= 8 &&
      userData.username.length >= 2 &&
      userData.name.length >= 2
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
          setActive(false);
        });
    } else return;

    return () => {
      setActive(false);
    };
  }, [userData.email, userData.username, userData.password]);

  const imgCallBack = useCallback<Callback>((res) => {
    if (res.didCancel) return;
    if (res.errorCode) return;
    if (res.errorMessage) return;
    if (!res.uri) return;

    setUserData({
      ...userData,
      imageUri: res.uri,
    });

    return;
  }, []);

  const onImgClick = useCallback(() => {
    launchImageLibrary(DEFAULT_OPTIONS, imgCallBack);
  }, [userData.imageUri]);

  const onSubmit = useCallback(() => {
    dispatch(
      authRegisterRequest(
        userData.email,
        userData.username,
        userData.password,
        userData.imageUri,
      ),
    );
  }, [userData.email, userData.password, userData.username, userData.imageUri]);

  return (
    <S.Container>
      <S.Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <S.LeftAlignmentContainer>
          <S.Circle onPress={() => goBack()}>
            <S.Close source={close} />
          </S.Circle>
          <S.Title>Let's Get Started</S.Title>
          <S.SignUp>Fill the form to continue</S.SignUp>
        </S.LeftAlignmentContainer>
        <S.Separator />
        <S.KeyBoardView behavior="position">
          <S.ImageSelectContainer>
            <S.ActionBtn onPress={onImgClick}>
              <Icon name="add" size={24} color={colors.primary} />
            </S.ActionBtn>
            <S.Avatar
              source={{
                uri: userData.imageUri
                  ? userData.imageUri
                  : 'https://i.stack.imgur.com/l60Hf.png',
              }}
            />
          </S.ImageSelectContainer>
          <S.InputContainer>
            <Input
              type="user"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <Input
              type="username"
              value={userData.username}
              onChangeText={(text) =>
                setUserData({ ...userData, username: text })
              }
            />
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
        <Button
          onPress={() => onSubmit()}
          disabled={!active}
          active={active}
          label="Sign Up"
        />
        <S.LargeMargin />
      </S.Scroll>
    </S.Container>
  );
};

export default Register;
