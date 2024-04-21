import React, { useEffect } from "react";
import { firebaseServices } from "../firebase/firebaseServices";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../redux/slice";
function Home() {
  const navigate = useNavigate();
  const dis = useDispatch();
  const handleLogout = async () => {
    await firebaseServices.logout();
    dis(setLoggedInUser({ loggedInUser: null }));
    navigate("/login");
  };
  useEffect(() => {
    console.log("home");
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
