import React, { useEffect, useState } from "react";
import { ChatBody, ChatFooter } from "../../index";
import { useSelector } from "react-redux";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
function ChatBox() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // another user
  const selectedUserId = useSelector((state) => state.selectedChatUserId);
  // this user
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const getUserInfo = async () => {
    const userIdQuery = query(
      collection(db, "users"),
      //sent by cyrus@gmail.com
      where("userId", "==", selectedUserId)
    );
    const userIdSnapshot = await getDocs(userIdQuery);
    userIdSnapshot.forEach((doc) => {
      const user = doc.data();
      setUsername(user.username);
    });
    const profileQuery = query(
      collection(db, "profilepictures"),
      where("userId", "==", selectedUserId)
    );

    const profileSnapshot = await getDocs(profileQuery);
    profileSnapshot.forEach((doc) => {
      const user = doc.data();
      setProfilePic(user.imageUrl);
    });
  };
  useEffect(() => {
    getUserInfo();
  }, [selectedUserId]);
  if (selectedUserId != null) {
    return (
      <div className="chatbox">
        <div className="chatHeader">
          <div className={`chatButton isSearching`}>
            <div className="profilePic">
              <img src={profilePic} />
            </div>
            <div className={`chatContent`}>
              <p className="insideChatUsername">{username}</p>
            </div>
          </div>
          <button
            className="backbutton"
            onClick={() => {
              const sideBar = document.querySelector(".sidebar");
              sideBar.style.transform = "translateX(0%)";
            }}
          >
            <i className="ri-arrow-left-line"></i>
          </button>
        </div>
        <ChatBody selectedUserId={selectedUserId} />
        {loggedInUser ? (
          <ChatFooter sentBy={loggedInUser.id} sentTo={selectedUserId} />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div className="chatbox chooseConversation">
        Choose
        <br /> a<br /> Conversation
      </div>
    );
  }
}

export default ChatBox;
