import React from "react";
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
          <div className="red">no users found</div>
        )
      ) : (
        allChatsIds.map((userId) => {
          return <Chat key={userId} userId={userId} />;
        })
      )}
    </div>
  );
}

export default AllChats;
