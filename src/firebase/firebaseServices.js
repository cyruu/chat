import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
  addProfilePicture = async (userId, file) => {
    try {
      const storageRef = ref(storage, "profilePics/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading file:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Store the download URL along with the user ID in Firebase database
          await addDoc(collection(db, "profilepictures"), {
            userId: userId,
            imageUrl: downloadURL,
          });

          console.log("File uploaded and URL stored:", downloadURL);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  addDefaultProfilePicture = async (userId) => {
    try {
      const defaultImage =
        "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
      await addDoc(collection(db, "profilepictures"), {
        userId: userId,
        imageUrl: defaultImage,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const firebaseServices = new FirebaseServices();
