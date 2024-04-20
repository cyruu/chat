import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

class FirebaseServices {
  signUp = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      alert(err.message);
    }
  };
  login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      console.log(err.message);
    }
  };
  checkLoginStatus = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        return user;
      }
    });
    return false;
  };
}

export const firebaseServices = new FirebaseServices();
