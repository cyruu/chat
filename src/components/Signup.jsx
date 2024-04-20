import React, { useState } from "react";
import { firebaseServices } from "../index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handlesignup = async () => {
    const user = await firebaseServices.signUp(email, pass);
    if (user) {
      navigate("/login");
    }
  };
  return (
    <div className="signup-section displayCenter">
      <div className="signup-container">
        <h1 className="signup-title">Signup</h1>
        <div className="input-container">
          <label htmlFor="semailfield">Email</label>
          <input
            type="email"
            id="semailfield"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="spassfield">Password</label>
          <input
            type="password"
            id="spassfield"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
