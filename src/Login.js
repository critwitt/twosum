import React from "react";
import "./Login.css";
import logo from "./images/png/logo-black.png";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  if (!props.show) {
    return null;
  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) props.onClose();
  };
  return (
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={props.onClose}>
            X
          </button>
        </div>

        <div className="modal-header">
          <img src={logo} className="login-logo"></img>
          <h4>GET STARTED</h4>
          <h5>
            By clicking Log In, you agree to our <span>Terms</span>. Learn how
            we process your data in our <span>Privacy Policy</span> and{" "}
            <span>Cookie Policy</span>.
          </h5>
        </div>
        <form className="modal-form">
          <input type="text" placeholder="Username"></input>
          <input type="text" placeholder="Password"></input>
          <input type="text" placeholder="Check Password"></input>
          <input type="text" placeholder="Email"></input>
        </form>
        <button onClick={() => navigate("/create-account")}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
