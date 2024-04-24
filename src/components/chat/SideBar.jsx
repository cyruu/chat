import React, { useState, useEffect } from "react";
import { firebaseServices, AllChats } from "../../index";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import {
  setLoggedInUser,
  setFilteredUsers,
  setIsSearching,
} from "../../redux/slice";

function SideBar() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const handleLogout = async () => {
    await firebaseServices.logout();
    dis(setLoggedInUser({ loggedInUser: null }));
    navigate("/login");
  };
  const handleSearchUser = async ({ target }) => {
    const filteredusers = [];
    // typed something
    if (target.value != "") {
      const searchUserQuery = query(
        collection(db, "users"),
        where("username", ">=", target.value),
        where("username", "<=", target.value + "\uf8ff")
      );

      const searchSnapshot = await getDocs(searchUserQuery);
      searchSnapshot.forEach((doc) => {
        const user = doc.data();
        filteredusers.push(user);
      });
      if (filteredusers.length > 0) {
        dis(setFilteredUsers({ filteredusers }));
      } else {
        dis(setFilteredUsers({ filteredusers: [] }));
      }
      dis(setIsSearching({ isSearching: true }));
    }
    // default=> not searched
    else {
      dis(setIsSearching({ isSearching: false }));
    }
  };
  const getUserInfo = async () => {
    const userIdQuery = query(
      collection(db, "users"),
      //sent by cyrus@gmail.com
      where("userId", "==", loggedInUser.id)
    );
    const userIdSnapshot = await getDocs(userIdQuery);
    userIdSnapshot.forEach((doc) => {
      const user = doc.data();
      setUsername(user.username);
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="sidebar">
      <div className="userInfo">
        <p className="userTitle">{username}</p>
        <button className="logoutButton" onClick={handleLogout}>
          <i className="ri-logout-circle-line"></i>
        </button>
      </div>
      {/* searchbar */}
      <input
        type="text"
        placeholder="Search"
        className="searchInput"
        onChange={handleSearchUser}
        autoComplete="off"
      />
      {/* all chat */}
      <AllChats />
    </div>
  );
}

export default SideBar;
