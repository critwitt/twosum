import React, { useState } from "react";
import "./Home.css";
import Signup from "./SignUp";
import dating from "./images/dating-app.jpg";
import LoginModal from "./LoginModal";

const Home = ({ setUserData }) => {
  const [showSignUp, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);



  return (
    <div className="main">
      <div className="navbar">
        <div className="navbar-left">
          <li>TwoSum</li>
        </div>
        <div className="navbar-right">
          <button
            onClick={(e) => {
              setShowLogin(true);
            }}
          >
            Log in
          </button>
        </div>
      </div>

      <div className="hero">
        <img src={dating} alt='hero pic' className="hero-img"></img>
        <h1 className="hero-text">Swipe Right</h1>
        <div className="signup-btn-container">
          <button
            className="signup-btn"
            onClick={(e) => {
              setShowSignup(true);
            }}
          >
            Create Account
          </button>
        </div>

        <h2 className="hero-description">Find Your True Love Today</h2>
      </div>
      <Signup 
        show={showSignUp}  
        onClose={() => setShowSignup(false)} 
        setUserData={setUserData}
      />

      <LoginModal 
        userLogin={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </div>
  );
};

export default Home;