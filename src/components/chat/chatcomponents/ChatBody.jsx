import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
function ChatBody({ selectedUserId }) {
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);
  return <div className="chatBody">ChatBody</div>;
}

export default ChatBody;
