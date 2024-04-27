import React, { useEffect, useState } from "react";
import { firebaseServices } from "../index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { storage, db } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
  );
  const handleShowPasword = () => {
    setShowPassword((prev) => !prev);
  };
  const handlesignup = async () => {
    try {
      const user = await firebaseServices.signUp(email, pass);
      //sigin in successfull
      if (user) {
        // add id and display name to users table
        await firebaseServices.addNewUserToUsersTable(user.uid, username);
        if (file) {
          await firebaseServices.addProfilePicture(user.uid, file);
        } else {
          await firebaseServices.addDefaultProfilePicture(user.uid);
        }
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
        <div className="imagefield">
          <label htmlFor="sfilefield">
            <div className="imagefile">
              <img src={profileImage} alt="" />
              <i className="ri-camera-fill camIcon"></i>
            </div>
          </label>
          <input
            type="file"
            id="sfilefield"
            onChange={(e) => {
              setFile(e.target.files[0]);
              const imageUrl = URL.createObjectURL(e.target.files[0]);
              setProfileImage(imageUrl);
            }}
          />
        </div>
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

          <Link to="/login" style={{ color: "var(--lightColor)" }}>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
