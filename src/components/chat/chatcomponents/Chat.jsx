import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatUserId } from "../../../redux/slice";

function Chat({ userId }) {
  const dis = useDispatch();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
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

    const profileQuery = query(
      collection(db, "profilepictures"),
      where("userId", "==", userId)
    );

    const profileSnapshot = await getDocs(profileQuery);
    profileSnapshot.forEach((doc) => {
      const user = doc.data();
      setProfilePic(user.imageUrl);
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
        <img src={profilePic} />
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
