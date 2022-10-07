import React, { useState } from "react";
import logo from "../images/png/logo-no-background.png";
import ProfileCard from "./ProfileCard";
import "./ConnectionModal.css";
function ConnectionModal({ user, onDislike, onLike, handleAge, ageRange }) {
  const [isShowingFilters, setIsShowingFilters] = useState(false);
  return (
    <div>
      <div className="filters">
        <p
          className="filters-description"
          onClick={() => setIsShowingFilters(!isShowingFilters)}
        >
          Filters
        </p>
        {isShowingFilters ? (
          <div className="age-filter">
            <label for="age">Age Range (Years): {ageRange}</label>
            <input
              type="range"
              name="age"
              min="1"
              max="100"
              onChange={handleAge}
            ></input>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div></div>
      <img src={logo} alt="twosum logo" className="two-sum-logo"></img>
      <div className="profile-card">
        <ProfileCard user={user} />
      </div>
      <div className="browse-buttons">
        <button className="dislike" onClick={onDislike}>
          X
        </button>
        <button className="like" onClick={onLike}>
          ✓
        </button>
      </div>
    </div>
  );
}

export default ConnectionModal;
