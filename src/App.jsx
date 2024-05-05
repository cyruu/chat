import { useEffect } from "react";
import "./App.css";
import "./css/chat.css";
import "./css/responsiveChat.css";
import { Login, Signup, Home, firebaseServices, PrivateRoutes } from "./index";

import { Routes, Route } from "react-router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

function App() {
  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          console.log("newMessage");
        }
      });
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
