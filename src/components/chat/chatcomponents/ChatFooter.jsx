import React, { useState, useEffect } from "react";
import { firebaseServices } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { setAllMessages } from "../../../redux/slice";
function ChatFooter({ sentBy, sentTo, selectedUserId }) {
  // need real time update using useSnapshot
  const [message, setMessage] = useState("");
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);
  const allMessages = useSelector((state) => state.allMessages);

  const getMessages = async () => {
    // console.log("selected after send",se);
    const allMessages = [];
    // sent by cyrus@gmail.com and received by another user
    const sentQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", loggedInUser.id),
      where("sentTo", "==", selectedUserId)
    );
    const sentSnapshot = await getDocs(sentQuery);
    sentSnapshot.forEach((doc) => {
      const user = doc.data();

      allMessages.push(user);
    });
    // sent by others and received by cyrus@gmail.com
    // same person lai message garda yeuta matra query fecth garne (double same message aairathyo)
    // if (!loggedInUser.id == selectedUserId) {
    const receivedQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", selectedUserId),
      where("sentTo", "==", loggedInUser.id)
    );
    const receivedSnapshot = await getDocs(receivedQuery);
    receivedSnapshot.forEach((doc) => {
      const user = doc.data();

      allMessages.push(user);
    });
    // }

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
    // console.log(allMessages);
    //send data to slice state
    dis(setAllMessages({ allMessages }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message != "") {
      const date = new Date();
      const msg = {
        sentBy: sentBy,
        sentTo: sentTo,
        sentTime: date.toISOString(),
        sentMessage: message,
      };
      await firebaseServices.sendMessage(msg);
      getMessages();
      setMessage("");
      console.log("ADDED");
    } else {
      console.log("empty");
    }
  };
  // useEffect(() => {
  //   // if (!selectedUserId) console.log("not user selects");
  //   const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type == "added") {
  //         getMessages();
  //       }
  //     });
  //   });
  //   return () => {
  //     unsubscribe(); // Detach the listener when the component unmounts
  //   };
  // }, []);
  return (
    <form className="chatFooter" onSubmit={handleSendMessage}>
      <input
        type="text"
        id="messageInput"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" id="sendButton">
        <i className="ri-send-plane-fill"></i>
      </button>
    </form>
  );
}

export default ChatFooter;
