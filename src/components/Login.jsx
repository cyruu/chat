import React, { useEffect, useState } from "react";
import { firebaseServices } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../redux/slice";
function Login() {
  const navigate = useNavigate();
  const dis = useDispatch();
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = async () => {
    try {
      const loggedInUser = await firebaseServices.login(email, pass);
      if (loggedInUser) {
        const loggedUser = {
          loggedInUser: loggedInUser.user.email,
          id: loggedInUser.user.uid,
        };
        dis(
          setLoggedInUser({
            loggedInUser: loggedUser,
          })
        );
        navigate("/");
      }
    } catch (err) {
      setError("Invalid Credentials");

      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return (
    <div className="login-section displayCenter">
      <div className="login-container">
        {error ? <div className="error">{error}</div> : ""}
        <h1 className="login-title">Login</h1>
        <div className="input-container">
          <label htmlFor="emailfield">Email</label>
          <input
            type="email"
            id="emailfield"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="passfield">Password</label>
          <input
            type="password"
            id="passfield"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={handleLogin}>Login</button>
          <Link to="/signup">Create an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
