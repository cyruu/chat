import React from "react";
import { useSelector } from "react-redux";

function ChatBox() {
  const selectedUserId = useSelector((state) => state.selectedChatUserId);
  console.log("user changes");
  if (selectedUserId != null) {
    return (
      <div className="chatbox">
        <div className="chatHeader">asur@gmail.com</div>
        <div className="chatBody"></div>
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
