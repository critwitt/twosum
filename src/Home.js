import React from "react";
import "./Home.css";
import dating from "./images/dating-app.jpg";
const Home = () => {
  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-left">
          <li>TwoSum</li>
        </div>
        <div className="navbar-right">
          <button>Log in</button>
        </div>
      </div>

      <div className="hero">
        <img src={dating} className="hero-img"></img>
        <h1 className="hero-text">Swipe Right</h1>
        <div className="signup-btn-container">
          <button className="signup-btn">Create Account</button>
        </div>

        <h2 className="hero-description">Find Your True Love Today</h2>
      </div>
    </div>
  );
};

export default Home;
