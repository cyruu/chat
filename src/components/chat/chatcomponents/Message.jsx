import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Message({ message, sentBy }) {
  const { loggedInUser } = useSelector((state) => state.loggedInUser);
  // const [myMessage, setMyMessage] = useState();
  // useEffect(() => {
  //   console.log("again");
  //   if (sentBy == loggedInUser.id) {
  //     setMyMessage(true);
  //   } else {
  //     setMyMessage(false);
  //   }
  // }, []);
  return (
    <div
      className={`message ${
        loggedInUser.id == sentBy ? "myMessage" : "othersMessage"
      }`}
    >
      {message}
    </div>
  );
}

export default Message;
