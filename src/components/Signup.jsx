import React, { useEffect, useState } from "react";
import { firebaseServices } from "../index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasword = () => {
    setShowPassword((prev) => !prev);
  };
  const handlesignup = async () => {
    try {
      const user = await firebaseServices.signUp(email, pass);

      if (user) {
        await firebaseServices.addNewUserToUsersTable(user.uid, username);
        // add id and display name to users table
        navigate("/login");
      }
    } catch (err) {
      setError("Somethings Wrong!");

      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };
  return (
    <div className="signup-section displayCenter">
      <div className="signup-container">
        {error ? <div className="error">{error}</div> : ""}
        <h1 className="signup-title">Signup</h1>
        <div className="input-container">
          <label htmlFor="semailfield">Email</label>
          <input
            type="email"
            id="semailfield"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="input-container">
          <label htmlFor="sUsernameField">Username</label>
          <input
            type="text"
            id="sUsernameField"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="input-container">
          <label htmlFor="spassfield">
            Password
            <button className="passwordButton" onClick={handleShowPasword}>
              {showPassword ? (
                <i className="ri-eye-off-fill"></i>
              ) : (
                <i className="ri-eye-fill"></i>
              )}
            </button>
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="spassfield"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="buttons">
          <button onClick={handlesignup}>Sign Up</button>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
