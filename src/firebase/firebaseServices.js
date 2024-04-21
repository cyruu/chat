import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

  logout = async () => {
    await signOut(auth);
  };
}

export const firebaseServices = new FirebaseServices();
