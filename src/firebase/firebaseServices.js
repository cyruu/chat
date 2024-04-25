import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

class FirebaseServices {
  signUp = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  };
  login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  logout = async () => {
    await signOut(auth);
  };

  sendMessage = async (sentMessage) => {
    try {
      await addDoc(collection(db, "messages"), sentMessage);
      console.log("Document added");
    } catch (e) {
      alert(e.message);
    }
  };
  addNewUserToUsersTable = async (userId, username) => {
    try {
      await addDoc(collection(db, "users"), {
        userId: userId,
        username: username,
      });
      console.log("new user" + userId, username);
    } catch (err) {
      alert(err.message);
    }
  };
}

export const firebaseServices = new FirebaseServices();
