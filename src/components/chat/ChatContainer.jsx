import React, { useEffect, useState } from "react";
import { SideBar, ChatBox } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { setAllChatsIds } from "../../redux/slice";
function ChatContainer() {
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const [allConversationsIds, setallSentChats] = useState([]);
  const getData = async () => {
    // id of users -> sent by me
    const sent = [];
    // id of users -> received by me
    const received = [];

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

    const sentSnapshot = await getDocs(sentQuery);
    const receivedSnapshot = await getDocs(receivedQuery);
    // maile pathako
    sentSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      // koslai pathako
      sent.push(eachMessage.sentTo);
    });
    // maile pako
    receivedSnapshot.forEach((doc) => {
      const eachMessage = doc.data();
      // kosle patahko malai  push
      received.push(eachMessage.sentBy);
    });
    // get all unique id in single array of all people who sent or received msg from cyrus@gmail.com
    //koslai pahtako tesko id
    sent.map((sentById) => {
      if (!allConversationsIds.includes(sentById)) {
        allConversationsIds.push(sentById);
      }
    });
    // kosle pathako malai tesko id
    received.map((sentToId) => {
      if (!allConversationsIds.includes(sentToId)) {
        allConversationsIds.push(sentToId);
      }
    });
    dis(setAllChatsIds({ allConversationsIds }));
    // get username of all users that have sent or received message from this user
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="chatContainer">
      <SideBar />
      <ChatBox />
    </div>
  );
}

export default ChatContainer;
