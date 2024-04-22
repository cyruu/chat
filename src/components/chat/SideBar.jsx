import React, { useState, useEffect } from "react";
import { firebaseServices, AllChats } from "../../index";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, query, collection, where } from "firebase/firestore";
import { setLoggedInUser } from "../../redux/slice";

function SideBar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dis = useDispatch();
  const { loggedInUser } = useSelector((state) => state.loggedInUser);

  const handleLogout = async () => {
    await firebaseServices.logout();
    dis(setLoggedInUser({ loggedInUser: null }));
    navigate("/login");
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
      <input type="text" placeholder="Search" className="searchInput" />
      {/* all chat */}
      <AllChats />
    </div>
  );
}

export default SideBar;
