import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwXE2nO6kA5P_TCcryw8guoHOSaw319H4",
  authDomain: "mi-primer-vue-data.firebaseapp.com",
  projectId: "mi-primer-vue-data",
  storageBucket: "mi-primer-vue-data.appspot.com",
  messagingSenderId: "441546158398",
  appId: "1:441546158398:web:bb233dbbbf4b7e47fe7c6f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
