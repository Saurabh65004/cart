import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW-vTR222p4rDtGw31IrJLvgaxoJXKVuM",
  authDomain: "cart-6d537.firebaseapp.com",
  projectId: "cart-6d537",
  storageBucket: "cart-6d537.appspot.com",
  messagingSenderId: "628944722832",
  appId: "1:628944722832:web:ba7282f061e68567577115"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

