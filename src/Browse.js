import React from "react";
import "./Browse.css";
import logo from "./images/png/logo-no-background.png";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();
  return (
    <div className="browse">
      <div className="browse-matches">
        <div className="profile" onClick={() => navigate("/profile")}>
          <img src={logo} className="profile-img"></img>
          {/* FILL THIS UP DYNAMICALLY */}
          <h1>John Smith</h1>
        </div>
        <div className="conversations-dropdown">
          {/* FILL THIS DROPDOWN ARROW DYNAMICALLY */}
          <span className="dropdown-arrow">^</span> Conversations{" "}
          <span className="recent">(Recent)</span>
        </div>
        <div className="conversations">
          <div className="conversation">
            <img src={logo}></img>
            <div className="conversation-description">
              {/* FILL THIS UP DYNAMICALLY */}
              <h1>Susan Johnson</h1>
              {/* FILL THIS UP DYNAMICALLY */}
              <h2>hey, what are you up to?</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="browse-right">
        {/* MAKE THIS DROP DOWN TO A POPUP MODAL THAT SHOWS FILTERS */}
        <button>Filters</button>
        <img src={logo}></img>
        <div className="profile-card">
          {/* FILL THIS UP DYNAMICALLY WITH ACTUAL PEOPLE AND THEIR INFO */}
        </div>
      </div>
    </div>
  );
};

export default Browse;
