import { call, put } from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
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

    yield put(authSignInSuccess(userCredentials));
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

export async function* authRegisterUserName(
  email: string,
  username: string,
  password: string,
  imageUri: string,
  name: string,
) {
  try {
    console.log(imageUri);
    const user = await auth().signInWithEmailAndPassword(email, password);

    await user.user.updateProfile({
      displayName: name,
    });

    const db = firestore().collection('info').doc(user.user.uid);

    const photo: any = await getPhoto(imageUri);
    const reference = storage().ref('avatar').child(user.user.uid);
    await reference.put(photo);

    const url = await reference.getDownloadURL();

    try {
      const res = await db.set({
        username: username,
        profilePhoto: url,
      });
    } catch (e) {
      Toast.show({
        text1: 'Error while updating photo',
        type: 'error',
      });
    }

    yield put(authRegisterSuccess(user));
  } catch (e) {
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

    yield call(
      authRegisterUserName,
      payload.email,
      payload.username,
      payload.password,
      payload.imageUri,
      payload.name,
    );
    yield put(authRegisterSuccess(userCredentials));
  } catch (e) {
    Toast.show({
      text1: 'Error while registering user',
      type: 'error',
    });
    yield put(authRegisterFailure());
  }
}
