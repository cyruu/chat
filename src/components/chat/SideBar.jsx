import React from "react";
import { firebaseServices, AllChats } from "../../index";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setLoggedInUser } from "../../redux/slice";
function SideBar() {
  const navigate = useNavigate();
  const dis = useDispatch();
  const handleLogout = async () => {
    await firebaseServices.logout();
    dis(setLoggedInUser({ loggedInUser: null }));
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="userInfo">
        <p className="userTitle">cyrus@gmail.com</p>
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
