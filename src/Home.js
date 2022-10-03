import React, { useState } from "react";
import "./Home.css";
import Login from "./Login";
import dating from "./images/dating-app.jpg";
const Home = ({ onSignupSubmit }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-left">
          <li>TwoSum</li>
        </div>
        <div className="navbar-right">
          <button
            onClick={(e) => {
              setShow(true);
            }}
          >
            Log in
          </button>
        </div>
      </div>

      <div className="hero">
        <img src={dating} className="hero-img"></img>
        <h1 className="hero-text">Swipe Right</h1>
        <div className="signup-btn-container">
          <button
            className="signup-btn"
            onClick={(e) => {
              setShow(true);
            }}
          >
            Create Account
          </button>
        </div>

        <h2 className="hero-description">Find Your True Love Today</h2>
      </div>
      <Login
        show={show}
        onSignupSubmit={onSignupSubmit}
        onClose={() => setShow(false)}
      />
    </div>
  );
};

export default Home;
