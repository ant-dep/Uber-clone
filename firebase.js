import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACAXe3VplGQzPdW6Y7IQcYa5j9N5G75r8",
  authDomain: "uber-clone-18c94.firebaseapp.com",
  projectId: "uber-clone-18c94",
  storageBucket: "uber-clone-18c94.appspot.com",
  messagingSenderId: "345024346781",
  appId: "1:345024346781:web:91eea282e4cf57b23e7274",
  measurementId: "G-4HG1B0RLXK",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
