import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setLoggedInUser } from "../redux/slice";
import { useNavigate } from "react-router";
function PrivateRoutes() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();
  const dis = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        const user = {
          loggedInUser: loggedInUser.email,
          id: loggedInUser.uid,
        };
        dis(
          setLoggedInUser({
            loggedInUser: user,
          })
        );
        navigate("/");
      } else {
        console.log("not logged");
      }
    });
  }, []);

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
