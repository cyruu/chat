import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router";
import { Login, Signup, Home, firebaseServices } from "./index";
import { Routes, Route } from "react-router";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = firebaseServices.checkLoginStatus();
    if (loginStatus) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;
