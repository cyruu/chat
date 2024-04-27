import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  getDocs,
  query,
  collection,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatUserId } from "../../../redux/slice";

function Chat({ userId }) {
  const dis = useDispatch();
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const isSearching = useSelector((state) => state.isSearching);
  const allMessages = useSelector((state) => state.allMessages);
  const { loggedInUser } = useSelector((state) => state.loggedInUser);
  const [latestMessage, setLatestMessage] = useState("");
  const [yourMessage, setYourMessage] = useState(false);
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
  async function getLatestMessage() {
    const latestMessage = [];
    const sentQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", loggedInUser.id),
      where("sentTo", "==", userId),
      orderBy("sentTime", "desc"),
      limit(1)
    );
    const receivedQuery = query(
      collection(db, "messages"),
      //sent to cyrus@gmail.com
      where("sentBy", "==", userId),
      where("sentTo", "==", loggedInUser.id),
      orderBy("sentTime", "desc"),
      limit(1)
    );
    const sentSnapshot = await getDocs(sentQuery);
    const receivedSnapshot = await getDocs(receivedQuery);
    // maile pathako
    sentSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      latestMessage.push(eachMessage);
    });
    // maile pako
    receivedSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      latestMessage.push(eachMessage);
    });
    latestMessage.forEach((obj) => {
      obj.sentTime = new Date(obj.sentTime);
    });
    latestMessage.sort((a, b) => {
      return b.sentTime - a.sentTime;
    });
    if (latestMessage) {
      setLatestMessage(latestMessage[0].sentMessage);
      if (latestMessage[0].sentBy == loggedInUser.id) {
        setYourMessage(true);
      } else {
        setYourMessage(false);
      }
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    getLatestMessage();
  }, [allMessages]);
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
        <p className="username">
          <b>{username}</b>
        </p>
        {!isSearching ? (
          <p className="chatMessage">
            {yourMessage ? "you: " : ""}
            {latestMessage}
          </p>
        ) : (
          ""
        )}
      </div>
    </button>
  ) : (
    ""
  );
}

export default Chat;
