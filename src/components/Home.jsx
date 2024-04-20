import React from "react";
import { firebaseServices } from "../firebase/firebaseServices";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await firebaseServices.logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
