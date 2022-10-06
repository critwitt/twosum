import React, { useState } from "react";
import "./SignUp.css";
import logo from "./images/png/logo-black.png";
import { useNavigate } from "react-router-dom";

const Signup = ({show, onClose, setUserData}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [email, setEmail] = useState('')
  
  async function handleSubmit(e) {
    e.preventDefault();

    // check if email is unique
    // check if username is unique
    // check to ensure both passwords matcxh

    const user = { username, password, email};
    await setUserData(user);
    navigate("/create-account");

    
    //update all the username

    // fetch("http://localhost:9292/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // }).then((r) => r.json());


  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) onClose();
  };
  if (!show) {
    return null;
  }
  return (
  
  <div
      className={`modal ${show ? "show" : ""}`}
      onClick={onClose}
    >
      {/* MAKE SURE TO HAVE THIS FORM BE USED TO CREATE A NEW USER IN BACKEND*/}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="modal-header">
          <img src={logo} alt="logo" className="login-logo"></img>
          <h4>GET STARTED</h4>
          <h5>
            By clicking Log In, you agree to our <span>Terms</span>. Learn how
            we process your data in our <span>Privacy Policy</span> and{" "}
            <span>Cookie Policy</span>.
          </h5>
        </div>
        <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          ></input>
          <input 
            type="text" 
            name="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
          <input 
            type="text" 
            name="check-password" 
            placeholder="Check Password"
            onChange={e => setCheckPassword(e.target.value)}
            value={checkPassword}
          ></input>
          <input 
            type="text" 
            name="email" 
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></input>
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    
  );
};

export default Signup;
