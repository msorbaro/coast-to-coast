
  // Your web app's Firebase configuration
  //may need to switch to const
  import firebase from 'firebase';
  
  const config = {
    apiKey: "AIzaSyDC67XKc5L_EWNe6eTlo3FRSsMjAm9VZl0",
    authDomain: "dartpoll-firebase.firebaseapp.com",
    databaseURL: "https://dartpoll-firebase.firebaseio.com",
    projectId: "dartpoll-firebase",
    storageBucket: "dartpoll-firebase.appspot.com",
    messagingSenderId: "153871283278",
    appId: "1:153871283278:web:dbce95bb15c5b5f4817f1f",
    measurementId: "G-YE7VEVJSFY"
  };
  // Initialize Firebase

  const fire = firebase.initializeApp(config);
  firebase.analytics();


  export default fire;


