import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { setAllMessages } from "../../../redux/slice";
import { Message } from "../../../index";
function ChatBody({ selectedUserId }) {
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);
  const allMessages = useSelector((state) => state.allMessages);
  const getMessages = async () => {
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
    console.log(allMessages);
    dis(setAllMessages({ allMessages }));
  };
  useEffect(() => {
    getMessages();
  }, [selectedUserId]);
  useEffect(() => {
    if (allMessages.length < 15) {
      const scrollableDiv = document.querySelector(".scrollable");
      scrollableDiv.style.justifyContent = "flex-end";
    } else {
      const scrollableDiv = document.querySelector(".scrollable");
      scrollableDiv.style.justifyContent = "";
    }
    const scrollableDiv = document.querySelector(".scrollable");
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }, [allMessages]);

  return (
    <div className="chatBody scrollable">
      {allMessages.length > 0 ? (
        allMessages.map((msg, i) => {
          return (
            <Message key={i} message={msg.sentMessage} sentBy={msg.sentBy} />
          );
        })
      ) : (
        <p className="startConversation">Start conversation</p>
      )}
    </div>
  );
}

export default ChatBody;
