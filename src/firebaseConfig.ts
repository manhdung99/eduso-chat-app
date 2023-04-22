import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getDatabase, onValue, ref, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWO8MLSHvgyBq7BlAc2lI8J736_FPycvA",
  authDomain: "chat-app-4446a.firebaseapp.com",
  databaseURL:
    "https://chat-app-4446a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-4446a",
  storageBucket: "chat-app-4446a.appspot.com",
  messagingSenderId: "25108522016",
  appId: "1:25108522016:web:9c1acc3551f556f27c8845",
  measurementId: "G-4SEY2DPNQ2",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const database = getDatabase();
const storage = getStorage();
export {
  db,
  ref,
  push,
  database,
  onValue,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
};
