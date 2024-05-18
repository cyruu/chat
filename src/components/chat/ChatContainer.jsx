import React, { useEffect } from "react";
import { SideBar, ChatBox } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { setAllChatsIds } from "../../redux/slice";

function ChatContainer() {
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const allMessages = useSelector((state) => state.allMessages);
  const getData = async () => {
    const sentConvos = [];
    const receivedConvos = [];
    let allConvos = [];
    const allConvosId = [];
    // id of users -> sent by me
    const sent = [];
    // id of users -> received by me
    const received = [];
    // yo chai store ma pathauni, mathi ko allConversationsIds temp array ho test ko lagi
    let convoIds = [];
    const sentQuery = query(
      collection(db, "messages"),
      //sent by cyrus@gmail.com
      where("sentBy", "==", loggedInUser.id)
    );
    const receivedQuery = query(
      collection(db, "messages"),
      //sent to cyrus@gmail.com
      where("sentTo", "==", loggedInUser.id)
    );

    ///////////// sabai chat lai yeuta ma line
    // teslai sort garne ani unique id matra select agne
    const sentSnapshot = await getDocs(sentQuery);
    const receivedSnapshot = await getDocs(receivedQuery);
    // maile pathako
    sentSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      // koslai pathako
      sent.push(eachMessage.sentTo);
      sentConvos.push(eachMessage);
    });
    // maile pako
    receivedSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      // kosle patahko malai  push
      received.push(eachMessage.sentBy);
      receivedConvos.push(eachMessage);
    });
    // all conversations
    allConvos = sentConvos.concat(receivedConvos);
    allConvos.forEach((obj) => {
      obj.sentTime = new Date(obj.sentTime);
    });
    allConvos.sort((a, b) => {
      return b.sentTime - a.sentTime;
    });
    allConvos.map((convo) => {
      if (convo.sentBy == loggedInUser.id) {
        if (!allConvosId.includes(convo.sentTo)) {
          allConvosId.push(convo.sentTo);
        }
      } else {
        if (!allConvosId.includes(convo.sentBy)) {
          allConvosId.push(convo.sentBy);
        }
      }
    });
    // console.log(allConvosId);

    dis(setAllChatsIds({ allConversationsIds: allConvosId }));

    // get username of all users that have sent or received message from this user
  };

  // useEffect(() => {
  //   getData();
  // }, [allMessages]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (snapshot) => {
      // This function will be called whenever the 'messages' collection changes
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          getData();
        }
      });
    });
    return () => {
      unsub();
    };
  }, [allMessages.length]);
  return (
    <div className="chatContainer">
      <SideBar />
      <ChatBox />
    </div>
  );
}

export default ChatContainer;
