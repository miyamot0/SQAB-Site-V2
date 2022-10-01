/**
 * Firebase configuration
 */

import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4JqTFk6nlVWrZjHVcAvSlZpzMNkpZ_4E',
  authDomain: 'sqab-website-v2.firebaseapp.com',
  projectId: 'sqab-website-v2',
  storageBucket: 'sqab-website-v2.appspot.com',
  messagingSenderId: '300527520702',
  appId: '1:300527520702:web:9de0ee9f1a8c748aa787ef',
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectFunctions = firebase.functions();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const fbAuthProvider = new firebase.auth.FacebookAuthProvider();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export {
  projectFirestore,
  projectAuth,
  projectFunctions,
  googleAuthProvider,
  fbAuthProvider,
  timestamp,
};
