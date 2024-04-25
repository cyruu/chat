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
      onClick={() => {
        dis(setSelectedChatUserId({ userId }));
        if (window.screen.width < 431) {
          const sideBar = document.querySelector(".sidebar");
          sideBar.style.transform = "translateX(-100%)";
        }
      }}
    >
      <div className="profilePic">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chattest-6582a.appspot.com/o/nar.png?alt=media&token=8429799a-43c0-43b5-b3d7-1d7e9ea8350c"
          height="100%"
        />
      </div>
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
