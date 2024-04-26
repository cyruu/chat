import { useEffect } from "react";
import "./App.css";
import "./css/chat.css";
import "./css/responsiveChat.css";
import { Login, Signup, Home, firebaseServices, PrivateRoutes } from "./index";

import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
