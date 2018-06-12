import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD8cYD2LK0o1CkzIE8KV2mBurUS7Myt0d4",
    authDomain: "first-react-database-project.firebaseapp.com",
    databaseURL: "https://first-react-database-project.firebaseio.com",
    projectId: "first-react-database-project",
    storageBucket: "first-react-database-project.appspot.com",
    messagingSenderId: "207233757868"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('/posts');

