import React, { useState } from "react";
import { firebaseServices } from "../../../index";
function ChatFooter({ sentBy, sentTo, getData }) {
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message != "") {
      const date = new Date();
      const msg = {
        sentBy: sentBy,
        sentTo: sentTo,
        sentTime: date.toISOString(),
        sentMessage: message,
      };
      firebaseServices.sendMessage(msg);
      setMessage("");
      getData();
    } else {
      console.log("empty");
    }
  };
  return (
    <form className="chatFooter" onSubmit={handleSendMessage}>
      <input
        type="text"
        id="messageInput"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" id="sendButton">
        <i className="ri-send-plane-fill"></i>
      </button>
    </form>
  );
}

export default ChatFooter;
