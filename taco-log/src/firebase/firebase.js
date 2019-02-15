import * as firebase from 'firebase';

//connects and enables us to use any firebase service

const config = {
    apiKey: "AIzaSyDhGZ712L1Xx_c4iW94hDnNusJ6Zk6zg0w",
    authDomain: "taco-logs.firebaseapp.com",
    databaseURL: "https://taco-logs.firebaseio.com",
    projectId: "taco-logs",
    storageBucket: "taco-logs.appspot.com",
    messagingSenderId: "382029457859"
  };
  firebase.initializeApp(config);

    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
  
    export { firebase, provider, auth as default };