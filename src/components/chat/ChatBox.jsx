import React, { useEffect, useState } from "react";
import { ChatBody } from "../../index";
import { useSelector } from "react-redux";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
function ChatBox() {
  const [username, setUsername] = useState("");
  const selectedUserId = useSelector((state) => state.selectedChatUserId);

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
  };
  useEffect(() => {
    getUserInfo();
  }, [selectedUserId]);
  if (selectedUserId != null) {
    return (
      <div className="chatbox">
        <div className="chatHeader">{username}</div>
        <ChatBody selectedUserId={selectedUserId} />
        <div className="chatFooter">
          <input type="text" id="messageInput" placeholder="Enter message" />
          <button id="sendButton">
            <i className="ri-send-plane-fill"></i>
          </button>
        </div>
      </div>
    );
  } else {
    return <div className="chatbox">choose conversation</div>;
  }
}

export default ChatBox;
