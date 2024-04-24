import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatUserId } from "../../../redux/slice";

function Chat({ userId }) {
  const dis = useDispatch();
  const [username, setUsername] = useState("");
  const isSearching = useSelector((state) => state.isSearching);

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
    <button
      className={`chatButton  ${isSearching ? "isSearching" : ""}`}
      onClick={() => dis(setSelectedChatUserId({ userId }))}
    >
      <div className="profilePic"></div>
      <div className={`chatContent`}>
        <p className="username">{username}</p>
        {!isSearching ? <p className="chatMessage">this is msg</p> : ""}
      </div>
    </button>
  ) : (
    ""
  );
}

export default Chat;
