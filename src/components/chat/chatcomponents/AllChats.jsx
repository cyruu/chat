import React, { useEffect } from "react";
import { Chat } from "../../..";
import { useSelector } from "react-redux";

function AllChats() {
  const allChatsIds = useSelector((state) => state.allChatsIds);
  const isSearching = useSelector((state) => state.isSearching);
  const filteredUsers = useSelector((state) => state.filteredUsers);

  return (
    <div className="allChats">
      {isSearching ? (
        filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            return <Chat key={user.userId} userId={user.userId} />;
          })
        ) : (
          <p className="notFound">User not found</p>
        )
      ) : // not searching
      allChatsIds.length > 0 ? (
        allChatsIds.map((userId) => {
          return <Chat key={userId} userId={userId} />;
        })
      ) : (
        <p className="notFound">No chats yet</p>
      )}
    </div>
  );
}

export default AllChats;
