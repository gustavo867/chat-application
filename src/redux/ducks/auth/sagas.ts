import { call, put } from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  authLogoutSuccess,
  authRegisterFailure,
  authRegisterSuccess,
  authSignInFailure,
  authSignInSuccess,
} from './actions';
import { getPhoto } from 'src/utils/getPhoto';

type Payload = {
  payload: {
    email: string;
    username: string;
    password: string;
    imageUri: string;
    name: string;
  };
};

type SignInPayload = {
  payload: {
    email: string;
    password: string;
  };
};

export async function getData(user: FirebaseAuthTypes.UserCredential) {
  try {
    const info = await firestore().collection('INFO').doc(user.user.uid).get();

    const newData = {
      user: user,
      info: info.data(),
    };

    return newData;
  } catch (e) {
    Toast.show({
      text1: 'Error while login user',
      type: 'error',
    });
  }
}

export function* authSignIn({ payload }: SignInPayload) {
  try {
    const userAuth = auth();

    const userCredentials = yield call(
      [userAuth, userAuth.signInWithEmailAndPassword],
      payload.email,
      payload.password,
    );

    Toast.show({
      text1: 'Signed with success',
      text2: 'Redirecting',
      type: 'success',
    });

    const { user, info } = yield call(getData, userCredentials);

    yield put(authSignInSuccess(user, info));
  } catch (e) {
    Toast.show({
      text1: 'Error while signing user',
      type: 'error',
    });
    yield put(authSignInFailure());
  }
}

export function* logOut() {
  try {
    const userAuth = auth();
    const res = yield call([userAuth, userAuth.signOut]);

    Toast.show({
      text1: 'Signed out success',
      text2: 'Redirecting',
      type: 'success',
    });

    yield put(authLogoutSuccess());
  } catch (e) {
    Toast.show({
      text1: 'Error while logOut user',
      type: 'error',
    });
  }
}

export async function authRegisterUserName(data: {
  email: string;
  username: string;
  password: string;
  imageUri: string;
  name: string;
}) {
  const { email, username, password, imageUri, name } = data;
  try {
    const userAuth = auth();
    const user = await userAuth.signInWithEmailAndPassword(email, password);

    await user.user.updateProfile({
      displayName: name,
    });

    const db = firestore().collection('INFO').doc(user.user.uid);

    const photo: any = await getPhoto(imageUri);
    console.log(photo);
    const reference = storage().ref('AVATARS').child(user.user.uid);
    await reference.put(photo);

    const url = await reference.getDownloadURL();

    console.log(url);

    const res = await db.set({
      username: username,
      profilePhoto: url,
    });

    const info = await firestore().collection('INFO').doc(user.user.uid).get();

    const newData = {
      user: user,
      info: info.data(),
    };

    return newData;
  } catch (e) {
    console.log(e.message);
    Toast.show({
      text1: 'Error while signing user',
      type: 'error',
    });
  }
}

export function* authRegisterLoad({ payload }: Payload) {
  try {
    const userAuth = auth();
    const userCredentials = yield call(
      [userAuth, userAuth.createUserWithEmailAndPassword],
      payload.email,
      payload.password,
    );

    Toast.show({
      text1: 'Registered with success',
      text2: 'Redirecting',
      type: 'success',
    });

    const { info, user } = yield call(authRegisterUserName, payload);

    yield put(authRegisterSuccess(user, info));
  } catch (e) {
    Toast.show({
      text1: 'Error while registering user',
      type: 'error',
    });
    yield put(authRegisterFailure());
  }
}
