import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setSelectedChatUserId } from "../../../redux/slice";

function Chat({ userId }) {
  const dis = useDispatch();
  const [username, setUsername] = useState("");
  const getUserInfo = async () => {
    const userIdQuery = query(
      collection(db, "users"),
      //sent by cyrus@gmail.com
      where("userId", "==", userId)
    );
    const userIdSnapshot = await getDocs(userIdQuery);
    userIdSnapshot.forEach((doc) => {
      const user = doc.data();
      setUsername(user.username);
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return username ? (
    <button onClick={() => dis(setSelectedChatUserId({ userId }))}>
      {username}
    </button>
  ) : (
    ""
  );
}

export default Chat;
