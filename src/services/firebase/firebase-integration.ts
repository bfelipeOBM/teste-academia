import Constants from '@/application/common/Constants';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router';

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

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      auth.currentUser?.getIdToken(true).then(function(idToken) {
        createUser(idToken)
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
}

export const signInWithFacebook = async () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      auth.currentUser?.getIdToken(true).then(function(idToken) {
        createUser(idToken)
      })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
}


function createUser(token: string | undefined) {
  console.log(token);
  axios.post(`${Constants.API_URL}auth/provider`, {
    token
  }).then((response) => {
    localStorage.clear();
    localStorage.setItem("accessToken", JSON.stringify(response.data));
    window.location.href = '/';
  })
}