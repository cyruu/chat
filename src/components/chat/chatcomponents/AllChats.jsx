import React from "react";
import { Chat } from "../../..";
import { useSelector } from "react-redux";
function AllChats() {
  const allChatsIds = useSelector((state) => state.allChatsIds);

  return (
    <div className="allChats">
      {allChatsIds.map((userId) => {
        return <Chat key={userId} userId={userId} />;
      })}
    </div>
  );
}

export default AllChats;
