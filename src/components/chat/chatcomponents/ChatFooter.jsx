import React, { useState, useEffect } from "react";
import { firebaseServices } from "../../../index";
import { useDispatch } from "react-redux";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { setAllMessages } from "../../../redux/slice";
function ChatFooter({ sentBy, sentTo }) {
  const [message, setMessage] = useState("");
  const dis = useDispatch();
  const getMessages = async () => {
    const allMessages = [];
    // sent by cyrus@gmail.com and received by another user
    const sentQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", sentBy),
      where("sentTo", "==", sentTo)
    );
    const sentSnapshot = await getDocs(sentQuery);
    sentSnapshot.forEach((doc) => {
      const user = doc.data();
      allMessages.push(user);
    });
    // sent by others and received by cyrus@gmail.com
    const receivedQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", sentTo),
      where("sentTo", "==", sentBy)
    );
    const receivedSnapshot = await getDocs(receivedQuery);
    receivedSnapshot.forEach((doc) => {
      const user = doc.data();
      allMessages.push(user);
    });

    // arrange message in order
    allMessages.forEach((obj) => {
      obj.sentTime = new Date(obj.sentTime);
    });

    allMessages.sort((a, b) => {
      return a.sentTime - b.sentTime;
    });
    //conver date back to string
    allMessages.forEach((obj) => {
      obj.sentTime = new Date(obj.sentTime).toISOString();
    });

    //send data to slice state
    dis(setAllMessages({ allMessages }));
  };

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
      console.log("ADDED");
      getMessages();
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
