import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGXOAMkSvyf4o-LjDpgNoOwKGXfWCl_nA",
  authDomain: "chattest-6582a.firebaseapp.com",
  databaseURL: "https://chattest-6582a-default-rtdb.firebaseio.com",
  projectId: "chattest-6582a",
  storageBucket: "chattest-6582a.appspot.com",
  messagingSenderId: "95229543856",
  appId: "1:95229543856:web:1c2412e1fdc918436c4275",
  measurementId: "G-5PTY41X5PT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
