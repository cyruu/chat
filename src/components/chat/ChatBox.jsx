import React from "react";

function ChatBox() {
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
}

export default ChatBox;
