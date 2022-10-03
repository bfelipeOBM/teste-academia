import Constants from '@/application/common/Constants';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA2krKgcFDm7vv6GrSdcTZRthWF9vd_JB4",
  authDomain: "plataforma-pro-brom.firebaseapp.com",
  projectId: "plataforma-pro-brom",
  storageBucket: "plataforma-pro-brom.appspot.com",
  messagingSenderId: "895138739730",
  appId: "1:895138739730:web:3b046df64f7f6516e5cacb",
}

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.idToken;
      //createUser(token)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
}

function createUser(token: string | undefined) {
  axios.post(`${Constants.API_URL}auth/provider`, {
    token: token
  }).then((response) => {
    console.log(response);
  })
}
